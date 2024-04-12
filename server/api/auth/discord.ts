import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function UpdateAccessTime(usr_id: string, now: Date) {
    await prisma.webUser.update({
        where: {
            usr_id: usr_id
        },
        data: {
            usr_latest_access: now
        }
    })
}

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);
    const now = new Date();


    const accessToken: string = body.accessToken;
    const tokenType: string = body.tokenType;

    try {
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                'Authorization': `${tokenType} ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });

        const userData = await userResponse.json();
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
                    usr_latest_login: now,
                    usr_latest_access: now
                },
                create: {
                    usr_id: userData.id,
                    usr_name: userData.username,
                    usr_tag: userData.discriminator,
                    usr_global_name: userData.global_name,
                    usr_avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=1024`,
                    usr_access_token: `${accessToken}`,
                    usr_access_token_exp: accessTokenExpDate,
                    usr_latest_login: now,
                    usr_latest_access: now
                }
            })
        } catch {
            return {
                status: 404,
                message: 'Database not found'
            }
        }
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
    } catch {
        //Discord API Down Case
        return {
            status: 404,
            message: 'Discord API not found'
        }
    }
});