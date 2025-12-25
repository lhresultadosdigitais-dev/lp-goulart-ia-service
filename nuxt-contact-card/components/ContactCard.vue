<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <img
      src="@/assets/images/profile.jpg"
      alt="Profile Photo"
      class="w-32 h-32 rounded-full mb-4"
    />
    <h1 class="text-2xl font-bold mb-2">Welcome to My Contact Card</h1>
    <p class="text-center mb-4">
      Hi! I'm excited to connect with you. Please leave your message below.
    </p>
    <textarea
      v-model="message"
      placeholder="Type your message here..."
      class="w-full h-24 p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white"
    ></textarea>
    <AudioRecorder @recorded="onAudioRecorded" />
    <SendButton @click="sendContactInfo" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import AudioRecorder from './AudioRecorder.vue';
import SendButton from './SendButton.vue';
import { useSupabase } from '@/composables/useSupabase';

export default {
  components: {
    AudioRecorder,
    SendButton,
  },
  setup() {
    const message = ref('');
    const audioBlob = ref(null);
    const { sendContactData } = useSupabase();

    const onAudioRecorded = (blob: Blob) => {
      audioBlob.value = blob;
    };

    const sendContactInfo = async () => {
      if (!message.value && !audioBlob.value) {
        alert('Please provide a message or record audio.');
        return;
      }
      await sendContactData({ message: message.value, audio: audioBlob.value });
      message.value = '';
      audioBlob.value = null;
    };

    return {
      message,
      onAudioRecorded,
      sendContactInfo,
    };
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>