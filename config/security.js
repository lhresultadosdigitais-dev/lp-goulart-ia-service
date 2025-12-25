// ================================
// SISTEMA DE SEGURANÇA E RATE LIMITING
// ================================

class SecurityManager {
  constructor() {
    this.rateLimiter = new Map();
    this.config = {
      maxRequestsPerMinute: 10,
      maxAudioSize: 5 * 1024 * 1024, // 5MB
      allowedMimeTypes: ['audio/webm', 'audio/mp4', 'audio/wav', 'audio/mpeg'],
      maxMessageLength: 1000
    };
  }

  // Rate limiting por IP/sessão
  checkRateLimit(identifier = 'default') {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minuto
    
    if (!this.rateLimiter.has(identifier)) {
      this.rateLimiter.set(identifier, []);
    }
    
    const requests = this.rateLimiter.get(identifier);
    
    // Remover requests antigas
    const recentRequests = requests.filter(time => time > windowStart);
    this.rateLimiter.set(identifier, recentRequests);
    
    // Verificar limite
    if (recentRequests.length >= this.config.maxRequestsPerMinute) {
      return {
        allowed: false,
        error: 'Muitas tentativas. Aguarde um minuto.',
        remainingTime: Math.ceil((recentRequests[0] + 60000 - now) / 1000)
      };
    }
    
    // Adicionar request atual
    recentRequests.push(now);
    this.rateLimiter.set(identifier, recentRequests);
    
    return {
      allowed: true,
      remaining: this.config.maxRequestsPerMinute - recentRequests.length
    };
  }

  // Validar dados de entrada
  validateContactData(data) {
    const errors = [];
    
    // Validar mensagem
    if (data.message) {
      if (typeof data.message !== 'string') {
        errors.push('Mensagem deve ser texto');
      } else if (data.message.length > this.config.maxMessageLength) {
        errors.push(`Mensagem muito longa (máximo ${this.config.maxMessageLength} caracteres)`);
      }
    }
    
    // Validar áudio
    if (data.audioBlob) {
      if (data.audioBlob.size > this.config.maxAudioSize) {
        errors.push(`Áudio muito grande (máximo ${this.config.maxAudioSize / 1024 / 1024}MB)`);
      }
      
      if (!this.config.allowedMimeTypes.includes(data.audioBlob.type)) {
        errors.push(`Tipo de áudio não permitido: ${data.audioBlob.type}`);
      }
    }
    
    // Verificar se tem pelo menos uma forma de contato
    if (!data.message && !data.audioBlob) {
      errors.push('Forneça uma mensagem ou áudio');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Sanitizar dados
  sanitizeData(data) {
    const sanitized = {};
    
    // Sanitizar mensagem
    if (data.message) {
      sanitized.message = data.message
        .trim()
        .replace(/[<>]/g, '') // Remover tags básicas
        .substring(0, this.config.maxMessageLength);
    }
    
    // Copiar outros dados seguros
    sanitized.audioBlob = data.audioBlob;
    sanitized.timestamp = new Date().toISOString();
    sanitized.userAgent = navigator.userAgent.substring(0, 200); // Limitar tamanho
    
    return sanitized;
  }

  // Gerar identificador único para rate limiting
  getClientIdentifier() {
    // Usar combinação de fatores para identificar cliente
    const factors = [
      navigator.userAgent,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      navigator.language
    ];
    
    // Hash simples
    let hash = 0;
    const str = factors.join('|');
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  // Verificar se está em ambiente de desenvolvimento
  isDevelopment() {
    return location.hostname === 'localhost' || 
           location.hostname === '127.0.0.1' || 
           location.protocol === 'file:';
  }

  // Log de segurança
  logSecurityEvent(event, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: location.href,
      isDev: this.isDevelopment()
    };
    
    console.log('🔒 Security Event:', logEntry);
    
    // Em produção, você pode enviar esses logs para um serviço de monitoramento
    if (!this.isDevelopment()) {
      // Exemplo: analytics.track('security_event', logEntry);
    }
  }
}

// Instância global do gerenciador de segurança
const securityManager = new SecurityManager();