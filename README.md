# 💬 Angular 20 + Firebase + ChatGPT - Aplicación de Chat Moderna

## 🎓 Tutorial Completo de Sergie Code

Una aplicación de chat en tiempo real construida con **Angular 20**, **Firebase** y **OpenAI ChatGPT**, diseñada específicamente como material educativo para aprender desarrollo web moderno con las tecnologías más actuales.

### 📚 ¿Qué aprenderás en este proyecto?

Esta aplicación está documentada paso a paso para enseñar:

1. **Angular 20 Standalone Components** - Cómo construir aplicaciones sin NgModules
2. **Firebase Authentication** - Autenticación segura con Google
3. **Firestore Database** - Base de datos en tiempo real NoSQL
4. **OpenAI API Integration** - Integración con ChatGPT
5. **Responsive Design** - Diseño adaptable a todos los dispositivos
6. **TypeScript Avanzado** - Tipado fuerte y interfaces
7. **Arquitectura de Software** - Servicios, modelos y componentes

## ⚠️ **IMPORTANTE: Configuración de API Keys**

**Este proyecto requiere configuración de claves API que NO están incluidas por seguridad.**

👉 **[Lee las instrucciones de configuración aquí](ENVIRONMENT_SETUP.md)** 👈

## 🚀 Características Técnicas Implementadas

- ✅ **Angular 20** con arquitectura de componentes standalone (sin NgModules)
- ✅ **Signals de Angular** para manejo reactivo del estado
- ✅ **Dependency Injection** usando la nueva sintaxis inject()
- ✅ **Autenticación con Google** usando Firebase Auth
- ✅ **Chat en tiempo real** con persistencia en Firestore
- ✅ **Integración con ChatGPT** para respuestas de IA inteligentes
- ✅ **Manejo de errores** robusto en toda la aplicación
- ✅ **Interfaz en español** con comentarios educativos completos
- ✅ **Diseño responsivo** que funciona en móviles y escritorio
- ✅ **TypeScript completo** con interfaces tipadas
- ✅ **Despliegue listo** para Firebase Hosting
- ✅ **Comentarios explicativos** en cada línea de código importanterebase + ChatGPT - Aplicación de Chat Moderna

Una aplicación de chat en tiempo real construida con **Angular 20**, **Firebase** y **OpenAI ChatGPT**, utilizando componentes standalone y diseño responsivo con UI completamente en español.

## � **IMPORTANTE: Configuración de API Keys**

**Este proyecto requiere configuración de claves API que NO están incluidas por seguridad.**

👉 **[Lee las instrucciones de configuración aquí](ENVIRONMENT_SETUP.md)** 👈

## �🚀 Características Principales

- ✅ **Angular 20** con arquitectura de componentes standalone (sin NgModules)
- ✅ **Autenticación con Google** usando Firebase Auth
- ✅ **Chat en tiempo real** con persistencia en Firestore
- ✅ **Integración con ChatGPT** para respuestas de IA
- ✅ **Interfaz en español** con comentarios educativos
- ✅ **Diseño responsivo** que funciona en móviles y escritorio
- ✅ **TypeScript completo** con interfaces tipadas
- ✅ **Despliegue listo** para Firebase Hosting

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Angular 20, TypeScript, CSS3
- **Backend**: Firebase (Firestore, Authentication)
- **IA**: OpenAI ChatGPT API
- **Despliegue**: Firebase Hosting
- **Herramientas**: Angular CLI, npm

## 📦 Instalación y Configuración

### 1. Clona el repositorio
```bash
git clone <tu-repositorio>
cd angular20-firebase-chat
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Authentication con Google
4. Crea una base de datos Firestore
5. Copia tu configuración de Firebase

### 4. Configura las variables de entorno

Edita `src/environments/environment.ts` y `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
  },
  openai: {
    apiKey: "sk-tu-openai-api-key",
    baseUrl: "https://api.openai.com/v1"
  }
};
```

### 5. Obtén tu API Key de OpenAI

1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Crea una cuenta y genera una API key
3. Añádela a tu archivo de environment

## 🔥 Comandos de Desarrollo

### Servidor de desarrollo
```bash
npm start
# o
ng serve
```
Navega a `http://localhost:4200/`

### Construir para producción
```bash
npm run build
# o
ng build --configuration=production
```

### Ejecutar tests
```bash
npm test
# o
ng test
```

## 🌐 Despliegue en Firebase Hosting

### 1. Instala Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Inicia sesión en Firebase
```bash
firebase login
```

### 3. Inicializa Firebase en tu proyecto
```bash
firebase init hosting
```

### 4. Construye y despliega
```bash
npm run build
firebase deploy
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── models/           # Interfaces TypeScript
│   │   ├── usuario.model.ts
│   │   └── chat.model.ts
│   ├── services/         # Servicios de Angular
│   │   ├── auth.service.ts
│   │   ├── firestore.service.ts
│   │   ├── openai.service.ts
│   │   └── chat.service.ts
│   ├── components/       # Componentes standalone
│   │   ├── auth/
│   │   └── chat/
│   ├── app.config.ts     # Configuración de la app
│   ├── app.routes.ts     # Rutas de la aplicación
│   ├── app.ts            # Componente principal
│   └── app.html          # Template principal
├── environments/         # Variables de entorno
└── styles.css           # Estilos globales
```

