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
import { AuthService } from '../../services/auth.service';

@Component({
  // Selector único para este componente
  selector: 'app-auth',
  
  // Componente standalone - no necesita NgModule
  standalone: true,
  
  // Importamos los módulos que necesitamos
  imports: [CommonModule],
  
  // Template HTML del componente
  templateUrl: './auth.html',
  
  // Estilos CSS específicos para este componente
  styleUrl: './auth.css'
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
    
    try {
      // Llamamos al servicio de autenticación para iniciar sesión con Google
      const usuario = await this.authService.iniciarSesionConGoogle();
      
      if (usuario) {
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
    // Verificamos si el usuario ya está autenticado
    this.authService.estaAutenticado$.subscribe(autenticado => {
      if (autenticado) {
        this.router.navigate(['/chat']);
      }
    });
  }
}
