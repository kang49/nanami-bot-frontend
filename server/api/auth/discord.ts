import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);
    const headers = event.node.req.headers;
    const forwardedIps = headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedIps) ? forwardedIps[0] : forwardedIps ?? null;
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
                    usr_avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=1024`
                },
                create: {
                    usr_id: userData.id,
                    usr_name: userData.username,
                    usr_tag: userData.discriminator,
                    usr_global_name: userData.global_name,
                    usr_avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=1024`
                }
            });
            const updateResult = await prisma.webUser_Session.updateMany({
                where: {
                    usr_id_ses: userData.id,
                    ses_agent: headers['user-agent'],
                    ses_ip_address: ip
                },
                data: {
                    ses_token_type: tokenType,
                    ses_access_token: accessToken,
                    ses_access_token_exp: accessTokenExpDate,
                    ses_latest_login: now,
                    ses_latest_access: now
                }
            });
        
            // Check if any records were updated
            if (updateResult.count === 0) {
                // No records updated, so create a new session
                await prisma.webUser_Session.create({
                    data: {
                        usr_id_ses: userData.id,
                        ses_agent: headers['user-agent'],
                        ses_ip_address: ip,
                        ses_token_type: tokenType,
                        ses_access_token: accessToken,
                        ses_access_token_exp: accessTokenExpDate,
                        ses_latest_login: now,
                        ses_latest_access: now
                    }
                });
            }

            console.log(`SignIn for ${userData.username}#${userData.discriminator} from IP: ${ip} success, Discord SignIn`)
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
        } catch (e) {
            console.error(`Database not found, Discord SignIn`)
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    } catch {
        //Discord API Down Case
        console.error(`Can't connecting to DiscordAPI, Discord SignIn`)
        return {
            status: 404,
            error: 'Discord API not found'
        }
    }
});