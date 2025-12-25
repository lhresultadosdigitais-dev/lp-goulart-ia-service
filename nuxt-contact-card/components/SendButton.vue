<template>
  <button 
    @click="handleSend" 
    class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
  >
    Send
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSupabase } from '@/composables/useSupabase';

export default defineComponent({
  name: 'SendButton',
  setup() {
    const { sendContactData } = useSupabase();

    const handleSend = async () => {
      // Logic to gather data and send it
      const data = {
        // Replace with actual data collection logic
        text: 'User input text',
        audio: 'User audio data',
      };
      await sendContactData(data);
    };

    return {
      handleSend,
    };
  },
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>