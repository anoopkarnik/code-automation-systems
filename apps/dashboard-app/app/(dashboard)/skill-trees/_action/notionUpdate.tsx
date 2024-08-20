import { modifyNotionPageAction } from "../../../../actions/notion/notion";

export const calculateAndUpdateNextRevisionDate = async (page:any, apiToken:any) =>{
    const baseInterval = 1; // Base interval in days
    const difficultyFactor = 2 - (page['Difficulty'] / 5); // Difficulty affects interval (1.2x for difficulty 1, 2x for difficulty 5)
    const selfGradeFactor = (page['Self Grade']) / 10; // Higher self-assessment increases interval
    const repetitionFactor = Math.pow(2, page['Repetitions']); // Doubles the interval after each revision
    
    const interval = baseInterval * difficultyFactor * selfGradeFactor * repetitionFactor;
    const nextRevisionDate = new Date();
    nextRevisionDate.setDate(nextRevisionDate.getDate() + Math.ceil(interval));
    await updateNotionPage(page.id, nextRevisionDate, apiToken, page['Repetitions']);
    return ;
}

export const updateNotionPage = async(pageId:any, nextRevisionDate:any, apiToken:any,repetitions:any) => {

    const properties = [
        {name:'Review Date', type:'date', value: nextRevisionDate.toISOString()},
        {name:'Repetitions', type:'number', value: repetitions+1},
        {name:'Last Reviewed', type:'date', value: new Date().toISOString()}
    ]
    const response = await modifyNotionPageAction({apiToken, pageId, properties})
    return response;
}