// ================================
// CARREGADOR DE CONFIGURAÇÕES SEGURO
// ================================

class ConfigLoader {
  constructor() {
    this.config = {};
    this.isLoaded = false;
    this.errors = [];
  }

  // Carregar configurações de diferentes fontes
  async loadConfig() {
    try {
      // 1. Tentar carregar do arquivo de configuração
      await this.loadFromConfigFile();
      
      // 2. Tentar carregar de variáveis de ambiente (se disponível)
      this.loadFromEnvironment();
      
      // 3. Validar configurações
      this.validateConfig();
      
      this.isLoaded = true;
      return { success: true, config: this.config };
    } catch (error) {
      this.errors.push(error.message);
      return { success: false, errors: this.errors };
    }
  }

  // Carregar do arquivo de configuração
  async loadFromConfigFile() {
    try {
      // Verificar se o arquivo existe
      const configScript = document.querySelector('script[src*="supabase.config.js"]');
      if (configScript && typeof SUPABASE_CONFIG !== 'undefined') {
        this.config = { ...SUPABASE_CONFIG };
        console.log('✅ Configuração carregada do arquivo');
      }
    } catch (error) {
      console.warn('⚠️ Arquivo de configuração não encontrado');
    }
  }

  // Carregar de variáveis de ambiente (para desenvolvimento)
  loadFromEnvironment() {
    // Em ambiente de produção, isso não funcionará por segurança
    // Apenas para desenvolvimento local
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.SUPABASE_URL) {
        this.config.url = process.env.SUPABASE_URL;
      }
      if (process.env.SUPABASE_ANON_KEY) {
        this.config.anonKey = process.env.SUPABASE_ANON_KEY;
      }
      console.log('✅ Variáveis de ambiente carregadas');
    }
  }

  // Validar configurações
  validateConfig() {
    const { url, anonKey } = this.config;
    
    if (!url || url === 'SUA_SUPABASE_URL_AQUI') {
      throw new Error('URL do Supabase não configurada');
    }
    
    if (!anonKey || anonKey === 'SUA_SUPABASE_ANON_KEY_AQUI') {
      throw new Error('Chave anon do Supabase não configurada');
    }
    
    if (!url.includes('supabase.co')) {
      throw new Error('URL do Supabase inválida');
    }
    
    if (!anonKey.startsWith('eyJ')) {
      throw new Error('Chave anon inválida (deve ser um JWT)');
    }

    console.log('✅ Configurações validadas com sucesso');
  }

  // Obter configuração segura (sem expor chaves)
  getPublicConfig() {
    if (!this.isLoaded) {
      return { loaded: false, error: 'Configuração não carregada' };
    }

    return {
      loaded: true,
      hasUrl: !!this.config.url,
      hasKey: !!this.config.anonKey,
      urlPreview: this.config.url ? this.config.url.substring(0, 20) + '...' : null,
      keyPreview: this.config.anonKey ? 'eyJ...' + this.config.anonKey.slice(-10) : null
    };
  }

  // Obter configuração completa (apenas para inicialização)
  getFullConfig() {
    if (!this.isLoaded) {
      throw new Error('Configuração não carregada');
    }
    return this.config;
  }
}

// Instância global do carregador
const configLoader = new ConfigLoader();