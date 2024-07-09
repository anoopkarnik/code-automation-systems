import { logger } from "@repo/winston-logger/index";
export const runWebhook = async (action:any) =>{
    if (action.subActionType === "Internal Webhook"){
        const actionData = JSON.parse(action.actionData);
        logger.info('Starting action',action.name);
        const response = await fetch(actionData['Request Url'],{
            method: actionData['Request Method'],
            headers: JSON.parse(actionData['Request Headers']),
            body: actionData['Request Body']
        })
        const data = await response.json();
        logger.info(data);
    }
}