import db from '@repo/prisma-db/client';

export const updateConnection = async (id: string, name: string) => {
    const connection = await db.connection.update({
        where: {
            id
        },
        data: {
            name
        }
    });
    return connection;
}

export const deleteConnection = async (id: string) => {
    const connection = await db.connection.delete({
        where: {
            id
        }
    });
    return connection;
}

export const deleteNotionDb = async (id: string) => {
    const notionDb = await db.notionDb.delete({
        where: {
            connectionId:id
        }
    });
    return notionDb;
}


export const getConnectionsByUser = async (userId: string) => {
    const connections = await db.connection.findMany({
        where: {
            userId
        }
    });
    return connections;
}

export const getConnectionsByUserAndType = async (userId: string, type: string) => {
    try {
        if (type === 'Notion'){
            const connections = await db.connection.findMany({
                where: {
                    userId,
                    type
                },
                include: {
                    notionDb: true
                }
            });
            return connections;
        }
        else{
            const connections = await db.connection.findMany({
                where: {
                    userId,
                    type
                }
            });
            return connections;
        }
    }
    catch (error) {
        return null;
    }
}

export const getConnectionByAccessTokenAndUserId = async (accessToken: string, userId: string) => {
    try{
        const connection = await db.connection.findFirst({
            where: {
                accessToken,
                userId
            }
        });
        return connection;
    }
    catch (error){
        return null;
    }
}

export const getConnectionByAPIKey = async (apiKey: string) => {
    const connection = await db.connection.findFirst({
        where: {
            apiKey
        }
    });
    return connection;
}

export const createConnection = async ({type, userId, accessToken, workspaceName, workspaceIcon, workspaceId, apiKey,
    refreshToken, scopes}: any) => {
    if (type === 'Notion'){
        const result = await db.$transaction(async (db) =>{

            const notion = await db.connection.create({
                data:{
                    userId: userId,
                    workspaceIcon: workspaceIcon,
                    workspaceName: workspaceName,
                    name: workspaceName,
                    workspaceId: workspaceId,
                    accessToken: accessToken,
                    type: type,
                }
            })
            const notionDb = await db.notionDb.create({
                data:{
                    connectionId: notion.id,
                }
            })
            return { notion, notionDb }
        });
        return result;
    }
    else if (type === 'OpenAI'){
        const openAI = await db.connection.create({
            data:{
                name: 'My OpenAI Key',
                userId: userId,
                apiKey: apiKey,
                type: type,
            }
        })
        return openAI;
    }
    else if (type === 'Youtube'){
        const connection = await db.connection.create({
            data:{
                name: 'My Youtube Account',
                userId: userId,
                accessToken: accessToken,
                refreshToken: refreshToken,
                scopes: scopes,
                type: type,
            }
        })
        return connection;
    }
    return null;
}

export const updateNotionDb = async ({ id, field, value }: { id: string, field: string, value: any }) => {
    const notionDb = await db.notionDb.update({
      where: {
        connectionId: id
      },
      data: {
        [field]: value,
      }
    });
    return notionDb;
  };
   

export const getConnectionById = async (id: string) => {
    const connection = await db.connection.findUnique({
        where: {
            id
        }
    });
    return connection;
}

export const getConnectionByUserIdAndTypeAndName = async (userId: string, type: string, name: string) => {
    try {
        const connection = await db.connection.findFirst({
            where: {
                userId,
                type,
                name
            }
        });
        return connection;
    }
    catch (error) {
        return null;
    }
}