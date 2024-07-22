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
            id
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
            console.log('Connections', connections)
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

export const getConnectionByAccessToken = async (accessToken: string) => {
    try{
        const connection = await db.connection.findFirst({
            where: {
                accessToken
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
    refreshToken, scopes, results}: any) => {
    console.log('Creating connection', type, userId, accessToken, workspaceName, workspaceIcon, workspaceId, apiKey, refreshToken, scopes)
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
        const result = await db.$transaction(async (transaction) =>{
            const connection = await transaction.connection.create({
                data:{
                    name: 'My Youtube Account',
                    userId: userId,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    scopes: scopes,
                    type: type,
                }
            })
            const youtube = await transaction.youtube.createMany({
                data: results.map((result: any) => {
                        return {
                            connectionId: connection.id,
                            videoId: result.videoId,
                            channelId: result.channelId,
                        }
                    })
                
            })
            return { connection, youtube }
        });
        return result;
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
   
export const updateYoutube = async ({id,watched}:any) =>{
    const youtube = await db.youtube.update({
        where:{
            id: id
        },
        data:{
            watched
        }
    })
    return youtube;
}