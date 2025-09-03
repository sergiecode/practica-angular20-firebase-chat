/**
 * Auth Guard - Protección de Rutas
 * 
 * Este guard se ejecuta antes de navegar a una ruta protegida para verificar
 * si el usuario está autenticado. Si no lo está, puede redirigir al login.
 * 
 * Beneficios de seguridad:
 * - Previene acceso directo a URLs protegidas
 * - Se ejecuta antes de cargar el componente (más eficiente)
 * - Puede redirigir automáticamente a login si no está autenticado
 * - Funciona con navegación programática y directa en URL
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Método que determina si se puede activar la ruta
   * 
   * @returns Observable<boolean> - true si puede acceder, false si no
   */
  canActivate(): Observable<boolean> {
    return this.authService.estaAutenticado$.pipe(
      // Si no está autenticado, redirigir al login
      tap(estaAutenticado => {
        if (!estaAutenticado) {
          console.log('🚫 Acceso denegado - Usuario no autenticado');
          this.router.navigate(['/auth']);
        } else {
          console.log('✅ Acceso permitido - Usuario autenticado');
        }
      }),
      // Retornar el estado de autenticación
      map(estaAutenticado => estaAutenticado)
    );
  }
}
