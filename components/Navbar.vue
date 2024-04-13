<template>
    <div class="w-screen fixed z-40" @click="hamberBTN('screen')" @mousedown.prevent="handleMouseDown"
        @mouseup="handleMouseUp" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <div class="flex justify-between items-center h-[6.5vh] px-[15px] lg:px-[25px] xl:my-[20px]">
            <NuxtLink to="/">
                <h4 class="text-[18px] font-bold transition-colors duration-200 lg:text-[25px] 2xl:text-[35px]"
                    :class="{ 'text-[#02071A]': !pagesTheme, 'text-white': pagesTheme }">Nanami Bot</h4>
            </NuxtLink>

            <!-- Ham menu -->
            <button class="grid gap-1 mt-0 bg-transparent p-2 select-none lg:hidden" @click="hamberBTN('ham')">
                <span id="ham1"
                    :class="{ 'opacity-0': istoggle == true, 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }"
                    class="w-6 h-1 rounded-[10px] transition-all duration-200"></span>
                <span id="ham2"
                    :class="{ 'opacity-0': istoggle == true, 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }"
                    class="w-6 h-1 rounded-[10px] transition-all duration-200"></span>
                <span id="ham3"
                    :class="{ 'opacity-0': istoggle == true, 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }"
                    class="w-6 h-1 rounded-[10px] transition-all duration-200"></span>
            </button>

            <!-- Desktop Menu -->
            <div class="hidden h-full items-center lg:flex lg:justify-end lg:space-x-[20px] 2xl:space-x-[30px]">
                <div class="font-bold text-[18px] transition-all duration-200 2xl:text-[25px]"
                    :class="{ 'text-[#02071A]': !pagesTheme && path != '/', 'text-white': pagesTheme && path != '/', 'text-[#0099FF]': path == '/' }">
                    <NuxtLink to="/">
                        <h4>Home</h4>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[18px] transition-all duration-200 2xl:text-[25px]"
                    :class="{ 'text-[#02071A]': !pagesTheme && path != '/support', 'text-white': pagesTheme && path != '/support', 'text-[#0099FF]': path == '/support' }">
                    <NuxtLink to="/support">
                        <h4>Support</h4>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[18px] transition-all duration-200 2xl:text-[25px]"
                    :class="{ 'text-[#02071A]': !pagesTheme && path != '/partners', 'text-white': pagesTheme && path != '/partners', 'text-[#0099FF]': path == '/partners' }">
                    <NuxtLink to="/partners">
                        <h4>Partners</h4>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[18px] transition-all duration-200 2xl:text-[25px]"
                    :class="{ 'text-[#02071A]': !pagesTheme && path != '/developers', 'text-white': pagesTheme && path != '/developers', 'text-[#0099FF]': path == '/developers' }">
                    <NuxtLink to="/developers">
                        <h4>Developers</h4>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[18px] transition-all duration-200 2xl:text-[25px]"
                    :class="{ 'text-[#02071A]': !pagesTheme && path != '/commands', 'text-white': pagesTheme && path != '/commands', 'text-[#0099FF]': path == '/commands' }">
                    <NuxtLink to="/commands">
                        <h4>Commands</h4>
                    </NuxtLink>
                </div>
                <div class="space-x-[10px] h-full flex items-center">
                    <div class="w-[3px] h-[30px]" :class="{ 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }">
                    </div>

                    <NuxtLink class="fab fa-github text-[27px] 2xl:text-[33px]"
                        :class="{ 'text-[#02071A]': !pagesTheme, 'text-white': pagesTheme }"></NuxtLink>
                    <NuxtLink class="fab fa-discord text-[27px] 2xl:text-[33px]"
                        :class="{ 'text-[#02071A]': !pagesTheme, 'text-white': pagesTheme }"></NuxtLink>

                    <div class="w-[3px] h-[30px] " :class="{ 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }">
                    </div>
                </div>
                <div>
                    <NuxtLink v-if="!usr_name" to="/signin" class="fad fa-user text-[21px] 2xl:text-[30px]"
                        :class="{ 'text-[#02071A]': !pagesTheme, 'text-white': pagesTheme }">
                    </NuxtLink>
                    <div v-if="usr_name" class="flex w-full h-max justify-end items-center space-x-[10px] relative">
                        <div @click="toggleDropdown" class="cursor-pointer flex items-center space-x-[10px]">
                            <NuxtImg v-if="usr_avatar" class="w-[30px] rounded-full 2xl:w-[40px]" :src="usr_avatar"></NuxtImg>
                            <h6 class="font-bold text-[18px] transition-all duration-200 2xl:text-[25px]" :class="{ 'text-black': !pagesTheme, 'text-white': pagesTheme }">{{ `${usr_name}${usr_tag}` }}</h6>
                            <i class="fas fa-chevron-down transition-all duration-500" :class="{'rotate-180': dropdownOpen, 'text-black': !pagesTheme, 'text-white': pagesTheme}"></i>
                        </div>
                        <div v-show="dropdownOpen" class="absolute right-0 mt-[100px] py-2 w-48 rounded-md shadow-xl z-50 transition-all duration-200"
                            :class="{'opacity-100': dropdownOpen, 'opacity-0': !dropdownOpen, 'bg-black/20': !pagesTheme, 'bg-white/20': pagesTheme}">
                            <button @click="SignOut" class="block font-bold px-4 py-2 text-[16px] w-full" :class="{ 'text-black': !pagesTheme, 'text-white': pagesTheme }">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="w-sceeen flex justify-end fixed right-0 top-0 w-screen transition-all duration-200 lg:hidden"
            :class="{ 'translate-x-[0]': istoggle, 'translate-x-[100vw]': !istoggle }">
            <div class="space-y-[30px] bg-gradient-to-l from-[-20%] to-transparent h-screen rounded-l-[20px] text-end pr-[50px] pt-[100px] transition-all duration-200 overflow-y-scroll overflow-x-hidden"
                :class="{ 'w-0': !istoggle, 'w-[60%]': istoggle, 'from-white/5': pagesTheme, 'from-black/20': !pagesTheme }">
                <div class="font-bold text-[16px] transition-all duration-[500ms]"
                    :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle, 'text-[#02071A]': !pagesTheme && path != '/', 'text-white': pagesTheme && path != '/', 'text-[#0099FF]': path == '/' }">
                    <NuxtLink @click="hamberBTN('menu')" to="/">
                        <h6><i class="fas fa-home-alt mr-2"></i>Home</h6>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[16px] transition-all duration-[700ms]"
                    :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle, 'text-[#02071A]': !pagesTheme && path != '/support', 'text-white': pagesTheme && path != '/support', 'text-[#0099FF]': path == '/support' }">
                    <NuxtLink @click="hamberBTN('menu')" to="/support">
                        <h6><i class="far fa-dot-circle mr-2"></i>Support</h6>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[16px] transition-all duration-[900ms]"
                    :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle, 'text-[#02071A]': !pagesTheme && path != '/partners', 'text-white': pagesTheme && path != '/partners', 'text-[#0099FF]': path == '/partners' }">
                    <NuxtLink @click="hamberBTN('menu')" to="/partners">
                        <h6><i class="fad fa-hands-helping mr-2"></i>Partners</h6>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[16px] transition-all duration-[1100ms]"
                    :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle, 'text-[#02071A]': !pagesTheme && path != '/developers', 'text-white': pagesTheme && path != '/developers', 'text-[#0099FF]': path == '/developers' }">
                    <NuxtLink @click="hamberBTN('menu')" to="/developers">
                        <h6><i class="far fa-code mr-2"></i>Developers</h6>
                    </NuxtLink>
                </div>
                <div class="font-bold text-[16px] transition-all duration-[1300ms]"
                    :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle, 'text-[#02071A]': !pagesTheme && path != '/commands', 'text-white': pagesTheme && path != '/commands', 'text-[#0099FF]': path == '/commands' }">
                    <NuxtLink @click="hamberBTN('menu')" to="/commands">
                        <h6><i class="far fa-terminal mr-2"></i>Commands</h6>
                    </NuxtLink>
                </div>
                <div class="w-full space-y-[10px]">
                    <div class="w-full h-max flex justify-end">
                        <div class="w-[60%] h-[3px] transition-all duration-[1500ms]"
                            :class="{ 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }"></div>
                    </div>
                    <div class="space-x-[10px] transition-all duration-[1500ms]">

                        <NuxtLink class="fab fa-github text-[27px] transition-all duration-[1500ms]"
                            :class="{ 'text-[#02071A]': !pagesTheme, 'text-white': pagesTheme }"></NuxtLink>
                        <NuxtLink class="fab fa-discord text-[27px] transition-all duration-[1500ms]"
                            :class="{ 'text-[#02071A]': !pagesTheme, 'text-white': pagesTheme }"></NuxtLink>
                    </div>

                    <div class="w-full h-max flex justify-end">
                        <div class="w-[60%] h-[3px] transition-all duration-[1500ms]"
                            :class="{ 'bg-[#02071A]': !pagesTheme, 'bg-white': pagesTheme }"></div>
                    </div>
                </div>
                <div class="font-bold text-[16px] transition-all duration-[1300ms]"
                    :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle, 'text-[#02071A]': !pagesTheme && path != '/signin', 'text-white': pagesTheme && path != '/signin', 'text-[#0099FF]': path == '/signin' }">
                    <!-- SignIn -->
                    <NuxtLink v-if="!usr_name" @click="hamberBTN('menu')" to="/signin">
                        <h6><i class="fas fa-sign-in mr-2"></i>Sign In</h6>
                    </NuxtLink>
                    <!-- User Profile -->
                    <div v-if="usr_name" class="flex w-full h-max justify-end items-center space-x-[10px]">
                        <NuxtImg v-if="usr_avatar" class="w-[27px] rounded-full" :src="usr_avatar"></NuxtImg>
                        <h6 class="transition-all duration-[1300ms]" :class="{ 'text-black': !pagesTheme, 'text-white': pagesTheme }">{{ `${usr_name}${usr_tag}` }}</h6>
                    </div>
                    <!-- SignOut -->
                    <button v-if="usr_name" @click="hamberBTN('menu'), SignOut()">
                        <h6 class="transition-all duration-[1300ms]" :class="{ 'text-black': !pagesTheme, 'text-white': pagesTheme }"><i class="fas fa-sign-out mr-2"></i>Sign Out</h6>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Cookies from 'js-cookie';

