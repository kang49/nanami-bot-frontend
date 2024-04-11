export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    
    const accessToken: string = body.accessToken;
    const tokenType: string = body.tokenType;

    const apiResponse = await fetch('https://discord.com/api/users/@me', {
        method: 'GET',
        headers: {
            'Authorization': `${tokenType} ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });

    const responseData = await apiResponse.json();

    console.log(responseData)
    return {
        status: 200,
        message: 'Success',
        // data: responseData
    }
});