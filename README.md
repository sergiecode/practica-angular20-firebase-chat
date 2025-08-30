# 💬 Angular 20 + Firebase + ChatGPT - Aplicación de Chat Moderna

Una aplicación de chat en tiempo real construida con **Angular 20**, **Firebase** y **OpenAI ChatGPT**, utilizando componentes standalone y diseño responsivo con UI completamente en español.

## 🚀 Características Principales

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

## 📚 Recursos Adicionales

- [Documentación de Angular](https://angular.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 👨‍💻 Autor

Desarrollado como ejemplo educativo de una aplicación Angular 20 moderna con Firebase y ChatGPT.

---

**¡Esperamos que disfrutes construyendo con esta aplicación! 🚀**

