import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function DelSessionInDB(usr_id: string, usr_agent: string | null, usr_ip: string | null) {
    await prisma.webUser_Session.updateMany({
        where: {
            usr_id_ses: usr_id,
            ses_agent: usr_agent,
            ses_ip_address: usr_ip
        },
        data: {
            ses_access_token: null,
            ses_access_token_exp: null
        }
    })
}

async function UpdateAccessTime(usr_id: string, usr_agent: string | null, usr_ip: string | null, now: Date) {
    await prisma.webUser_Session.updateMany({
        where: {
            usr_id_ses: usr_id,
            ses_agent: usr_agent,
            ses_ip_address: usr_ip
        },
        data: {
            ses_latest_access: now
        }
    })
}

export default defineEventHandler(async (event) => {
    //Variable setup
    const now: Date = new Date();
    const body = await readBody(event);
    const headers = event.node.req.headers;
    const forwardedIps = headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedIps) ? forwardedIps[0] : forwardedIps ?? null;

    if (body.usr_id) {
        try {
            const sessionRes = await prisma.webUser_Session.findFirst({
                where: {
                    usr_id_ses: body.usr_id,
                    ses_agent: headers['user-agent'],
                    ses_ip_address: ip,
                    ses_access_token: {
                        not: null
                    }
                },
                select: {
                    ses_access_token: true,
                    ses_access_token_exp: true,
                    ses_ip_address: true,
                    ses_token_type: true
                }
            });
            if (sessionRes && sessionRes.ses_access_token_exp) {
                const expDate = new Date(sessionRes.ses_access_token_exp);

                // Check if the token expiration date is greater than or equal to now
                if (expDate.getTime() >= now.getTime()) {
                    UpdateAccessTime(body.usr_id, headers['user-agent'] ?? null, ip, now);
                    return {
                        status: 200,
                        token: 'ok'
                    }
                } else {
                    DelSessionInDB(body.usr_id, headers['user-agent'] ?? null, ip);
                    return {
                        status: 200,
                        token: 'exp'
                    }
                }
            } else {
                // Handle case where expiration date is missing
                console.error(`CheckExp failure because data not found from ${body.usr_name}#${body.usr_tag} Agent: ${headers['user-agent']}, IP: ${ip}`)
                if (sessionRes?.ses_ip_address !== ip) { //if ip adress has change, save new session but still session
                    try {
                        const sessionRes = await prisma.webUser_Session.findFirst({
                            where: {
                                usr_id_ses: body.usr_id,
                                ses_agent: headers['user-agent'],
                                ses_access_token: {
                                    not: null
                                }
                            },
                            select: {
                                ses_access_token: true,
                                ses_access_token_exp: true,
                                ses_ip_address: true,
                                ses_token_type: true
                            }
                        });

                        await prisma.webUser_Session.create({
                            data: {
                                usr_id_ses: body.usr_id,
                                ses_agent: headers['user-agent'],
                                ses_ip_address: ip,
                                ses_token_type: sessionRes?.ses_token_type,
                                ses_access_token: sessionRes?.ses_access_token,
                                ses_access_token_exp: sessionRes?.ses_access_token_exp,
                                ses_latest_login: now,
                                ses_latest_access: now
                            }
                        });
                        console.log(`New IP Adress detected, add to a new session success for ${body.usr_name}#${body.usr_tag}`)
                        return {
                            status: 200,
                            token: 'ok'
                        }
                    } catch {}
                } else {
                    return {
                        status: 200,
                        token: 'exp'
                    }
                }
            }

        } catch (e) { //Handle database disconnect case)
            console.error(`CheckExp failure because Database disconnect from ${body.usr_name}#${body.usr_tag} Agent: ${headers['user-agent']}, IP: ${ip}`)
            return {
                status: 200,
                token: 'ok'
            }
        }
    }
});