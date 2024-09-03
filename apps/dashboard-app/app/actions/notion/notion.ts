'use server'
import { getConnectionsByUserAndType, updateNotionDb} from "@repo/prisma-db/repo/connection";
import { createNotionPage, getNotionDatabaseProperties, modifyNotionPage, queryAllNotionDatabase, queryNotionDatabase,
    getNotionPage
 } from '@repo/notion/notion-client'
import { deletePage } from "../../../../../packages/notion/src";

export const getDatabases = async (token: string) => {
    try{
        const response = await fetch('https://api.notion.com/v1/search', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-02-22'
            },
            body: JSON.stringify({
                filter: {
                    value: 'database',
                    property: 'object'
                }
            })
        });
        const data = await response.json();
        const results:any = [];
        data?.results.forEach((conn: any) => {
            results.push({id: conn.id, name: conn?.title?.[0]?.text?.content, icon: conn?.icon?.emoji})
        })
        return results
    }
    catch(err){
        console.log(err)
    }
  
}

export const getNotionInfo = async (userId: string) => {
    const notion_info = await getConnectionsByUserAndType(userId, 'Notion');
    return notion_info?.[0];
}

export const updateNotionDatabase = async (notionId: string, field:string, value: any) => {

    const notionDb = await updateNotionDb({id:notionId, field, value} );
    return notionDb;
}

export const queryNotionDatabaseAction = async ({apiToken,database_id,filters=[],sorts=[],cursor}:any) => {
    const response = await queryNotionDatabase({apiToken,database_id, filters, sorts,cursor })
    return response;
}

export const queryAllNotionDatabaseAction = async ({apiToken,database_id,filters=[],sorts=[]}:any) => {
    const response = await queryAllNotionDatabase({apiToken,database_id, filters, sorts})
    return response;
}

export const queryNotionDatabaseProperties = async ({apiToken,database_id}:any) => {
    const response = await getNotionDatabaseProperties({apiToken,database_id })
    return response;
}

export const queryNotionDatabaseByDateRange = async ({apiToken,database_id,startDate,endDate}:any) => {
    const filters = [
        {
            name: 'created_time',
            type: 'created_time',
            condition: 'on_or_after',
            value: startDate
        },
        {
            name: 'created_time',
            type: 'created_time',
            condition: 'on_or_before',
            value: endDate
        }
    ]
    const response = await queryAllNotionDatabase({apiToken,database_id,  filters: filters})
    return response;
}

export const deleteNotionPages = async ({apiToken, dbId, ids}:any) => {
    for (let id of ids){
        await deletePage({apiToken, page_id: id})
    }
}

export const createNotionPageAction = async ({apiToken, dbId, properties}:any) => {
    const response = await createNotionPage({apiToken, database_id:dbId, properties})
    return response;
}

export const modifyNotionPageAction = async ({apiToken, pageId, properties}:any) => {
    const response = await modifyNotionPage({apiToken, page_id:pageId, properties})
    return response;
}

export const queryNotionPageAction = async ({apiToken, pageId}:any) => {
    const response = await getNotionPage({apiToken, page_id:pageId})
    return response;
}