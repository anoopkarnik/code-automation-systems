import db from './index'
import {v4 as uuidv4} from 'uuid';

export const getResetTokenByEmail = async (email: string) => {
    try{
        const token = await db.resetPasswordToken.findFirst({
            where:{email}
        });
        return token;
    }
    catch (error){
        return null;
    }
}

export const getResetTokenByToken = async (token: string) => {
    try{
        const resetToken = await db.resetPasswordToken.findUnique({
            where:{ token }
        });
        return resetToken;
    }
    catch (error){
        return null;
    }
}

export const createResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 60*60*1000)
    const existingToken = await getResetTokenByEmail(email);
    if (existingToken){
        await db.resetPasswordToken.delete({
            where:{id: existingToken.id},
        })
    }
    const resetToken = await db.resetPasswordToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return resetToken;
}