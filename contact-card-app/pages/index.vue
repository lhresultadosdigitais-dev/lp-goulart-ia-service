<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    <ContactCard 
      name="John Doe" 
      introduction="Welcome to my contact card! Feel free to leave a message." 
    />
    <AudioRecorder />
    <ContactForm />
  </div>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue';
import AudioRecorder from '@/components/AudioRecorder.vue';
import ContactForm from '@/components/ContactForm.vue';

export default {
  components: {
    ContactCard,
    AudioRecorder,
    ContactForm
  }
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>