# 🚀 Cartão de Contato Digital - Luiz Henrique Goulart

Uma aplicação moderna de cartão de contato digital com design tecnológico, focada em dispositivos móveis e integração com IA.

## ✨ Características

- **Design Mobile-First**: Otimizado para dispositivos móveis com apenas uma dobra
- **Interface Tecnológica**: Tema escuro com gradientes e animações modernas
- **Gravação de Áudio**: Funcionalidade avançada de gravação com visualização em tempo real
- **Integração com IA**: Processamento inteligente de mensagens e detecção automática de contatos
- **Validação de WhatsApp**: Detecção e validação automática de números de WhatsApp
- **Totalmente Componentizado**: Estrutura modular seguindo boas práticas do Vue.js

## 🛠️ Tecnologias Utilizadas

- **Nuxt 3**: Framework Vue.js full-stack
- **Vue 3**: Framework JavaScript reativo
- **Tailwind CSS**: Framework CSS utilitário
- **Supabase**: Backend-as-a-Service para banco de dados
- **Web Audio API**: Para funcionalidade de gravação de áudio
- **CSS Animations**: Animações personalizadas para UX moderna

## 📱 Funcionalidades

### 1. **Apresentação Pessoal**
- Foto de perfil com anel animado
- Apresentação personalizada do Luiz Henrique Goulart
- Informações de contato do WhatsApp

### 2. **Formulário de Contato Inteligente**
- Campo de mensagem com contador de caracteres
- Gravação de áudio com visualização em tempo real
- Validação automática de números de WhatsApp
- Processamento com IA para detecção de informações de contato

### 3. **Processamento com IA**
- Análise automática de mensagens
- Detecção de números de telefone/WhatsApp no texto
- Solicitação inteligente de dados de contato quando necessário
- Feedback em tempo real para o usuário

### 4. **Armazenamento de Dados**
- Integração com Supabase para persistência
- Armazenamento de mensagens, áudios e metadados
- Preparação para painel administrativo

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (opcional para desenvolvimento)

### Instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd contact-card-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_publica_do_supabase
```

4. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Build para Produção

```bash
npm run build
npm run start
```

## 📊 Estrutura do Banco de Dados (Supabase)

### Tabela: `contacts`

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  message TEXT,
  whatsapp VARCHAR(20),
  has_audio BOOLEAN DEFAULT FALSE,
  audio_url TEXT,
  audio_transcription TEXT,
  message_sentiment VARCHAR(20) DEFAULT 'neutral',
  has_contact BOOLEAN DEFAULT FALSE,
  ai_response TEXT,
  needs_contact BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Customização

### Cores e Tema
As cores principais estão definidas em:
- `assets/css/main.css` - Variáveis CSS globais
- `tailwind.config.js` - Configuração do Tailwind

### Informações Pessoais
Para personalizar com suas informações:
1. Edite `pages/index.vue` - Nome, foto e apresentação
2. Substitua a imagem de perfil em `public/`
3. Atualize as informações de WhatsApp

### Componentes
- `ContactCard.vue` - Card principal com apresentação
- `AudioRecorder.vue` - Gravador de áudio avançado
- `ContactForm.vue` - Formulário com validação e IA

## 🔧 Desenvolvimento

### Estrutura de Pastas
```
contact-card-app/
├── assets/css/          # Estilos globais
├── components/          # Componentes Vue reutilizáveis
├── composables/         # Lógica compartilhada (Supabase)
├── layouts/             # Layouts da aplicação
├── pages/               # Páginas (roteamento automático)
├── plugins/             # Plugins (Supabase client)
├── server/api/          # API endpoints do servidor
├── public/              # Arquivos estáticos
└── nuxt.config.ts       # Configuração do Nuxt
```

### Scripts Disponíveis
- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build para produção
- `npm run preview` - Visualizar build de produção
- `npm run postinstall` - Preparação pós-instalação

## 📱 Responsividade

A aplicação foi desenvolvida com foco mobile-first:
- **Breakpoint principal**: 428px (iPhone 14 Pro Max)
- **Breakpoints secundários**: 360px, 768px, 1024px
- **Máximo de largura**: 448px para manter foco mobile

## 🤖 Integração com IA

Atualmente implementado com simulação para desenvolvimento:
- Detecção automática de números de WhatsApp
- Análise de sentimento das mensagens
- Solicitação inteligente de dados de contato
- Processamento de áudio (preparado para transcrição)

## 🔐 Segurança

- Validação de dados no servidor
- Sanitização de inputs
- Rate limiting (recomendado para produção)
- CORS configurado adequadamente

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.output/public`
3. Configure variáveis de ambiente

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Luiz Henrique Goulart**
- Website: [em breve]
- WhatsApp: (11) 99999-9999

---

Desenvolvido com ❤️ usando Nuxt 3, Vue 3 e tecnologias modernas.