const istoggle = ref(false);
let pagesTheme = ref();
let startX: number | null = null; // Store the starting position
const emit = defineEmits(['update:istoggle']);
const props = defineProps(['theme', 'scroll_value']);
const path = ref(useRoute().path);
let usr_name = ref(Cookies.get('usr_name'));
let usr_tag = ref(Cookies.get('usr_tag'));
let usr_avatar = ref(Cookies.get('usr_avatar'));
const dropdownOpen = ref(false);

//PageTheme Update
setInterval(() => {
    pagesTheme.value = props.theme;
}, 200);

let menuOpening = false;
function hamberBTN(from: string) {
    // Check if the menu is currently being toggled
    if (menuOpening) return; // Exit the function to prevent any further action while toggling is active

    // If menu is not currently toggling, proceed with toggling logic
    menuOpening = true; // Set flag to true to indicate toggling is starting
    if (istoggle.value === false && from === 'screen') {
        menuOpening = false; // Reset flag if no toggle action should happen
        return;
    }

    istoggle.value = !istoggle.value; // Toggle the istoggle value
    emit('update:istoggle', istoggle.value);

    setTimeout(() => {
        menuOpening = false; // Reset the flag after 1 second
    }, 1000);
}


function handleMouseDown(event: MouseEvent) {
    startX = event.clientX; // Store the X position when mouse is pressed down
    event.preventDefault(); // Prevent default drag behavior
}

