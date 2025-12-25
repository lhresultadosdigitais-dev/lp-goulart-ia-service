# Configuração do Supabase

## 📋 Instruções de Setup

### 1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Faça login/cadastro
3. Clique em "New Project"
4. Escolha um nome e senha para o banco

### 2. Obter Credenciais
Após criar o projeto, vá em **Settings > API**:
- **Project URL**: `https://seuprojetoid.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Configurar no HTML
No arquivo `index.html`, substitua:
```javascript
const SUPABASE_URL = 'https://seuprojetoid.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 4. Criar Tabelas no Supabase

#### Tabela: `contacts`
```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  message TEXT,
  audio_url TEXT,
  has_audio BOOLEAN DEFAULT FALSE,
  audio_size INTEGER,
  user_agent TEXT,
  ip_address INET,
  whatsapp_detected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção
CREATE POLICY "Permitir inserção de contatos" ON contacts
FOR INSERT WITH CHECK (true);

-- Política para permitir leitura (opcional, para admin)
CREATE POLICY "Permitir leitura de contatos" ON contacts
FOR SELECT USING (true);
```

#### Bucket de Storage: `contact-audios`
1. Vá em **Storage** no painel do Supabase
2. Clique em "Create Bucket"
3. Nome: `contact-audios`
4. Deixe público: ✅ **Public**

### 5. Políticas de Segurança (RLS)

#### Para Storage:
```sql
-- Permitir upload de áudios
CREATE POLICY "Permitir upload de áudios" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'contact-audios');

-- Permitir leitura de áudios
CREATE POLICY "Permitir leitura de áudios" ON storage.objects
FOR SELECT USING (bucket_id = 'contact-audios');
```

## 🔧 Funcionalidades Implementadas

### ✅ Upload de Áudio
- Gravação em WebM
- Upload automático para Supabase Storage
- URL pública gerada automaticamente

### ✅ Salvamento de Dados
- Mensagem de texto
- URL do áudio (se existir)
- Metadata (user-agent, timestamp, etc.)
- Detecção automática de WhatsApp

### ✅ Tratamento de Erros
- Fallback quando Supabase não está configurado
- Mensagens de erro amigáveis
- Logs detalhados no console

## 🚀 Próximos Passos

1. **Configurar credenciais** no `index.html`
2. **Criar tabelas** no banco Supabase
3. **Configurar storage** para áudios
4. **Testar funcionalidade** completa
5. **Implementar painel admin** (opcional)

## 📱 Status Atual

- ✅ SDK integrado
- ✅ Funções de upload/save implementadas
- ✅ Interface atualizada
- 🔄 **Aguardando configuração das credenciais**