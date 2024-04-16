<template>
    <div class="w-full min-h-[calc(100dvh)] h-max bg-gradient-to-r from-[#0099FF]/10 to-transparent">
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
                    <div :style="{ backgroundImage: `url('${usr_banner}')` }"
                        class="w-full h-[50%] rounded-t-[20px] bg-cover bg-center"></div>
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
                        <NuxtImg v-for="badge in usr_badges" :key="badge" class="h-[15px]" :src="userBadgesDic[badge]">
                        </NuxtImg>
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
                    <button
                        class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[5px] bg-[#0099FF] mt-[20px]"
                        @click="UpdateProfileColor">
                        <h4 class="text-white text-[16px]">บันทึก</h4>
                    </button>
                    <button class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] mt-[20px]"
                        @click="ResetTheme">
                        <h4 class="text-white text-[16px]">รีเซ็ต</h4>
                    </button>
                </div>
            </div>

            <div class="w-full h-max flex justify-center p-[20px]">
                <div class="w-full h-[1px] bg-white/30"></div>
            </div>

            <!-- Banner Settings -->
            <div class="w-full h-max px-[20px]">
                <h4 class="text-white text-[16px] font-bold">แบนเนอร์</h4>
                <div class="w-full h-max flex justify-start items-center mt-[20px] space-x-[10px]">
                    <button @click="triggerFileInput"
                        class="w-max h-max py-[5px] px-[10px] bg-[#0099FF] rounded-[5px] flex justify-center items-center">
                        <h4 class="text-white text-[16px] font-bold">เปลี่ยนแบนเนอร์</h4>
                    </button>
                    <input type="file" ref="banner_imagge_input" hidden @change="handleFileChange" accept="image/*" />
                </div>
            </div>

            <div class="w-full h-max flex justify-center p-[20px]">
                <div class="w-full h-[1px] bg-white/30"></div>
            </div>

            <!-- Birthday Settings -->
            <div class="w-full h-max px-[20px]">
                <h4 class="text-white text-[16px] font-bold">วันเกิด</h4>
                <div class="w-full h-max flex justify-start items-start mt-[20px] space-x-[10px]">
                    <div class="w-max">
                        <VueDatePicker @closed="selectedDate" class="touch-manipulation vdp_custom pb-[15px]" position="left" :enable-time-picker="false" dark v-model="usr_birthday.value"
                            time-picker-inline>
                            <template #trigger>
                                <h4 v-if="usr_birthday.isSelected && !usr_birthday.db_value"
                                    class="w-max h-max py-[5px] px-[10px] ring-[1px] ring-[#0099FF] rounded-[5px] text-white text-[16px] font-bold flex justify-center items-center">
                                    {{
                                        usr_birthday.value.toLocaleString('en-US', {
                                            day: '2-digit', // แสดงวันที่เป็น 2 หลัก
                                            month: '2-digit', // แสดงเดือนเป็น 2 หลัก
                                            year: 'numeric', // แสดงปีเต็ม
                                        })
                                    }}
                                </h4>
                                <h4 v-if="!usr_birthday.isSelected && usr_birthday.db_value"
                                    class="w-max h-max py-[5px] px-[10px] ring-[1px] ring-[#0099FF] rounded-[5px] text-white text-[16px] font-bold flex justify-center items-center">
                                    {{
                                        usr_birthday.db_value.toLocaleString('en-US', {
                                            day: '2-digit', // แสดงวันที่เป็น 2 หลัก
                                            month: '2-digit', // แสดงเดือนเป็น 2 หลัก
                                            year: 'numeric', // แสดงปีเต็ม
                                        })
                                    }}
                                </h4>
                                <h4 v-if="!usr_birthday.isSelected && !usr_birthday.db_value"
                                    class="w-max h-max py-[5px] px-[10px] ring-[1px] ring-[#0099FF] rounded-[5px] text-white text-[16px] font-bold flex justify-center items-center">
                                    เลือกวันเกิด
                                </h4>
                            </template>
                        </VueDatePicker>
                    </div>
                    <button v-if="!usr_birthday.isSelected && usr_birthday.db_value" class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px]" @click="SaveBirthDay(true)">
                        <h4 class="text-white text-[16px]">ลบ</h4>
                    </button>
                </div>
                <!-- Buttons for Birthday Change -->
                <div v-if="usr_birthday.isSelected" class="w-full h-max flex items-center space-x-[10px]">
                    <button @click="SaveBirthDay(false)"
                        class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] bg-[#0099FF] mt-[20px]">
                        <h4 class="text-white text-[16px]">บันทึก</h4>
                    </button>
                    <button @click="ResetBirthDay" class="h-max w-max py-[5px] flex items-center px-[20px] rounded-[20px] mt-[20px]">
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const isOnMounted = ref(false);
const usr_id = ref(Cookies.get('usr_id'));
const usr_name = ref(Cookies.get('usr_name'));
const usr_global_name = ref(Cookies.get('usr_global_name'));
const usr_tag = ref(Cookies.get('usr_tag'));
const usr_avatar = ref(Cookies.get('usr_avatar'));
const usr_banner = ref('/img/nanami_banner.webp');
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
let webUser_cc: any;  // Initialize webUser_cc as an empty object
const banner_imagge_input = ref();
const bannerImageBase64 = ref();
const usr_birthday = ref({
    isSelected: false,
    value: new Date(),
    db_value: null as Date | null
});

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
            body: JSON.stringify({ usr_id: usr_id.value, usr_name: usr_name.value, usr_tag: usr_tag.value })
        });
        const userData = await response.json();

        if (userData.status === 200 && userData.data_db) {
            let colors;
            if (Array.isArray(userData.data_db.webUser_card_color)) {
                // Handle as array
                colors = userData.data_db.webUser_card_color[0];
            } else {
                // Handle as object
                colors = userData.data_db.webUser_card_color;
            }

            if (colors) {
                usr_name.value = userData.data_db.usr_name;
                usr_global_name.value = userData.data_db.usr_global_name;
                usr_tag.value = userData.data_db.usr_tag;
                usr_avatar.value = userData.data_db.usr_avatar;
                usr_banner.value = userData.data_db.usr_banner;
                if (userData.data_db.usr_birthday) usr_birthday.value.db_value = new Date(userData.data_db.usr_birthday) as Date;
                if (colors.cl_badges_color) {
                    colorSettings.value = {
                        main: colors.cl_main_color,
                        secondary: colors.cl_sec_color,
                        ring: colors.cl_profile_ring_color,
                        badges: {
                            r: colors.cl_badges_color.bc_red,
                            g: colors.cl_badges_color.bc_green,
                            b: colors.cl_badges_color.bc_blue
                        }
                    };
                    webUser_cc = {
                        cl_main_color: colors.cl_main_color,
                        cl_sec_color: colors.cl_sec_color,
                        cl_profile_ring_color: colors.cl_profile_ring_color,
                        cl_badges_color: colors.cl_badges_color
                    };
                } else {
                    console.error("Badges color data is missing or invalid");
                }
            } else {
                console.error("Color data is undefined");
            }
            usr_badges.value = userData.badges || [];
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
                usr_id: usr_id.value,
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

const triggerFileInput = () => {
    banner_imagge_input.value.click();
};

const handleFileChange = () => {
    const files = banner_imagge_input.value.files;
    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            if (e.target) {
                usr_banner.value = '/img/butterfly_loading.gif';
                bannerImageBase64.value = e.target.result;
                try {
                    const uploadBanner = await fetch('api/profileBanner', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            usr_id: usr_id.value,
                            usr_name: usr_name.value,
                            usr_tag: usr_tag.value,
                            banner_image: bannerImageBase64.value,
                            return_url: true
                        })
                    });
                    const uploadBannerData = await uploadBanner.json();

                    if (uploadBannerData.status === 200 && uploadBannerData.banner_url) {
                        usr_banner.value = uploadBannerData.banner_url;
                    }
                } catch (e) {
                    console.error(e, 'Dsh_Account')
                }
            }
        };
        reader.readAsDataURL(files[0]);
    }
};

