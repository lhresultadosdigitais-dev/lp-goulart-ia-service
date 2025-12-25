<template>
  <div class="contact-form">
    <!-- Campo de mensagem -->
    <div class="form-group">
      <label for="message" class="form-label">Sua mensagem</label>
      <textarea
        id="message"
        v-model="formData.message"
        placeholder="Conte um pouco sobre você, seu projeto ou como posso te ajudar..."
        class="message-input"
        rows="4"
        maxlength="500"
      ></textarea>
      <div class="char-counter">{{ formData.message.length }}/500</div>
    </div>

    <!-- Gravador de áudio -->
    <div class="form-group">
      <label class="form-label">Ou envie um áudio</label>
      <AudioRecorder @recordingComplete="handleRecordingComplete" />
      <p class="form-hint">Você pode enviar apenas texto, apenas áudio, ou ambos!</p>
    </div>

    <!-- Resposta da IA (se houver pedido para incluir contato) -->
    <div v-if="aiResponse" class="ai-response">
      <div class="ai-avatar">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <div class="ai-message">
        <p>{{ aiResponse }}</p>
        
        <!-- Campo de contato (aparece quando necessário) -->
        <div v-if="needsContact" class="contact-request">
          <div class="form-group">
            <label for="whatsapp" class="form-label">WhatsApp para retorno</label>
            <input
              id="whatsapp"
              v-model="formData.whatsapp"
              type="tel"
              placeholder="(11) 99999-9999"
              class="contact-input"
              @input="formatWhatsApp"
            />
            <div v-if="whatsappError" class="error-message">{{ whatsappError }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botão de envio -->
    <button 
      @click="submitForm" 
      :disabled="isSubmitting || (!formData.message.trim() && !audioBlob)"
      class="send-button"
    >
      <div v-if="isSubmitting" class="loading-spinner"></div>
      <svg v-else viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
      <span>{{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}</span>
    </button>

    <!-- Status de sucesso -->
    <div v-if="showSuccess" class="success-message">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>Mensagem enviada com sucesso! Obrigado pelo contato.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AudioRecorder from './AudioRecorder.vue'

const emit = defineEmits(['contact-submitted'])

// Estado reativo
const formData = reactive({
  message: '',
  whatsapp: ''
})

const audioBlob = ref(null)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const aiResponse = ref('')
const needsContact = ref(false)
const whatsappError = ref('')

// Computed properties
const hasWhatsAppInMessage = computed(() => {
  const message = formData.message.toLowerCase()
  const whatsappPatterns = [
    /whatsapp/i,
    /whats/i,
    /zap/i,
    /\(\d{2}\)\s*\d{4,5}-?\d{4}/,
    /\d{2}\s*\d{4,5}\s*\d{4}/,
    /\+55\s*\d{2}\s*\d{4,5}\s*\d{4}/
  ]
  return whatsappPatterns.some(pattern => pattern.test(message))
})

// Métodos
const handleRecordingComplete = (blob) => {
  audioBlob.value = blob
}

const formatWhatsApp = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  
  if (value.length <= 11) {
    value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
  }
  
  formData.whatsapp = value
  validateWhatsApp()
}

const validateWhatsApp = () => {
  if (!formData.whatsapp) {
    whatsappError.value = ''
    return true
  }
  
  const cleaned = formData.whatsapp.replace(/\D/g, '')
  
  if (cleaned.length < 10 || cleaned.length > 11) {
    whatsappError.value = 'Número de WhatsApp inválido'
    return false
  }
  
  whatsappError.value = ''
  return true
}

const simulateAIResponse = async (message, hasAudio) => {
  // Simular análise da IA
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Verificar se a mensagem contém informações de contato
  if (!hasWhatsAppInMessage.value && !formData.whatsapp) {
    needsContact.value = true
    aiResponse.value = "Obrigado pela sua mensagem! Para que eu possa retornar o contato, por favor inclua seu número de WhatsApp."
    return false
  }
  
  needsContact.value = false
  aiResponse.value = "Obrigado! Recebi sua mensagem e em breve entrarei em contato."
  return true
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  if (!formData.message.trim() && !audioBlob.value) {
    alert('Por favor, digite uma mensagem ou grave um áudio.')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Primeira tentativa: processar com IA para detectar contato
    const hasContact = await simulateAIResponse(formData.message, !!audioBlob.value)
    
    // Se precisa de contato e não foi fornecido, para aqui
    if (needsContact.value && !formData.whatsapp) {
      isSubmitting.value = false
      return
    }
    
    // Validar WhatsApp se foi fornecido
    if (formData.whatsapp && !validateWhatsApp()) {
      isSubmitting.value = false
      return
    }
    
    // Preparar dados para envio à API
    const apiData = {
      message: formData.message.trim() || null,
      whatsapp: formData.whatsapp || extractWhatsAppFromMessage(formData.message),
      hasAudio: !!audioBlob.value,
      audioUrl: null, // Será processado pela API se necessário
      audioTranscription: null // Será processado pela API se necessário
    }
    
    // Chamar API do servidor
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: apiData
    })
    
    if (response.success) {
      // Atualizar resposta da IA se necessário
      if (response.aiResponse) {
        aiResponse.value = response.aiResponse
      }
      
      // Emitir evento para componente pai
      emit('contact-submitted', {
        ...apiData,
        ...response.data,
        audioBlob: audioBlob.value
      })
      
      // Mostrar sucesso
      showSuccess.value = true
      setTimeout(() => {
        showSuccess.value = false
        resetForm()
      }, 3000)
    } else {
      throw new Error(response.error || 'Erro desconhecido')
    }
    
  } catch (error) {
    console.error('Erro ao enviar:', error)
    
    // Tratar diferentes tipos de erro
    if (error.response?.status === 400) {
      alert('Dados inválidos. Verifique sua mensagem e tente novamente.')
    } else if (error.response?.status === 500) {
      alert('Erro no servidor. Tente novamente em alguns instantes.')
    } else {
      alert('Erro ao enviar mensagem. Verifique sua conexão e tente novamente.')
    }
  } finally {
    isSubmitting.value = false
  }
}

