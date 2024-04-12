import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function DelTokenInDB(usr_id: string) {
    await prisma.webUser.update({
        where: {
            usr_id: usr_id
        },
        data: {
            usr_access_token: null,
            usr_access_token_exp: null
        }
    })
}

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
    //Variable setup
    const now: Date = new Date();
    const body = await readBody(event);

    if (body.usr_id) {
        try {
            const userRes = await prisma.webUser.findFirst({
                where: {
                    usr_id: body.usr_id,
                    usr_access_token: {
                        not: null
                    }
                },
                select: {
                    usr_access_token: true,
                    usr_access_token_exp: true
                }
            });
            if (userRes && userRes.usr_access_token_exp) {
                const expDate = new Date(userRes.usr_access_token_exp);

                // Check if the token expiration date is greater than or equal to now
                if (expDate.getTime() >= now.getTime()) {
                    UpdateAccessTime(body.usr_id, now);
                    return {
                        status: 200,
                        token: 'ok'
                    }
                } else {
                    DelTokenInDB(body.usr_id);
                    return {
                        status: 200,
                        token: 'exp'
                    }
                }
            } else {
                // Handle case where expiration date is missing or invalid
                DelTokenInDB(body.usr_id);
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