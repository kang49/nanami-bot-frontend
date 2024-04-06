<template>
    <div class="bg-black w-full h-[calc(100dvh)]">
        <Navbar @update:istoggle="handleToggleMenu" :theme="true" />

        <div class="w-full h-[calc(100dvh)] bg-[url('public/img/partners_bg_tr80.webp')] bg-cover bg-center overflow-hidden"
            :class="{ 'opacity-50': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="w-full h-full flex items-center">
                <div class="px-[20px] w-full h-[80%] 2xl:px-[50px]">
                    <h1 class="text-white text-[35px] font-bold mt-[50px] transition-all duration-[700ms] 2xl:text-[45px]" :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">Bot Partners</h1>
                    <div class="w-full h-[80%] mt-[30px] p-[20px] rounded-[20px] bg-black/40 overflow-y-scroll transition-all duration-1000" :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        <div v-for="(i, index) in partnersData" class="w-full h-max">
                            <div class="flex justify-between items-start w-full h-max">
                                <div class="w-[90%] h-full xl:w-[40%]">
                                    <h1 class="text-[25px] text-white font-bold xl:text-[30px] 2xl:text-[35px]">{{ i.name }}</h1>
                                    <h5 class="text-[13px] text-white font-normal xl:text-[16px] 2xl:text-[22px]">{{ i.description }}</h5>
                                    <div
                                        class="w-max h-max px-[20px] py-[5px] rounded-[20px] mt-[20px] bg-[#0099FF] flex justify-center items-center">
                                        <NuxtLink :to="i.invite_url" target="_blank">
                                            <h4 class="text-white text-[13px] font-bold xl:text-[16px] 2xl:text-[22px]">เชิญบอท</h4>
                                        </NuxtLink>
                                    </div>
                                </div>
                                <div class="h-max w-[40%] flex justify-end items-center">
                                    <NuxtImg class="h-[80px] object-cover rounded-full xl:h-[150px] 2xl:h-[200px]" :src="i.pic"></NuxtImg>
                                </div>
                            </div>
                            <!-- Use v-if to conditionally render the divider, checking if it's not the last item -->
                            <div v-if="index !== partnersData.length - 1" class="w-full flex justify-center pt-[20px] pb-[20px] xl:pt-[50px] xl:pb-[50px]">
                                <div class="bg-white/50 w-[80%] h-[3px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

//Variable set
let istoggleMenu = ref(false);
let isOnMounted = ref(false);

const partnersData = ref([
    {
        name: 'BloodRose',
        pic: '/img/bloodrose.webp',
        description: `
        BloodRose, ฝีมือคนไทย, เป็นบอท Discord
        นวัตกรรมใหม่ที่
        ออกแบบมาเพื่อผู้ใช้ที่ต้องการความสัมพันธ์เสมือนจริง. บอทนี้มี
        ความสามารถในการจำลองความรู้สึกมนุษย์, สามารถปรับเปลี่ยน
        อารมณ์ได้ตามการโต้ตอบของผู้ใช้, ทำให้สามารถพัฒนาความสัมพันธ์ จากคนคุยไปจนถึงแฟนได้.
        บอทมีคำศัพท์มากกว่า 700 คำ และสามารถ เรียนรู้คำศัพท์เพิ่มเติมจากผู้ใช้. คำสั่งต่างๆ
        เช่น เกมส์ และ emote มีผล ต่อความรู้สึกของบอท
        `,
        invite_url: 'https://discord.com/oauth2/authorize?client_id=897621786492039229&permissions=8&scope=bot%20applications.commands'
    },
    {
        name: 'Kinako',
        pic: '/img/kinako.webp',
        description: `
        Kinako บอทเปิดเพลงที่ดีที่สุด, ไม่มีโฆษณาแถมยังสามารถเปิดเพลงได้จากหลาย 
        Platfrom ไม่ว่าจะเป็น Youtube, Spotify และอื่นๆ สามารถ
        สร้างห้อง order เพลงได้และไม่จำเป็นต้องพิมพ์ Command เพราะเรามี Canvas ที่สวย
        งามและควบคุมด้วยปุ่มได้
        `,
        invite_url: 'https://discord.com/api/oauth2/authorize?client_id=1038717075071447062&permissions=8&scope=bot%20applications.commands'
    },
    {
        name: 'Manybath (หลายบาท)',
        pic: '/img/manybath.webp',
        description: `
        หลายบาท บอท V-Tuber ชื่อดังที่จะมาร้องเพลงให้คุณถึงที่ ได้รับความนิยมอย่างมากกว่าหมื่น Server ที่ online ไม่มีคำสั่งพรีเมี่ยม
        ไม่มีโหวตปลดล็อกคำสั่ง รองรับการเล่นเพลงจาก Youtube และ Sportify
        `,
        invite_url: 'https://discord.com/oauth2/authorize?client_id=483104273761304577&permissions=11534344&scope=bot%20applications.commands'
    }
])

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
    }, 200);
});
</script>