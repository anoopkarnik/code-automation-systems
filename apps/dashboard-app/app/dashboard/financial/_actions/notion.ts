'use server'
import { getNotionByUserId, updateAccoutsDb, updateBudgetPlanDb, updateMonthlyBudgetDb, updateTransactionsDb } from "@repo/prisma-db/repo/notion";
import { queryNotionDatabase } from '@repo/notion/notion-client'

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

export const updateAccountNotionDatabase = async (notionId: string, accountsDb: any) => {    
    const notionDb = await updateAccoutsDb({id:notionId, accountsDb});
    return notionDb;
}

export const updateTransactionsNotionDatabase = async (notionId: string, transactionsDb: any) => {
    const notionDb = await updateTransactionsDb({id:notionId, transactionsDb});
    return notionDb;
}

export const updateMonthlyBudgetNotionDatabase = async (notionId: string, monthlyBudgetDb: any) => {
    const notionDb = await updateMonthlyBudgetDb({id:notionId, monthlyBudgetDb});
    return notionDb;
}

export const updateBudgetPlanNotionDatabase = async (notionId: string, budgetPlanDb: any) => {
    const notionDb = await updateBudgetPlanDb({id:notionId, budgetPlanDb});
    return notionDb;
}

export const queryNotionDatabaseAction = async ({apiToken,database_id}:any) => {
    const response = await queryNotionDatabase({apiToken,database_id,  filters: []   })
    return response;
}