## 🎯 Funcionalidades Principales

### Autenticación
- ✅ Login con Google OAuth
- ✅ Gestión de estado del usuario
- ✅ Redirección automática según autenticación

### Chat
- ✅ Mensajes en tiempo real
- ✅ Integración con ChatGPT
- ✅ Persistencia en Firestore
- ✅ Indicadores de escritura
- ✅ Scroll automático
- ✅ Contadores de mensajes

### Diseño
- ✅ Responsive design
- ✅ Interfaz moderna
- ✅ Animaciones suaves
- ✅ Burbujas de chat diferenciadas

## 🔧 Personalización

### Cambiar el modelo de ChatGPT
Edita `src/app/services/openai.service.ts`:
```typescript
private readonly modelo = 'gpt-4'; // Cambia por el modelo deseado
```

### Modificar los prompts del sistema
Edita el `promptSistema` en `openai.service.ts` para cambiar el comportamiento de la IA.

### Personalizar estilos
Los estilos están en archivos CSS individuales para cada componente:
- `src/app/components/auth/auth.component.css`
- `src/app/components/chat/chat.component.css`

## 🐛 Solución de Problemas

### Error de autenticación de Firebase
1. Verifica que hayas habilitado Authentication en Firebase Console
2. Asegúrate de que el dominio esté autorizado en Firebase
3. Revisa que las credenciales en `environment.ts` sean correctas

### Error de API de OpenAI
1. Verifica que tu API key sea válida
2. Asegúrate de tener créditos en tu cuenta de OpenAI
3. Revisa que el modelo especificado esté disponible

### Errores de compilación
1. Ejecuta `npm install` para asegurar todas las dependencias
2. Verifica que estés usando Node.js 18 o superior
3. Limpia caché: `npm run ng cache clean`

## 📚 Documentación Técnica

Este proyecto incluye documentación técnica detallada para fines educativos:

- 📖 **[ARQUITECTURA.md](ARQUITECTURA.md)** - Arquitectura completa de la aplicación
- 🔄 **[PATRONES-COMUNICACION.md](PATRONES-COMUNICACION.md)** - Patrones de comunicación entre servicios
- 🔥 **[FIREBASE-BEST-PRACTICES.md](FIREBASE-BEST-PRACTICES.md)** - Mejores prácticas con Firebase

## 📚 Recursos Adicionales

- [Documentación de Angular](https://angular.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🎓 ¿Qué has aprendido?

Al completar este tutorial de Sergie Code, habrás dominado:

### Frontend Moderno
- ✅ **Angular 20** con componentes standalone
- ✅ **TypeScript** avanzado con tipado fuerte
- ✅ **RxJS** para programación reactiva
- ✅ **Dependency Injection** con la nueva sintaxis `inject()`
- ✅ **Signals** para gestión del estado
- ✅ **CSS Grid/Flexbox** para layouts responsivos

### Backend y APIs
- ✅ **Firebase Authentication** con Google OAuth
- ✅ **Firestore** para base de datos en tiempo real
- ✅ **Security Rules** para proteger datos
- ✅ **OpenAI API** para integración de IA
- ✅ **HTTP Client** para comunicación con APIs externas

### Patrones y Arquitectura
- ✅ **Service-Component Pattern** para separación de responsabilidades
- ✅ **Observer Pattern** con Observables
- ✅ **Error Handling** robusto en capas
- ✅ **State Management** reactivo
- ✅ **Lazy Loading** para optimización

### DevOps y Mejores Prácticas
- ✅ **Environment Configuration** para múltiples entornos
- ✅ **Security Best Practices** para proteger claves API
- ✅ **Performance Optimization** técnicas
- ✅ **Code Organization** y estructura modular
- ✅ **Documentation** completa del código

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Sergie Code** - Software Engineer especializado en desarrollo web moderno

### � Sígueme en todas mis redes sociales:

- 📽️ **YouTube**: https://www.youtube.com/@SergieCode
- 🧑🏼‍� **LinkedIn**: https://www.linkedin.com/in/sergiecode/
- � **GitHub**: https://github.com/sergiecode
- 📸 **Instagram**: https://www.instagram.com/sergiecode
- 🕊️ **Twitter**: https://twitter.com/sergiecode
- 🧵 **Threads**: https://www.threads.net/@sergiecode
- 🎞️ **TikTok**: https://www.tiktok.com/@sergiecode
- 👤 **Facebook**: https://www.facebook.com/sergiecodeok

### 🌟 Sígueme para más contenido

Este proyecto forma parte de una serie de tutoriales completos sobre desarrollo web moderno. ¡Suscríbete al canal para no perderte las próximas lecciones!

---

## 📝 Licencia

Este proyecto se proporciona como material educativo. Siéntete libre de usarlo, modificarlo y aprender de él.

---

**¡Gracias por completar este tutorial! Ahora tienes las habilidades para crear aplicaciones web modernas profesionales. 🚀**

*¿Te ha gustado este tutorial? ¡Dale una ⭐ al repositorio y compártelo con otros desarrolladores!*

npm install firebase
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
