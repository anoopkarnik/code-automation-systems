from flask import Flask
from main.controllers import Controller
from dotenv import load_dotenv
import logging
from main.services import kafka

load_dotenv()

def create_app():
	app = Flask(__name__)
    
	logging.basicConfig(filename='app/logs/info.log', level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')
	app.logger.info('Info level log')
	app.logger.error('Error level log')
	app.register_blueprint(Controller.payload_controller)
	return app
    
app = create_app()

if __name__ == "__main__":
    kafka.start_kafka_consumer()
    app.run(debug=True,use_reloader=False)