const extractWhatsAppFromMessage = (message) => {
  const phonePattern = /\(\d{2}\)\s*\d{4,5}-?\d{4}|\d{2}\s*\d{4,5}\s*\d{4}|\+55\s*\d{2}\s*\d{4,5}\s*\d{4}/
  const match = message.match(phonePattern)
  return match ? match[0] : ''
}

const resetForm = () => {
  formData.message = ''
  formData.whatsapp = ''
  audioBlob.value = null
  aiResponse.value = ''
  needsContact.value = false
  whatsappError.value = ''
}
</script>

<style scoped>
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.message-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.8);
  color: #e2e8f0;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: rgba(15, 23, 42, 0.9);
}

.message-input::placeholder {
  color: #64748b;
}

.char-counter {
  align-self: flex-end;
  color: #94a3b8;
  font-size: 0.75rem;
  font-family: monospace;
}

.contact-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.8);
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.contact-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-hint {
  color: #94a3b8;
  font-size: 0.75rem;
  text-align: center;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

.ai-response {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  animation: fade-in-up 0.5s ease-out;
}

.ai-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-avatar svg {
  width: 20px;
  height: 20px;
  color: white;
}

.ai-message {
  flex: 1;
}

.ai-message p {
  color: #e2e8f0;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.contact-request {
  margin-top: 1rem;
}

.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
}

.send-button svg {
  width: 20px;
  height: 20px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  color: #10b981;
  font-weight: 500;
  animation: fade-in-up 0.5s ease-out;
}

.success-message svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Animações */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsividade */
@media (max-width: 360px) {
  .contact-form {
    gap: 1rem;
  }
  
  .message-input {
    padding: 0.75rem;
    min-height: 100px;
  }
  
  .send-button {
    padding: 0.875rem 1.5rem;
  }
  
  .ai-response {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .ai-avatar {
    align-self: flex-start;
    width: 36px;
    height: 36px;
  }
}
</style>