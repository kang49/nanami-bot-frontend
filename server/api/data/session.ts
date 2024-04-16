import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);
    
    if (body.usr_id) {
        try {
            const sessionData = await prisma.webUser_Session.findMany({
                where: {
                    usr_id_ses: body.usr_id
                },
                select: {
                    ses_agent: true,
                    ses_ip_address: true,
                    ses_access_token_exp: true,
                    ses_latest_login: true
                }
            });
            return {
                status: 200,
                data: sessionData
            }
        } catch {
            console.error(`Database not found, Session API`);
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    }
    else {
        console.error(`Important data missing, 'Session API`);
        return {
            status: {
                status: 204,
                error: 'Important data missing'
            }
        }
    }
});