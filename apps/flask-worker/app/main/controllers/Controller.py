from flask import Blueprint, request, jsonify
from main.services import pythonCode

payload_controller = Blueprint("payload_controller",__name__)

@payload_controller.route("/",methods=["GET"])
def health_check():
	return jsonify({"status":"success"})

@payload_controller.route("/payload",methods=["POST"])
def compile_python():
	message_body = request.json
	try:
		res = pythonCode.pythonCode(message_body["code_string"])
		return jsonify(res)
	except Exception as e:
		return jsonify({"error":str(e)})