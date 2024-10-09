# Function to run the Kafka consumer
from kafka import KafkaConsumer
import threading
import json
from main.repositories import Repository as repo
from main.services import utils,pythonCode


NODE_TOPIC_NAME = 'nodejs-server-events'
FLASK_TOPIC_NAME = 'flask-server-events'
KAFKA_BROKER = 'localhost:9092'  # Replace with your Kafka broker URL


# Start the Kafka consumer in a separate thread when the Flask app starts
def start_kafka_consumer():
    consumer_thread = threading.Thread(target=consume_kafka_messages)
    consumer_thread.daemon = True
    consumer_thread.start()

def consume_kafka_messages():
    consumer = KafkaConsumer(
        FLASK_TOPIC_NAME,
        bootstrap_servers=[KAFKA_BROKER],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        group_id='flask-kafka-group',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
    for message in consumer:
        log = f"Received message: {message.offset} from topic {message.topic}"
        print(log)
        newLogs = []
        newLogs.append(log)
        if not message.value:
            log = f"No message found in offset {message.offset}"
            print(log)
            newLogs.append(log)
            consumer.commit()
            continue
        try:
            event_id = message.value['eventId']
            stage = message.value['stage']
            log = f"Event ID: {event_id}, Stage: {stage}"
            print(log)
            eventDetails = repo.get_event_details_by_id(event_id)
            log = f"Event details: {eventDetails}"
            # print(log)
            newLogs.append(log)
            currentAction = [action for action in eventDetails['Workflows']['actions'] if action['sorting_order'] == stage]
            if len(currentAction) == 0:
                log = f"No action found for stage {stage}"
                print(log)
                newLogs.append(log)
                consumer.commit()
                continue
            currentAction = currentAction[0]
            log = f"Processing {event_id} at stage {stage} with action {currentAction['type']['name']}"
            print(log)
            newLogs.append(log)
            result = {}
            log = f"Metadata for action {currentAction['type']['name']} before replacement {currentAction['metadata']}"
            # print(log)
            newLogs.append(log)
            log = f"Metadata for event {event_id} is {eventDetails['metadata']}"
            # print(log)
            newLogs.append(log)
            actionMetadata = currentAction['metadata']
            eventMetadata = eventDetails['metadata']
            metadata = utils.modify_metadata(actionMetadata, eventMetadata)
            log = f"Replaced metadata {event_id} is {metadata}"
            # print(log)
            newLogs.append(log)
            if currentAction['type']['name'] == 'Python Code':
                res = pythonCode.pythonCode(metadata['code'])
                log = res['log']
                if 'result' in res:
                    result = res['result']
                print(log)
                newLogs.append(log)
            stageString = f"action{stage}"
            updatedEventMetadata = eventMetadata
            updatedEventMetadata[stageString] = {"result": result, "logs": newLogs}
            print(f'Result got is {result}')
            lastStage = len(eventDetails['Workflows']['actions']) - 1

            consumer.commit()


        except Exception as e:
            log = f"Error Processing message: {message.offset} from topic {message.topic} ---- {e}"
            print(log)
            newLogs.append(log)
            consumer.commit()
            continue