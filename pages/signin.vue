<template>
    <div class="bg-black w-full h-[calc(100dvh)]">
        <Navbar @update:istoggle="handleToggleMenu" :theme="true" />

        <div class="w-full h-[calc(100dvh)] bg-[#02071A] bg-cover bg-center overflow-hidden transition-all duration-1000"
            :class="{ 'opacity-50': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="w-full h-full flex items-center">
                <div class="w-full h-[80%]">
                    <div class=" px-[20px] 2xl:px-[50px] h-full w-full">
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
                                        to="https://discord.com/oauth2/authorize?client_id=1109721426279280660&response_type=token&redirect_uri=https%3A%2F%2Ffx37504q-3000.asse.devtunnels.ms%2Fsignin&scope=identify"
                                        class="w-max h-max bg-[#0099FF] rounded-[10px] px-[10px] py-[5px] flex justify-center items-center">
                                        <i class="fab fa-discord mr-2 text-white text-[30px] 2xl:text-[34px]"></i>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

//Change pageTheme
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#02071A');
//Change Title
document.title = '(Sign-In) มาเริ่มต้นเข้าสู่โลกเวทย์มนต์กับ Nanami กัน';

//Variable set
let istoggleMenu = ref(false);
let isOnMounted = ref(false);
const discordTokenType = ref('')
const discordAccecssToken = ref('');


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
    const hash = window.location.hash.substring(1); // Remove '#' prefix
    const params = new URLSearchParams(hash);
    discordAccecssToken.value = params.get('access_token') ?? '';
    discordTokenType.value = params.get('token_type') ?? '';

    await fetch('/api/auth/discord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accessToken: discordAccecssToken.value,
            tokenType: discordTokenType.value
        })
    });
}
</script>