/**
 * Componente de Autenticación (Login/Registro)
 * Primera pantalla que ve el usuario para autenticarse con Google
 * Utiliza Firebase Authentication con standalone components
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  // Selector único para este componente
  selector: 'app-auth',
  
  // Componente standalone - no necesita NgModule
  standalone: true,
  
  // Importamos los módulos que necesitamos
  imports: [CommonModule],
  
  // Template HTML del componente
  template: `
    <!-- Contenedor principal con diseño responsivo -->
    <div class="auth-container">
      
      <!-- Tarjeta principal de autenticación -->
      <div class="auth-card">
        
        <!-- Encabezado con logo y título -->
        <div class="auth-header">
          <div class="logo">
            💬
          </div>
          <h1 class="title">Chat Asistente</h1>
          <p class="subtitle">
            Bienvenido a tu asistente personal con IA
          </p>
        </div>
        
        <!-- Contenido principal -->
        <div class="auth-content">
          
          <!-- Descripción de la aplicación -->
          <div class="description">
            <h2>¿Qué puedes hacer?</h2>
            <ul class="features-list">
              <li>💭 Conversar con ChatGPT en español</li>
              <li>💾 Tu historial se guarda automáticamente</li>
              <li>🔄 Accede a tus conversaciones desde cualquier dispositivo</li>
              <li>🛡️ Tus datos están seguros con Firebase</li>
            </ul>
          </div>
          
          <!-- Botón de autenticación -->
          <div class="auth-actions">
            <button 
              class="google-btn"
              (click)="iniciarSesionConGoogle()"
              [disabled]="autenticando"
              [class.loading]="autenticando">
              
              <!-- Icono de Google -->
              <span class="google-icon" *ngIf="!autenticando">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </span>
              
              <!-- Spinner de carga -->
              <span class="spinner" *ngIf="autenticando"></span>
              
              <!-- Texto del botón -->
              <span class="btn-text">
                {{ autenticando ? 'Iniciando sesión...' : 'Continuar con Google' }}
              </span>
            </button>
            
            <!-- Mensaje de error si existe -->
            <div class="error-message" *ngIf="mensajeError">
              ❌ {{ mensajeError }}
            </div>
          </div>
          
          <!-- Información adicional -->
          <div class="info-section">
            <p class="info-text">
              Al continuar, aceptas que utilizamos Google para autenticarte de forma segura.
              No almacenamos tu contraseña.
            </p>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div class="auth-footer">
          <p>
            Desarrollado por <strong>Sergie Code</strong> 🚀<br>
            <small>Tutorial Angular 20 + Firebase + ChatGPT</small>
          </p>
        </div>
        
      </div>
    </div>
  `,
  
  // Estilos CSS específicos para este componente
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  
  // Inyectamos los servicios que necesitamos usando la nueva sintaxis de Angular
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Variables para manejar el estado del componente
  autenticando = false;      // Indica si estamos en proceso de autenticación
  mensajeError = '';         // Almacena mensajes de error para mostrar al usuario

  /**
   * Método que se ejecuta cuando el usuario hace clic en "Continuar con Google"
   * Maneja todo el proceso de autenticación con Firebase
   */
  async iniciarSesionConGoogle(): Promise<void> {
    // Limpiamos cualquier mensaje de error previo
    this.mensajeError = '';
    
    // Activamos el estado de carga
    this.autenticando = true;
    
    console.log('🔐 Usuario iniciando proceso de autenticación...');
    
    try {
      // Llamamos al servicio de autenticación para iniciar sesión con Google
      const usuario = await this.authService.iniciarSesionConGoogle();
      
      if (usuario) {
        console.log('✅ Autenticación exitosa, redirigiendo al chat...');
        
        // Si la autenticación fue exitosa, navegamos a la página del chat
        await this.router.navigate(['/chat']);
        
      } else {
        // Si no se obtuvo información del usuario, mostramos un error
        this.mensajeError = 'No se pudo obtener la información del usuario';
        console.error('❌ No se obtuvo información del usuario');
      }
      
    } catch (error: any) {
      // Manejamos los diferentes tipos de errores que pueden ocurrir
      console.error('❌ Error durante la autenticación:', error);
      
      // Personalizamos el mensaje de error según el código de error de Firebase
      if (error.code === 'auth/popup-closed-by-user') {
        this.mensajeError = 'Has cerrado la ventana de autenticación. Intenta de nuevo.';
      } else if (error.code === 'auth/popup-blocked') {
        this.mensajeError = 'Tu navegador bloqueó la ventana de autenticación. Permite popups y vuelve a intentar.';
      } else if (error.code === 'auth/network-request-failed') {
        this.mensajeError = 'Error de conexión. Verifica tu internet y vuelve a intentar.';
      } else {
        // Error genérico
        this.mensajeError = 'Error al iniciar sesión. Por favor intenta de nuevo.';
      }
      
    } finally {
      // Siempre desactivamos el estado de carga, independientemente del resultado
      this.autenticando = false;
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando se inicializa el componente
   * Aquí podríamos verificar si el usuario ya está autenticado
   */
  ngOnInit(): void {
    console.log('🎯 Componente de autenticación inicializado');
    
    // Verificamos si el usuario ya está autenticado
    this.authService.estaAutenticado$.subscribe(autenticado => {
      if (autenticado) {
        console.log('👤 Usuario ya autenticado, redirigiendo al chat...');
        this.router.navigate(['/chat']);
      }
    });
  }
}
