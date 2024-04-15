<template>
    <div class="w-full h-full bg-gradient-to-r from-[#0099FF]/10 to-transparent">
        <div class="w-full h-full pt-[70px]">
            <!-- Bar -->
            <div class="w-full h-max grid grid-cols-3 text-white px-[20px]">
                <div>
                    <button @click="BackPageBTNHandler" class="fas fa-chevron-right text-[30px]"></button>
                </div>
                <div class="w-full flex justify-center">
                    <h3 class="text-[18px] font-bold">บัญชี</h3>
                </div>
                <div></div>
            </div>

            <!-- ProfileCard -->
            <div class="w-full h-[200px] px-[20px] mt-[30px]">
                <div class="w-full h-full rounded-[20px] relative overflow-hidden"
                    :style="{ background: `linear-gradient(90deg, #${main_color} 0%, #${sec_color} 100%)` }">
                    <div class="w-full h-[50%] rounded-t-[20px] bg-[url('/img/nanami_banner.webp')] bg-cover bg-center">
                    </div>
                    <div class="w-full h-[50%] absolute bottom-[30px] left-[20px] flex">
                        <NuxtImg class="w-[100px] rounded-full ring-[5px]"
                            :style="{ boxShadow: `0 0 0 5px #${profile_ring_color}` }" :src="usr_avatar">
                        </NuxtImg>
                        <div class="absolute bottom-[20px] left-[110px] z-0 leading-[1.3]">
                            <h4 class="text-white text-[20px] font-bold">{{ usr_global_name }}</h4>
                            <h6 class="text-white text-[16px] font-bold">{{ usr_name }}</h6>
                        </div>
                    </div>
                    <div v-if="usr_badges.length > 0"
                        class="w-max h-max px-[10px] py-[4px] rounded-[5px] flex justify-center items-center absolute bottom-[15px] right-[20px] space-x-[5px]":style="{ background: `rgba(${badges_color.r}, ${badges_color.g}, ${badges_color.b}, 0.5)` }">
                        <NuxtImg v-for="i in usr_badges" class="h-[15px]" :src="userBadgesDic[i]"></NuxtImg>
                    </div>
                </div>
            </div>
            <div class="w-full h-max flex justify-center p-[20px]">
                <div class="w-full h-[1px] bg-white/30"></div>
            </div>

            <div class="w-full h-max px-[20px]">
                <h4 class="text-white text-[16px] font-bold">ธีมโปรไฟล์</h4>

                <div class="w-full h-max flex justify-start items-center mt-[20px] space-x-[10px]">
                    <div class="space-y-[5px] w-[50px]">
                        <ColorPicker format="hex" @hide="ThemeChangeBTN" v-model="main_color" />
                        <h4 class="flex justify-center text-white text-[14px]">หลัก</h4>
                    </div>
                    <div class="space-y-[5px]">
                        <ColorPicker format="hex" @hide="ThemeChangeBTN" v-model="sec_color" />
                        <h4 class="w-[50px] flex justify-center text-white text-[14px]">รอง</h4>
                    </div>
                    <div class="space-y-[5px]">
                        <ColorPicker format="hex" @hide="ThemeChangeBTN" v-model="profile_ring_color" />
                        <h4 class="w-[50px] flex justify-center text-white text-[14px]">ขอบ</h4>
                    </div>
                    <div class="space-y-[5px]">
                        <ColorPicker format="rgb" @hide="ThemeChangeBTN" v-model="badges_color" />
                        <h4 class="w-[50px] flex justify-center text-white text-[14px]">ป้าย</h4>
                    </div>
                </div>

                <div v-if="isThemeChange" class="w-full h-max flex items-center space-x-[10px]">
                    <button class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] bg-[#0099FF] mt-[20px]">
                        <h4 class="text-white text-[16px]">บันทึก</h4>
                    </button>
                    <button class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] mt-[20px]">
                        <h4 class="text-white text-[16px]">รีเซ็ต</h4>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import Cookies from 'js-cookie';
import 'primevue/resources/themes/aura-light-green/theme.css';

const isOnMounted = ref(false);
const user_id = ref(Cookies.get('usr_id'));
const usr_name = ref(Cookies.get('usr_name'));
const usr_global_name = ref(Cookies.get('usr_global_name'));
const usr_tag = ref(Cookies.get('usr_tag'));
const usr_avatar = ref(Cookies.get('usr_avatar'));
const usr_badges = ref([]);
const userBadgesDic = ref({
    'HypeSquad Online House 1': '/img/bravery.webp',
    'HypeSquad Online House 2': '/img/brilliance.webp',
    'HypeSquad Online House 3': '/img/balance.webp',
    'Nitro': '/img/nitro.webp',
    'Active Developer': '/img/dev.webp'
});
const emit = defineEmits(['update:currentmenu']);
const isThemeChange = ref(false);
const main_color = ref('000000');
const sec_color = ref('000000');
const profile_ring_color = ref('FFFFFF');
const badges_color = ref();
const old_badges_color = ref({ r: 255, g: 255, b: 255 });
let webUser_cc = { cl_main_color: '', cl_sec_color: '', cl_profile_ring_color: '', cl_badges_color: [{ bc_red: 0, bc_green: 0, bc_blue: 0 }] }; // Default empty object

onMounted(() => {
    setTimeout(() => {
        badges_color.value = badges_color.value || old_badges_color.value;
        isOnMounted.value = true;
    }, 200);
});

async function GetUserData() {
    try {
        const response = await fetch('api/data/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usr_id: user_id.value, usr_name: usr_name.value, usr_tag: usr_tag.value })
        });
        const userData = await response.json();

        if (userData.status === 200 && userData.data_db) {
            webUser_cc = userData.data_db.webUser_card_color[0]; // Ensure data is assigned here
            usr_name.value = userData.data_db.usr_name;
            usr_global_name.value = userData.data_db.usr_global_name;
            usr_tag.value = userData.data_db.usr_tag;
            usr_avatar.value = userData.data_db.usr_avatar;
            main_color.value = webUser_cc.cl_main_color;
            sec_color.value = webUser_cc.cl_sec_color;
            profile_ring_color.value = webUser_cc.cl_profile_ring_color;
            badges_color.value = { r: webUser_cc.cl_badges_color[0].bc_red, g: webUser_cc.cl_badges_color[0].bc_green, b: webUser_cc.cl_badges_color[0].bc_blue };
            usr_badges.value = userData.badges || [];
        } else {
            console.error('Failed to fetch user data:', userData);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function ThemeChangeBTN() {
    const { r, g, b } = badges_color.value;
    if (main_color.value !== webUser_cc.cl_main_color || sec_color.value !== webUser_cc.cl_sec_color || profile_ring_color.value !== webUser_cc.cl_profile_ring_color || r !== old_badges_color.value.r || g !== old_badges_color.value.g || b !== old_badges_color.value.b) {
        isThemeChange.value = true;
    }
}

function BackPageBTNHandler() {
    emit('update:currentmenu', 'menu');
}

GetUserData();
</script>