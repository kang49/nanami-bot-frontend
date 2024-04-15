import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Define the Guild interface
    interface Guild {
        id: string;
        name: string;
        icon: string;
        permissions: number; // Using number to store permissions bit field
    }

    // Example function to filter guilds by permissions and extract relevant data
    function filterGuildsByPermissions(guilds: Guild[]): Guild[] {
        const ADMIN_PERMISSION_BIT = 0x8;  // Administrator permissions bit
        return guilds.filter(guild => (guild.permissions & ADMIN_PERMISSION_BIT) !== 0)
            .map(guild => ({
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                permissions: guild.permissions  // Keeping permissions in the result
            }));
    }

    //Variable set
    const body = await readBody(event);
    const headers = event.node.req.headers;

    if (body.usr_id) {
        try {
            const tokenData = await prisma.webUser_Session.findFirst({
                where: {
                    usr_id_ses: body.usr_id,
                    ses_agent: headers['user-agent'],
                    ses_access_token: {
                        not: null
                    },
                    ses_token_type: {
                        not: null
                    }
                },
                select: {
                    ses_token_type: true,
                    ses_access_token: true
                }
            });

            if (tokenData) {
                try {
                    const guildDataRes = await fetch('https://discord.com/api/users/@me/guilds', {
                        method: 'GET',
                        headers: {
                            'Authorization': `${tokenData.ses_token_type} ${tokenData.ses_access_token}`,
                            'Content-Type': 'application/json'
                        },
                    });
                    const guildData = await guildDataRes.json();
                    const highPermissionGuilds = filterGuildsByPermissions(guildData);
                    if (highPermissionGuilds.length > 1) {
                        console.log(`Get guilds data by ${body.usr_name}#${body.usr_tag} success, GuildData API`)
                        return {
                            status: 200,
                            message: 'Get guilds data success',
                            data: highPermissionGuilds
                        }
                    }
                }
                catch {
                    console.error('Discord API not found, GuildData API')
                    return {
                        status: 404,
                        error: 'Discord API not found'
                    }
                }
            } else {
                console.error(`Auth data not found ${body.usr_name}#${body.usr_tag}, GuildData API`)
                return {
                    status: 204,
                    error: 'Auth data not found'
                }
            }
        } catch {
            console.error('Database not found, GuildData API')
            return {
                status: 404,
                error: 'Database not found'
            }
        }
    } else {
        console.error('Important data missing, GuildData API')
        return {
            status: 204,
            error: 'Important data missing'
        }
    }
});