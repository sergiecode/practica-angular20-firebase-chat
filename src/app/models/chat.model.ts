/**
 * Modelo de datos para representar un mensaje del chat
 * Define la estructura de cada mensaje en la conversación
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

export interface MensajeChat {
  // Identificador único del mensaje
  id?: string;
  
  // ID del usuario que envió el mensaje
  usuarioId: string;
  
  // Contenido del mensaje
  contenido: string;
  
  // Fecha y hora cuando se envió el mensaje
  fechaEnvio: Date;
  
  // Tipo de mensaje: 'usuario' para mensajes del usuario, 'asistente' para respuestas de ChatGPT
  tipo: 'usuario' | 'asistente';
  
  // Estado del mensaje (para mostrar indicadores de carga, etc.)
  estado?: 'enviando' | 'enviado' | 'error' | 'temporal';
}

/**
 * Modelo para la conversación completa del usuario
 * Agrupa todos los mensajes de un usuario en una conversación
 */
export interface ConversacionChat {
  // ID único de la conversación
  id?: string;
  
  // ID del usuario propietario de la conversación
  usuarioId: string;
  
  // Lista de todos los mensajes en la conversación
  mensajes: MensajeChat[];
  
  // Fecha de creación de la conversación
  fechaCreacion: Date;
  
  // Última actividad en la conversación
  ultimaActividad: Date;
  
  // Título o resumen de la conversación (opcional)
  titulo?: string;
}
