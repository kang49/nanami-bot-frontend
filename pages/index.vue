<template>
    <Navbar @update:istoggle="handleToggleMenu" />

    <div class="w-screen h-screen pt-[60px] bg-[#02071A] overflow-hidden">
        <div :class="{ 'opacity-30': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="px-[20px]">
                <NuxtImg class="scale-[200%] translate-y-[170px] bg-fixed lg:scale-[300%] lg:translate-y-[220px] 2xl:scale-[400%] 2xl:translate-y-[200px] 2xl:translate-x-[37vw]" src="/img/Nanami-Text.png"></NuxtImg>
                <div class="px-[10px] translate-y-[-80px] xl:translate-y-[-200px] xl:px-[30px] 2xl:px-[60px]">
                    <h1 class="text-white text-[43px] font-bold lg:text-[50px] 2xl:text-[70px]">{{ nanami_ta_ref }}
                        <h1 class="typing-cursor">|</h1>
                    </h1>
                    <div class="h-[5px] bg-[#0099FF] transition-all duration-[1000ms] lg:h-[8px]"
                        :class="{ 'w-0': !isOnMounted, 'w-[165px] lg:w-[190px] 2xl:w-[265px]': isOnMounted }"></div>
                    <h2 class="text-white text-[32px] font-bold w-[85%] transition-all duration-[1000ms] mt-[5px] lg:text-[37px] 2xl:text-[48px]"
                        :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        ดำดิ่งสู่โลกเวทย์มนต์ไปกับเรานะ 🤍</h2>
                    <div class="flex space-x-[10px] transition-all duration-[1100ms] lg:mt-[20px] lg:space-x-[20px]" :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        <div
                            class="bg-[#0099FF] min-w-max w-[100px] h-max px-[10px] py-[3px] rounded-[20px] flex justify-center items-center lg:px-[30px] lg:rounded-[30px]">
                            <NuxtLink to="https://discord.com/api/oauth2/authorize?client_id=1109721426279280660&permissions=8&scope=bot%20applications.commands" target="_blank">
                                <h4 class="text-white font-normal text-[18px] lg:text-[20px] 2xl:text-[25px]">เชิญบอท</h4>
                            </NuxtLink>
                        </div>
                        <div
                            class="min-w-max w-[100px] h-max px-[10px] py-[3px] rounded-[20px] shadow-[inset_0_0_0_2px_#0099FF] flex justify-center items-center lg:px-[30px] lg:rounded-[30px]">
                            <NuxtLink to="/" target="_blank">
                                <h4 class="text-white font-normal text-[18px] lg:text-[20px] 2xl:text-[25px]">แดชบอร์ด</h4>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NuxtImg :class="{ 'translate-x-[500px] md:translate-x-[900px] lg:translate-x-[1400px] xl:translate-x-[1600px] 2xl:translate-x-[3000px] opacity-0': !isOnMounted, 'translate-x-[80px] opacity-1': isOnMounted }" class="transition-all duration-[1000ms] translate-y-[-100px] sm:translate-x-[320px] md:translate-x-[440px] md:scale-[130%] lg:scale-[130%] lg:translate-x-[650px] lg:translate-y-[-250px] xl:scale-[170%] xl:translate-y-[-300px] xl:translate-x-[1030px] 2xl:translate-x-[1100px]" src="/img/Nanami_LandingPage.png"></NuxtImg>
    </div>
    <div class="w-screen h-screen pt-[60px] bg-[#DDEEEF] overflow-hidden"></div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';

//Animation Variables
const nanami_ta = ['Nanami Bot', 'บอทนานามิ', 'なな美ボット'];
const nanami_ta_ref = ref('');
let isOnMounted = ref(false);
const istoggleMenu = ref(false);

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
    }, 200);

    let nanami_ta_char_index = 0; // Added to keep track of which string to display
    let isUpdateNanamiTa = false;
    function updateNanamiTa() {
        if (isUpdateNanamiTa) return; //if duplicate interval process then return
        isUpdateNanamiTa = true;

        nanami_ta_ref.value = '';
        let charIndex = 0; // Reset character index for new string
        const interval = setInterval(() => {
            if (charIndex < nanami_ta[nanami_ta_char_index].length) {
                nanami_ta_ref.value += nanami_ta[nanami_ta_char_index][charIndex];
                charIndex++;
            } else {
                clearInterval(interval); // Stop the interval when finished
                // Toggle between 0 and 1 to switch between the two strings for the next cycle
                nanami_ta_char_index = (nanami_ta_char_index + 1) % nanami_ta.length;
                isUpdateNanamiTa = false;
            }
        }, 100);
    }

    updateNanamiTa();
    setInterval(updateNanamiTa, 5000); // Loop to restart Nanami text animation
});

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}
</script>
