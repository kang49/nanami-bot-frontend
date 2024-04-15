import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    //Variable set
    const body = await readBody(event);
    const config = useRuntimeConfig();

    if (body.usr_id && body.banner_image) {
        try {
            const uploadImageRes = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Client-ID ${config.IMGUR_CLIEND_ID}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: body.banner_image.split(',')[1], // Remove the Base64 image type prefix if present
                    type: 'base64'
                })
            });
            const uploadImageData = await uploadImageRes.json();
            if (uploadImageData.data.link) {
                try {
                    const bannerDataDB =  await prisma.webUser.update({
                        where: {
                            usr_id: body.usr_id
                        },
                        data: {
                            usr_banner: uploadImageData.data.link
                        },
                        select: {
                            usr_banner: true
                        }
                    });
                    console.log(`Update ${body.usr_name}#${body.usr_tag}'s profile banner success, ProfileBanner API`)
                    //If want to return image
                    if (body.return_url === true || body.return_url === 'true') {
                        return {
                            status: 200,
                            message: 'Update profile banner success',
                            banner_url: bannerDataDB.usr_banner
                        }
                    } else {
                        return {
                            status: 200,
                            message: 'Update profile banner success'
                        }
                    }
                } catch (e) {
                    console.error('Database not found', e)
                    return {
                        status: 404,
                        error: 'Database not found'
                    }
                }
            } else {
                console.error('Image url no return, ProfileBanner API')
                return {
                    status: 204,
                    error: 'Image url no return'
                }
            }
        } catch (e) {
            console.error('Image Uploader API not found, ProfileBanner API')
            console.error(e)
            return {
                status: 404,
                error: 'Image Uploader API not found'
            }
        }
    } else {
        console.error('Important data missing, ProfileBanner API')
        return {
            status: 204,
            error: 'Important data missing'
        }
    }
});