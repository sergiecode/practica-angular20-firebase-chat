/**
 * Servicio principal del Chat
 * Este servicio coordina la funcionalidad del chat, conectando
 * Firebase, OpenAI y la gestión de mensajes
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { MensajeChat } from '../models/chat.model';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { OpenaiService } from './openai.service';

@Injectable({
  // Este servicio estará disponible en toda la aplicación
  providedIn: 'root'
})
export class ChatService {
  
  // Inyectamos todos los servicios que necesitamos
  private authService = inject(AuthService);
  private firestoreService = inject(FirestoreService);
  private openaiService = inject(OpenaiService);
  
  // BehaviorSubject para mantener la lista de mensajes del chat actual
  // BehaviorSubject siempre tiene un valor inicial y emite el último valor a nuevos suscriptores
  private mensajesSubject = new BehaviorSubject<MensajeChat[]>([]);
  
  // Observable público para que los componentes puedan suscribirse a los mensajes
  public mensajes$ = this.mensajesSubject.asObservable();
  
  // Variable para controlar si estamos cargando el historial
  private cargandoHistorial = false;
  
  // Variable para controlar si el asistente está respondiendo
  private asistenteRespondiendo = new BehaviorSubject<boolean>(false);
  public asistenteRespondiendo$ = this.asistenteRespondiendo.asObservable();

  /**
   * Inicializa el servicio de chat para un usuario específico
   * Carga el historial previo desde Firestore
   * 
   * @param usuarioId - ID del usuario para cargar su historial
   */
  async inicializarChat(usuarioId: string): Promise<void> {
    console.log('🚀 Inicializando chat para usuario:', usuarioId);
    
    if (this.cargandoHistorial) {
      console.log('⏳ Ya se está cargando el historial, esperando...');
      return;
    }
    
    this.cargandoHistorial = true;
    
    try {
      // Nos suscribimos a los mensajes del usuario en tiempo real
      this.firestoreService.obtenerMensajesUsuario(usuarioId).subscribe({
        next: (mensajes) => {
          console.log(`📨 Historial cargado: ${mensajes.length} mensajes`);
          
          // Actualizamos el BehaviorSubject con los mensajes obtenidos
          this.mensajesSubject.next(mensajes);
          this.cargandoHistorial = false;
        },
        error: (error) => {
          console.error('❌ Error al cargar historial:', error);
          this.cargandoHistorial = false;
          
          // En caso de error, iniciamos con una lista vacía
          this.mensajesSubject.next([]);
        }
      });
      
    } catch (error) {
      console.error('❌ Error al inicializar chat:', error);
      this.cargandoHistorial = false;
      this.mensajesSubject.next([]);
    }
  }

  /**
   * Envía un mensaje del usuario y obtiene la respuesta de ChatGPT
   * 
   * @param contenidoMensaje - El texto del mensaje que envía el usuario
   */
  async enviarMensaje(contenidoMensaje: string): Promise<void> {
    // Obtenemos el usuario actual
    const usuarioActual = this.authService.obtenerUsuarioActual();
    
    if (!usuarioActual) {
      console.error('❌ No hay usuario autenticado');
      throw new Error('Usuario no autenticado');
    }
    
    if (!contenidoMensaje.trim()) {
      console.warn('⚠️ Mensaje vacío, no se enviará');
      return;
    }
    
    console.log('📤 Enviando mensaje del usuario:', contenidoMensaje);
    
    // Creamos el mensaje del usuario
    const mensajeUsuario: MensajeChat = {
      usuarioId: usuarioActual.uid,
      contenido: contenidoMensaje.trim(),
      fechaEnvio: new Date(),
      tipo: 'usuario',
      estado: 'enviando'
    };
    
    try {
      // Guardamos el mensaje del usuario en Firestore
      await this.firestoreService.guardarMensaje(mensajeUsuario);
      
      // Indicamos que el asistente está procesando la respuesta
      this.asistenteRespondiendo.next(true);
      
      // Obtenemos el historial actual para dar contexto a ChatGPT
      const mensajesActuales = this.mensajesSubject.value;
      
      // Convertimos nuestro historial al formato que espera OpenAI
      // Solo tomamos los últimos 10 mensajes para no exceder límites de tokens
      const historialParaOpenAI = this.openaiService.convertirHistorialAOpenAI(
        mensajesActuales.slice(-10)
      );
      
      console.log('🤖 Solicitando respuesta a ChatGPT...');
      
      // Enviamos el mensaje a ChatGPT y esperamos la respuesta
      const respuestaAsistente = await firstValueFrom(
        this.openaiService.enviarMensaje(contenidoMensaje, historialParaOpenAI)
      );
      
      console.log('✅ Respuesta recibida de ChatGPT');
      
      // Creamos el mensaje con la respuesta del asistente
      const mensajeAsistente: MensajeChat = {
        usuarioId: usuarioActual.uid,
        contenido: respuestaAsistente,
        fechaEnvio: new Date(),
        tipo: 'asistente',
        estado: 'enviado'
      };
      
      // Guardamos la respuesta del asistente en Firestore
      await this.firestoreService.guardarMensaje(mensajeAsistente);
      
      console.log('💾 Respuesta del asistente guardada exitosamente');
      
    } catch (error) {
      console.error('❌ Error al procesar mensaje:', error);
      
      // En caso de error, creamos un mensaje de error del asistente
      const mensajeError: MensajeChat = {
        usuarioId: usuarioActual.uid,
        contenido: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor intenta de nuevo.',
        fechaEnvio: new Date(),
        tipo: 'asistente',
        estado: 'error'
      };
      
      // Guardamos el mensaje de error
      await this.firestoreService.guardarMensaje(mensajeError);
      
      throw error;
      
    } finally {
      // Siempre indicamos que el asistente ya no está respondiendo
      this.asistenteRespondiendo.next(false);
    }
  }

  /**
   * Obtiene todos los mensajes actuales del chat
   * 
   * @returns Array con todos los mensajes del chat actual
   */
  obtenerMensajes(): MensajeChat[] {
    return this.mensajesSubject.value;
  }

  /**
   * Limpia todos los mensajes del chat actual
   * Solo limpia la vista local, no elimina de Firestore
   */
  limpiarChat(): void {
    console.log('🧹 Limpiando chat local');
    this.mensajesSubject.next([]);
  }

  /**
   * Verifica si el chat está listo para usar
   * 
   * @returns true si el chat está inicializado y configurado
   */
  chatListo(): boolean {
    const usuarioAutenticado = !!this.authService.obtenerUsuarioActual();
    const openaiConfigurado = this.openaiService.verificarConfiguracion();
    
    return usuarioAutenticado && openaiConfigurado;
  }

  /**
   * Obtiene estadísticas básicas del chat actual
   * 
   * @returns Objeto con estadísticas del chat
   */
  obtenerEstadisticas() {
    const mensajes = this.mensajesSubject.value;
    
    return {
      totalMensajes: mensajes.length,
      mensajesUsuario: mensajes.filter(m => m.tipo === 'usuario').length,
      mensajesAsistente: mensajes.filter(m => m.tipo === 'asistente').length,
      ultimaActividad: mensajes.length > 0 ? mensajes[mensajes.length - 1].fechaEnvio : null
    };
  }
}
