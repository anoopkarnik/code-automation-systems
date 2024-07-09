'use server'
import { getNotionByUserId, updateNotionDb} from "@repo/prisma-db/repo/notion";
import { getNotionDatabaseProperties, queryNotionDatabase } from '@repo/notion/notion-client'

export const getDatabases = async (token: string) => {
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
    return data.results;
}

export const getNotionInfo = async (userId: string) => {
    const notion_info = await getNotionByUserId(userId)
    return notion_info;
}

export const updateNotionDatabase = async (notionId: string, field:string, value: any) => {
    const notionDb = await updateNotionDb({id:notionId, field, value} );
    return notionDb;
}

export const queryNotionDatabaseAction = async ({apiToken,database_id}:any) => {
    const response = await queryNotionDatabase({apiToken,database_id,  filters: []   })
    return response;
}

export const queryNotionDatabaseProperties = async ({apiToken,database_id}:any) => {
    const response = await getNotionDatabaseProperties({apiToken,database_id })
    return response;
}