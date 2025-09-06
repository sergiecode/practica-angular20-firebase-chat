# Guía de Estilos CSS - Chat Angular Firebase

## Introducción

Este documento contiene todos los archivos CSS del proyecto de chat con Angular y Firebase. Está diseñado para ser usado como referencia durante el curso de Angular, permitiendo copiar y pegar los estilos en los momentos correspondientes del desarrollo.

## Descripción de Archivos CSS

### 📋 Archivos incluidos:

1. **`styles.css`** - Estilos globales del proyecto
   - Variables CSS customizadas (colores, espaciado, sombras)
   - Clases utilitarias para layout y tipografía
   - Estilos base para botones, inputs y cards
   - Animaciones y efectos visuales
   - Media queries para responsive design

2. **`app.css`** - Estilos del componente principal (AppComponent)
   - Variables de tema del componente raíz
   - Layout general de la aplicación
   - Estilos para el router-outlet
   - Clases de contenedor y utilidades básicas

### ❓ ¿Por qué separar estilos globales entre `styles.css` y `app.css`?

**`styles.css` (Estilos verdaderamente globales):**
- Se aplican a **toda la aplicación** desde el primer momento
- Incluye reset CSS, variables CSS, y utilidades que necesitan todos los componentes
- Estilos que deben estar disponibles **antes** de que Angular inicie
- Sistema de diseño base (colores, tipografía, espaciado)

**`app.css` (Estilos del componente raíz):**
- Se aplican específicamente al **AppComponent** y su contexto
- Variables CSS que pueden ser **heredadas** por componentes hijos
- Layout específico del contenedor principal de la aplicación
- Estilos que controlan la estructura general pero no los elementos básicos

**En resumen:** `styles.css` = fundamentos universales | `app.css` = estructura de la aplicación

3. **`chat.css`** - Estilos del componente de chat
   - Layout completo de la interfaz de chat
   - Estilos para header, mensajes y área de entrada
   - Animaciones de mensajes y indicadores de escritura
   - Panel de estadísticas expandible
   - Responsive design específico para el chat

4. **`auth.css`** - Estilos del componente de autenticación
   - Pantalla de login con gradientes y efectos
   - Card de autenticación con backdrop-filter
   - Botón de Google con estados interactivos
   - Animaciones de entrada y loading
   - Mensajes de error estilizados

## 💡 Cómo usar durante el curso:

- Copia y pega cada sección según avances en el desarrollo
- Los estilos están organizados por componente para facilitar la implementación
- Cada archivo tiene comentarios que indican las secciones principales
- Las variables CSS permiten personalización fácil del tema

---
---
---

# styles.css
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


html, body {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}



:root {
  
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-info: #2196f3;
  
  
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-light: #999999;
  
  
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-dark: #2c3e50;
  
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  
  --border-radius: 8px;
  --border-radius-large: 16px;
  
  
  --shadow-light: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-medium: 0 4px 8px rgba(0,0,0,0.15);
  --shadow-heavy: 0 8px 16px rgba(0,0,0,0.2);
}




.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }


.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--text-secondary); }
.text-success { color: var(--color-success); }
.text-error { color: var(--color-error); }


.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }

.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }


.d-flex { display: flex; }
.d-block { display: block; }
.d-none { display: none; }


.justify-center { justify-content: center; }
.align-center { align-items: center; }
.flex-column { flex-direction: column; }

