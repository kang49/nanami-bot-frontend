<template>
    <div class="bg-black w-full h-[calc(100dvh)]">
        <Navbar @update:istoggle="handleToggleMenu" :theme="true" />

        <div
            class="w-full h-[calc(100dvh)] bg-[url('public/img/support_bg_tr80.webp')] bg-cover bg-center overflow-hidden transition-all duration-1000" :class="{ 'opacity-50': istoggleMenu, 'opacity-100': !istoggleMenu }">
            <div class="w-full h-full flex items-center">
                <div class="px-[20px] w-full h-[90%]">
                    <h1 class="text-white text-[35px] font-bold mt-[40px] transition-all duration-[700ms] 2xl:text-[45px]" :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">Support</h1>
                    <div class="w-full h-[80%] mt-[30px] p-[20px] rounded-[20px] bg-black/40 overflow-y-scroll transition-all duration-[1000ms] lg:w-[35%]" :class="{ 'translate-y-[100vw] opacity-0': !isOnMounted, 'translate-y-[0] opacity-100': isOnMounted }">
                        <div class="w-full flex justify-center items-center mb-[30px]">
                            <h4 class="text-[20px] text-white 2xl:text-[26px]">หนูทำอะไรผิดไปหรือเปล่าคะ 😢</h4>
                        </div>
                        <div class="w-full space-y-[10px]">
                            <div
                                    class="flex items-center w-full h-max space-x-[5px] overflow-x-scroll">
                                    <button v-for="i in labellist" @click="CurtLabelUpdate(i.message)"
                                        class="min-w-max h-max py-[5px] px-[10px] rounded-[20px] flex items-center justify-center space-x-2"
                                        :class="{ 'bg-[#0099FF] text-white': curtLabel === i.message, 'bg-white text-[#0099FF]': curtLabel !== i.message }">
                                        <i :class="i.icon + ' text-[18px]'"></i>
                                        <h4 class="text-[16px] 2xl:text-[20px]">{{ i.message }}</h4>
                                    </button>
                                </div>
                            <input v-model="title"
                                class="bg-black/35 w-full h-max rounded-[10px] px-[10px] py-[5px] text-white text-[18px] placeholder:text-white/50 focus:outline-[2px] focus:outline-white 2xl:text-[23px]"
                                placeholder="หัวข้อ">
                            <textarea v-model="description"
                                class="bg-black/35 w-full h-[100px] rounded-[10px] px-[10px] pt-[5px] text-white text-[18px] placeholder:text-white/50 focus:outline-[2px] focus:outline-white resize-none 2xl:text-[23px]"
                                placeholder="อธิบายให้หนูหน่อย"></textarea>
                                <div>
                                    <div>
                                        <button class="bg-black/35 w-full h-max rounded-[10px] flex justify-start items-center px-[10px] py-[5px]"
                                                @click="openFileDialog">
                                            <!-- Dynamically update this text based on files.length -->
                                            <h4 class="text-[18px] 2xl:text-[23px]" :class="{ 'text-white/50': files?.length <= 0, 'text-white': files.length > 0 }">
                                                {{ files?.length > 0 ? `เพิ่มแล้ว ${files.length} ภาพ` : 'เพิ่มรูปภาพ' }}
                                            </h4>
                                            <i class="fas fa-cloud-upload ml-2 text-[20px] 2xl:text-[25px]" :class="{ 'text-white/50': files?.length <= 0, 'text-white': files.length > 0 }"></i>
                                        </button>

                                        <!-- Hidden file input -->
                                        <input
                                        ref="fileInput"
                                        type="file"
                                        class="hidden"
                                        multiple
                                        @change="handleFiles"
                                        accept="image/*"
                                        />
                                    </div>
                                </div>
                            <input v-model="contact" @click="AddDefContact()"
                                class="bg-black/35 w-full h-max rounded-[10px] px-[10px] py-[5px] text-white text-[18px] placeholder:text-white/50 focus:outline-[2px] focus:outline-white 2xl:text-[23px]"
                                placeholder="ช่องทางติดต่อกลับ สาธารณะ! (ไม่จำเป็น)">
                                <VueDatePicker class="touch-manipulation vdp_custom pb-[15px]" dark v-model="date" time-picker-inline
                                @open="onPickerOpen" @closed="onPickerClosed">
                                <template #trigger>
                                    <div class="bg-black/35 w-full h-max rounded-[10px] px-[10px] py-[5px] text-[18px] text-white 2xl:text-[23px]"
                                        :class="{ 'ring-0 ring-white': !isOnTimePickerOpen, 'ring-[3px] ring-white': isOnTimePickerOpen }">
                                        {{
                                            date.toLocaleString('en-US', {
                                                day: '2-digit', // แสดงวันที่เป็น 2 หลัก
                                                month: '2-digit', // แสดงเดือนเป็น 2 หลัก
                                                year: 'numeric', // แสดงปีเต็ม
                                                hour: '2-digit', // แสดงชั่วโมงเป็น 2 หลัก
                                                minute: '2-digit', // แสดงนาทีเป็น 2 หลัก
                                                hour12: false // ใช้ระบบ 24 ชั่วโมง
                                                })
                                        }}
                                    </div>
                                </template>
                            </VueDatePicker>
                        </div>
                        <div class="w-full h-max flex justify-center mt-[20px]">
                            <button @click="SendGHIssue(title, description, images_base64, date, contact, curtLabel)"
                                class="flex justify-center items-center bg-[#0099FF] w-max h-max py-[5px] px-[10px] rounded-[20px]">
                                <i class="fas fa-paper-plane mr-2 text-white text-[18px]"></i>
                                <h4 class="text-white text-[18px] font-bold 2xl:text-[23px]">ฟ้องเจ้านาย</h4>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Cookies from 'js-cookie';

