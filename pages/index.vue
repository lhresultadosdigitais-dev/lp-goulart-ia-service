<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <div class="container mx-auto px-4 py-8 max-w-md">
      <ContactCard 
        name="Luiz Henrique Goulart" 
        photo="/luiz-photo.jpg"
        introduction="Olá! Seja bem-vindo(a). Mande seu recado por texto ou áudio. Inclua seu número de WhatsApp para gente se falar melhor."
        whatsapp="(17) 99610-2790"
      />
    </div>
  </div>
</template>

<script setup>
import ContactCard from '@/components/ContactCard.vue'

// Meta tags para SEO
useHead({
  title: 'Luiz Henrique Goulart - Cartão de Contato',
  meta: [
    { name: 'description', content: 'Entre em contato com Luiz Henrique Goulart através do nosso moderno cartão de contato digital.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
})
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>