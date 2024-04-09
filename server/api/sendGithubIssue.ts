import { Octokit } from "@octokit/core";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    
    let rawData = '';
    event.req.on('data', chunk => {
        rawData += chunk;
    });
    await new Promise(resolve => event.req.on('end', resolve));

    let body;
    let images_list: string[] = [];
    try {
        body = JSON.parse(rawData);

        //save images
        if (body.images) {
            type ImgurResponse = {
                data: {
                    link: string;
                };
                success: boolean;
                status: number;
            };
            
            const uploadImageToImgur = async (imageBase64: string): Promise<ImgurResponse | null> => {
                const url = 'https://api.imgur.com/3/image';
                const method = 'POST';
                const headers = {
                    'Authorization': `Client-ID ${config.IMGUR_CLIEND_ID}`,
                    'Content-Type': 'application/json',
                };
                const body = JSON.stringify({
                    image: imageBase64.split(',')[1], // Remove the Base64 image type prefix if present
                    type: 'base64'
                });
            
                try {
                    const response = await fetch(url, { method, headers, body });
                    if (!response.ok) throw new Error('Failed to upload image to Imgur');
                    return response.json() as Promise<ImgurResponse>;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return null;
                }
            };
            
            const uploadImages = async (images: string[]) => {
                const uploadPromises = images.map(uploadImageToImgur);
                const results = await Promise.all(uploadPromises);
                results.forEach((result, index) => {
                    if (result && result.success) {
                        console.log(`Image ${index + 1} uploaded successfully: ${result.data.link}`);
                        images_list.push(result.data.link);
                    } else {
                        console.log(`Image ${index + 1} failed to upload.`);
                    }
                });
            };
            
            await uploadImages(body.images);
        }
        if (!body.title || !body.description || !body.date) return {error: 'Important data missing', status: 204}
        const date_format = body.date.toLocaleString('en-US', {
            timeZone: 'UTC', // Specify the desired time zone
            day: '2-digit', // Display day as two digits
            month: '2-digit', // Display month as two digits
            year: 'numeric', // Display year as four digits
            hour: '2-digit', // Display hour as two digits
            minute: '2-digit', // Display minute as two digits
            hour12: false // Use 24-hour format
          });

        const octokit = new Octokit({
            auth: config.GITHUBKEY
        });

        async function createIssue(owner: string, repo: string, title: string, body: string, labels: string[]) {
            await octokit.request('POST /repos/{owner}/{repo}/issues', {
                owner: owner,
                repo: repo,
                title: title,
                body: body,
                state: 'open',
                labels: labels,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'accept': 'application/vnd.github+json'
                }
            });
        }
        await createIssue(
            'kang49',
            'nanami-discord-bot',
            `(FromWeb): ${body.title}`,
            `## Description 📝\n${body.description}\n\n## Images 🏞️\n${images_list.map(url => `<img src="${url}" width="300" style="margin: 10px 0;" />`).join('\n')}\n\n## Details\n- **UTC Time 🕘**: ${date_format}\n- **Contact 🌐**: ${body.contact}\n\n*This issue was automatically created from user on a Nanami web submission.*`,
            [body.labels]
          );          
        console.log('Issue Uploaded')
        return {
            status: 200, message: 'Success'
        }

    } catch { }
})