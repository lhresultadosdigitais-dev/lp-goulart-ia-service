<template>
  <div class="audio-recorder">
    <button @click="startRecording" :disabled="isRecording" class="record-button">
      {{ isRecording ? 'Recording...' : 'Record Audio' }}
    </button>
    <button @click="stopRecording" :disabled="!isRecording" class="stop-button">
      Stop Recording
    </button>
    <audio v-if="audioUrl" :src="audioUrl" controls class="audio-preview"></audio>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const isRecording = ref(false);
    const audioUrl = ref<string | null>(null);
    let mediaRecorder: MediaRecorder | null = null;
    const audioChunks: Blob[] = [];

    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      isRecording.value = true;

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioUrl.value = URL.createObjectURL(audioBlob);
        audioChunks.length = 0; // Clear the chunks for the next recording
      };
    };

    const stopRecording = () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        isRecording.value = false;
      }
    };

    return {
      isRecording,
      audioUrl,
      startRecording,
      stopRecording,
    };
  },
};
</script>

<style scoped>
.audio-recorder {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
}

.record-button,
.stop-button {
  background-color: #1e1e2f;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.record-button:hover:not(:disabled),
.stop-button:hover:not(:disabled) {
  background-color: #3a3a5a;
}

.audio-preview {
  margin-top: 1rem;
}
</style>