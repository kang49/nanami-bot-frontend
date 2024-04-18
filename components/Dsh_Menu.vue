<template>
    <div class="w-[70%] h-[calc(100dvh)] bg-gradient-to-r from-[#0099FF]/10 to-transparent pl-[10px] lg:pt-[50px]">
        <div class="w-full h-full pt-[70px]">
            <div class="w-full h-full overflow-y-scroll lg:h-full px-[10px] lg:px-[20px] 2xl:px-[40px]">
                <!-- Account BTN -->
                <button @click="MenuClickHandler('account')"
                    class="w-full h-max flex justify-start items-center p-[10px] rounded-[20px] select-none outline-none lg:w-[40%]"
                    :class="{ 'bg-gradient-to-r from-[#0099FF]/30 to-transparent to-[70%]': currentmenu == 'account' }">
                    <h3 class="text-white text-[20px] font-bold lg:text-[25px] 2xl:text-[30px]">บัญชี</h3>
                </button>

                <!-- Line -->
                <div class="w-[60%] h-[1px] bg-white/30 mt-[20px] mb-[20px] lg:w-[40%]"></div>

                <h4 class="text-white text-[16px] font-bold mb-[20px] lg:text-[20px]">เซิร์ฟเวอร์</h4>
                <div class="w-[80%] h-max lg:w-[40%]">

                    <!-- Server Select Dropdown -->
                    <button v-if="userGuildsLists" @click="DropdownHandler" class="w-[70%] h-max p-[10px] bg-white/20 rounded-[5px] flex items-center justify-between space-x-[10px] select-none outline-none">
                        <NuxtImg v-if="GuildDropdownVar.guildicon && GuildDropdownVar.guildId" class="w-[30px] rounded-full 2xl:w-[55px]" :src="DeHashGuildIcon(GuildDropdownVar.guildId, GuildDropdownVar.guildicon)"></NuxtImg>
                        <h3 class="text-white w-full text-[16px] text-left font-bold 2xl:text-[22px] truncate">{{GuildDropdownVar.guildname ?? 'เลือกเซิร์ฟเวอร์'}}</h3>
                        <i class="fas fa-chevron-down text-white transition-all duration-500" :class="{'rotate-180': GuildDropdownVar.isopen}"></i>
                    </button>
                    <div class="w-[70%] bg-white/20 rounded-[5px] mt-[5px] overflow-y-scroll transition-all duration-300" :class="{ 'opacity-0 h-[0.01px] translate-y-[20px]': !GuildDropdownVar.isopen, 'opacity-100 h-[200px] translate-y-0': GuildDropdownVar.isopen }">
                        <!-- Take this v-for in dropdown and resize it be good -->
                        <button v-if="userGuildsLists" v-for="i in userGuildsLists" @click="GuildSelectHandler(i.name, i.icon, i.id)"
                            class="w-full h-max select-none outline-none flex justify-start items-center p-[10px] space-x-[10px] hover:bg-black/20 2xl:space-x-[20px]">
                            <NuxtImg class="w-[30px] rounded-full 2xl:w-[55px]" :src="DeHashGuildIcon(i.id, i.icon)"></NuxtImg>
                            <h3 class="text-white text-[16px] text-left font-bold truncate 2xl:text-[22px]">{{ i.name }}</h3>
                        </button>
                        <div v-if="!userGuildsLists && !isGuildsDataErrorMsg" v-for="i in 5"
                            class="w-[80%] h-[50px] space-y-[10px] rounded-full overflow-hidden relative bg-[#0099FF]/30 animate-pulse mt-[10px]">
                            <div
                                class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-[#0099FF]/30 to-transparent to-[70%]">
                                <div class="w-full h-full transform-gpu scale-x-0 origin-left animate-shimmer">
                                </div>
                            </div>
                        </div>
                        <div v-else-if="!userGuildsLists && isGuildsDataErrorMsg" class="w-full h-[30%] flex justify-center items-center">
                            <h4 class="text-[16px] text-white/50 font-bold">{{ isGuildsDataErrorMsg }}</h4>
                        </div>
                    </div>
                </div>

                <!-- Line -->
                <div class="w-[60%] h-[1px] bg-white/30 mt-[20px] mb-[20px] lg:w-[40%]"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';

//Variable set
let isOnMounted = ref(false);
let currentmenu = ref();
const user_id = ref(Cookies.get('usr_id'));
const usr_name = ref(Cookies.get('usr_name'));
const usr_tag = ref(Cookies.get('usr_tag'))
const userGuildsLists = ref();
let isGuildsDataErrorMsg = ref();
const emit = defineEmits(['update:currentmenu']);
const GuildDropdownVar = ref<{
  isopen: boolean;
  guildId: string | null;
  guildname: string | null;
  guildicon: string | null;
}>({
  isopen: false,
  guildId: null,
  guildname: null,
  guildicon: null
});

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
        GetUserGuilds();
    }, 200);
});

function DropdownHandler() {
    GuildDropdownVar.value.isopen = !GuildDropdownVar.value.isopen;
}

function MenuClickHandler(menu: string) {
    currentmenu.value = menu;
    emit('update:currentmenu', menu);
}

function GuildSelectHandler( guildName: string, icon: string, guildId: string) {
    if (icon && guildId) {
        GuildDropdownVar.value.guildname = guildName;
        GuildDropdownVar.value.guildicon = icon;
        GuildDropdownVar.value.guildId = guildId;
    }
    GuildDropdownVar.value.isopen = false;
}

function DeHashGuildIcon(guildId: string, iconHash: string): string {
    const baseUrl = 'https://cdn.discordapp.com/icons';
    if (!iconHash) {
        return '/path/to/default/image.png';  // Path to a default image
    }
    const extension = iconHash.startsWith('a_') ? 'gif' : 'png';
    return `${baseUrl}/${guildId}/${iconHash}.${extension}`;
}

async function GetUserGuilds() {
    try {
        const userGuildsRes = await fetch('api/data/guilds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usr_id: user_id.value,
                usr_name: usr_name.value,
                usr_tag: usr_tag.value
            })
        });
        const userGuildsData = await userGuildsRes.json();

        if (userGuildsData.status === 200) {
            if (userGuildsData.data.length) {
                userGuildsLists.value = userGuildsData.data;
            } else {
                //No data Handle
                isGuildsDataErrorMsg.value = 'คุณไม่มีเซิร์ฟเวอร์ที่มีสิทธิ์ผู้ดูแลเลยค่ะ 🥺';
            }
        } else {
            //Something Down Handle
            isGuildsDataErrorMsg.value = userGuildsData.error;
        }
    } catch {
        //Server Side Down Handle
        isGuildsDataErrorMsg.value = 'เกิดปัญหาขึ้นกับระบบหลังบ้าน ขอโทษด้วยนะคะ 😭';
    }
}
</script>