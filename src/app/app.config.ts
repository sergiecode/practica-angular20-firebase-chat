/**
 * Configuración principal de la aplicación Angular
 * Aquí se configuran todos los proveedores, servicios y funcionalidades
 * necesarias para que la aplicación funcione correctamente
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Importamos las rutas de la aplicación
import { routes } from './app.routes';

// Importamos las funciones de configuración de Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Importamos la configuración del entorno
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de manejo global de errores de Angular
    provideBrowserGlobalErrorListeners(),
    
    // Configuración de detección de cambios de Angular
    // Usa eventos de coalescencia para mejor rendimiento
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Configuración del router de Angular
    // Permite la navegación entre páginas de la aplicación
    provideRouter(routes),
    
    // Configuración de HttpClient para hacer peticiones HTTP
    // Necesario para conectar con la API de OpenAI
    provideHttpClient(),
    
    // Configuración de Firebase
    // Inicializa la aplicación Firebase con nuestra configuración
    provideFirebaseApp(() => {
      console.log('🔥 Inicializando Firebase...');
      return initializeApp(environment.firebaseConfig);
    }),
    
    // Configuración de Firebase Authentication
    // Permite el login con Google y manejo de usuarios
    provideAuth(() => {
      console.log('🔐 Configurando Firebase Authentication...');
      return getAuth();
    }),
    
    // Configuración de Firestore (base de datos)
    // Permite guardar y recuperar mensajes del chat
    provideFirestore(() => {
      console.log('📚 Configurando Firestore...');
      return getFirestore();
    })
  ]
};
