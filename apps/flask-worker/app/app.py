from flask import Flask
import threading
import os
from main.controllers import Controller
from dotenv import load_dotenv
import logging
from kafka import KafkaConsumer
import json
from main.services import kafka

load_dotenv()

# Function to run the Kafka consumer

KAFKA_TOPIC = 'flask-server-events'
KAFKA_BROKER = 'localhost:9092'  # Replace with your Kafka broker URL

# Start the Kafka consumer in a separate thread when the Flask app starts
def start_kafka_consumer():
    consumer_thread = threading.Thread(target=consume_kafka_messages)
    consumer_thread.daemon = True
    consumer_thread.start()

def consume_kafka_messages():

    try:
        consumer = KafkaConsumer(
            KAFKA_TOPIC,
            bootstrap_servers=[KAFKA_BROKER],
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            group_id='flask-kafka-group',
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )

        for message in consumer:
            print(f"Received message: {message.value}")
    except Exception as e:
        print(f"Error in Kafka consumer: {e}")
        logging.error(f"Kafka consumer error: {e}")

def create_app():
	app = Flask(__name__)
	logging.basicConfig(filename='logs/info.log', level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')
	app.logger.info('Info level log')
	app.logger.error('Error level log')
	app.register_blueprint(Controller.payload_controller)
	return app

app = create_app()

if __name__ == "__main__":
    
	kafka.start_kafka_consumer()
	app.run(debug=True,use_reloader=False)
