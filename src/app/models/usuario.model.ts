/**
 * Modelo de datos para representar un usuario en nuestra aplicación
 * Este interfaz define la estructura de un usuario autenticado con Firebase
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

export interface Usuario {
  // Identificador único del usuario (viene de Firebase Auth)
  uid: string;
  
  // Correo electrónico del usuario
  email: string;
  
  // Nombre completo del usuario (puede venir de Google Auth)
  nombre?: string;
  
  // URL de la foto de perfil (generalmente de Google)
  fotoUrl?: string;
  
  // Fecha de creación de la cuenta
  fechaCreacion: Date;
  
  // Última vez que el usuario se conectó
  ultimaConexion: Date;
}
