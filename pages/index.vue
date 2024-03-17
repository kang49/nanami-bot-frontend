<template>
    <Navbar @update:istoggle="handleToggleMenu" />

    <div class="w-screen h-screen pt-[60px] bg-[#02071A] overflow-hidden">
        <div :class="{ 'opacity-30': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="px-[20px]">
                <NuxtImg class="scale-[200%] translate-y-[170px] bg-fixed" src="/img/Nanami-Text.png"></NuxtImg>
                <div class="px-[10px] translate-y-[-80px]">
                    <h1 class="text-white text-[43px] font-bold">{{ nanami_ta_ref }}
                        <h1 class="typing-cursor">|</h1>
                    </h1>
                    <div class="h-[5px] bg-[#0099FF] transition-all duration-[1000ms]"
                        :class="{ 'w-0': !isOnMounted, 'w-[165px]': isOnMounted }"></div>
                    <h2 class="text-white text-[32px] font-bold w-[85%] transition-all duration-[1000ms] mt-[5px]"
                        :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        ดำดิ่งสู่โลกเวทย์มนต์ไปกับเรานะ 🤍</h2>
                    <div class="flex space-x-[10px] transition-all duration-[1100ms]" :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        <div
                            class="bg-[#0099FF] min-w-max w-[100px] h-max px-[10px] py-[3px] rounded-[20px] flex justify-center items-center">
                            <NuxtLink to="https://discord.com/api/oauth2/authorize?client_id=1109721426279280660&permissions=8&scope=bot%20applications.commands" target="_blank">
                                <h4 class="text-white font-normal text-[18px]">เชิญบอท</h4>
                            </NuxtLink>
                        </div>
                        <div
                            class="min-w-max w-[100px] h-max px-[10px] py-[3px] rounded-[20px] shadow-[inset_0_0_0_2px_#0099FF] flex justify-center items-center">
                            <NuxtLink to="/" target="_blank">
                                <h4 class="text-white font-normal text-[18px]">แดชบอร์ด</h4>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NuxtImg class="translate-y-[-100px] translate-x-[90px]" src="/img/Nanami_LandingPage.png"></NuxtImg>
    </div>
    <div class="w-screen h-screen pt-[60px] bg-[#DDEEEF] overflow-hidden"></div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';

//Animation Var
const nanami_ta = 'Nanami Bot';
const nanami_ta_ref = ref('');
let isOnMounted = ref(false);
const istoggleMenu = ref(false);

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = (true);
    }, 200);

    function updateNanamiTa() {
        nanami_ta_ref.value = '';
        let nanami_ta_index = 0;
        const interval = setInterval(() => {
            if (nanami_ta_index < nanami_ta.length) {
                nanami_ta_ref.value += nanami_ta[nanami_ta_index];
                nanami_ta_index++;
            } else {
                clearInterval(interval); // Stop the interval when finished
            }
        }, 100);
    }
    updateNanamiTa();
    setInterval(updateNanamiTa, 5000); //loop restart Nanami Text Animation
});

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}
</script>
