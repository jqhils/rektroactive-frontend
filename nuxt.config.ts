// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vue-dapp/nuxt'
  ],
  css: [
    '@/assets/css/main.css',
  ],
  devtools: { enabled: true },
})
