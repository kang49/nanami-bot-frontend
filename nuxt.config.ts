// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  experimental: {
    payloadExtraction: false,
  },
  components: {
    dirs: ["~/components"],
  },
  modules: ["@nuxtjs/tailwindcss", '@nuxt/image'],
  css: ['~/assets/styles.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
      meta: [
        { name: 'theme-color', content: '#02071A' },
        { hid: 'description', name: 'description', content: 'นานามิบอท (Nanami Bot) เป็นบอทดิสคอร์ดที่น่ารักที่สุด บอทดิสคอร์ดแนวอนิเมะที่จะพัฒนาขึ้นโดย Meta_Keen Developer คนไทย บอทแนวอนิเมะที่มีคาแร็คเตอร์น่ารัก Nanami Bot มีคำสั่งมากมาย ดูหน้าคำสั่ง "https://nanami.tensormik.com/commands" นานามิเป็นบอทที่มี Dashboard สำหรับจัดการฟังก์ชั่นของบอทในเว็บไซต์ หรือไม่ว่าจะโคลนห้อง, log คนเข้าออก, หรือจัดการการซื้อขายสินค้าใน Discord ด้วยฟังก์ชั่น Payments, ส่งภาพ Anime Girl ที่น่ารักที่สุด ภาพอัพเดตล่าสุดให้คุณทุกวัน, ฟังก์ชั่นแปลภาษา auto แบบไม่ต้องใช้ /command ตลอดก็สามารถทำได้เช่นกัน เชิญบอทเลยคอนนี้เพื่อรับประสบการณ์ของโลกเวทย์มนต์' },
        { hid: 'keywords', name: 'keywords', content: 'บอทดิสคอร์ด, นานามิ, Nanami, Discord Bot, Nanami Bot, บอทนานามิ, บอทอนิเมะ' },
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        { hid: 'content-type', 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
        { hid: 'language', name: 'language', content: 'English, Thai' },
        { hid: 'revisit-after', name: 'revisit-after', content: '7 days' },
        { hid: 'author', name: 'author', content: 'Meta_Keen' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.15.4/css/all.css' }
      ],
      title: 'Nanami Bot ที่น่ารักสำหรับทุกคน',
      script: [],
    },
  },
  runtimeConfig: {
    GITHUBKEY: '',
    IMGUR_CLIEND_ID: '',
    public: {
      port: process.env.PORT
    }
  }
});