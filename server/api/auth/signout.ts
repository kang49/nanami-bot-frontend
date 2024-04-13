import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);

    if (body.usr_id) {
        try {
            const userDataDel = await prisma.webUser.update({
                where: {
                    usr_id: body.usr_id
                },
                data: {
                    usr_access_token: null,
                    usr_access_token_exp: null
                },
                select: {
                    usr_name: true,
                    usr_tag: true
                }
            });
        
            console.log(`SignOut for ${userDataDel.usr_name}#${userDataDel.usr_tag} success, SignOut`);
            return {
                status: 200
            }
        } catch {
            console.log(`SignOut failure Database not found, SignOut`);
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    }
    else {
        console.log(`Important data missing, 'SignOut`);
        return {
            status: {
                status: 204,
                error: 'Important data missing'
            }
        }
    }
});