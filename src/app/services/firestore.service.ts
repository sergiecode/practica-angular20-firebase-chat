/**
 * Servicio de Firestore para manejar la base de datos
 * Este servicio se encarga de guardar y recuperar los mensajes del chat
 * desde la base de datos de Firebase Firestore
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  Timestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MensajeChat, ConversacionChat } from '../models/chat.model';
import { environment } from '../../environments/environment';

@Injectable({
  // Este servicio estará disponible en toda la aplicación
  providedIn: 'root'
})
export class FirestoreService {
  
  // Inyectamos el servicio de Firestore usando la nueva sintaxis de Angular
  private firestore = inject(Firestore);

  /**
   * Guarda un nuevo mensaje en Firestore
   * Cada mensaje se almacena en la colección 'mensajes' con el ID del usuario
   * 
   * @param mensaje - El mensaje que queremos guardar en la base de datos
   * @returns Promise que se resuelve cuando el mensaje se guarda exitosamente
   */
  async guardarMensaje(mensaje: MensajeChat): Promise<void> {
    try {
      // Validamos que tenemos todos los datos requeridos
      if (!mensaje.usuarioId) {
        throw new Error('usuarioId es requerido');
      }
      if (!mensaje.contenido) {
        throw new Error('contenido es requerido');
      }
      if (!mensaje.tipo) {
        throw new Error('tipo es requerido');
      }
      
      // Obtenemos la referencia a la colección 'mensajes'
      const coleccionMensajes = collection(this.firestore, 'mensajes');
      
      // Preparamos el mensaje para guardarlo, convirtiendo la fecha a Timestamp de Firebase
      const mensajeParaGuardar = {
        usuarioId: mensaje.usuarioId,
        contenido: mensaje.contenido,
        tipo: mensaje.tipo,
        estado: mensaje.estado || 'enviado',
        // Firebase requiere usar Timestamp en lugar de Date
        fechaEnvio: Timestamp.fromDate(mensaje.fechaEnvio)
      };
      
      // Añadimos el documento a la colección
      const docRef = await addDoc(coleccionMensajes, mensajeParaGuardar);
      
    } catch (error: any) {
      console.error('❌ Error al guardar mensaje en Firestore:', error);
      console.error('❌ Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Obtiene todos los mensajes de un usuario específico en tiempo real
   * Utiliza onSnapshot para escuchar cambios en tiempo real
   * 
   * @param usuarioId - ID del usuario cuyos mensajes queremos obtener
   * @returns Observable que emite la lista de mensajes cada vez que hay cambios
   */
  obtenerMensajesUsuario(usuarioId: string): Observable<MensajeChat[]> {
    return new Observable(observer => {
      // Creamos una consulta para obtener solo los mensajes del usuario especificado
      // NOTA: Removemos temporalmente orderBy para evitar el problema del índice
      const consulta = query(
        collection(this.firestore, 'mensajes'),
        // Filtramos por el ID del usuario
        where('usuarioId', '==', usuarioId)
        // Comentamos temporalmente el orderBy hasta crear el índice
        // orderBy('fechaEnvio', 'asc')
      );

      // Configuramos el listener en tiempo real
      const unsubscribe = onSnapshot(
        consulta,
        (snapshot: QuerySnapshot<DocumentData>) => {
          // Transformamos los documentos de Firestore en nuestros objetos MensajeChat
          const mensajes: MensajeChat[] = snapshot.docs.map(doc => {
            const data = doc.data();
            
            return {
              id: doc.id,
              usuarioId: data['usuarioId'],
              contenido: data['contenido'],
              tipo: data['tipo'],
              estado: data['estado'],
              // Convertimos el Timestamp de Firebase de vuelta a Date
              fechaEnvio: data['fechaEnvio'].toDate()
            } as MensajeChat;
          });
          
          // ORDENAMOS en el cliente ya que removimos orderBy de la query
          mensajes.sort((a, b) => a.fechaEnvio.getTime() - b.fechaEnvio.getTime());
          
          // Emitimos los mensajes a través del Observable
          observer.next(mensajes);
        },
        error => {
          console.error('❌ Error al escuchar mensajes:', error);
          observer.error(error);
        }
      );

      // Función de limpieza que se ejecuta cuando se cancela la suscripción
      return () => {
        unsubscribe();
      };
    });
  }

  /**
   * Guarda una conversación completa en Firestore
   * Útil para backup o para guardar metadatos de la conversación
   * 
   * @param conversacion - La conversación completa que queremos guardar
   * @returns Promise que se resuelve cuando la conversación se guarda
   */
  async guardarConversacion(conversacion: ConversacionChat): Promise<void> {
    try {
      const coleccionConversaciones = collection(this.firestore, 'conversaciones');
      
      // Preparamos la conversación, convirtiendo las fechas a Timestamps
      const conversacionParaGuardar = {
        ...conversacion,
        fechaCreacion: Timestamp.fromDate(conversacion.fechaCreacion),
        ultimaActividad: Timestamp.fromDate(conversacion.ultimaActividad),
        // También convertimos las fechas de los mensajes
        mensajes: conversacion.mensajes.map(mensaje => ({
          ...mensaje,
          fechaEnvio: Timestamp.fromDate(mensaje.fechaEnvio)
        }))
      };
      
      await addDoc(coleccionConversaciones, conversacionParaGuardar);
      
    } catch (error) {
      console.error('❌ Error al guardar conversación:', error);
      throw error;
    }
  }

  /**
   * Elimina todos los mensajes de un usuario
   * Útil para funcionalidad de "limpiar historial"
   * 
   * @param usuarioId - ID del usuario cuyos mensajes queremos eliminar
   */
  async eliminarMensajesUsuario(usuarioId: string): Promise<void> {
    // NOTA: Esta funcionalidad requiere implementación adicional
    // debido a que Firestore no permite eliminar múltiples documentos
    // en una sola operación desde el cliente
    
    // En una aplicación real, esto se haría mediante Cloud Functions
    // o mediante un proceso batch en el backend
  }
}
