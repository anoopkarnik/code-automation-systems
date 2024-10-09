import psycopg2

# Set up your PostgreSQL connection
def get_db_connection():
    connection = psycopg2.connect(
        host="bayesian-samaritans.c07q770mtb5c.ap-south-1.rds.amazonaws.com",  # Update with your DB host
        database="postgres",  # Update with your DB name
        user="anoop",  # Update with your DB username
        password="dasika#1992", # Update with your DB password
        port=5432  # Update with your DB port
    )
    return connection

# Function to fetch event details by event ID
def get_event_details_by_id(event_id: str):
    print("Connecting to DB")
    connection = get_db_connection()
    print("Connected to DB")
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
            e.metadata as event_metadata
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

        
        if workflow_id not in workflows:
            workflows = {"actions": []}
        
        workflows["actions"].append({
            "action_id": action_id,
            "metadata": action_metadata,
            "sorting_order": sorting_order,
            "type": {
                "name": action_type_name
            }
        })

    event_details["Workflows"] = workflows
    event_details["metadata"] = event_metadata
    cursor.close()
    connection.close()

    return event_details