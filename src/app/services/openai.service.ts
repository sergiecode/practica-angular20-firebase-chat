/**
 * Servicio para conectar con la API de OpenAI ChatGPT
 * Este servicio se encarga de enviar mensajes a ChatGPT y recibir las respuestas
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * Interfaz para la estructura de la petición a OpenAI
 * Define cómo debemos formatear nuestras peticiones a la API
 */
interface PeticionOpenAI {
  model: string;           // Modelo de IA a usar (ej: gpt-3.5-turbo, gpt-4)
  messages: MensajeOpenAI[]; // Array de mensajes de la conversación
  max_tokens?: number;     // Máximo número de tokens en la respuesta
  temperature?: number;    // Creatividad de la respuesta (0-1)
}

/**
 * Interfaz para cada mensaje en la conversación con OpenAI
 */
interface MensajeOpenAI {
  role: 'system' | 'user' | 'assistant'; // Rol del mensaje
  content: string;                        // Contenido del mensaje
}

/**
 * Interfaz para la respuesta de OpenAI
 */
interface RespuestaOpenAI {
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    total_tokens: number;
    prompt_tokens: number;
    completion_tokens: number;
  };
}

@Injectable({
  // Este servicio estará disponible en toda la aplicación
  providedIn: 'root'
})
export class OpenaiService {
  
  // Inyectamos HttpClient para hacer peticiones HTTP
  private http = inject(HttpClient);
  
  // URL de la API de OpenAI desde la configuración
  private readonly apiUrl = environment.openai.apiUrl;
  
  // Clave de API de OpenAI desde la configuración
  private readonly apiKey = environment.openai.apiKey;

  /**
   * Envía un mensaje a ChatGPT y recibe la respuesta
   * 
   * @param mensaje - El mensaje del usuario que queremos enviar a ChatGPT
   * @param historialPrevio - Mensajes anteriores para dar contexto a ChatGPT
   * @returns Observable con la respuesta de ChatGPT
   */
  enviarMensaje(mensaje: string, historialPrevio: MensajeOpenAI[] = []): Observable<string> {
    // Verificamos que tenemos la clave de API configurada
    if (!this.apiKey || this.apiKey === 'TU_API_KEY_DE_OPENAI') {
      console.error('❌ API Key de OpenAI no configurada');
      return throwError(() => new Error('API Key de OpenAI no configurada. Por favor configura tu clave en environment.ts'));
    }

    // Configuramos los headers para la petición HTTP
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    // Preparamos los mensajes para enviar a OpenAI
    // Incluimos un mensaje del sistema para dar personalidad al asistente
    const mensajes: MensajeOpenAI[] = [
      {
        role: 'system',
        content: `Eres un asistente virtual útil y amigable. Responde siempre en español de manera clara y concisa. 
                 Eres especialista en ayudar con preguntas generales, programación, y tecnología. 
                 Mantén un tono profesional pero cercano.`
      },
      // Añadimos el historial previo para mantener el contexto
      ...historialPrevio,
      // Añadimos el mensaje actual del usuario
      {
        role: 'user',
        content: mensaje
      }
    ];

    // Preparamos el cuerpo de la petición según la especificación de OpenAI
    const cuerposPeticion: PeticionOpenAI = {
      model: 'gpt-3.5-turbo',  // Usamos GPT-3.5 por ser más económico y rápido
      messages: mensajes,
      max_tokens: 150,         // Reducido a 150 tokens para ahorrar costos
      temperature: 0.5         // Reducido para respuestas más consistentes
    };

    // Hacemos la petición HTTP a la API de OpenAI
    return this.http.post<RespuestaOpenAI>(this.apiUrl, cuerposPeticion, { headers })
      .pipe(
        // Transformamos la respuesta para extraer solo el contenido del mensaje
        map(respuesta => {
          // Verificamos que la respuesta tenga el formato esperado
          if (respuesta.choices && respuesta.choices.length > 0) {
            const contenidoRespuesta = respuesta.choices[0].message.content;
            
            return contenidoRespuesta;
          } else {
            throw new Error('Respuesta de OpenAI no tiene el formato esperado');
          }
        }),
        
        // Manejamos los errores que puedan ocurrir
        catchError(error => {
          console.error('❌ Error al comunicarse con OpenAI:', error);
          
          // Personalizamos el mensaje de error según el tipo
          let mensajeError = 'Error al conectar con ChatGPT';
          
          if (error.status === 401) {
            mensajeError = 'Clave de API de OpenAI inválida';
          } else if (error.status === 429) {
            mensajeError = 'Has excedido el límite de peticiones. Intenta de nuevo más tarde.';
          } else if (error.status === 500) {
            mensajeError = 'Error en el servidor de OpenAI. Intenta de nuevo más tarde.';
          } else if (error.error?.error?.message) {
            mensajeError = error.error.error.message;
          }
          
          return throwError(() => new Error(mensajeError));
        })
      );
  }

  /**
   * Convierte nuestro historial de mensajes al formato que espera OpenAI
   * 
   * @param mensajes - Nuestros mensajes internos
   * @returns Array de mensajes en formato OpenAI
   */
  convertirHistorialAOpenAI(mensajes: any[]): MensajeOpenAI[] {
    return mensajes.map(msg => ({
      role: msg.tipo === 'usuario' ? 'user' : 'assistant',
      content: msg.contenido
    }));
  }

  /**
   * Verifica si la API de OpenAI está configurada correctamente
   * 
   * @returns true si la configuración es válida
   */
  verificarConfiguracion(): boolean {
    const configuracionValida = !!(this.apiKey && this.apiKey !== 'TU_API_KEY_DE_OPENAI' && this.apiUrl);
    
    return configuracionValida;
  }
}
