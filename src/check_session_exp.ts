import { defineNuxtPlugin } from '#app'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

function SignOut() {
    Cookies.remove('usr_id');
    Cookies.remove('usr_name');
    Cookies.remove('usr_tag');
    Cookies.remove('usr_global_name');
    Cookies.remove('usr_avatar');
}

export default defineNuxtPlugin(async () => {
    const router = useRouter();

    if (Cookies.get('usr_id')) {
        try {
            const checkTokenRes = await fetch('/api/istoken_exp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usr_id: Cookies.get('usr_id'),
                    usr_name: Cookies.get('usr_name'),
                    usr_tag: Cookies.get('usr_tag')
                })
            });
            const checkTokenData = await checkTokenRes.json();

            if (checkTokenData.status === 200) {
                if (checkTokenData.token === 'ok') {
                    //Nothing to do
                } else if (checkTokenData.token === 'exp') {
                    //Delete all auth cookies
                    SignOut();
                    router.push('/')
                }
            } else {
                //Delete all auth cookies
                SignOut();
                router.push('/')
            }
        } catch {
            //Delete all auth cookies
            SignOut();
            router.push('/')
        }
    }
});