import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  plugins: [
    '@/plugins/supabase.client.ts'
  ],
  build: {
    transpile: ['@supabase/supabase-js']
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})