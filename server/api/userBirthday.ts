import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);

    if (body.usr_id) {
        try {
            await prisma.webUser.update({
                where: {
                    usr_id: body.usr_id
                },
                data: {
                    usr_birthday: body.usr_birthday
                }
            })
            console.log(`${body.usr_name}#${body.usr_tag}'s birthday updated, UserBirthDay API`);
            return {
                status: 200,
                message: 'Birthday updated'
            }
        } catch (e) {
            console.error('Database not found, UserBirthDay API', e)
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    } else {
        console.error('Important data missing, UserBirthDay API')
        return {
            status: 204,
            error: 'Important data missing'
        }
    }
});