import db from '@repo/prisma-db/client';

export const updateConnection = async (id: string, name: string) => {
    const connection = await db.connections.update({
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
    const connection = await db.connections.delete({
        where: {
            id
        }
    });
    return connection;
}

export const deleteYoutubeConnection = async (id: string) => {
    const connection = await db.youtube.delete({
        where: {
            id
        }
    });
    return connection;
}

export const deleteOpenAIConnection = async (id: string) => {
    const connection = await db.openAI.delete({
        where: {
            id
        }
    });
    return connection;
}

export const deleteNotionConnection = async (id: string) => {
    const connection = await db.notion.delete({
        where: {
            id
        }
    });
    return connection;
}