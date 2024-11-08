import os
import json
import datetime
import pytz
import requests
import schedule
import time
import io
import sys
import youtube_transcript_api
import openai
import contextlib
import logging

def pythonCode(code_string):
    print("Executing code")
    logging.info("Executing code")
    local_namespace = {"os": os, "json": json, "datetime": datetime, "pytz": pytz, "requests": requests, "schedule": schedule,
                       "time": time, "youtube_transcript_api": youtube_transcript_api, "openai": openai}
    output_buffer = io.StringIO()
    # Use contextlib to redirect stdout to the output buffer for capturing print statements
    with contextlib.redirect_stdout(output_buffer):
        try:
            exec(code_string, {}, local_namespace)  # Execute the code string within the specified namespace
            result = output_buffer.getvalue()  # Retrieve output from buffer
            print("Execution Result:", result)  # Optional: print the execution result
        except Exception as e:
            result = f"Error: {e}"  # Capture and format exceptions
    
    return {"log": "Executed successfully", "result": result}