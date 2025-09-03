/**
 * Punto de entrada principal de la aplicación Angular 20
 * 
 * Este archivo inicializa la aplicación usando la nueva API de bootstrap
 * para componentes standalone (sin NgModules)
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Iniciamos la aplicación usando bootstrapApplication en lugar del método tradicional
// Esto es una característica nueva de Angular que permite arrancar componentes standalone
bootstrapApplication(App, appConfig)
  .catch((err) => {
    // Si hay un error al inicializar la aplicación, lo mostramos en la consola
    console.error('❌ Error al inicializar la aplicación:', err);
  });
