/**
 * TEMPLATE - Configuración del entorno para desarrollo
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo como 'environment.ts'
 * 2. Reemplaza los valores placeholder con tus claves reales
 * 3. NUNCA subas el archivo con claves reales a Git
 * enviroment.ts
 * environment.prod.ts
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

export const environment = {
  production: false,
  
  // Firebase Configuration - Get these from Firebase Console
  firebaseConfig: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id", 
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijklmnop",
    measurementId: "G-XXXXXXXXXX"
  },
  
  // OpenAI Configuration - Get from https://platform.openai.com/api-keys
  openai: {
    apiKey: "YOUR_OPENAI_API_KEY",
    apiUrl: "https://api.openai.com/v1/chat/completions"
  }
};
