<template>
    <div class="w-full h-full bg-gradient-to-r from-[#0099FF]/10 to-transparent">
        <div class="w-full h-full pt-[70px]">
            <!-- Bar -->
            <div class="w-full h-max grid grid-cols-3 text-white px-[20px]">
                <div>
                    <button @click="BackPageBTNHandler" class="fas fa-chevron-right text-[30px]"></button>
                </div>
                <div class="w-full flex justify-center">
                    <h3 class="text-[22px] font-bold">บัญชี</h3>
                </div>
                <div></div>
            </div>

            <div class="w-full h-[200px] px-[20px] mt-[30px]">
                <div class="w-full h-full rounded-[20px] bg-pink-300 relative overflow-hidden">
                    <div class="w-full h-[50%] rounded-t-[20px] bg-[url('/img/nanami_banner.webp')] bg-cover bg-center"></div>
                    <div class="w-full h-[50%] absolute bottom-[30px] left-[20px] flex">
                        <NuxtImg class="w-[100px] rounded-full ring-[5px] ring-white" :src="usr_avatar"></NuxtImg>
                        <div class="absolute bottom-[10px] left-[120px] z-0 leading-[1.3]">
                            <h4 class="text-white text-[20px] font-bold">{{ usr_global_name }}</h4>
                            <h6 class="text-white text-[16px] font-bold">{{ usr_name }}</h6>
                        </div>
                    </div>
                    <div class="w-max h-max px-[10px] py-[4px] rounded-[5px] flex justify-center items-center bg-white/50 absolute bottom-[15px] right-[20px] space-x-[5px]">
                        <NuxtImg v-for="i in usr_badges" class="h-[20px]" :src="userBadgesDic[i]"></NuxtImg>
                    </div>
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
const user_id = ref(Cookies.get('usr_id'));
let usr_name = ref(Cookies.get('usr_name'));
let usr_global_name = ref(Cookies.get('usr_global_name'))
let usr_tag = ref(Cookies.get('usr_tag'))
let usr_avatar = ref(Cookies.get('usr_avatar'));
let usr_badges = ref([])
const userBadgesDic = ref({
    "HypeSquad Online House 1": "/img/bravery.webp",
    "HypeSquad Online House 2": "/img/brilliance.webp",
    "HypeSquad Online House 3": "/img/balance.webp",
    "Nitro": "/img/nitro.webp",
    "Active Developer": "/img/dev.webp"
});
const emit = defineEmits(['update:currentmenu']);

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
    }, 200);
});
function BackPageBTNHandler() {
    emit('update:currentmenu', 'menu');
}

async function GetUserData() {
    try {
        const userDataRes = await fetch('api/data/users', {
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
        const userData = await userDataRes.json();

        if (userData.status === 200) {
            if (userData.data_db) {
                usr_name.value = userData.data_db.usr_name,
                usr_global_name.value = userData.data_db.usr_global_name,
                usr_tag.value = userData.data_db.usr_tag,
                usr_avatar.value = userData.data_db.usr_avatar

                if (userData.badges) { //Discord user data fetced
                    usr_badges.value = userData.badges
                }
            } else {
                //No data found
            }
        } else {
            //Something down handle
        }
    } catch {
        //Server Side down Handle
    }
}
GetUserData();
</script>