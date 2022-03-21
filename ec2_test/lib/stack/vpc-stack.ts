import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { InternetGateway } from '../resource/internet-gateway';
import { RouteTable } from '../resource/route-table';
import { Subnet } from '../resource/subnet';
import { Vpc } from '../resource/vpc';

export class VpcStack extends Stack {
    public readonly vpc: Vpc;
    public readonly subnet: Subnet;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // VPC
        this.vpc = new Vpc(this);

        // Subnet
        this.subnet = new Subnet(this, this.vpc);

        // Internet Gateway
        const internetGateway = new InternetGateway(this, this.vpc);

        // Route Table
        new RouteTable(this, this.vpc, this.subnet, internetGateway);
    }
}