function handleMouseUp(event: MouseEvent) {
    if (startX === null) return; // Check if startX is set

    const endX = event.clientX;
    const distance = endX - startX;
    if (distance > 50) { // Slide to the right detected
        istoggle.value = false;
        emit('update:istoggle', false);
    }
    startX = null; // Reset for the next action
}

function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    startX = touch.clientX;
}

function handleTouchEnd(event: TouchEvent) {
    if (startX === null) return; // Check if startX is set

    // Note: Changed to changedTouches for more accurate end position
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const distance = endX - startX;
    if (distance > 50) { // Slide to the right detected
        istoggle.value = false;
        emit('update:istoggle', false);
    }
    startX = null; // Reset for the next action
}
usr_tag.value = `#${usr_tag.value}`
if (usr_tag.value === '#0') usr_tag.value = '';

async function SignOut() {
    let CookieRemover = () => {
        Cookies.remove('usr_id');
        Cookies.remove('usr_name');
        Cookies.remove('usr_tag');
        Cookies.remove('usr_global_name');
        Cookies.remove('usr_avatar');

        usr_name = ref();
        usr_tag = ref();
        usr_avatar = ref();

        window.location.reload(); //reload if user stil on target page
    }

    try {
        await fetch('/api/auth/signout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usr_id: Cookies.get('usr_id')
            })
        });
        CookieRemover();
    } catch (e) {
        console.log(e)
        CookieRemover();
    }
}

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

</script>
