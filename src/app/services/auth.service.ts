/**
 * Servicio de Autenticación con Firebase
 * Este servicio maneja todo lo relacionado con el registro, login y logout de usuarios
 * usando Firebase Authentication con Google como proveedor
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  user,
  User 
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  // Hacemos que este servicio esté disponible en toda la aplicación
  providedIn: 'root'
})
export class AuthService {
  
  // Inyectamos el servicio de autenticación de Firebase usando la nueva sintaxis de Angular
  private auth = inject(Auth);
  
  // Creamos un Observable que nos permite saber si hay un usuario autenticado
  // Este Observable emite cada vez que cambia el estado de autenticación
  usuario$ = user(this.auth);
  
  // Observable que nos dice si el usuario está autenticado o no
  estaAutenticado$ = this.usuario$.pipe(
    // Transformamos el usuario en un boolean: true si existe, false si no
    map(usuario => !!usuario)
  );

  /**
   * Método para iniciar sesión con Google
   * Abre una ventana popup para que el usuario se autentique con su cuenta de Google
   * 
   * @returns Promise que se resuelve con los datos del usuario autenticado
   */
  async iniciarSesionConGoogle(): Promise<Usuario | null> {
    try {
      // Creamos el proveedor de Google para la autenticación
      const proveedor = new GoogleAuthProvider();
      
      // Configuramos los scopes que queremos obtener del usuario
      proveedor.addScope('email');
      proveedor.addScope('profile');
      
      // Abrimos el popup de Google para autenticación
      const resultado = await signInWithPopup(this.auth, proveedor);
      
      // Extraemos la información del usuario autenticado
      const usuarioFirebase = resultado.user;
      
      if (usuarioFirebase) {
        // Creamos nuestro objeto Usuario con los datos de Firebase
        const usuario: Usuario = {
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email || '',
          nombre: usuarioFirebase.displayName || 'Usuario sin nombre',
          fotoUrl: usuarioFirebase.photoURL || undefined,
          fechaCreacion: new Date(),
          ultimaConexion: new Date()
        };
        
        return usuario;
      }
      
      return null;
      
    } catch (error) {
      // Si hay un error, lo mostramos en la consola y lo relanzamos
      console.error('❌ Error durante la autenticación:', error);
      throw error;
    }
  }

  /**
   * Método para cerrar la sesión del usuario
   * Elimina la sesión actual de Firebase
   * 
   * @returns Promise que se resuelve cuando la sesión se cierra exitosamente
   */
  async cerrarSesion(): Promise<void> {
    try {
      // Usamos el método signOut de Firebase para cerrar la sesión
      await signOut(this.auth);
      
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      throw error;
    }
  }

  /**
   * Método para obtener el usuario actual
   * Devuelve null si no hay usuario autenticado
   * 
   * @returns El usuario actual o null
   */
  obtenerUsuarioActual(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Método para obtener el UID del usuario actual
   * Útil para operaciones con Firestore
   * 
   * @returns El UID del usuario o null si no está autenticado
   */
  obtenerUidUsuario(): string | null {
    const usuario = this.obtenerUsuarioActual();
    return usuario ? usuario.uid : null;
  }
}
