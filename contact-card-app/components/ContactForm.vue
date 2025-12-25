<template>
  <div class="contact-form">
    <input
      v-model="message"
      type="text"
      placeholder="Type your message..."
      class="message-input"
    />
    <AudioRecorder @recordingComplete="handleRecordingComplete" />
    <button @click="submitForm" class="send-button">Send</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useSupabase } from '@/composables/useSupabase';

export default {
  setup() {
    const message = ref('');
    const { insertContact } = useSupabase();

    const handleRecordingComplete = (audioBlob) => {
      // Handle the audio blob as needed
    };

    const submitForm = async () => {
      if (message.value.trim()) {
        const { error } = await insertContact({ message: message.value });
        if (error) {
          console.error('Error inserting contact:', error);
        } else {
          message.value = ''; // Clear the input after submission
        }
      }
    };

    return {
      message,
      handleRecordingComplete,
      submitForm,
    };
  },
};
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
}

.message-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>