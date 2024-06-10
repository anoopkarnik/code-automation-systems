import db from './index'
import {v4 as uuidv4} from 'uuid';

export const getVerificationTokenByEmail = async (email: string) => {
    try{
        const token = await db.verificationToken.findFirst({
            where:{email}
        });
        return token;
    }
    catch (error){
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try{
        const verificationToken = await db.verificationToken.findUnique({
            // @ts-ignore
            where:{ token }
        });
        return verificationToken;
    }
    catch (error){
        return null;
    }
}

export const createVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 60*60*1000)
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken){
        await db.verificationToken.delete({
            where:{id: existingToken.id},
        })
    }
    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verificationToken;
}