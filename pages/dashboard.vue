<template>
    <div class="bg-black w-full min-h-[calc(100dvh)] h-max">
        <Navbar @update:istoggle="handleToggleMenu" :theme="true" />

        <div class="w-full min-h-[calc(100dvh)] h-max bg-[#02071A] bg-cover bg-center overflow transition-all duration-1000"
            :class="{ 'opacity-50': istoggleMenu, 'opacity-100': !istoggleMenu }">

            <div class="relative w-full h-full">
                <transition name="slide-fade">
                <div v-show="!currentmenu || currentmenu === 'menu'" key="menu" class="w-full h-full">
                    <Dsh_Menu @update:currentmenu="handleCurrentMenu" />
                </div>
                </transition>
                <transition name="slide-fade">
                <div v-if="currentmenu === 'account'" key="account" class="w-full h-full">
                    <Dsh_Account @update:currentmenu="handleCurrentMenu" />
                </div>
                </transition>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import Dsh_Menu from '~/components/Dsh_Menu.vue';

//Variable set
let istoggleMenu = ref(false);
let isOnMounted = ref(false);
const router = useRouter();
let currentmenu = ref('');
const user_id = ref(Cookies.get('usr_id'));

if (!user_id.value) {
    Cookies.set('is_go_dsh', 'true', { expires: 1 });
    router.push('/signin'); //If not signed-in, go sign-in
}

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        //Change pageTheme
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#02071A');
        //Change Title
        document.title = 'Dashboard Nanami - ตั้งค่าฟังก์ชั่นบอทนานามิของคุณ';
        isOnMounted.value = true;
    }, 200);
});

function handleCurrentMenu(value: string) {
    currentmenu.value = value;
}
</script>