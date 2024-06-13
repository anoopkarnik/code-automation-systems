import db from './index'
import {v4 as uuidv4} from 'uuid';

export const getEmailTemplateByName = async (name: string) => {
    try{
        const emailTemplate = await db.emailTemplate.findFirst({
            where:{name}
        });
        return emailTemplate;
    }
    catch (error){
        return null;
    }
}