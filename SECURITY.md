# 🔒 Sistema de Segurança - Cartão de Contato

## 📁 Arquivos de Segurança Criados

### 🔑 Configurações Sensíveis
- **`config/supabase.config.js`** - Credenciais do Supabase (⚠️ NUNCA commitar)
- **`.env.local`** - Variáveis de ambiente (⚠️ NUNCA commitar)
- **`.gitignore`** - Protege arquivos sensíveis

### 🛡️ Sistema de Segurança
- **`config/config-loader.js`** - Carregador seguro de configurações
- **`config/security.js`** - Rate limiting e validações

## 🚀 Como Configurar

### 1. Configurar Credenciais do Supabase

Edite o arquivo `config/supabase.config.js`:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://seuprojetoid.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
};
```

### 2. Obter Credenciais do Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie/acesse seu projeto
3. Vá em **Settings > API**
4. Copie:
   - **Project URL** → `url`
   - **anon/public key** → `anonKey`
   - **service_role key** → `serviceRoleKey` (⚠️ MUITO SENSÍVEL!)

⚠️ **ATENÇÃO**: A service_role key bypassa todas as políticas RLS (Row Level Security). Use apenas em ambientes seguros!

### 3. Executar SQL de Setup

Execute o arquivo `supabase-setup.sql` no SQL Editor do Supabase para:
- Criar tabela `contacts`
- Configurar Row Level Security (RLS)
- Criar bucket `contact-audios`
- Configurar políticas de acesso

## � Tipos de Chaves do Supabase

### 📖 Anon/Public Key
- **Uso**: Operações do cliente (frontend)
- **Limitações**: Respeita Row Level Security (RLS)
- **Segurança**: Pode ser exposta publicamente
- **Funcionalidades**: Insert, Select (com políticas RLS)

### 🔐 Service Role Key
- **Uso**: Operações administrativas (backend)
- **Limitações**: Bypassa ALL Row Level Security
- **Segurança**: ⚠️ NUNCA expor no frontend!
- **Funcionalidades**: Acesso total ao banco de dados

### 💡 Quando Usar Service Role Key
- **Operações Admin**: Limpeza de dados, relatórios completos
- **Bulk Operations**: Inserção em massa, migrações
- **Bypass RLS**: Quando precisar ignorar políticas de segurança
- **APIs Privadas**: Endpoints que rodam no servidor

## �🔒 Recursos de Segurança Implementados

### ✅ Rate Limiting
- **Limite**: 10 requests por minuto por cliente
- **Identificação**: Hash único baseado em user-agent, resolução, timezone
- **Bloqueio**: Temporário com countdown

### ✅ Validação de Dados
- **Mensagem**: Máximo 1000 caracteres, sanitização de HTML
- **Áudio**: Máximo 5MB, tipos permitidos (webm, mp4, wav, mpeg)
- **Entrada obrigatória**: Mensagem ou áudio

### ✅ Logs de Segurança
- Tentativas de envio
- Rate limiting excedido
- Validações falhadas
- Erros de sistema
- Sucessos de envio

### ✅ Proteção de Credenciais
- Configurações em arquivos separados
- Validação automática de credenciais
- Status visual da conexão
- Fallback para modo offline

## 🎯 Indicadores Visuais

### Status do Database (rodapé)
- 🟢 **"Database: Pronto"** - Tudo funcionando
- 🟡 **"Database: Conectado"** - Conectado, testando tabelas
- 🔴 **"Database: Não configurado"** - Credenciais não definidas
- 🔴 **"Database: Erro de conexão"** - Problema de conectividade

## 🚨 Alertas de Segurança

### Rate Limiting
```
Muitas tentativas. Aguarde um minuto.
Aguarde X segundos.
```

### Validação de Dados
```
Dados inválidos:
- Mensagem muito longa (máximo 1000 caracteres)
- Áudio muito grande (máximo 5MB)
- Tipo de áudio não permitido
```

## 📊 Monitoramento

### Console Logs
- `🔒 Security Event:` - Eventos de segurança
- `✅ Supabase inicializado` - Conexão bem-sucedida
- `❌ Erro no envio:` - Erros de submissão

### Dados Coletados (para análise)
- Timestamp de cada tentativa
- Tipo de erro/sucesso
- Tamanho de áudios
- User-agent (limitado a 200 chars)
- Cliente ID (hash anônimo)

## 🔧 Configurações Avançadas

### Ajustar Rate Limiting
No arquivo `config/security.js`:
```javascript
this.config = {
  maxRequestsPerMinute: 10, // Altere aqui
  maxAudioSize: 5 * 1024 * 1024, // 5MB
  maxMessageLength: 1000
};
```

### Tipos de Áudio Permitidos
```javascript
allowedMimeTypes: [
  'audio/webm',
  'audio/mp4', 
  'audio/wav',
  'audio/mpeg'
]
```

## 🚀 Deploy Seguro

### Antes do Deploy
1. ✅ Verificar se `.gitignore` está configurado
2. ✅ Credenciais estão fora do controle de versão
3. ✅ SQL executado no Supabase
4. ✅ Testes de rate limiting funcionando

### Variáveis de Ambiente (Produção)
Para servidores que suportam variáveis de ambiente:
```bash
SUPABASE_URL=https://seuprojetoid.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

## 🆘 Troubleshooting

### "Database: Não configurado"
- Verifique se `config/supabase.config.js` tem as credenciais corretas
- Certifique-se que não há erros no console

### "Database: Tabela não configurada"
- Execute o arquivo `supabase-setup.sql`
- Verifique se a tabela `contacts` existe
- Confirme se RLS está habilitado

### Rate Limiting Muito Restritivo
- Ajuste `maxRequestsPerMinute` em `config/security.js`
- Limpe localStorage para resetar: `localStorage.clear()`

### Áudio Não Envia
- Verifique tamanho (máx 5MB)
- Confirme tipo de arquivo (webm/mp4/wav/mpeg)
- Teste sem áudio primeiro

## 📈 Próximas Melhorias

- [ ] Dashboard admin para visualizar contatos
- [ ] Análise de sentimento nas mensagens
- [ ] Backup automático dos dados
- [ ] Notificações em tempo real
- [ ] API para integração com outros sistemas