import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);

    if (body.usr_id) {
        try {
            await prisma.webUser_card_color.upsert({
                where: {
                    usr_id_cl: body.usr_id
                },
                update: {
                    cl_main_color: body.main_color,
                    cl_sec_color: body.sec_color,
                    cl_profile_ring_color: body.profile_ring_color
                },
                create: {
                    usr_id_cl: body.usr_id,
                    cl_main_color: body.main_color,
                    cl_sec_color: body.sec_color,
                    cl_profile_ring_color: body.profile_ring_color
                }
            });
            await prisma.cl_badges_color.upsert({
                where: {
                    usr_id_bc: body.usr_id
                },
                update: {
                    bc_red: body.badges_color.r,
                    bc_green: body.badges_color.g,
                    bc_blue: body.badges_color.b
                },
                create: {
                    usr_id_bc: body.usr_id,
                    bc_red: body.badges_color.r,
                    bc_green: body.badges_color.g,
                    bc_blue: body.badges_color.b
                }
            })
            console.log(`${body.usr_name}#${body.usr_tag}'s profile color updated, ProfileColor API`);
            return {
                status: 200,
                message: 'Profile color updated'
            }
        } catch {
            console.error('Database not found, ProfileColor API')
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    } else {
        console.error('Important data missing, ProfileColor API')
        return {
            status: 204,
            error: 'Important data missing'
        }
    }
});