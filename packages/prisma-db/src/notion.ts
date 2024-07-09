import db from './index'

interface notionProps {
    access_token: string,
    notion_connected: any,
    workspace_id: string,
    workspace_icon: string,
    workspace_name: string,
    userId: string
}

export const getNotionByAccessToken = async (access_token: string) => {
    if(access_token){
        const notion_connected = await db.notion.findFirst({
            where:{
                accessToken: access_token,
            },
            include:{
                connections: {
                    select: {
                        type: true
                    }
                }
            }
        })
        return notion_connected;
    }
}

export const createNotion = async ({access_token,notion_connected,workspace_id,workspace_icon,workspace_name,userId}:notionProps) =>{
    const notion = await db.notion.create({
        data:{
            userId: userId,
            workspaceIcon: workspace_icon,
            workspaceName: workspace_name,
            workspaceId: workspace_id,
            accessToken: access_token,
            connections: {
                create: {
                    userId: userId,
                    type: "Notion"
                }
            }
        }
    })
    return notion
}


export const getNotionByUserId = async (userId: string) => {
    const connection = await db.notion.findFirst({
        where:{
            userId
        },
        include:{
            notionDb: true
        }
    })
    return connection
}

export const createNotionDb = async ({notionId}:any) =>{
    await db.notionDb.create({
        data:{
            notionId
        }
    })

}

export const updateAccoutsDb = async ({id, accountsDb}:any) =>{
    const notionDb = await db.notionDb.update({
        where:{
            notionId:id
        },
        data:{
            accountsDb,
        }
    })
    return notionDb;
}

export const updateTransactionsDb = async ({id, transactionsDb}:any) =>{
    const notionDb = await db.notionDb.update({
        where:{
            notionId:id
        },
        data:{
            transactionsDb,
        }
    })
    return notionDb;
}

export const updateMonthlyBudgetDb = async ({id, monthlyBudgetDb}:any) =>{
    const notionDb = await db.notionDb.update({
        where:{
            notionId:id
        },
        data:{
            monthlyBudgetDb,
        }
    })
    return notionDb;
}

export const updateBudgetPlanDb = async ({id, budgetPlanDb}:any) =>{
    const notionDb = await db.notionDb.update({
        where:{
            notionId:id
        },
        data:{
            budgetPlanDb,
        }
    })
    return notionDb;
}

