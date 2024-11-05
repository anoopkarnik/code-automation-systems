export const getAllModels = async (token:any) => {
    try{
        const response = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data
    }
    catch(err){
        console.log(err)
    }
}