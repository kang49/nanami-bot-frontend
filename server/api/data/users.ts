import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    function decodeFlags(flags: number): string[] {
        const badges = {
            "Staff": flags & 1, // 1 << 0
            "Partner": flags & 2, // 1 << 1
            "Hypesquad": flags & 4, // 1 << 2
            "Bug Hunter Level 1": flags & 8, // 1 << 3
            "MFASMS": flags & 16, // 1 << 4
            "Premium Promo Dismissed": flags & 32, // 1 << 5
            "HypeSquad Online House 1": flags & 64, // 1 << 6
            "HypeSquad Online House 2": flags & 128, // 1 << 7
            "HypeSquad Online House 3": flags & 256, // 1 << 8
            "Premium Early Supporter": flags & 512, // 1 << 9
            "Team Pseudo User": flags & 1024, // 1 << 10
            "Has Unread Urgent Messages": flags & 8192, // 1 << 13
            "Bug Hunter Level 2": flags & 16384, // 1 << 14
            "Disable Premium": flags & 2097152, // 1 << 21
            "Spammer": flags & 1048576, // 1 << 20
            "Verified Bot": flags & 65536, // 1 << 16
            "Verified Developer": flags & 131072, // 1 << 17
            "Certified Moderator": flags & 262144, // 1 << 18
            "Bot HTTP Interactions": flags & 524288, // 1 << 19
            "Active Developer": flags & 4194304, // 1 << 22
            "Collaborator": flags & 1125899906842624, // 1 << 50 (requires bigint)
            "Restricted Collaborator": flags & 2251799813685248, // 1 << 51 (requires bigint)
            "Quarantined": flags & 17592186044416 // 1 << 44 (requires bigint)
        };
        return Object.entries(badges).filter(([_, hasBadge]) => hasBadge).map(([name, _]) => name);
    }

    // Variable setup
    const body = await readBody(event);
    const headers = event.node.req.headers;
    const forwardedIps = headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedIps) ? forwardedIps[0] : forwardedIps ?? null;

    if (body.usr_id) {
        try {
            const userDataDB = await prisma.webUser.findFirst({
                where: { usr_id: body.usr_id },
                select: {
                    webUser_Session: {
                        where: {
                            usr_id_ses: body.usr_id,
                            ses_agent: headers['user-agent'],
                            ses_ip_address: ip,
                            ses_token_type: { not: null },
                            ses_access_token: { not: null },
                            ses_access_token_exp: { not: null }
                        },
                        select: {
                            ses_token_type: true,
                            ses_access_token: true
                        }
                    },
                    usr_name: true,
                    usr_global_name: true,
                    usr_avatar: true,
                    usr_banner: true,
                    usr_tag: true,
                    usr_birthday: true,
                    webUser_card_color: {
                        where: {
                            usr_id_cl: body.usr_id
                        },
                        select: {
                            cl_main_color: true,
                            cl_sec_color: true,
                            cl_profile_ring_color: true,
                            cl_badges_color: {
                                where: {
                                    usr_id_bc: body.usr_id
                                },
                                select: {
                                    bc_red: true,
                                    bc_green: true,
                                    bc_blue: true
                                }
                            }
                        }
                    }
                },
            });
            if (userDataDB && userDataDB.webUser_Session.length > 0) {
                try {
                    const userRes = await fetch('https://discord.com/api/users/@me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `${userDataDB.webUser_Session[0].ses_token_type} ${userDataDB.webUser_Session[0].ses_access_token}`,
                            'Content-Type': 'application/json'
                        },
                    });
                    const userData = await userRes.json();

                    if (userData) {
                        const flagsList = decodeFlags(userData.public_flags);
                        if (userData.banner) flagsList.push('Nitro');

                        //Delete Token from data
                        userDataDB.webUser_Session[0].ses_access_token = 'หนูไม่ให้ Token หรอกนะคะ แบร่ 🤪';

                        console.log(`Get ${body.usr_name}#${body.usr_tag}'s data success, UsersData API`);
                        return {
                            status: 200,
                            message: 'Get user data success',
                            data_db: userDataDB,
                            badges: flagsList
                        }
                    }
                } catch {
                    console.error('Discord API not found, UsersData API')
                    return {
                        status: 404,
                        error: 'Discord API not found'
                    }
                }
            } else {
                console.error(`Data not found ${body.usr_name}#${body.usr_tag}, UsersData API`)
                return {
                    status: 404,
                    error: 'Data not found'
                }
            }
        } catch {
            console.error('Database not found, UsersData API')
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    } else {
        console.error('Important data missing, UsersData API')
        return {
            status: 204,
            error: 'Important data missing'
        }
    }
});