# Function to run the Kafka consumer
from kafka import KafkaConsumer,KafkaProducer
import threading
import json
from main.repositories import Repository as repo
from main.services import utils,pythonCode
import os
from dotenv import load_dotenv
import logging

load_dotenv()

FLASK_TOPIC_NAME = os.environ.get('FLASK_TOPIC_NAME')
NODE_TOPIC_NAME = os.environ.get('NODE_TOPIC_NAME')
BOOTSTRAP_SERVER = os.environ.get('BOOTSTRAP_SERVER')

# Start the Kafka consumer in a separate thread when the Flask app starts
def start_kafka_consumer():
    consumer_thread = threading.Thread(target=consume_kafka_messages)
    consumer_thread.daemon = True
    consumer_thread.start()

def consume_kafka_messages():
    consumer = KafkaConsumer(
        FLASK_TOPIC_NAME,
        bootstrap_servers=[BOOTSTRAP_SERVER],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        group_id='flask-kafka-group',
        max_poll_interval_ms=600000,
        max_poll_records=10,
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
    producer = KafkaProducer(
        bootstrap_servers=[BOOTSTRAP_SERVER],
        retries=3)

    for message in consumer:
        log = f"Received message: {message.offset} from topic {message.topic}"
        logging.info(log)
        newLogs = []
        newLogs.append(log)
        if not message.value:
            log = f"No message found in offset {message.offset}"
            logging.info(log)
            newLogs.append(log)
            consumer.commit()
            continue
        try:
            event_id = message.value['eventId']
            stage = message.value['stage']
            log = f"Event ID: {event_id}, Stage: {stage}"
            logging.info(log)
            eventDetails = repo.get_event_details_by_id(event_id)
            log = f"Event details: {eventDetails}"
            logging.info(log)
            newLogs.append(log)
            currentAction = [action for action in eventDetails['Workflows']['actions'] if action['sorting_order'] == stage]
            if len(currentAction) == 0:
                log = f"No action found for stage {stage}"
                logging.info(log)
                newLogs.append(log)
                consumer.commit()
                continue
            currentAction = currentAction[0]
            log = f"Processing {event_id} at stage {stage} with action {currentAction['type']['name']}"
            logging.info(log)
            newLogs.append(log)
            result = {}
            log = f"Metadata for action {currentAction['type']['name']} before replacement {currentAction['metadata']}"
            logging.info(log)
            newLogs.append(log)
            log = f"Metadata for event {event_id} is {eventDetails['metadata']}"
            logging.info(log)
            newLogs.append(log)
            actionMetadata = currentAction['metadata']
            eventMetadata = eventDetails['metadata']
            metadata = utils.modify_metadata(actionMetadata, eventMetadata)
            log = f"Replaced metadata {event_id} is {metadata}"
            logging.info(log)
            newLogs.append(log)
            if currentAction['type']['name'] == 'Python Code':
                codeBlocks = metadata['codeBlocks']
                codeStrings = [codeBlock['code'] for codeBlock in codeBlocks]
                code = '\n'.join(codeStrings)
                res = pythonCode.pythonCode(code)
                log = res['log']
                if 'result' in res:
                    result = res['result']
                logging.info(log)
                newLogs.append(log)
            stageString = f"action{stage}"
            updatedEventMetadata = eventMetadata
            updatedEventMetadata[stageString] = {"result": result, "logs": newLogs}
            logging.info(f'Result got is {result}')
            lastStage = len(eventDetails['Workflows']['actions']) 
            log = f"updated Metadata is {updatedEventMetadata}"
            logging.info(log)
            newLogs.append(log)
            if (lastStage!=stage):
                repo.update_event_metadata(event_id, updatedEventMetadata)
                producer.send(NODE_TOPIC_NAME, json.dumps({"eventId": event_id, "stage": stage+1}))
            else:
                repo.update_event_metadata(event_id, updatedEventMetadata)
                repo.update_event_status(event_id, "Completed")
            consumer.commit()
            continue

        except Exception as e:
            log = f"Error Processing message: {message.offset} from topic {message.topic} ---- {e}"
            logging.info(log)
            newLogs.append(log)
            consumer.commit()
            continue