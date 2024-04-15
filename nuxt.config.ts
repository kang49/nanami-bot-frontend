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
  plugins: [
    { src: '~/src/check_session_exp.ts', mode: 'client' }
  ],
  modules: ["@nuxtjs/tailwindcss", '@nuxt/image', 'nuxt-primevue'],
  css: ['~/assets/styles.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
      meta: [
        { name: 'theme-color', content: '#02071A' },
        { hid: 'description', name: 'description',  content: 'นานามิบอท (Nanami Bot) เป็นบอทดิสคอร์ดที่น่ารักที่สุด บอทดิสคอร์ดแนวอนิเมะที่จะพัฒนาขึ้นโดย Meta_Keen Developer คนไทย บอทแนวอนิเมะที่มีคาแร็คเตอร์น่ารัก Nanami Bot มีคำสั่งมากมาย ดูหน้าคำสั่ง "https://nanami.tensormik.com/commands" นานามิเป็นบอทที่มี Dashboard สำหรับจัดการฟังก์ชั่นของบอทในเว็บไซต์ หรือไม่ว่าจะโคลนห้อง, log คนเข้าออก, หรือจัดการการซื้อขายสินค้าใน Discord ด้วยฟังก์ชั่น Payments, ส่งภาพ Anime Girl ที่น่ารักที่สุด ภาพอัพเดตล่าสุดให้คุณทุกวัน, ฟังก์ชั่นแปลภาษา auto แบบไม่ต้องใช้ /command ตลอดก็สามารถทำได้เช่นกัน เชิญบอทเลยคอนนี้เพื่อรับประสบการณ์ของโลกเวทย์มนต์' },
        { hid: 'keywords', name: 'keywords', content: 'บอทดิสคอร์ด, นานามิ, Nanami, Discord Bot, Nanami Bot, บอทนานามิ, บอทอนิเมะ' },
        // Add Open Graph meta tags
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: 'https://nanami.tensormik.com' },
        { hid: 'og:title', property: 'og:title', content: 'Nanami Bot ที่น่ารักสำหรับทุกคน' },
        { hid: 'og:description', property: 'og:description',  content: 'นานามิบอท (Nanami Bot) บอทดิสคอร์ดที่น่ารักที่สุด...' },
        { hid: 'og:image', property: 'og:image', content: 'https://camo.githubusercontent.com/28d0a3d990d90946fcfc4966029186b2d6918d56b6164cc1f220c6163ff7e340/68747470733a2f2f692e696d6775722e636f6d2f344530364d67702e706e67' },
        // Add Twitter Card meta tags
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:url', name: 'twitter:url', content: 'https://nanami.tensormik.com' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Nanami Bot ที่น่ารักสำหรับทุกคน' },
        { hid: 'twitter:description', name: 'twitter:description',  content: 'นานามิบอท (Nanami Bot) บอทดิสคอร์ดที่น่ารักที่สุด...' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://camo.githubusercontent.com/28d0a3d990d90946fcfc4966029186b2d6918d56b6164cc1f220c6163ff7e340/68747470733a2f2f692e696d6775722e636f6d2f344530364d67702e706e67' },

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
    GITHUBKEY: process.env.NUXT_GITHUBKEY,
    IMGUR_CLIEND_ID: process.env.NUXT_IMGUR_CLIEND_ID,
  }
});