<template>
  <div class="contact-card bg-gray-900 text-white p-4 rounded-lg shadow-lg">
    <img :src="photo" alt="User Photo" class="w-24 h-24 rounded-full mx-auto mb-4" />
    <h2 class="text-xl font-bold text-center">{{ name }}</h2>
    <p class="text-center mb-4">{{ introduction }}</p>
    <audio-recorder @recordingComplete="handleRecordingComplete" />
    <contact-form @submit="handleSubmit" />
  </div>
</template>

<script>
import AudioRecorder from './AudioRecorder.vue';
import ContactForm from './ContactForm.vue';

export default {
  components: {
    AudioRecorder,
    ContactForm,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      default: 'Welcome to my contact card!',
    },
  },
  methods: {
    handleRecordingComplete(audioBlob) {
      // Handle the completed audio recording (e.g., save it or send it)
    },
    handleSubmit(formData) {
      // Handle form submission (e.g., send data to API)
    },
  },
};
</script>

<style scoped>
.contact-card {
  max-width: 400px;
  margin: auto;
}
</style>