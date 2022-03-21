import { Construct } from 'constructs';
import { CfnRouteTable, CfnRoute, CfnSubnetRouteTableAssociation } from 'aws-cdk-lib/aws-ec2';
import { BaseResource } from './abstract/base-resouce';
import { Subnet } from './subnet';
import { InternetGateway } from './internet-gateway';
import { Vpc } from './vpc';

interface RouteInfo {
    readonly id: string;
    readonly destinationCidrBlock: string;
    readonly gatewayId?: () => string;
}

interface AssociationInfo {
    readonly id: string;
    readonly subnetId: () => string;
}

interface ResourceInfo {
    readonly id: string;
    readonly resourceName: string;
    readonly routes: RouteInfo[];
    readonly associations: AssociationInfo[];
    readonly assign: (routeTable: CfnRouteTable) => void;
}

export class RouteTable extends BaseResource {
    public readonly public: CfnRouteTable;

    private readonly vpc: Vpc;
    private readonly subnet: Subnet;
    private readonly internetGateway: InternetGateway;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'RouteTablePublic',
            resourceName: 'rtb-public',
            routes: [{
                id: 'RoutePublic',
                destinationCidrBlock: '0.0.0.0/0',
                gatewayId: () => this.internetGateway.igw.ref
            }],
            associations: [
                {
                    id: 'RouteTableAssociationPublic1a',
                    subnetId: () => this.subnet.public1a.ref
                }
            ],
            assign: routeTable => (this.public as CfnRouteTable) = routeTable
          }
    ];

    constructor(
        scope: Construct,
        vpc: Vpc,
        subnet: Subnet,
        internetGateway: InternetGateway
    ) {
        super();

        this.vpc = vpc;
        this.subnet = subnet;
        this.internetGateway = internetGateway;

        for (const resourceInfo of this.resources) {
            const routeTable = this.createRouteTable(scope, resourceInfo);
            resourceInfo.assign(routeTable);

            for (const routeInfo of resourceInfo.routes) {
                this.createRoute(scope, routeInfo, routeTable);
            }

            for (const associationInfo of resourceInfo.associations) {
                this.createAssociation(scope, associationInfo, routeTable);
            }
        }
    }

    private createRouteTable(scope: Construct, resourceInfo: ResourceInfo): CfnRouteTable {
        const routeTable = new CfnRouteTable(scope, resourceInfo.id, {
            vpcId: this.vpc.vpc.ref,
            tags: [{
                key: 'Name',
                value: this.createResourceName(scope, resourceInfo.resourceName)
            }]
        });

        return routeTable;
    }

    private createRoute(scope: Construct, routeInfo: RouteInfo, routeTable: CfnRouteTable) {
        const route = new CfnRoute(scope, routeInfo.id, {
            routeTableId: routeTable.ref,
            destinationCidrBlock: routeInfo.destinationCidrBlock
        });

        if (routeInfo.gatewayId) {
            route.gatewayId = routeInfo.gatewayId();
        }
    }

    private createAssociation(scope: Construct, associationInfo: AssociationInfo, routeTable: CfnRouteTable) {
        new CfnSubnetRouteTableAssociation(scope, associationInfo.id, {
            routeTableId: routeTable.ref,
            subnetId: associationInfo.subnetId()
        });
    }
}
