import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);
    const headers = event.node.req.headers;
    const forwardedIps = headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedIps) ? forwardedIps[0] : forwardedIps ?? null;

    if (body.usr_id) {
        try {
            await prisma.webUser_Session.deleteMany({
                where: {
                    usr_id_ses: body.usr_id,
                    ses_agent: headers['user-agent'],
                    ses_ip_address: ip
                }
            });
        
            console.log(`SignOut for ${body.usr_name}#${body.usr_tag} from IP: ${ip} success, SignOut`);
            return {
                status: 200
            }
        } catch {
            console.error(`SignOut failure Database not found, SignOut`);
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    }
    else {
        console.error(`Important data missing, 'SignOut`);
        return {
            status: {
                status: 204,
                error: 'Important data missing'
            }
        }
    }
});