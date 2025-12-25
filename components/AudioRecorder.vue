<template>
  <div class="audio-recorder">
    <!-- Botão principal de gravação -->
    <div class="record-button-container">
      <button 
        @click="toggleRecording" 
        :class="['record-button', { 'recording': isRecording, 'has-recording': audioUrl }]"
        :disabled="isPlaying"
      >
        <div class="record-button-inner">
          <svg v-if="!isRecording" class="mic-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v1a7 7 0 0 1-14 0v-1a1 1 0 0 1 2 0v1a5 5 0 0 0 10 0v-1a1 1 0 0 1 2 0Z"/>
            <path d="M12 18.5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1Z"/>
          </svg>
          
          <div v-else class="recording-indicator">
            <div class="pulse-dot"></div>
          </div>
        </div>
        
        <!-- Anéis de animação durante gravação -->
        <div v-if="isRecording" class="recording-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>
      </button>
      
      <!-- Texto do status -->
      <p class="status-text">
        <span v-if="!isRecording && !audioUrl">Toque para gravar áudio</span>
        <span v-else-if="isRecording">Gravando... Toque para parar</span>
        <span v-else-if="audioUrl && !isPlaying">Áudio gravado - Toque para gravar novamente</span>
        <span v-else-if="isPlaying">Reproduzindo áudio...</span>
      </p>
    </div>

    <!-- Player de áudio (aparece após gravação) -->
    <div v-if="audioUrl" class="audio-player">
      <button @click="playRecording" :disabled="isRecording" class="play-button">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      
      <div class="audio-info">
        <div class="wave-form">
          <div class="wave-bar" v-for="n in 20" :key="n"></div>
        </div>
        <span class="duration">{{ formatDuration(recordingDuration) }}</span>
      </div>
      
      <button @click="deleteRecording" class="delete-button">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
        </svg>
      </button>
    </div>

    <!-- Áudio oculto para reprodução -->
    <audio 
      ref="audioElement" 
      v-if="audioUrl" 
      :src="audioUrl" 
      @ended="isPlaying = false"
      @loadedmetadata="updateDuration"
    ></audio>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const emit = defineEmits(['recordingComplete'])

// Estado reativo
const mediaRecorder = ref(null)
const audioChunks = ref([])
const audioUrl = ref(null)
const audioBlob = ref(null)
const isRecording = ref(false)
const isPlaying = ref(false)
const recordingDuration = ref(0)
const audioElement = ref(null)
const recordingStartTime = ref(null)
const durationInterval = ref(null)

// Métodos
const toggleRecording = async () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    await startRecording()
  }
}

const startRecording = async () => {
  try {
    // Limpar gravação anterior
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value)
      audioUrl.value = null
      audioBlob.value = null
    }
    
    audioChunks.value = []
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    mediaRecorder.value = new MediaRecorder(stream)
    recordingStartTime.value = Date.now()
    
    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }

    mediaRecorder.value.onstop = () => {
      const blob = new Blob(audioChunks.value, { type: 'audio/webm' })
      audioBlob.value = blob
      audioUrl.value = URL.createObjectURL(blob)
      isRecording.value = false
      
      // Parar o stream de mídia
      stream.getTracks().forEach(track => track.stop())
      
      // Emitir evento para componente pai
      emit('recordingComplete', blob)
      
      // Limpar interval de duração
      if (durationInterval.value) {
        clearInterval(durationInterval.value)
        durationInterval.value = null
      }
    }

    mediaRecorder.value.start()
    isRecording.value = true
    
    // Atualizar duração em tempo real
    durationInterval.value = setInterval(() => {
      recordingDuration.value = (Date.now() - recordingStartTime.value) / 1000
    }, 100)
    
  } catch (error) {
    console.error('Erro ao iniciar gravação:', error)
    alert('Erro ao acessar o microfone. Verifique as permissões.')
  }
}

const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
  }
}

const playRecording = () => {
  if (audioElement.value && audioUrl.value) {
    if (isPlaying.value) {
      audioElement.value.pause()
      isPlaying.value = false
    } else {
      audioElement.value.play()
      isPlaying.value = true
    }
  }
}

const deleteRecording = () => {
  if (audioUrl.value) {
    URL.revokeObjectURL(audioUrl.value)
  }
  audioUrl.value = null
  audioBlob.value = null
  recordingDuration.value = 0
  isPlaying.value = false
}

const updateDuration = () => {
  if (audioElement.value && !isRecording.value) {
    recordingDuration.value = audioElement.value.duration || recordingDuration.value
  }
}

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Cleanup ao desmontar componente
onUnmounted(() => {
  if (audioUrl.value) {
    URL.revokeObjectURL(audioUrl.value)
  }
  if (durationInterval.value) {
    clearInterval(durationInterval.value)
  }
})
</script>

<style scoped>
.audio-recorder {
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.3), rgba(51, 65, 85, 0.3));
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.record-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.record-button {
  position: relative;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(145deg, #dc2626, #ef4444);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
}

.record-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4);
}

.record-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.record-button.recording {
  background: linear-gradient(145deg, #dc2626, #b91c1c);
  animation: pulse-record 1.5s ease-in-out infinite;
}

.record-button.has-recording:not(.recording) {
  background: linear-gradient(145deg, #059669, #10b981);
  box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
}

.record-button-inner {
  position: relative;
  z-index: 2;
}

.mic-icon {
  width: 28px;
  height: 28px;
  color: white;
}

.recording-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: pulse-dot 1s ease-in-out infinite;
}

.recording-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(239, 68, 68, 0.6);
  border-radius: 50%;
  animation: ring-expand 2s ease-out infinite;
}

.ring-2 {
  animation-delay: 0.5s;
}

.ring-3 {
  animation-delay: 1s;
}

.status-text {
  color: #cbd5e1;
  font-size: 0.875rem;
  text-align: center;
  margin: 0;
  max-width: 200px;
}

.audio-player {
  display: flex;
  align-items: center;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
}

.play-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(145deg, #3b82f6, #2563eb);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.play-button:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.play-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.play-button svg {
  width: 16px;
  height: 16px;
}

.audio-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wave-form {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1;
  height: 24px;
}

.wave-bar {
  width: 3px;
  background: linear-gradient(to top, #3b82f6, #8b5cf6);
  border-radius: 2px;
  opacity: 0.6;
  animation: wave-animation 1.5s ease-in-out infinite;
}

.wave-bar:nth-child(odd) {
  height: 60%;
  animation-delay: 0.1s;
}

.wave-bar:nth-child(even) {
  height: 40%;
  animation-delay: 0.3s;
}

.duration {
  color: #94a3b8;
  font-size: 0.75rem;
  font-family: monospace;
  min-width: 40px;
}

.delete-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.delete-button:hover {
  background: rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}

.delete-button svg {
  width: 16px;
  height: 16px;
}

/* Animações */
@keyframes pulse-record {
  0%, 100% {
    box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
  }
  50% {
    box-shadow: 0 12px 30px rgba(220, 38, 38, 0.6);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes ring-expand {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes wave-animation {
  0%, 100% {
    height: 40%;
    opacity: 0.6;
  }
  50% {
    height: 100%;
    opacity: 1;
  }
}

/* Responsividade */
@media (max-width: 360px) {
  .record-button {
    width: 70px;
    height: 70px;
  }
  
  .mic-icon {
    width: 24px;
    height: 24px;
  }
  
  .audio-player {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .audio-info {
    width: 100%;
  }
}
</style>