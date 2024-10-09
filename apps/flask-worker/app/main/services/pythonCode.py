import os
import json
import datetime
import pytz
import requests
import schedule
import time

def pythonCode(code_string):
    local_namespace = {"os": os, "json": json, "datetime": datetime, "pytz": pytz, "requests": requests, "schedule": schedule, "time": time}
    result = exec(code_string,{},local_namespace)
    return {"log":"Executed successfully","result":result}