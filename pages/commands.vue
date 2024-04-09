<template>
    <div class="bg-black w-screen h-screen">
        <Navbar @update:istoggle="handleToggleMenu" :theme="true" />

        <div class="w-full h-[calc(100dvh)] pt-[60px] bg-[url('public/img/animegirl-bg.webp')] bg-cover bg-center overflow-hidden"
            :class="{ 'opacity-30': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="px-[20px] w-full h-full 2xl:px-[50px] 2xl:pt-[40px]">
                <h1 class="text-white text-[35px] font-bold mt-[50px] transition-all duration-[700ms] 2xl:text-[45px]"
                    :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                    Commands</h1>

                <div class="w-full h-[70%] bg-black/30 mt-[30px] px-[10px] pb-[10px] rounded-[10px] overflow-y-scroll transition-all duration-[1000ms] lg:flex lg:gap-[20px] lg:overflow-y-hidden"
                    :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                    <div
                        class="flex items-center w-full h-[53px] pt-[15px] space-x-[5px] overflow-x-scroll lg:block lg:h-full lg:w-[40%] lg:overflow-y-scroll lg:overflow-x-hidden lg:space-y-[10px] lg:space-x-0">
                        <button v-for="i in commandsDataList" @click="CurtCmdUpdate(i.message)"
                            class="w-max h-full px-[15px] rounded-[20px] flex items-center justify-center space-x-2 lg:h-[43px] lg:w-full lg:px-[20px] lg:justify-start"
                            :class="{ 'bg-[#0099FF] text-white': curtCmd === i.message, 'bg-white text-[#0099FF]': curtCmd !== i.message }">
                            <i :class="i.icon + ' text-[22px]'"></i>
                            <h4 class="text-[16px] font-bold">{{ i.message }}</h4>
                        </button>
                    </div>
                    <div class="h-[1px] w-full bg-white/50 mt-[10px] lg:h-full lg:w-[1px]"></div>
                    <div class="pt-[10px] space-y-[10px] lg:w-full lg:overflow-y-scroll">
                        <div v-for="command in commandsDataList.find(item => item.message === curtCmd)?.cmd"
                            :key="command?.name" class="mb-2">
                            <button @click="updateIsMenuToggle(command.name, curtCmd)"
                                class="w-full h-max min-h-[50px] bg-white rounded-[10px] flex items-center justify-start p-[10px] space-x-[10px] overflow-x-hidden">
                                <h4 class="text-[#0099FF] text-[16px] font-bold flex-1 truncate text-left">{{ command.name }}</h4>
                                <i class="fad fa-circle text-[#0099FF] flex-none mx-auto"></i>
                                <h4 class="text-black text-[16px] font-bold flex-1 text-left">{{ command.description }}
                                </h4>
                            </button>
                            <div class="bg-white/70 w-full rounded-b-[10px] translate-y-[-10px] transition-all duration-[500ms] overflow-x-hidden overflow-y-scroll"
                                :class="{ 'h-0': !command.isMenuToggle, 'h-[100px]': command.isMenuToggle }">
                                <div class="pt-[20px] p-[10px]"
                                    :class="{ 'hidden': !command.isMenuToggle, 'block': command.isMenuToggle }">
                                    <h4 class="text-[14px] font-bold">Example:</h4>
                                    <h4 class="text-[12px] w-full">{{ command.ex }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

//Change pageTheme
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#012262');
//Change Title
document.title = '(Commands) Nanami Bot ที่น่ารักสำหรับทุกคน';

//Variable setup
let curtCmd = ref('All'); //Set current command menu to "All" as default

//Animation Variables
let isOnMounted = ref(false);

onMounted(() => {
    //Animation Scripts
    setTimeout(() => {
        isOnMounted.value = true;
    }, 200);
});

let istoggleMenu = ref(false);

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}

function CurtCmdUpdate(category: string) {
    curtCmd.value = category;
}

