// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  plugins: [
    '@/plugins/supabase.client.js',
  ],
  build: {
    transpile: ['@supabase/supabase-js'],
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      charset: 'utf-8',
      meta: [
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  }
})