<template>
    <div class="bg-black w-full h-[calc(100dvh)] xl:bg-white">
        <!-- Mobile Nav -->
        <Navbar class="xl:hidden" @update:istoggle="handleToggleMenu" :theme="true" />
        <!-- Desktop Nav -->
        <Navbar class="hidden xl:block" @update:istoggle="handleToggleMenu" :theme="false" />

        <!-- Mobile Keen Page -->
        <div class="w-full h-[calc(100dvh)] bg-[url('public/img/keen.webp')] bg-cover bg-center overflow-hidden transition-all duration-1000 xl:hidden"
            :class="{ 'opacity-50': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="flex justify-between w-full h-full">
                <div class="bg-[#042E3D]/40 h-full flex items-center w-[40%] md:w-[30%]">
                    <div class="flex items-center justify-center h-[85%] w-full">
                        <div class="space-y-[2dvh]">
                            <div class="flex justify-center">
                                <h4 class="text-white/60 text-[15px] font-extrabold transition-all duration-1000 md:text-[20px] lg:text-[25px]"
                                    :class="{ 'translate-y-[-100px] opacity-0': !isOnMounted }">Full Stack Dev</h4>
                            </div>
                            <div>
                                <div v-for="i in keenName[0][0]"
                                    class="flex justify-center transition-all duration-1000"
                                    :class="{ 'translate-x-[100px] rotate-[-50deg] scale-[200%]': !isOnMounted }">
                                    <h4 class="text-white/60 text-[36px] font-extrabold md:text-[40px] lg:text-[50px]">
                                        {{ i }}</h4>
                                </div>
                            </div>
                            <div class="flex justify-center transition-all duration-1000"
                                :class="{ 'scale-[400%]': !isOnMounted }">
                                <i class="far fa-dot-circle text-[25px] text-white/60"></i>
                            </div>
                            <div>
                                <div v-for="i in keenName[0][1]"
                                    class="flex justify-center transition-all duration-1000"
                                    :class="{ 'translate-x-[100px] rotate-[-50deg] scale-[200%]': !isOnMounted }">
                                    <h4 class="text-white/60 text-[36px] font-extrabold md:text-[40px] lg:text-[50px]">
                                        {{ i }}</h4>
                                </div>
                            </div>
                            <NuxtLink to="https://github.com/kang49/"
                                class="fab fa-github text-[50px] text-white/60 flex justify-center transition-all duration-1000 md:text-[60px] lg:text-[70px]"
                                :class="{ 'translate-y-[100px] opacity-0': !isOnMounted }"></NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="bg-[#042E3D]/40 h-full w-[15%]">
                    <div class="flex items-center justify-center h-full w-full">
                        <div>
                            <div v-for="i in devtext" class="flex justify-center transition-all duration-1000"
                                :class="{ 'translate-y-[1000px]': !isOnMounted }">
                                <h4 class="text-white/60 text-[36px] font-extrabold md:text-[40px] lg:text-[50px]">{{ i
                                    }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Desktop Keen Page -->
        <div
            class="w-full h-[calc(100dvh)] bg-[url('public/img/keen_xl_bg.webp')] bg-cover bg-center overflow-hidden transition-all duration-1000">
            <div class="flex items-center h-full w-full">
                <div class="w-full h-[80%] flex items-center justify-between">
                    <div class="w-[55%] h-full flex items-center">
                        <div class="h-[50%] transition-all duration-1000" :class="{ 'translate-x-[-500px] opacity-0': !isOnMounted, 'translate-x-0 opacity-1': isOnMounted }">
                            <div class="leading-[50px] w-full">
                                <div class="flex items-center pl-[50px] space-x-[20px] w-full">
                                    <h1 class="text-[70px] text-[#2DD7DD] font-bold 2xl:text-[80px]">Meta</h1>
                                    <i class="far fa-dot-circle text-[25px] text-[#2DD7DD] 2xl:text-[30px] 2xl:mt-[10px]"></i>
                                    <h1 class="text-[70px] text-[#2DD7DD] font-bold 2xl:text-[80px]">Keen</h1>
                                </div>
                                <div class="flex items-center pl-[50px] w-full">
                                    <h4 class="text-[20px] text-black font-bold 2xl:text-[25px]">Full Stack Developer</h4>
                                    <div class="h-[3px] w-[300px] bg-[#C6C1C1] ml-[30px] 2xl:h-[5px] 2xl:w-[400px]"></div>
                                </div>
                            </div>
                            <div class="w-[90%] h-max pl-[50px]">
                                <h5 class="text-[20px] text-black 2xl:text-[25px]">
                                    สวัสดีเราชื่อ “คีน” นะ เป็นโปรแกรมเมอร์ ก็ทำโปรเจ็คนี้
                                    ขึ้นมาเพราะว่างอะนะ เราไม่มีงานประจำทำ (เพราะเรียนอยู่555)
                                    ใดๆก็ตามเราก็ทำฟรีแลนซ์บ้างถ้ามีคนจ้าง เราอายุ 18ปี
                                    กำลังเรียน Com-Sci ที่ University of Melbourne ในออสเตรเลีย
                                    กำลังขาดแคลนกำลังทรัพย์อย่างมากกับค่าเทอม55 เพราะงั้นใคร
                                    อยากจ้างเราทำอะไรก็ติดต่อมาได้เล้ย 🩵
                                </h5>
                            </div>
                            <div class="flex items-end h-[70%] w-full">
                                <div
                                    class="w-max h-max rounded-[20px] bg-[#2DD7DD]/25 ml-[50px] flex items-center px-[20px] py-[5px] space-x-[30px] 2xl:py-[10px]">
                                    <NuxtLink to="https://github.com/kang49" target="_blank"
                                        class="fab fa-github text-[35px] 2xl:text-[45px]">
                                    </NuxtLink>
                                    <NuxtLink to="https://discord.com/users/605305608085831681" target="_blank"
                                        class="fab fa-discord text-[35px] 2xl:text-[45px]"></NuxtLink>
                                    <NuxtLink to="https://linkedin.com/in/aramrak-kan" target="_blank"
                                        class="fab fa-linkedin-in text-[35px] 2xl:text-[45px]"></NuxtLink>
                                    <NuxtLink to="https://vrchat.com/home/user/usr_3f60f1e7-56c3-4328-99c1-383db10bc6ff"
                                        target="_blank">
                                        <NuxtImg class="w-[35px] 2xl:w-[45px]" src="/img/vrc_icon.webp"></NuxtImg>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-full w-max">
                        <NuxtImg class="h-full" src="/img/Keen_xl_DevPage.webp"></NuxtImg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

//Variable set
const keenName = ref([
    {
        0: ['M', 'E', 'T', 'A'],
        1: ['K', 'E', 'E', 'N']
    }
]);
const devtext = ref(['D', 'E', 'V', 'E', 'L', 'O', 'P', 'E', 'R', 'S']);
let isOnMounted = ref(false);

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
    }, 200);
});

let istoggleMenu = ref(false);
function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}
</script>