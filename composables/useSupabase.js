import { ref } from 'vue'

export function useSupabase() {
  const loading = ref(false)
  const error = ref(null)

  // Função para detectar números de WhatsApp na mensagem
  const extractWhatsAppFromMessage = (message) => {
    const phonePatterns = [
      /\(\d{2}\)\s*\d{4,5}-?\d{4}/g,
      /\d{2}\s*\d{4,5}\s*\d{4}/g,
      /\+55\s*\d{2}\s*\d{4,5}\s*\d{4}/g
    ]
    
    for (const pattern of phonePatterns) {
      const matches = message.match(pattern)
      if (matches) return matches[0]
    }
    return null
  }

  // Função para processar áudio com IA (simulada)
  const processAudioWithAI = async (audioBlob) => {
    // Simular processamento de áudio com IA
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Retorna uma transcrição mockada
    return {
      transcription: "Transcrição do áudio processada pela IA",
      sentiment: "positive",
      hasContact: false,
      extractedContact: null
    }
  }

  // Função para processar mensagem com IA (simulada)
  const processMessageWithAI = async (message) => {
    // Simular processamento com IA
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const extractedWhatsApp = extractWhatsAppFromMessage(message)
    const hasContact = !!extractedWhatsApp
    
    return {
      originalMessage: message,
      sentiment: "neutral",
      hasContact,
      extractedContact: extractedWhatsApp,
      aiResponse: hasContact 
        ? "Obrigado pela mensagem! Em breve entrarei em contato."
        : "Obrigado pela mensagem! Para retornar o contato, por favor inclua seu WhatsApp."
    }
  }

  // Função principal para inserir contato
  const insertContact = async (contactData) => {
    loading.value = true
    error.value = null

    try {
      // Processar mensagem de texto se houver
      let messageAnalysis = null
      if (contactData.message) {
        messageAnalysis = await processMessageWithAI(contactData.message)
      }

      // Processar áudio se houver
      let audioAnalysis = null
      let audioUrl = null
      if (contactData.audioBlob) {
        audioAnalysis = await processAudioWithAI(contactData.audioBlob)
        
        // Em um ambiente real, você enviaria o áudio para um storage
        // audioUrl = await uploadAudio(contactData.audioBlob)
        audioUrl = "mock-audio-url.webm" // Mock URL
      }

      // Preparar dados para salvar
      const dataToSave = {
        message: contactData.message || null,
        whatsapp: contactData.whatsapp || 
                 messageAnalysis?.extractedContact || 
                 audioAnalysis?.extractedContact || null,
        has_audio: !!contactData.audioBlob,
        audio_url: audioUrl,
        audio_transcription: audioAnalysis?.transcription || null,
        message_sentiment: messageAnalysis?.sentiment || audioAnalysis?.sentiment || 'neutral',
        has_contact: !!(contactData.whatsapp || 
                       messageAnalysis?.extractedContact || 
                       audioAnalysis?.extractedContact),
        ai_response: messageAnalysis?.aiResponse || 
                    "Obrigado pelo contato! Em breve retornaremos.",
        processed_at: new Date().toISOString(),
        ip_address: null, // Em produção, capturar IP
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
      }

      // Simular salvamento no Supabase
      console.log('Dados que seriam salvos no Supabase:', dataToSave)
      
      // Em um ambiente real, descomente esta linha:
      // const { data, error: insertError } = await supabase
      //   .from('contacts')
      //   .insert([dataToSave])
      //   .select()

      // if (insertError) throw insertError

      // Mock da resposta de sucesso
      const mockResponse = {
        id: Date.now(),
        ...dataToSave
      }

      // Retornar dados processados para o componente
      return {
        success: true,
        data: mockResponse,
        aiResponse: dataToSave.ai_response,
        needsContact: !dataToSave.has_contact
      }

    } catch (err) {
      error.value = err.message
      console.error('Erro ao processar contato:', err)
      return {
        success: false,
        error: err.message
      }
    } finally {
      loading.value = false
    }
  }

  // Função para buscar contatos (para painel admin)
  const getContacts = async (page = 1, limit = 10) => {
    loading.value = true
    error.value = null

    try {
      // Em um ambiente real:
      // const { data, error: fetchError } = await supabase
      //   .from('contacts')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      //   .range((page - 1) * limit, page * limit - 1)

      // if (fetchError) throw fetchError

      // Mock de dados para desenvolvimento
      const mockContacts = [
        {
          id: 1,
          message: "Olá, gostaria de saber mais sobre seus serviços",
          whatsapp: "(11) 99999-9999",
          has_audio: false,
          created_at: new Date().toISOString()
        }
      ]

      return {
        success: true,
        data: mockContacts,
        count: mockContacts.length
      }

    } catch (err) {
      error.value = err.message
      return {
        success: false,
        error: err.message
      }
    } finally {
      loading.value = false
    }
  }

  // Função para upload de áudio (mock)
  const uploadAudio = async (audioBlob) => {
    // Em um ambiente real, você faria upload para Supabase Storage
    // const fileName = `audio_${Date.now()}.webm`
    // const { data, error } = await supabase.storage
    //   .from('audio-recordings')
    //   .upload(fileName, audioBlob)
    
    // if (error) throw error
    // return data.path

    // Mock para desenvolvimento
    return `mock-audio-${Date.now()}.webm`
  }

  return {
    loading,
    error,
    insertContact,
    getContacts,
    processMessageWithAI,
    processAudioWithAI,
    uploadAudio
  }
}