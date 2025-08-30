/**
 * Configuración del entorno para la aplicación Angular
 * Este archivo contiene todas las claves de API y configuraciones necesarias
 * para conectar con Firebase y OpenAI
 * 
 * IMPORTANTE: En producción, estas claves deben estar en variables de entorno
 * por seguridad. Nunca subas este archivo con claves reales a un repositorio público.
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

export const environment = {
  // Indica si estamos en modo de producción o desarrollo
  production: false,
  
  // Configuración de Firebase - Obtén estos valores desde la consola de Firebase
  // Ve a tu proyecto > Configuración del proyecto > Configuración de aplicaciones web
  firebaseConfig: {
    apiKey: "TU_API_KEY_DE_FIREBASE",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijklmnop"
  },
  
  // Configuración de OpenAI ChatGPT API
  // Obtén tu clave API desde https://platform.openai.com/api-keys
  openai: {
    apiKey: "TU_API_KEY_DE_OPENAI",
    // URL base de la API de OpenAI
    apiUrl: "https://api.openai.com/v1/chat/completions"
  }
};
