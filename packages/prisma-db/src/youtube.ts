import db from './index'

export const createYoutube = async ({name,access_token,refresh_token,scopes,userId}:any) =>{
    const youtube = await db.youtube.create({
        data:{
            userId: userId,
            accessToken: access_token,
            refreshToken: refresh_token,
            scopes: scopes,
            connections: {
                create: {
                    userId: userId,
                    name: name,
                    type: "Youtube"
                }
            }
        }
    })
    return youtube
}

export const getYoutubeByAccessToken = async (access_token: string) => {
    if(access_token){
        try {
            const connected = await db.youtube.findUnique({
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
            return connected;
        } catch (error) {
            return null
        }
    }
    return null
}

export const getYoutubeByUserId = async (userId: string) => {
    const connection = await db.youtube.findFirst({
        where:{
            userId
        }
    })
    return connection
}