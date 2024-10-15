import os
import json
import datetime
import pytz
import requests
import schedule
import time
import io
import sys

def pythonCode(code_string):
    local_namespace = {"os": os, "json": json, "datetime": datetime, "pytz": pytz, "requests": requests, "schedule": schedule, "time": time}
    output_buffer = io.StringIO()
    sys.stdout = output_buffer
    try:
        exec(code_string,{},local_namespace)
        result = output_buffer.getvalue()
    except Exception as e:
        result = str(e)
    return {"log":"Executed successfully","result":result}