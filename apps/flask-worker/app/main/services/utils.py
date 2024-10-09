import json
import re

# Helper function to get the value from a nested object using a string key path
def get_nested_value(obj, key_path):
    keys = key_path.split('.')
    value = obj
    for key in keys:
        if value is not None and key in value:
            value = value[key]
        else:
            return None
    return value

# Function to modify metadata based on previous metadata
def modify_metadata(metadata, prev_metadata):
    # Step 1: Convert the metadata object to a JSON string
    action_string = json.dumps(metadata)

    # Step 2: Replace all placeholders in the action_string
    def replace_placeholder(match):
        key = match.group(1).strip()
        value = get_nested_value(prev_metadata, key)

        if isinstance(value, dict):
            value = json.dumps(value).replace('"', "'")
            return value if value is not None else f"{{{{{key}}}}}"
        elif isinstance(value, str):
            return value.replace('"', "'") if value is not None else f"{{{{{key}}}}}"
        return f"{{{{{key}}}}}"

    # Replace placeholders in the format {{key}} using regular expression
    action_string = re.sub(r"{{(.*?)}}", replace_placeholder, action_string)

    # Step 3: Convert the modified JSON string back into an object
    modified_action = json.loads(action_string)

    return modified_action

