<template>
    <div class="w-full h-full bg-gradient-to-r from-[#0099FF]/10 to-transparent">
        <div class="w-full h-full pt-[70px]">
            <div class="w-full h-max grid grid-cols-3 text-white px-[20px]">
                <div>
                    <button @click="BackPageBTNHandler" class="fas fa-chevron-right text-[30px]"></button>
                </div>
                <div class="w-full flex justify-center">
                    <h3 class="text-[22px] font-bold">บัญชี</h3>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

//Variable set
let isOnMounted = ref(false);
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
</script>