<template>
    <div class="w-[70%] h-full bg-gradient-to-r from-[#0099FF]/10 to-transparent pl-[10px] overflow-y-scroll">
        <div class="w-full h-full pt-[70px]">
            <div class="w-full h-max">
                <button @click="MenuClickHandler('account')"
                    class="w-full h-max flex justify-start items-center p-[10px] rounded-[20px]"
                    :class="{ 'bg-gradient-to-r from-[#0099FF]/30 to-transparent to-[70%]': currentmenu == 'account' }">
                    <h3 class="text-white text-[20px] font-bold">บัญชี</h3>
                </button>

                <div class="w-[60%] h-[1px] bg-white/30 mt-[20px] mb-[20px]"></div>

                <h4 class="text-white text-[16px] font-bold mb-[20px]">เซิร์ฟเวอร์</h4>
                <button v-if="userGuildsLists" v-for="i in userGuildsLists" @click="MenuClickHandler(i.name)"
                    class="w-full h-max flex justify-start items-center p-[10px] rounded-[20px] space-x-[10px]"
                    :class="{ 'bg-gradient-to-r from-[#0099FF]/30 to-transparent to-[70%]': currentmenu == i.name }">
                    <NuxtImg class="w-[40px] rounded-full" :src="DeHashGuildIcon(i.id, i.icon)"></NuxtImg>
                    <h3 class="text-white text-[16px] text-left font-bold">{{ i.name }}</h3>
                </button>
                <div v-else-if="!userGuildsLists && !isGuildsDataErrorMsg" v-for="i in 5"
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

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
        GetUserGuilds();
    }, 200);
});

function MenuClickHandler(menu: string) {
    currentmenu.value = menu;
    emit('update:currentmenu', menu);
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