//Commands Data
const commandsDataList = ref([
    {
        message: 'All',
        icon: 'fas fa-compass',
        cmd: [
            {
                name: '/anime bilibili-card',
                description: 'สร้างการ์ดอนิเมะจาก Bilibili',
                ex: '/anime bilibili-card [url หรือชื่ออนิเมะ]',
                isMenuToggle: false
            },
            {
                name: '/anime search',
                description: 'ค้นหาข้อมูลอนิเมะด้วยชื่อเรื่อง',
                ex: '/anime search [title]',
                isMenuToggle: false
            },
            {
                name: '/anime-daily',
                description: 'ส่งภาพอนิเมะผู้หญิงน่ารักในช่องของคุณทุกครั้งที่มีการอัพเดต',
                ex: '/anime-daily [setup]',
                isMenuToggle: false
            },
            {
                name: '/auto-delete',
                description: 'กำหนดเวลาลบข้อความอัตโนมัติในช่องของคุณ',
                ex: '/auto-delete [setup] [countdown]',
                isMenuToggle: false
            },
            {
                name: '/delmsg del-all',
                description: 'ลบข้อความในช่องแชท',
                ex: '/delmsg del-all [value]',
                isMenuToggle: false
            },
            {
                name: '/delmsg del-only',
                description: 'ลบข้อความในช่องแชทเฉพาะ User ที่กำหนด',
                ex: '/delmsg del-only [user] [value]',
                isMenuToggle: false
            },
            {
                name: '/clone setup',
                description: 'เมื่อกดแล้วจะสร้างช่องเสียงส่วนตัวใหม่เพื่อ user ที่กด',
                ex: '/clone setup [voice-channel]',
                isMenuToggle: false
            },
            {
                name: '/clone cancel',
                description: 'ยกเลิกฟังก์ชั่น clone',
                ex: '/clone cancel [voice-channel]',
                isMenuToggle: false
            },
            {
                name: '/in-out',
                description: 'รีพอร์ตการเข้าออก Voice Chat',
                ex: '/in-out [setup]',
                isMenuToggle: false
            },
            {
                name: '/welcome-msg',
                description: 'ส่งข้อความต้อนรับให้กับสมาชิกใหม่',
                ex: '/welcome-msg [setup]',
                isMenuToggle: false
            },
            {
                name: '/pay promptpay',
                description: 'Generate QR Promptpay',
                ex: '/pay promptpay [phone-or-id]',
                isMenuToggle: false
            },
            {
                name: '/pay debtor-regis',
                description: 'บันทึกลูกหนี้ที่ค้างเงินไว้ในลิสต์',
                ex: '/pay debtor-regis [deptor] [amount]',
                isMenuToggle: false
            },
            {
                name: '/pay debtor-list',
                description: 'แสดงรายการของผู้ที่ติดค้างเงินคุณอยู่',
                ex: '/pay debtor-list',
                isMenuToggle: false
            },
            {
                name: '/pay creditor-list',
                description: 'แสดงรายการของผู้ที่คุณติดเงินอยู่',
                ex: '/pay creditor-list',
                isMenuToggle: false
            },
            {
                name: '/pay paid',
                description: 'คืนเงินที่ยืมมาพร้อมแนบสลิป',
                ex: '/pay paid [creditor] [amount] optional:[slip-img]',
                isMenuToggle: false
            },
            {
                name: '/trns message',
                description: 'Translate your input message',
                ex: '/trns message [input] [target-lang] optional:[attachment]',
                isMenuToggle: false
            },
            {
                name: '/trns channel',
                description: 'Translate all message to target channel',
                ex: '/trns channel [main-channel] [target-channel] [main-lang] [target-lang]',
                isMenuToggle: false
            },
            {
                name: '/trns cancel',
                description: 'Cancel /trns channel',
                ex: '/trns cancel [target-channel]',
                isMenuToggle: false
            },
            {
                name: '/profile',
                description: 'สร้าง Profile ของผู้ใช้',
                ex: '/profile [user]',
                isMenuToggle: false
            },
            {
                name: '/speak',
                description: 'สั่งให้นานามิพูด',
                ex: '/speak [text]',
                isMenuToggle: false
            },
            {
                name: '/ping',
                description: 'ping test',
                ex: '/ping',
                isMenuToggle: false
            },
            {
                name: '/status',
                description: 'Nanami Status',
                ex: '/status',
                isMenuToggle: false
            }
        ]
    },
    {
        message: 'Anime',
        icon: 'far fa-heart',
        cmd: [
            {
                name: '/anime bilibili-card',
                description: 'สร้างการ์ดอนิเมะจาก Bilibili',
                ex: '/anime bilibili-card [url หรือชื่ออนิเมะ]',
                isMenuToggle: false
            },
            {
                name: '/anime search',
                description: 'ค้นหาข้อมูลอนิเมะด้วยชื่อเรื่อง',
                ex: '/anime search [title]',
                isMenuToggle: false
            },
            {
                name: '/anime-daily',
                description: 'ส่งภาพอนิเมะผู้หญิงน่ารักในช่องของคุณทุกครั้งที่มีการอัพเดต',
                ex: '/anime-daily [setup]',
                isMenuToggle: false
            },
        ]
    },
    {
        message: 'Moderation',
        icon: 'far fa-user-secret',
        cmd: [
            {
                name: '/auto-delete',
                description: 'กำหนดเวลาลบข้อความอัตโนมัติในช่องของคุณ',
                ex: '/auto-delete [setup] [countdown]',
                isMenuToggle: false
            },
            {
                name: '/delmsg del-all',
                description: 'ลบข้อความในช่องแชท',
                ex: '/delmsg del-all [value]',
                isMenuToggle: false
            },
            {
                name: '/delmsg del-only',
                description: 'ลบข้อความในช่องแชทเฉพาะ User ที่กำหนด',
                ex: '/delmsg del-only [user] [value]',
                isMenuToggle: false
            },
            {
                name: '/clone setup',
                description: 'เมื่อกดแล้วจะสร้างช่องเสียงส่วนตัวใหม่เพื่อ user ที่กด',
                ex: '/clone setup [voice-channel]',
                isMenuToggle: false
            },
            {
                name: '/clone cancel',
                description: 'ยกเลิกฟังก์ชั่น clone',
                ex: '/clone cancel [voice-channel]',
                isMenuToggle: false
            },
            {
                name: '/in-out',
                description: 'รีพอร์ตการเข้าออก Voice Chat',
                ex: '/in-out [setup]',
                isMenuToggle: false
            },
            {
                name: '/welcome-msg',
                description: 'ส่งข้อความต้อนรับให้กับสมาชิกใหม่',
                ex: '/welcome-msg [setup]',
                isMenuToggle: false
            }
        ]
    },
    {
        message: 'Pay',
        icon: 'far fa-wallet',
        cmd: [
            {
                name: '/pay promptpay',
                description: 'Generate QR Promptpay',
                ex: '/pay promptpay [phone-or-id]',
                isMenuToggle: false
            },
            {
                name: '/pay debtor-regis',
                description: 'บันทึกลูกหนี้ที่ค้างเงินไว้ในลิสต์',
                ex: '/pay debtor-regis [deptor] [amount]',
                isMenuToggle: false
            },
            {
                name: '/pay debtor-list',
                description: 'แสดงรายการของผู้ที่ติดค้างเงินคุณอยู่',
                ex: '/pay debtor-list',
                isMenuToggle: false
            },
            {
                name: '/pay creditor-list',
                description: 'แสดงรายการของผู้ที่คุณติดเงินอยู่',
                ex: '/pay creditor-list',
                isMenuToggle: false
            },
            {
                name: '/pay paid',
                description: 'คืนเงินที่ยืมมาพร้อมแนบสลิป',
                ex: '/pay paid [creditor] [amount] optional:[slip-img]',
                isMenuToggle: false
            },
        ]
    },
    {
        message: 'Translator',
        icon: 'far fa-language',
        cmd: [
            {
                name: '/trns message',
                description: 'Translate your input message',
                ex: '/trns message [input] [target-lang] optional:[attachment]',
                isMenuToggle: false
            },
            {
                name: '/trns channel',
                description: 'Translate all message to target channel',
                ex: '/trns channel [main-channel] [target-channel] [main-lang] [target-lang]',
                isMenuToggle: false
            },
            {
                name: '/trns cancel',
                description: 'Cancel /trns channel',
                ex: '/trns cancel [target-channel]',
                isMenuToggle: false
            },
        ]
    }
]);


function updateIsMenuToggle(commandName: string, currentCategory: string) {
    // Find the command group that matches the currentCategory
    const category = commandsDataList.value.find(item => item.message === currentCategory);

    // Proceed only if the category is found
    if (category) {
        // Find the specific command within this category by name
        const subCommand = category.cmd.find(subCmd => subCmd.name === commandName);

        // If the sub-command is found, toggle its isMenuToggle property
        if (subCommand) {
            subCommand.isMenuToggle = !subCommand.isMenuToggle;
        }
    }
}

</script>