export const webhook = async (url:string, body:any, headers:any, method: any ) => {
    try {
        let res;
        if (method === 'GET' || method === 'DELETE') {
            res = await fetch(url, {
                method: method,
                headers: headers,
            })
        }
        else {
            res = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            })
        }
        if (!res.ok) {
            return {log: res};
        }
        const result = await res.json();
        return {result: result, log: `${method} Request Successful`};
    }
    catch (error) {
        return {log: error};
    }
}