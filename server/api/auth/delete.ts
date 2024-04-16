import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);
    
    if (body.usr_id) {
        try {
            //All table is have user data

            const deletedUser = await prisma.$transaction([
                prisma.webUser_Session.deleteMany({
                  where: {
                    usr_id_ses: body.user_id
                  },
                }),
                prisma.cl_badges_color.deleteMany({
                    where: {
                        usr_id_bc: body.usr_id
                    }
                }),
                prisma.webUser_card_color.deleteMany({
                  where: {
                    usr_id_cl: body.user_id
                  },
                }),
                prisma.webUser.deleteMany({
                    where: {
                      usr_id: body.user_id
                    },
                })
            ]);
        
            
            console.log(`Delete user for ${body.usr_name}#${body.usr_tag} success, DeleteUser API`);
            return {
                status: 200,
                message: 'Delete user success'
            }
        } catch (e) {
            console.log(e)
            console.error(`Delete failure Database not found, DeleteUser API`);
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    }
    else {
        console.error(`Important data missing, DeleteUser API`);
        return {
            status: {
                status: 204,
                error: 'Important data missing'
            }
        }
    }
});