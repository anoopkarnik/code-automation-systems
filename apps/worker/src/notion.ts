import { createNotionPage, modifyNotionPage, queryAllNotionDatabase } from "@repo/notion/notion-client"

export const queryAllNotionDatabaseAction = async ({apiToken,database_id,filters=[],sorts=[]}:any) => {
    try{
        const response = await queryAllNotionDatabase({apiToken,database_id, filters, sorts})
        return {result: response, log: 'Query all notion database action success'}
    }
    catch(err){
        return {result: {results:[]}, log: err}
    }
}

export const createNotionPages = async ({apiToken, dbId, pagesProperties}:any) => {
    try{
        let responses:any = [];
        let pagesPropertiesJson = JSON.parse(pagesProperties.replace(/'/g, '"'));
        for (let i=0 ; i<pagesPropertiesJson.length; i++){
            const properties = pagesPropertiesJson[i];
            const response = await createNotionPageAction({apiToken, dbId, properties})
            responses.push(response)
        }
        return {result: responses, log: 'Create all notion pages action success'}
    }
    catch(err){
        return {log: err}
    }

}

export const createNotionPageAction = async ({apiToken, dbId, properties}:any) => {
    const response = await createNotionPage({apiToken, database_id:dbId, properties})
    return response;
}

export const modifyNotionPages = async ({apiToken, pageIds, pagesProperties}:any) => {

    try{
        let responses:any = [];
        let pagesPropertiesJson = JSON.parse(pagesProperties.replace(/'/g, '"'));
        let pageIdsJson = JSON.parse(pageIds.replace(/'/g,'"'));
        for (let i=0; i<pageIdsJson.length; i++){
            const response = await modifyNotionPageAction({apiToken, pageId:pageIdsJson[i], properties:pagesPropertiesJson})
            responses.push(response)
        }
        return {result: responses, log: 'Modify all notion pages action success'}
    }
    catch(err){
        return {log: err}
    }
}

export const modifyNotionPageAction = async ({apiToken, pageId, properties}:any) => {
    const response = await modifyNotionPage({apiToken, page_id:pageId, properties})
    return response;
}