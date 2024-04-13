<template>
    <div class="bg-black w-full h-[calc(100dvh)]">
        <Navbar @update:istoggle="handleToggleMenu" :theme="true" />

        <div class="w-full h-[calc(100dvh)] bg-[#02071A] bg-cover bg-center overflow-hidden transition-all duration-1000"
            :class="{ 'opacity-50': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="w-full h-full flex items-center">
                <div class="w-full h-[80%]">
                    <div class=" px-[20px] 2xl:px-[50px] h-full w-full z-10 relative">
                        <h1 class="text-white text-[35px] font-bold mt-[50px] transition-all duration-[700ms] 2xl:text-[45px]"
                            :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                            Sign In
                        </h1>
                        <div class="w-full h-full flex justify-center">
                            <div class="bg-gradient-to-b from-[#0099FF]/10 from-[35%] to-white/10 w-full h-[60%] mt-[50px] rounded-[20px] transition-all duration-1000 lg:w-[50%]"
                                :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                                <div
                                    class="bg-[url('public/img/nanami_banner.webp')] bg-cover bg-center w-full h-[50%] rounded-t-[20px]">
                                </div>
                                <div
                                    class="w-full h-max flex justify-evenly items-center mt-[20px] transition-all duration-1000">
                                    <div class="w-[30%] h-[1px] bg-white/50 xl:w-[35%]"></div>
                                    <h6 class="text-white/50 text-[13px] xl:text-[16px]">Ing-F 2013B</h6>
                                    <div class="w-[30%] h-[1px] bg-white/50 xl:w-[35%]"></div>
                                </div>

                                <div class="w-full h-max flex justify-center mt-[50px]">
                                    <NuxtLink
                                        :to="discordOAuthUrl"
                                        class="w-max h-max rounded-[10px] px-[10px] py-[5px] flex justify-center items-center transition-all duration-700" :class="{ 'bg-[#dddddd]': isLoading, 'bg-[#0099FF]': !isLoading }">
                                        <i class="fab fa-discord mr-2 text-white text-[30px] 2xl:text-[34px]" :class="{ 'fa-spin': isLoading }"></i>
                                        <h4 class="text-white text-[18px] font-bold 2xl:text-[22px]">Sign-In with
                                            Discord</h4>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full h-[20%] absolute bottom-0 bg-[url('public/img/particle.webp')] bg-cover bg-center z-0">
                    </div>
                    <div class="w-full h-full absolute top-0 flex justify-center items-center transition-all duration-700" :class="{ 'z-0': !isLoading || ! isError, 'z-10': isLoading || isError }">
                        <div class="w-[200px] h-[200px] rounded-[20px] flex justify-center items-center overflow-hidden bg-white transition-all duration-700" :class="{ 'opacity-0': !isLoading || !isError, 'opacity-100': isLoading || isError }">
                            <NuxtImg v-show="isLoading && !isError" class="w-[80%]" preload src="/img/butterfly_loading.gif"></NuxtImg>
                            <div class="h-full grid place-items-center">
                                <div>
                                    <div class="w-full h-full flex justify-center">
                                        <NuxtImg v-show="isError" class="w-[60%] center" preload src="/img/error.gif"></NuxtImg>
                                    </div>
                                    <h4 class="text-center text-black text-[18px]" v-if="isError">{{ errorMsg }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

//Change pageTheme
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#02071A');
//Change Title
document.title = '(Sign-In) มาเริ่มต้นเข้าสู่โลกเวทย์มนต์กับ Nanami กัน';

//Variable set
const discordOAuthUrl: string = 'https://discord.com/oauth2/authorize?client_id=1109721426279280660&response_type=token&redirect_uri=https%3A%2F%2Fnanami.tensormik.com%2Fsignin&scope=identify+guilds+guilds.members.read';
let istoggleMenu = ref(false);
let isOnMounted = ref(false);
let signInBTN: Ref<string | undefined> = ref(discordOAuthUrl);
const discordTokenType = ref('')
const discordAccecssToken = ref('');
let isLoading = ref(false);
let isError = ref(false);
let errorMsg = ref('');
const router = useRouter();

if (Cookies.get('usr_id')) router.push('/'); //If signed-in, Exit

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
    }, 200);
});


//Discord Auth Handler
if (window.location.hash) {
    isLoading.value = true;
    signInBTN.value = undefined;
    isError.value = false;
    const hash = window.location.hash.substring(1); // Remove '#' prefix
    const params = new URLSearchParams(hash);
    discordAccecssToken.value = params.get('access_token') ?? '';
    discordTokenType.value = params.get('token_type') ?? '';

    setTimeout(async () => {
        try {
            const authResponse = await fetch('/api/auth/discord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: discordAccecssToken.value,
                    tokenType: discordTokenType.value
                })
            });
            const authData = await authResponse.json();
            
            if  (authData.status === 200) {
                if (authData.data.usr_id) {
                    //Auth Data Cookie
                    Cookies.set('usr_id', authData.data.usr_id, {expires: 7});
                    Cookies.set('usr_name', authData.data.usr_name, {expires: 7});
                    Cookies.set('usr_tag', authData.data.usr_tag, {expires: 7});
                    Cookies.set('usr_global_name', authData.data.usr_global_name, {expires: 7});
                    Cookies.set('usr_avatar', authData.data.usr_avatar, {expires: 7});

                    //Route to target page after auth success
                    isLoading.value = false;
                    signInBTN.value = discordOAuthUrl;
                    router.push('/');
                } else {
                    isError.value = true;
                    errorMsg.value = authData.message ?? 'Data not found'

                    setTimeout(() => {
                        isLoading.value = false;
                        isError.value = false;
                        signInBTN.value = discordOAuthUrl;
                    }, 3000);
                }
            } else {
                //SomeThings Down
                isError.value = true;
                errorMsg.value = authData.message

                setTimeout(() => {
                    isLoading.value = false;
                    isError.value = false;
                    signInBTN.value = discordOAuthUrl;
                }, 3000);
            }
        } catch {
            //ServerSide Down
            isError.value = true;
            errorMsg.value = 'ServerSide Down'

            setTimeout(() => {
                isLoading.value = false;
                isError.value = false;
                signInBTN.value = discordOAuthUrl;
            }, 3000);
        }
    }, 3000);
}
</script>