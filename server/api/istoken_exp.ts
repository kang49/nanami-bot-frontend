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
                    ses_access_token_exp: true
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
                // Handle case where expiration date is missing or invalid
                DelSessionInDB(body.usr_id, headers['user-agent'] ?? null, ip);
                return {
                    status: 200,
                    token: 'exp'
                }
            }

        } catch (e) { //Handle database disconnect case
            return {
                status: 200,
                token: 'exp'
            }
        }
    }
});