.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-medium);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: border-color 0.3s ease;
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.card {
  background: var(--bg-primary);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@media (max-width: 768px) {
  :root {
    --spacing-lg: 16px;
    --spacing-xl: 24px;
  }
  
  .card {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  :root {
    --spacing-md: 12px;
    --spacing-lg: 16px;
  }
  
  body {
    font-size: 14px;
  }
}
```

# app.css
```css

:host {
  
  --primary-color: #1976d2;
  --secondary-color: #424242;
  --background-color: #f5f5f5;
  --surface-color: #ffffff;
  --error-color: #f44336;
  --success-color: #4caf50;
  --text-primary: #212121;
  --text-secondary: #757575;
  
  
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  
  background-color: var(--background-color);
  
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


router-outlet {
  display: none;
}


* {
  box-sizing: border-box;
}


body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mt-1 { margin-top: 1rem; }
.mt-2 { margin-top: 2rem; }
.mb-1 { margin-bottom: 1rem; }
.mb-2 { margin-bottom: 2rem; }


@media (max-width: 768px) {
  .hide-mobile {
    display: none;
  }
}
```

# chat.css
```css

.chat-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}


.chat-header {
  background: #fff;
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #667eea;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
}

.user-email {
  margin: 0;
  font-size: 12px;
  color: #718096;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stats-btn,
.logout-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.stats-btn {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.stats-btn:hover {
  background: #edf2f7;
  transform: translateY(-1px);
}

.logout-btn {
  background: #094c6b;
  color: #ffffff;
  border: 1px solid #2a86a3;
}

.logout-btn:hover {
  background: #1c769f;
  transform: translateY(-1px);
}


.stats-panel {
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 15px 20px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 200px;
    opacity: 1;
  }
}

.stats-content h4 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 14px;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.stat-label {
  color: #718096;
}

.stat-value {
  font-weight: 600;
  color: #2d3748;
}


.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  scroll-behavior: smooth;
}


.welcome-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.welcome-content {
  max-width: 400px;
  padding: 40px 20px;
}

.welcome-icon {
  font-size: 60px;
  margin-bottom: 20px;
  animation: bounce 2s ease-in-out infinite;
}

.welcome-content h2 {
  color: #2d3748;
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 600;
}

.welcome-content p {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 10px;
}

.welcome-tip {
  background: #bee3f8;
  color: #2b6cb0;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 20px;
}


.loading-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #718096;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}


.messages-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
}


.message-wrapper {
  display: flex;
  align-items: flex-end;
}

.message-wrapper.user-message {
  justify-content: flex-end;
}

.message-wrapper.assistant-message {
  justify-content: flex-start;
}


.message {
  max-width: 70%;
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.user-msg {
  margin-left: auto;
}

.user-msg .message-content {
  background: #667eea;
  color: white;
  padding: 12px 16px;
  border-radius: 18px 18px 4px 18px;
  margin-bottom: 5px;
}

.user-msg .message-content p {
  margin: 0;
  line-height: 1.4;
}

.user-msg .message-time {
  text-align: right;
  font-size: 11px;
  color: #a0aec0;
}


.assistant-msg {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.message-bubble {
  flex: 1;
}

.assistant-msg .message-content {
  background: #fff;
  color: #2d3748;
  padding: 12px 16px;
  border-radius: 18px 18px 18px 4px;
  border: 1px solid #e2e8f0;
  margin-bottom: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.assistant-msg .message-content p {
  margin: 0;
  line-height: 1.5;
}

.assistant-msg .message-time {
  font-size: 11px;
  color: #a0aec0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.error-indicator {
  color: #e53e3e;
}


.assistant-msg.typing .message-content {
  padding: 15px 20px;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  background: #a0aec0;
  border-radius: 50%;
  animation: typingDots 1.4s ease-in-out infinite both;
}

.typing-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typingDots {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.typing-text {
  margin: 0;
  font-size: 12px;
  color: #718096;
  font-style: italic;
}


.chat-input {
  background: #fff;
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}

.input-form {
  max-width: 800px;
  margin: 0 auto;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 8px;
  transition: border-color 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: #667eea;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
  resize: none;
  outline: none;
  min-height: 20px;
  max-height: 120px;
  font-family: inherit;
}

.message-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-btn:not(:disabled):hover {
  background: #5a67d8;
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
}

.send-btn.sending {
  background: #a0aec0;
}

.sending-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.input-status {
  margin-top: 10px;
  text-align: center;
}

.error-text {
  color: #e53e3e;
  font-size: 12px;
}


@media (max-width: 768px) {
  .chat-header {
    padding: 10px 15px;
  }
  
  .user-name {
    font-size: 14px;
  }
  
  .user-email {
    font-size: 11px;
  }
  
  .chat-messages {
    padding: 15px;
  }
  
  .message {
    max-width: 85%;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-content {
    padding: 20px 10px;
  }
  
  .welcome-content h2 {
    font-size: 20px;
  }
  
  .message-avatar {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
  
  .chat-input {
    padding: 15px;
  }
  
  .input-wrapper {
    padding: 6px;
  }
  
  .send-btn {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .user-info {
    gap: 8px;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
  }
  
  .header-actions {
    gap: 5px;
  }
  
  .stats-btn,
  .logout-btn {
    padding: 6px 8px;
    font-size: 12px;
  }
  
  .message {
    max-width: 90%;
  }
  
  .assistant-msg {
    gap: 8px;
  }
  
  .message-avatar {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
}


.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}


@media (prefers-color-scheme: dark) {
  .chat-container {
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  }
  
  .chat-header {
    background: #2d3748;
    border-bottom-color: #4a5568;
  }
  
  .user-name {
    color: #f7fafc;
  }
  
  .user-email {
    color: #a0aec0;
  }
  
  .stats-panel {
    background: #2d3748;
    border-bottom-color: #4a5568;
  }
  
  .stats-content h4 {
    color: #f7fafc;
  }
  
  .stat-value {
    color: #e2e8f0;
  }
  
  .welcome-content h2 {
    color: #f7fafc;
  }
  
  .welcome-content p {
    color: #a0aec0;
  }
  
  .assistant-msg .message-content {
    background: #4a5568;
    color: #f7fafc;
    border-color: #718096;
  }
  
  .chat-input {
    background: #2d3748;
    border-top-color: #4a5568;
  }
  
  .input-wrapper {
    background: #4a5568;
    border-color: #718096;
  }
  
  .input-wrapper:focus-within {
    border-color: #667eea;
  }
  
  .message-input {
    color: #f7fafc;
  }
  
  .message-input::placeholder {
    color: #a0aec0;
  }
}
```

# auth.css
```css

.auth-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-sizing: border-box;
}

.auth-card {
  max-width: 450px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  animation: slideUp 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  font-size: 60px;
  margin-bottom: 15px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 16px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.auth-content {
  margin-bottom: 30px;
}
.description {
  margin-bottom: 30px;
}

.description h2 {
  font-size: 20px;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 600;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 8px 0;
  color: #4a5568;
  font-size: 14px;
  line-height: 1.6;
}

.auth-actions {
  text-align: center;
  margin-bottom: 20px;
}

.google-btn {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  background: #fff;
  color: #2d3748;
  border: 2px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.google-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e0;
}

.google-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.google-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.google-btn.loading {
  pointer-events: none;
}

.google-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn-text {
  flex: 1;
}

.error-message {
  margin-top: 15px;
  padding: 12px;
  background: #fed7d7;
  color: #c53030;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #feb2b2;
}

.info-section {
  text-align: center;
}

.info-text {
  font-size: 12px;
  color: #a0aec0;
  line-height: 1.5;
  margin: 0;
}

.auth-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.auth-footer p {
  margin: 0;
  font-size: 14px;
  color: #718096;
}

.auth-footer strong {
  color: #4a5568;
}

.auth-footer small {
  font-size: 12px;
  color: #a0aec0;
}

@media (max-width: 480px) {
  .auth-container {
    padding: 15px;
  }
  
  .auth-card {
    padding: 30px 20px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .google-btn {
    padding: 12px 16px;
    font-size: 15px;
  }
  
  .features-list li {
    font-size: 13px;
  }
}
@media (prefers-color-scheme: dark) {
  .auth-card {
    background: rgba(26, 32, 44, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .title {
    color: #f7fafc;
  }
  
  .subtitle {
    color: #a0aec0;
  }
  
  .description h2 {
    color: #f7fafc;
  }
  
  .features-list li {
    color: #cbd5e0;
  }
  
  .google-btn {
    background: #2d3748;
    color: #f7fafc;
    border-color: #4a5568;
  }
  
  .google-btn:hover:not(:disabled) {
    border-color: #718096;
  }
  
  .info-text {
    color: #718096;
  }
  
  .auth-footer {
    border-top-color: #4a5568;
  }
  
  .auth-footer p {
    color: #a0aec0;
  }
  
  .auth-footer strong {
    color: #e2e8f0;
  }
}

```