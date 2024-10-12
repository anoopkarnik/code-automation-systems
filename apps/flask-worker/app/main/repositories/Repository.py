import psycopg2
import logging
import json
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_HOST = os.environ.get('POSTGRES_HOST')
POSTGRES_DB = os.environ.get('POSTGRES_DB')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT')

# Set up your PostgreSQL connection
def get_db_connection():
    connection = psycopg2.connect(
        host=POSTGRES_HOST,  
        database=POSTGRES_DB, 
        user=POSTGRES_USER, 
        password=POSTGRES_PASSWORD,
        port=POSTGRES_PORT
    )
    return connection

# Function to fetch event details by event ID
def get_event_details_by_id(event_id: str):
    logging.info("Connecting to DB")
    connection = get_db_connection()
    logging.info("Connected to DB")
    cursor = connection.cursor()

    # Raw SQL query to get event details with workflows, actions, and action types
    query = """
        SELECT
            e.id as event_id,
            wf.id as workflow_id,
            a.id as action_id,
            a.metadata as action_metadata,
            a."sortingOrder" as action_sorting_order,
            at.id as action_type_id,
            at.name as action_type_name,
            e.metadata as event_metadata,
            at."serverType" as server_type
        FROM
            workflow_schema."Event" e
        LEFT JOIN
            workflow_schema."Workflow" wf ON e."workflowId" = wf.id
        LEFT JOIN
            workflow_schema."WorkflowAction" a ON wf.id = a."workflowId"
        LEFT JOIN
            workflow_schema."WorkflowActionSubType" at ON a."actionId" = at.id
        WHERE
            e.id = %s;
    """
            
    cursor.execute(query, (event_id,))
    result = cursor.fetchall()
    # Structure the result in a nested format
    event_details = {
        "event_id": event_id,
        "metadata": {},
        "Workflows": {}
    }
    
    workflows = {}
    
    # Iterate through the results and construct the nested structure
    for row in result:
        event_id = row[0]
        workflow_id = row[1]
        action_id = row[2]
        action_metadata = row[3]
        sorting_order = row[4]
        action_type_id = row[5]
        action_type_name = row[6]
        event_metadata = row[7]
        server_type = row[8]

        
        if workflow_id not in workflows:
            workflows = {"actions": []}
        
        workflows["actions"].append({
            "action_id": action_id,
            "metadata": action_metadata,
            "sorting_order": sorting_order,
            "type": {
                "name": action_type_name,
                "server_type": server_type
            }
        })

    event_details["Workflows"] = workflows
    event_details["metadata"] = event_metadata
    cursor.close()
    connection.close()

    return event_details

def update_event_status(event_id: str, status: str):
    logging.info("Connecting to DB")
    connection = get_db_connection()
    logging.info("Connected to DB")
    cursor = connection.cursor()

    # Raw SQL query to update the status of an event
    query = """
        UPDATE workflow_schema."Event"
        SET status = %s
        WHERE id = %s;
    """

    cursor.execute(query, (status, event_id))
    connection.commit()
    cursor.close()
    connection.close()
    logging.info(f"Updated status of event {event_id} to {status}")

def update_event_metadata(event_id: str, metadata: dict):
    logging.info("Connecting to DB")
    connection = get_db_connection()
    logging.info("Connected to DB")
    cursor = connection.cursor()

    # Raw SQL query to update the metadata of an event
    query = """
        UPDATE workflow_schema."Event"
        SET metadata = %s
        WHERE id = %s;
    """

    cursor.execute(query, (json.dumps(metadata), event_id))
    connection.commit()
    cursor.close()
    connection.close()
    logging.info(f"Updated metadata of event {event_id}")