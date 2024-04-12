import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);


    const accessToken: string = body.accessToken;
    const tokenType: string = body.tokenType;

    const userResponse = await fetch('https://discord.com/api/users/@me', {
        method: 'GET',
        headers: {
            'Authorization': `${tokenType} ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });

    const userData = await userResponse.json();
    const now = new Date();
    const accessTokenExpDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);  // 7 days
    try {
        await prisma.webUser.upsert({
            where: {
                usr_id: userData.id
            },
            update: {
                usr_name: userData.username,
                usr_tag: userData.discriminator,
                usr_global_name: userData.global_name,
                usr_avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=1024`,
                usr_access_token: `${accessToken}`,
                usr_access_token_exp: accessTokenExpDate,
                usr_latest_login: now
            },
            create: {
                usr_id: userData.id,
                usr_name: userData.username,
                usr_tag: userData.discriminator,
                usr_global_name: userData.global_name,
                usr_avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=1024`,
                usr_access_token: `${accessToken}`,
                usr_access_token_exp: accessTokenExpDate,
                usr_latest_login: now
            }
        })
    } catch {
        return {
            status: 404,
            message: 'Database not found'
        }
    }
    console.log(userData)
    return {
        status: 200,
        message: 'Success',
        data: {
            usr_id: userData.id,
            usr_name: userData.username,
            usr_tag: userData.discriminator,
            usr_global_name: userData.global_name,
            usr_avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=1024`
        }
    }
});