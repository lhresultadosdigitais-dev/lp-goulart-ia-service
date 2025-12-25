<template>
  <div class="app-layout">
    <!-- Background decorativo -->
    <div class="background-decoration">
      <div class="grid-pattern"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
    
    <!-- Conteúdo principal -->
    <main class="main-content">
      <slot />
    </main>
    
    <!-- Footer opcional -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Luiz Henrique Goulart - Cartão de Contato Digital</p>
        <div class="tech-badge">
          <span>Powered by</span>
          <div class="tech-icons">
            <span>Nuxt</span>
            <span>Vue</span>
            <span>AI</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Meta tags globais
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  bodyAttrs: {
    class: 'tech-body'
  }
})
</script>

<style scoped>
.app-layout {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
  animation: float 15s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent);
  top: 60%;
  right: 10%;
  animation-delay: 5s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent);
  bottom: 20%;
  left: 20%;
  animation-delay: 10s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent);
  top: 30%;
  right: 30%;
  animation-delay: 7s;
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.footer {
  position: relative;
  z-index: 1;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  padding: 1rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.75rem;
}

.tech-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-icons {
  display: flex;
  gap: 0.25rem;
}

.tech-icons span {
  padding: 0.125rem 0.375rem;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Animações */
@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0.5rem;
    min-height: calc(100vh - 100px);
  }
  
  .footer-content {
    font-size: 0.625rem;
  }
  
  .shape-1, .shape-2 {
    width: 150px;
    height: 150px;
  }
  
  .shape-3, .shape-4 {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .grid-pattern {
    background-size: 30px 30px;
  }
}
</style>

<style>
/* Estilos globais para o body */
.tech-body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Reset de scrollbar para consistência */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}
</style>