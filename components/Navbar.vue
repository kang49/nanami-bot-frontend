<template>
    <div class="w-screen h-[60px] fixed z-40" @click="hamberBTN('screen')" @mousedown.prevent="handleMouseDown" @mouseup="handleMouseUp"
        @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <div class="flex justify-between items-center h-[60px] px-[15px]">
            <NuxtLink>
                <h4 class="text-white text-[16px] font-bold">Nanami Bot</h4>
            </NuxtLink>

            <button class="lg:hidden grid gap-1 mt-0 bg-transparent p-2 select-none" @click="hamberBTN('ham')">
                <span id="ham1" :class="{ 'opacity-0': istoggle == true }"
                    class="w-6 h-1 bg-white rounded-[10px] transition-all duration-200"></span>
                <span id="ham2" :class="{ 'opacity-0': istoggle == true }"
                    class="w-6 h-1 bg-white rounded-[10px] transition-all duration-200"></span>
                <span id="ham3" :class="{ 'opacity-0': istoggle == true }"
                    class="w-6 h-1 bg-white rounded-[10px] transition-all duration-200"></span>
            </button>
        </div>
        <div class="w-sceeen flex justify-end fixed right-0 top-0 w-screen transition-all duration-200"
            :class="{ 'translate-x-[0]': istoggle, 'translate-x-[100vw]': !istoggle }">
            <div class="lg:hidden space-y-[30px] bg-gradient-to-l from-white/5 from-[-20%] to-transparent h-screen rounded-l-[20px] text-end pr-[50px] pt-[100px] transition-all duration-200 overflow-hidden"
                :class="{ 'w-0': !istoggle, 'w-[60%]': istoggle }">
                <div class="text-white transition-opacity duration-[500ms]" :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle }">
                    <NuxtLink @click="hamberBTN('menu')" to="/">
                        <h6><i class="fas fa-home-alt mr-2"></i>Home</h6>
                    </NuxtLink>
                </div>
                <div class="text-white transition-opacity duration-[700ms]" :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle }">
                    <NuxtLink @click="hamberBTN('menu')" to="/">
                        <h6><i class="far fa-dot-circle mr-2"></i>Support</h6>
                    </NuxtLink>
                </div>
                <div class="text-white transition-opacity duration-[1100ms]" :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle }">
                    <NuxtLink @click="hamberBTN('menu')" to="/">
                        <h6><i class="fad fa-hands-helping mr-2"></i>Partners</h6>
                    </NuxtLink>
                </div>
                <div class="text-white transition-opacity duration-[900ms]" :class="{ 'opacity-100': istoggle, 'opacity-0': !istoggle }">
                    <NuxtLink @click="hamberBTN('menu')" to="/">
                        <h6><i class="far fa-code mr-2"></i>Developers</h6>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const istoggle = ref(false);
let startX: number | null = null; // Store the starting position


let menuOpening = false;
function hamberBTN(from: string) {
    //ถ้าเมนูกำลังเปิด แต่มีคำสั่งปิดให้เปิดต่อไป
    if (menuOpening) return istoggle.value = true;
    if (istoggle.value === false && from === 'screen') return;
    istoggle.value = !istoggle.value;
    console.log(istoggle.value);
    menuOpening = true;
    setTimeout(() => {
        menuOpening = false;
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
    }
    startX = null; // Reset for the next action
}
</script>