function selectedDate() {
    usr_birthday.value.isSelected = true;
}
function ResetBirthDay() {
    usr_birthday.value.isSelected = false;
}
async function SaveBirthDay(isDelete: boolean) {
    usr_birthday.value.isSelected = false;

    let data: Date | null;
    if (isDelete === true) {
        data = null;
    } else {
        data = usr_birthday.value.value;
    }

    try {
        const response = await fetch('api/userBirthday', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usr_id: usr_id.value,
                usr_name: usr_name.value,
                usr_tag: usr_tag.value,
                usr_birthday: data
            })
        });
        const responseData = await response.json();

        if (responseData.status === 200) {
            usr_birthday.value.db_value = data;
        }
    } catch (e) {
        console.error(e)
        usr_birthday.value.isSelected = false;
    }
}

function BackPageBTNHandler() {
    emit('update:currentmenu', 'menu');
}

GetUserData();
</script>

<style scoped>
.vdp_custom {
    /*General*/
    --dp-font-family: "Lineseed", -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --dp-border-radius: 20px;
    /*Configurable border-radius*/
    --dp-cell-border-radius: 9999px;
    /*Specific border radius for the calendar cell*/
    --dp-common-transition: all 0.1s ease-in;
    /*Generic transition applied on buttons and calendar cells*/

    /*Sizing*/
    --dp-button-height: 35px;
    /*Size for buttons in overlays*/
    --dp-month-year-row-height: 35px;
    /*Height of the month-year select row*/
    --dp-month-year-row-button-size: 35px;
    /*Specific height for the next/previous buttons*/
    --dp-button-icon-height: 20px;
    /*Icon sizing in buttons*/
    --dp-cell-size: 30px;
    /*Width and height of calendar cell*/
    --dp-cell-padding: 5px;
    /*Padding in the cell*/
    --dp-common-padding: 10px;
    /*Common padding used*/
    --dp-input-icon-padding: 35px;
    /*Padding on the left side of the input if icon is present*/
    --dp-input-padding: 6px 30px 6px 12px;
    /*Padding in the input*/
    --dp-menu-min-width: 260px;
    /*Adjust the min width of the menu*/
    --dp-action-buttons-padding: 2px 5px;
    /*Adjust padding for the action buttons in action row*/
    --dp-row-margin: 10px 0;
    /*Adjust the spacing between rows in the calendar*/
    --dp-calendar-header-cell-padding: 0.5rem;
    /*Adjust padding in calendar header cells*/
    --dp-two-calendars-spacing: 10px;
    /*Space between multiple calendars*/
    --dp-overlay-col-padding: 3px;
    /*Padding in the overlay column*/
    --dp-time-inc-dec-button-size: 32px;
    /*Sizing for arrow buttons in the time picker*/
    --dp-menu-padding: 6px 8px;
    /*Menu padding*/

    /*Font sizes*/
    --dp-font-size: 1rem;
    /*Default font-size*/
    --dp-preview-font-size: 0.8rem;
    /*Font size of the date preview in the action row*/
    --dp-time-font-size: 0.8rem;
    /*Font size in the time picker*/

    /*Transitions*/
    --dp-animation-duration: 0.1s;
    /*Transition duration*/
    --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1);
    /*Timing on menu appear animation*/
    --dp-transition-timing: ease-out;
    /*Timing on slide animations*/
}
</style>