//Variable set
let istoggleMenu = ref(false);
let isOnMounted = ref(false);
let isOnTimePickerOpen = ref(false);

const fileInput = ref<HTMLInputElement | null>(null);
let files = ref<File[]>([]);
    const labellist = ref([
    {
        message: 'bug',
        icon: 'fas fa-bug'
    },
    {
        message: 'UI',
        icon: 'fas fa-quidditch'
    },
    {
        message: 'request',
        icon: 'fas fa-hand-paper'
    }
]);
let curtLabel = ref('bug'); //Set current Label to "Bug" as default

//FromData
let title = ref('');
let description = ref('');
let images_base64 = ref();
const date = ref(new Date());
let contact = ref('');

function handleToggleMenu(value: boolean) {
    istoggleMenu.value = value;
}
onMounted(() => {
    //Animation Scripts
    setTimeout(async () => {
        //Change pageTheme
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#31577B');
        //Change Title
        document.title = '(Support) Nanami Bot ที่น่ารักสำหรับทุกคน';
        isOnMounted.value = true;
    }, 200);
});

function CurtLabelUpdate(label: string) {
    curtLabel.value = label;
}
function openFileDialog() {
  fileInput.value?.click();
}

function handleFiles() {
    if (!fileInput.value?.files) return;

    // Assign directly to files ref for reactivity
    files.value = Array.from(fileInput.value.files);

    const base64Promises = files.value.map((file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            
            reader.readAsDataURL(file);
        });
    });

    Promise.all(base64Promises)
        .then(base64Files => {
            // You might want to store these base64 strings as before
            images_base64.value = base64Files;
        })
        .catch(console.error);
}
const onPickerOpen = () => {
    isOnTimePickerOpen.value = true;
}
const onPickerClosed = () => {
    isOnTimePickerOpen.value = false;
}

function AddDefContact() {
    if (Cookies.get('usr_name')) {
        let usr_tag: string = `#${Cookies.get('usr_tag')}`;
        if (usr_tag === '#0') usr_tag = '';
        contact.value = `Discord ${Cookies.get('usr_name')}${usr_tag}`
    }
}

async function SendGHIssue(title: string, description: string, img: any, date: Date, contact: string, labels: string) {
    if (!title || !description || !date) return alert('โปรดกรอกข้อมูลให้ครบถ้วน')
    ClearFormData();
    await fetch(`/api/sendGithubIssue`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            images: img,
            date: date,
            contact: contact,
            labels: labels
        })
    });
}
function ClearFormData() {
    title.value = '';
    description.value = '';
    images_base64 = ref();
    files = ref<File[]>([]);
    date.value = new Date();
    contact.value = '';
    curtLabel.value = 'bug';
}
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