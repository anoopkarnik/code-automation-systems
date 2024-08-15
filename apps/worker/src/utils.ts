export const modifyMetadata = async (metadata:any, prevMetadata: any) => {
    // Step 1: Convert the action object to a JSON string
    let actionString = JSON.stringify(metadata);
  
    // Helper function to get the value from a nested object using a string key path
    const getNestedValue = (obj: any, keyPath: string) => {
      return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
    };
  
    // Step 2: Replace all placeholders in the actionString
    actionString = actionString.replace(/{{(.*?)}}/g, (_, key) => {
      let value = getNestedValue(prevMetadata, key.trim());

      if (typeof value === 'object') {
        value = JSON.stringify(value);
        value = value.replace(/"/g, "'");
        return value !== undefined ? value : `{{${key}}}`;
      }
      else if (typeof value === 'string') {
        value = value.replace(/"/g, "'");
        return value !== undefined ? value : `{{${key}}}`;
      }
    });
    // Step 3: Convert the modified JSON string back into an object
    const modifiedAction = JSON.parse(actionString);
  
    return modifiedAction;
  };
  