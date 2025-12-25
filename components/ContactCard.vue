<template>
  <div class="contact-card">
    <!-- Header com foto e apresentação -->
    <div class="header-section">
      <div class="profile-container">
        <div class="profile-ring">
          <img :src="photo" :alt="name" class="profile-image" />
        </div>
      </div>
      
      <h1 class="name-title">{{ name }}</h1>
      
      <div class="intro-container">
        <p class="introduction">{{ introduction }}</p>
      </div>
      
      <div class="whatsapp-info">
        <div class="whatsapp-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </div>
        <span>{{ whatsapp }}</span>
      </div>
    </div>

    <!-- Formulário de contato -->
    <div class="form-section">
      <ContactForm @contact-submitted="handleContactSubmit" />
    </div>
  </div>
</template>

<script setup>
import ContactForm from './ContactForm.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: '/default-avatar.jpg',
  },
  introduction: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
})

const handleContactSubmit = (data) => {
  // Emit evento para componente pai se necessário
  console.log('Contact submitted:', data)
}
</script>

<style scoped>
.contact-card {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 80px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.header-section {
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
}

.profile-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.profile-ring {
  position: relative;
  padding: 0.25rem;
  border-radius: 50%;
  background: linear-gradient(145deg, #3b82f6, #8b5cf6, #06b6d4);
  animation: glow 2s ease-in-out infinite alternate;
}

.profile-image {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #0f172a;
}

.name-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-container {
  margin-bottom: 1.5rem;
}

.introduction {
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.625;
}

.whatsapp-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #4ade80;
  font-weight: 500;
}

.whatsapp-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.form-section {
  padding: 2rem;
  padding-top: 0;
}

@keyframes glow {
  from {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }
  to {
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.7);
  }
}

/* Responsividade adicional para telas muito pequenas */
@media (max-width: 360px) {
  .header-section {
    padding: 1.5rem;
  }
  
  .profile-image {
    width: 5rem;
    height: 5rem;
  }
  
  .name-title {
    font-size: 1.25rem;
  }
  
  .form-section {
    padding: 1.5rem;
    padding-top: 0;
  }
}
</style>