import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Função para detectar WhatsApp na mensagem
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

// Função para simular processamento com IA
const processWithAI = async (message, hasAudio) => {
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const extractedWhatsApp = message ? extractWhatsAppFromMessage(message) : null
  const hasContact = !!extractedWhatsApp
  
  return {
    sentiment: 'neutral',
    hasContact,
    extractedContact: extractedWhatsApp,
    aiResponse: hasContact 
      ? "Obrigado pela mensagem! Em breve entrarei em contato através do WhatsApp informado."
      : "Obrigado pela mensagem! Para retornar o contato, por favor inclua seu número de WhatsApp.",
    needsContact: !hasContact
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validar dados recebidos
    if (!body.message && !body.hasAudio) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Mensagem ou áudio é obrigatório'
      })
    }

    // Processar com IA
    const aiAnalysis = await processWithAI(body.message, body.hasAudio)
    
    // Preparar dados para inserção
    const contactData = {
      message: body.message || null,
      whatsapp: body.whatsapp || aiAnalysis.extractedContact || null,
      has_audio: body.hasAudio || false,
      audio_url: body.audioUrl || null,
      audio_transcription: body.audioTranscription || null,
      message_sentiment: aiAnalysis.sentiment,
      has_contact: !!(body.whatsapp || aiAnalysis.extractedContact),
      ai_response: aiAnalysis.aiResponse,
      needs_contact: aiAnalysis.needsContact,
      processed_at: new Date().toISOString(),
      ip_address: getClientIP(event),
      user_agent: getHeader(event, 'user-agent') || null,
      created_at: new Date().toISOString()
    }

    // Inserir no Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()

    if (error) {
      console.error('Erro no Supabase:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erro ao salvar contato no banco de dados'
      })
    }

    // Retornar resposta com dados da IA
    return {
      success: true,
      data: data[0],
      aiResponse: aiAnalysis.aiResponse,
      needsContact: aiAnalysis.needsContact,
      hasContact: contactData.has_contact
    }

  } catch (error) {
    console.error('Erro na API de contato:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})

// Função auxiliar para obter IP do cliente
function getClientIP(event) {
  return getHeader(event, 'x-forwarded-for') || 
         getHeader(event, 'x-real-ip') || 
         getHeader(event, 'x-client-ip') || 
         event.node.req.connection?.remoteAddress ||
         event.node.req.socket?.remoteAddress ||
         null
}