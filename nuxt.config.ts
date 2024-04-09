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
        { hid: 'description', name: 'description', content: 'นานามิบอทเป็นบอทดิสคอร์ดที่น่ารักที่สุด' },
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