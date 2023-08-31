import json
import logging
import os
from datetime import datetime

import mysql.connector

logger = logging.getLogger()
logger.setLevel(logging.INFO)

DB_HOST = os.environ["DB_HOST"]
DB_PORT = os.environ["DB_PORT"]
DB_USER = os.environ["DB_USER"]
DB_NAME = os.environ["DB_NAME"]
DB_PASS = os.environ["DB_PASS"]
DB_TABLE = os.environ["DB_TABLE"]


def handler(event, context):
    conn = None
    results = None
    logger.info(event)
    try:
        conn = mysql.connector.connect(user=DB_USER, password=DB_PASS, database=DB_NAME, host=DB_HOST, port=DB_PORT)

        if conn.is_connected:
            logger.info("Connected!")

        cur = conn.cursor()
        cur.execute(f"SELECT * FROM {DB_TABLE}")
        results = cur.fetchall()
        logger.info(results)

    except Exception as e:
        logger.info(f"Error Occurred: {e}")

    finally:
        if conn is not None and conn.is_connected():
            conn.close()

    return {
        "statusCode": 200,
        "body": json.dumps({"res": results, "event": event}),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD",
            "Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        },
    }
