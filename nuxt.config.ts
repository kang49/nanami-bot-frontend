// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
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
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
      meta: [
        { name: 'theme-color', content: '#1cb7d9' },
        { hid: 'description', name: 'description', content: 'Share anime from Bilibili to social | instagram | facebook story.' },
        { hid: 'keywords', name: 'keywords', content: 'Share Bilibili, Share anime, anime, Bilibili, Share anime to instragram, แชร์อนิเมะลงไอจี, แชร์อนิเมะ, แชร์ bilibili, แชร์อนิเมะแบบ apple music' },
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        { hid: 'content-type', 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
        { hid: 'language', name: 'language', content: 'English' },
        { hid: 'revisit-after', name: 'revisit-after', content: '7 days' },
        { hid: 'author', name: 'author', content: 'Kankawee Aramrak' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.15.4/css/all.css' }
      ],
      title: 'Nanami Bot ที่น่ารักสำหรับทุกคน',
      script: [],
    },
    
  }
});