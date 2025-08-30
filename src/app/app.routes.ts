/**
 * Configuración de rutas de la aplicación
 * Define las páginas y componentes que se muestran según la URL
 * Utiliza lazy loading para optimizar la carga de la aplicación
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta por defecto - redirige al login/registro
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  
  // Ruta de autenticación (login/registro)
  {
    path: 'auth',
    loadComponent: () => import('./components/auth.component').then(m => m.AuthComponent),
    title: 'Iniciar Sesión - Chat Asistente'
  },
  
  // Ruta del chat principal
  {
    path: 'chat',
    loadComponent: () => import('./components/chat.component').then(m => m.ChatComponent),
    title: 'Chat - Asistente Virtual'
  },
  
  // Ruta wildcard - redirige cualquier URL inválida al auth
  {
    path: '**',
    redirectTo: '/auth'
  }
];
