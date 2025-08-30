/**
 * Configuración del entorno para producción
 * Este archivo se usará cuando la aplicación sea compilada para producción
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

export const environment = {
  // Activamos el modo producción para optimizaciones
  production: true,
  
  // En producción, estas variables deberían venir de variables de entorno
  // durante el proceso de build para mayor seguridad
  firebaseConfig: {
    apiKey: "TU_API_KEY_DE_FIREBASE_PROD",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijklmnop"
  },
  
  openai: {
    apiKey: "TU_API_KEY_DE_OPENAI_PROD",
    apiUrl: "https://api.openai.com/v1/chat/completions"
  }
};
