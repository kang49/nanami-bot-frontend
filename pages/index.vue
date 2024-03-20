<template>
    <Navbar @update:istoggle="handleToggleMenu" @update:scroll_value="handleScrollValue" />

    <div
        class="w-full h-[calc(100dvh)] pt-[60px] bg-[#02071A] overflow-hidden relative transition-all duration-[1000ms]">
        <div :class="{ 'opacity-30': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="px-[20px]">
                <NuxtImg
                    class="scale-[200%] translate-y-[170px] bg-fixed xl:scale-[300%] xl:translate-y-[170px] xl:translate-x-[30vw] 2xl:scale-[230%] 2xl:translate-y-[130px]"
                    src="/img/Nanami-Text.webp"></NuxtImg>
                <div
                    class="px-[10px] relative z-20 translate-y-[-80px] lg:translate-y-[-150px] xl:translate-y-[-200px] xl:px-[30px] 2xl:px-[50px] 2xl:translate-y-[-400px]">
                    <h1 class="text-white text-[43px] font-bold lg:text-[50px] 2xl:text-[70px]">{{ nanami_ta_ref }}
                        <h1 class="typing-cursor">|</h1>
                    </h1>
                    <div class="h-[5px] bg-[#0099FF] transition-all duration-[1000ms] lg:h-[8px]"
                        :class="{ 'w-0': !isOnMounted, 'w-[165px] lg:w-[190px] 2xl:w-[265px]': isOnMounted }"></div>
                    <h2 class="text-white text-[32px] font-bold w-[85%] transition-all duration-[1000ms] mt-[5px] lg:text-[37px] 2xl:text-[48px]"
                        :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        ดำดิ่งสู่โลกเวทย์มนต์ไปกับเรานะ 🤍</h2>
                    <div class="flex space-x-[10px] transition-all duration-[1100ms] lg:mt-[20px] lg:space-x-[20px]"
                        :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        <div
                            class="bg-[#0099FF] min-w-max w-[100px] h-max px-[10px] py-[3px] rounded-[20px] flex justify-center items-center lg:px-[30px] lg:rounded-[30px]">
                            <NuxtLink
                                to="https://discord.com/api/oauth2/authorize?client_id=1109721426279280660&permissions=8&scope=bot%20applications.commands"
                                target="_blank">
                                <h4 class="text-white font-normal text-[18px] lg:text-[20px] 2xl:text-[25px]">เชิญบอท
                                </h4>
                            </NuxtLink>
                        </div>
                        <div
                            class="min-w-max w-[100px] h-max px-[10px] py-[3px] rounded-[20px] shadow-[inset_0_0_0_2px_#0099FF] flex justify-center items-center lg:px-[30px] lg:rounded-[30px]">
                            <NuxtLink to="/" target="_blank">
                                <h4 class="text-white font-normal text-[18px] lg:text-[20px] 2xl:text-[25px]">แดชบอร์ด
                                </h4>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <NuxtImg
                :class="{ 'translate-x-[500px] md:translate-x-[900px] lg:translate-x-[1400px] xl:translate-x-[1600px] 2xl:translate-x-[3000px] opacity-0': !isOnMounted, 'translate-x-[0] opacity-1': isOnMounted }"
                class="absolute z-10 transition-all duration-[1000ms] right-[-70px] bottom-[0px] scale-[80%] md:scale-[70%] md:right-[-140px] md:bottom-[0px] lg:scale-[80%] lg:right-[-200px] lg:bottom-[-60px] xl:scale-[55%] xl:bottom-[-200px] xl:right-[-400px] 2xl:scale-[50%] 2xl:right-[-600px] 2xl:bottom-[-500px]"
                src="/img/Nanami_LandingPage.webp"></NuxtImg>
        </div>
    </div>
    <div
        class="w-screen h-[calc(100dvh)] pt-[60px] bg-[#DDEEEF] overflow-hidden transition-all duration-[1000ms] lg:pt-[100px] xl:pt-[100px]">
        <div :class="{ 'opacity-30': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="px-[20px] 2xl:px-[70px] relative">
                <h2 class="font-bold text-[24px] transition-all duration-[800ms] md:text-[29px] lg:text-[33px] 2xl:text-[40px]"
                    :class="{ 'translate-y-[200px] opacity-0': !scrollStates.State114, 'translate-y-0 opacity-1': scrollStates.State114 }">
                    Bot Status</h2>
                <div class="h-max w-full xl:flex justify-between">
                    <div class="grid grid-rows-2 gap-2 pt-[20px] lg:gap-7 lg:pt-[40px] xl:gap-0 xl:w-[40%]">
                        <div class="flex justify-start items-center w-[80%] space-x-[10px] transition-all duration-[800ms] md:space-x-[20px] lg:space-x-[30px] xl:w-full"
                            :class="{ 'translate-y-[200px] opacity-0': !scrollStates.State246, 'translate-y-0 opacity-1': scrollStates.State246 }">
                            <NuxtImg class="w-[80px] md:w-[120px] lg:w-[160px] xl:w-[130px] 2xl:w-[170px]"
                                src="/img/server.webp"></NuxtImg>
                            <h4 class="text-[14px] font-bold md:text-[20px] lg:text-[25px] xl:text-[20px] 2xl:text-[27px]"
                                v-if="!isLoadingBotStatus">{{ botstatusData.server_name }}
                            </h4>
                            <div v-else
                                class="w-full h-[20px] rounded-full overflow-hidden relative bg-gray-200 animate-pulse">
                                <div
                                    class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-gray-200 via-[#0099FF]/40 to-gray-200">
                                    <div class="w-full h-full transform-gpu scale-x-0 origin-left animate-shimmer">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-start items-center w-[80%] space-x-[10px] transition-all duration-[800ms] md:space-x-[20px] lg:space-x-[30px] xl:w-full"
                            :class="{ 'translate-y-[200px] opacity-0': !scrollStates.State314, 'translate-y-0 opacity-1': scrollStates.State314 }">
                            <NuxtImg class="w-[80px] md:w-[120px] lg:w-[160px] xl:w-[130px] 2xl:w-[170px]"
                                src="/img/cpu.webp"></NuxtImg>
                            <h4 class="text-[14px] font-bold md:text-[20px] lg:text-[25px] xl:text-[20px] 2xl:text-[27px]"
                                v-if="!isLoadingBotStatus">{{ botstatusData.cpu_name }}
                            </h4>
                            <div v-else
                                class="w-full h-[20px] rounded-full overflow-hidden relative bg-gray-200 animate-pulse">
                                <div
                                    class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-gray-200 via-[#0099FF]/40 to-gray-200">
                                    <div class="w-full h-full transform-gpu scale-x-0 origin-left animate-shimmer">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex justify-start items-start xl:justify-end xl:w-max">
                        <div class="xl:flex">
                            <div class="transition-all duration-[800ms]" :class="{ 'translate-x-[-200px] opacity-0': !scrollStates.State417, 'translate-x-0 opacity-1': scrollStates.State417 }">
                                <CPU_Usage_Chart :botstatusData="botstatusData" />
                            </div>
                            <div class="transition-all duration-[800ms]" :class="{ 'translate-x-[200px] opacity-0': !scrollStates.State550, 'translate-x-0 opacity-1': scrollStates.State550 }">
                                <Memory_Usage_Chart :botstatusData="botstatusData" />
                            </div>
                        </div>
                    </div>
                </div>
                <NuxtImg
                    class="hidden w-[500px] absolute right-[-180px] bottom-[-80px] transition-all duration-[800ms] md:block lg:w-[750px] lg:right-[-250px] lg:bottom-[-250px] xl:w-[500px] xl:right-0 xl:left-[-180px] xl:bottom-[-300px] 2xl:w-[700px] 2xl:bottom-[-400px] 2xl:left-[-250px]" :class="{ 'translate-x-[-200px] opacity-0': !scrollStates.State417, 'translate-x-0 opacity-1': scrollStates.State417 }"
                    src="/img/nanami_point.webp"></NuxtImg>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CPU_Usage_Chart from '~/components/CPU_Usage_Chart.vue';

//Animation Variables
const nanami_ta = ['Nanami Bot', 'บอทนานามิ', 'なな美ボット'];
const nanami_ta_ref = ref('');
let isOnMounted = ref(false);
let istoggleMenu = ref(false);
let scroll_value = ref(0);
let scrollStates = ref({
    State114: false,
    State246: false,
    State314: false,
    State417: false,
    State550: false
});


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
function handleScrollValue(value: number) {
    scroll_value.value = value;
    console.log(scroll_value.value)

    // Update the properties of scrollStates based on the scroll position
    if (value >= 114) scrollStates.value.State114 = true;
    if (value >= 246) scrollStates.value.State246 = true;
    if (value >= 314) scrollStates.value.State314 = true;
    if (value >= 417) scrollStates.value.State417 = true;
    if (value >= 550) scrollStates.value.State550 = true;
}

//BotStatus
let botstatusData = ref();
const isLoadingBotStatus = ref(true);

let statusInterval: string | number | NodeJS.Timeout | undefined;
async function GetBotStatus() {
    try {
        const botStatusRes = await fetch('https://nanami.tensormik.com/statusapi', {
            method: 'GET',
        });
        let botStatusResData = await botStatusRes.json();
        botstatusData.value = botStatusResData;
        isLoadingBotStatus.value = false; // Set loading to false after fetching
    } catch {

    }
}
onMounted(() => {
    statusInterval = setInterval(() => {
        GetBotStatus();
    }, 1000);
});
// Clear the interval when the component is unmounted to avoid memory leaks
onUnmounted(() => {
    clearInterval(statusInterval);
});

onMounted(() => {
    setInterval(() => {
        console.log(window.innerWidth, window.innerHeight)
    }, 100);
})
</script>
