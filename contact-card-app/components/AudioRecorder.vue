<template>
  <div class="audio-recorder">
    <button @click="startRecording" :disabled="isRecording">Record</button>
    <button @click="stopRecording" :disabled="!isRecording">Stop</button>
    <button @click="playRecording" :disabled="!audioUrl">Play</button>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaRecorder: null,
      audioChunks: [],
      audioUrl: null,
      isRecording: false,
    };
  },
  methods: {
    async startRecording() {
      this.audioChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.isRecording = true;

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.isRecording = false;
      };
    },
    stopRecording() {
      this.mediaRecorder.stop();
    },
    playRecording() {
      const audio = new Audio(this.audioUrl);
      audio.play();
    },
  },
};
</script>

<style scoped>
.audio-recorder {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
}
button {
  margin: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:disabled {
  background-color: #555;
  cursor: not-allowed;
}
</style>