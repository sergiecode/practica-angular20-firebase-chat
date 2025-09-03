/**
 * Configuración de rutas de la aplicación Angular 20
 * 
 * Este archivo define todas las rutas (URLs) de nuestra aplicación y qué
 * componentes se deben mostrar para cada ruta. Utiliza lazy loading
 * para optimizar la carga inicial de la aplicación.
 * 
 * Conceptos importantes:
 * - Lazy Loading: Los componentes se cargan solo cuando se necesitan
 * - Route Guards: Se pueden añadir para proteger rutas (authGuard, etc.)
 * - Route Parameters: Se pueden pasar parámetros en las URLs
 * - Route Resolution: Se pueden cargar datos antes de mostrar el componente
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Routes } from '@angular/router';
import { AuthGuard } from './guards';

export const routes: Routes = [
  // Ruta por defecto - Redirige automáticamente al componente de autenticación
  // Cuando alguien visita la raíz del sitio (/), lo enviamos a /auth
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full' // Solo redirigir si la ruta es exactamente '/'
  },
  
  // Ruta de autenticación (login/registro con Google)
  // Utiliza lazy loading: el código del componente se carga solo cuando se necesita
  {
    path: 'auth',
    loadComponent: () => import('./components/auth').then(m => m.AuthComponent),
    title: 'Iniciar Sesión - Chat Asistente' // Título que aparece en la pestaña del navegador
  },
  
  // Ruta del chat principal donde ocurre la conversación
  // También con lazy loading para optimizar la carga inicial
  // ✅ PROTEGIDA CON AUTH GUARD - Solo usuarios autenticados pueden acceder
  {
    path: 'chat',
    loadComponent: () => import('./components/chat').then(m => m.ChatComponent),
    title: 'Chat - Asistente Virtual',
    canActivate: [AuthGuard] // 🛡️ Protección de ruta implementada
  },
  
  // Ruta wildcard - Captura cualquier URL que no coincida con las anteriores
  // Útil para manejar URLs incorrectas o páginas que no existen (404)
  {
    path: '**',
    redirectTo: '/auth'
  }
];
