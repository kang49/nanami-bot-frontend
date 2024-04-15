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
                    :style="{ background: `linear-gradient(90deg, #${colorSettings.main} 0%, #${colorSettings.secondary} 100%)` }">
                    <div class="w-full h-[50%] rounded-t-[20px] bg-[url('/img/nanami_banner.webp')] bg-cover bg-center">
                    </div>
                    <div class="w-full h-[50%] absolute bottom-[30px] left-[20px] flex">
                        <NuxtImg class="w-[100px] rounded-full ring-[5px]"
                            :style="{ boxShadow: `0 0 0 5px #${colorSettings.ring}` }" :src="usr_avatar">
                        </NuxtImg>
                        <div class="absolute bottom-[20px] left-[110px] z-0 leading-[1.3]">
                            <h4 class="text-white text-[20px] font-bold">{{ usr_global_name }}</h4>
                            <h6 class="text-white text-[16px] font-bold">{{ usr_name }}</h6>
                        </div>
                    </div>
                    <div v-if="usr_badges.length > 0"
                        class="w-max h-max px-[10px] py-[4px] rounded-[5px] flex justify-center items-center absolute bottom-[15px] right-[20px] space-x-[5px]"
                        :style="{ background: `rgba(${colorSettings.badges.r}, ${colorSettings.badges.g}, ${colorSettings.badges.b}, 0.5)` }">
                        <NuxtImg v-for="badge in usr_badges" :key="badge" class="h-[15px]" :src="userBadgesDic[badge]"></NuxtImg>
                    </div>
                </div>
            </div>
            <div class="w-full h-max flex justify-center p-[20px]">
                <div class="w-full h-[1px] bg-white/30"></div>
            </div>

            <!-- Theme Settings -->
            <div class="w-full h-max px-[20px]">
                <h4 class="text-white text-[16px] font-bold">ธีมโปรไฟล์</h4>
                <div class="w-full h-max flex justify-start items-center mt-[20px] space-x-[10px]">
                    <div class="space-y-[5px] w-[50px]">
                        <ColorPicker format="hex" @hide="ThemeChangeBTN" v-model="colorSettings.main" />
                        <h4 class="flex justify-center text-white text-[14px]">หลัก</h4>
                    </div>
                    <div class="space-y-[5px]">
                        <ColorPicker format="hex" @hide="ThemeChangeBTN" v-model="colorSettings.secondary" />
                        <h4 class="w-[50px] flex justify-center text-white text-[14px]">รอง</h4>
                    </div>
                    <div class="space-y-[5px]">
                        <ColorPicker format="hex" @hide="ThemeChangeBTN" v-model="colorSettings.ring" />
                        <h4 class="w-[50px] flex justify-center text-white text-[14px]">ขอบ</h4>
                    </div>
                    <div class="space-y-[5px]">
                        <ColorPicker format="rgb" @hide="ThemeChangeBTN" v-model="colorSettings.badges" />
                        <h4 class="w-[50px] flex justify-center text-white text-[14px]">ป้าย</h4>
                    </div>
                </div>

                <!-- Buttons for Theme Change -->
                <div v-if="isThemeChange" class="w-full h-max flex items-center space-x-[10px]">
                    <button class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] bg-[#0099FF] mt-[20px]" @click="UpdateProfileColor">
                        <h4 class="text-white text-[16px]">บันทึก</h4>
                    </button>
                    <button class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] mt-[20px]" @click="ResetTheme">
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
const colorSettings = ref({
    main: '000000',
    secondary: '000000',
    ring: 'FFFFFF',
    badges: { r: 255, g: 255, b: 255 }
});
let webUser_cc:any;  // Initialize webUser_cc as an empty object

onMounted(() => {
    setTimeout(() => {
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

        if (response.ok && userData.data_db) {
            const { webUser_card_color } = userData.data_db;
            const colors = webUser_card_color[0];
            usr_name.value = userData.data_db.usr_name;
            usr_global_name.value = userData.data_db.usr_global_name;
            usr_tag.value = userData.data_db.usr_tag;
            usr_avatar.value = userData.data_db.usr_avatar;
            colorSettings.value = {
                main: colors.cl_main_color,
                secondary: colors.cl_sec_color,
                ring: colors.cl_profile_ring_color,
                badges: {
                    r: colors.cl_badges_color[0].bc_red,
                    g: colors.cl_badges_color[0].bc_green,
                    b: colors.cl_badges_color[0].bc_blue
                }
            };
            usr_badges.value = userData.badges || [];
            // Update webUser_cc with the fetched colors
            webUser_cc = {
                cl_main_color: colors.cl_main_color,
                cl_sec_color: colors.cl_sec_color,
                cl_profile_ring_color: colors.cl_profile_ring_color,
                cl_badges_color: colors.cl_badges_color[0]
            };
        } else {
            console.error('Failed to fetch user data:', userData);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function ThemeChangeBTN() {
    const currentColors = colorSettings.value;

    if (currentColors.main !== webUser_cc.cl_main_color ||
        currentColors.secondary !== webUser_cc.cl_sec_color ||
        currentColors.ring !== webUser_cc.cl_profile_ring_color ||
        currentColors.badges.r !== webUser_cc.cl_badges_color.r ||
        currentColors.badges.g !== webUser_cc.cl_badges_color.g ||
        currentColors.badges.b !== webUser_cc.cl_badges_color.b) {
        isThemeChange.value = true;
    } else {
        isThemeChange.value = false;
    }
}

function ResetTheme() {
    if (webUser_cc && Object.keys(webUser_cc).length > 0) {
        colorSettings.value = {
            main: webUser_cc.cl_main_color || '000000',
            secondary: webUser_cc.cl_sec_color || '000000',
            ring: webUser_cc.cl_profile_ring_color || 'FFFFFF',
            badges: {
                r: webUser_cc.cl_badges_color.r || 255,
                g: webUser_cc.cl_badges_color.g || 255,
                b: webUser_cc.cl_badges_color.b || 255
            }
        };
    } else {
        // Use default values if webUser_cc is not defined or empty
        colorSettings.value = {
            main: '000000',
            secondary: '000000',
            ring: 'FFFFFF',
            badges: { r: 255, g: 255, b: 255 }
        };
    }
    isThemeChange.value = false;
}

async function UpdateProfileColor() {
    isThemeChange.value = false;
    try {
        const response = await fetch('/api/profileColor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usr_id: user_id.value,
                usr_name: usr_name.value,
                usr_tag: usr_tag.value,
                main_color: colorSettings.value.main,
                sec_color: colorSettings.value.secondary,
                profile_ring_color: colorSettings.value.ring,
                badges_color: colorSettings.value.badges
            })
        });

        const responseData = await response.json();
        if (responseData.status === 200) {

        } else {
            isThemeChange.value = true;
            alert(responseData.error)
        }
    } catch {
        isThemeChange.value = true;
        alert('เกิดปัญหาขึ้นกับระบบหลังบ้าน ขอโทษด้วยนะคะ 😭')
    }
}

function BackPageBTNHandler() {
    emit('update:currentmenu', 'menu');
}

GetUserData();
</script>
