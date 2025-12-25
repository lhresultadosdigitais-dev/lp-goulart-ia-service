# 🚀 Instruções de Instalação - Cartão de Contato Digital

## ⚡ Quick Start

Execute estes comandos em sequência no terminal:

```bash
# 1. Navegue até o diretório do projeto
cd contact-card-app

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente (opcional para desenvolvimento)
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase

# 4. Execute em modo desenvolvimento
npm run dev
```

## 📋 Dependências Necessárias

### Principais
- **Nuxt 3** (^3.8.0) - Framework full-stack
- **Vue 3** (^3.3.0) - Framework reativo
- **Tailwind CSS** (^3.3.0) - Framework CSS
- **Supabase JS** (^2.38.0) - Cliente do banco de dados

### Desenvolvimento
- **TypeScript** (^5.2.0) - Tipagem estática
- **PostCSS & Autoprefixer** - Processamento CSS

## 🔧 Comandos Disponíveis

```bash
npm run dev        # Executa em modo desenvolvimento
npm run build      # Cria build para produção
npm run preview    # Visualiza build de produção
npm run generate   # Gera site estático
```

## 🐛 Solução de Problemas

### Erro de TypeScript/Nuxt
Se aparecer erro sobre tipos não encontrados:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Erro de Tailwind CSS
Se o @apply não funcionar:
```bash
npm install @nuxtjs/tailwindcss --save-dev
```

### Permissões de Microfone
Para testar gravação de áudio, use HTTPS ou localhost.

## 📱 Testando no Celular

1. Execute `npm run dev`
2. Anote o IP local (ex: 192.168.1.100:3000)
3. Acesse no celular usando o IP
4. Para HTTPS local, use ngrok ou similar

## 🌐 Deploy Recomendado

### Vercel (Mais Fácil)
1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Netlify
```bash
npm run build
# Deploy a pasta .output/public
```

## 📞 Suporte

Em caso de problemas:
1. Verifique a versão do Node.js (>=18)
2. Limpe cache: `rm -rf .nuxt node_modules && npm install`
3. Consulte o README.md principal

---
✨ Desenvolvido com Nuxt 3 + Vue 3 + Tailwind CSS