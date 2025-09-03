/**
 * Componente principal del Chat
 * Pantalla donde el usuario conversa con el asistente de IA
 * Muestra el historial y permite enviar nuevos mensajes
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { MensajeChat } from '../models/chat.model';

@Component({
  // Selector único para este componente
  selector: 'app-chat',
  
  // Componente standalone - no necesita NgModule
  standalone: true,
  
  // Importamos los módulos necesarios
  imports: [CommonModule, FormsModule],
  
  // Template HTML del componente
  template: `
    <!-- Contenedor principal del chat -->
    <div class="chat-container">
      
      <!-- Header con información del usuario -->
      <header class="chat-header">
        <div class="user-info">
          <img 
            [src]="usuario?.photoURL || '/assets/default-avatar.png'" 
            [alt]="usuario?.displayName || 'Usuario'"
            class="user-avatar"
            (error)="manejarErrorImagen($event)">
          <div class="user-details">
            <h3 class="user-name">{{ usuario?.displayName || 'Usuario' }}</h3>
            <p class="user-email">{{ usuario?.email }}</p>
          </div>
        </div>
        
        <div class="header-actions">
          <!-- Botón de cerrar sesión -->
          <button 
            class="logout-btn" 
            (click)="cerrarSesion()"
            title="Cerrar sesión">
            🚪 Salir
          </button>
        </div>
      </header>
      
      <!-- Área de mensajes -->
      <main class="chat-messages" #messagesContainer>
        
        <!-- Mensaje de bienvenida cuando no hay mensajes -->
        <div class="welcome-message" *ngIf="mensajes.length === 0 && !cargandoHistorial">
          <div class="welcome-content">
            <div class="welcome-icon">🤖</div>
            <h2>¡Hola! Soy tu asistente virtual</h2>
            <p>Puedo ayudarte con preguntas, programación, tareas cotidianas y mucho más.</p>
            <p class="welcome-tip">💡 <strong>Consejo:</strong> Sé específico en tus preguntas para obtener mejores respuestas.</p>
          </div>
        </div>
        
        <!-- Indicador de carga del historial -->
        <div class="loading-history" *ngIf="cargandoHistorial">
          <div class="loading-spinner"></div>
          <p>Cargando tu historial de conversaciones...</p>
        </div>
        
        <!-- Lista de mensajes -->
        <div class="messages-list">
          <div 
            *ngFor="let mensaje of mensajes; trackBy: trackByMensaje"
            class="message-wrapper"
            [class.user-message]="mensaje.tipo === 'usuario'"
            [class.assistant-message]="mensaje.tipo === 'asistente'">
            
            <!-- Mensaje del usuario -->
            <div class="message user-msg" *ngIf="mensaje.tipo === 'usuario'">
              <div class="message-content">
                <p>{{ mensaje.contenido }}</p>
              </div>
              <div class="message-time">
                {{ formatearHora(mensaje.fechaEnvio) }}
              </div>
            </div>
            
            <!-- Mensaje del asistente -->
            <div class="message assistant-msg" *ngIf="mensaje.tipo === 'asistente'">
              <div class="message-avatar">🤖</div>
              <div class="message-bubble">
                <div class="message-content">
                  <p [innerHTML]="formatearMensajeAsistente(mensaje.contenido)"></p>
                </div>
                <div class="message-time">
                  {{ formatearHora(mensaje.fechaEnvio) }}
                  <span *ngIf="mensaje.estado === 'error'" class="error-indicator">⚠️</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Indicador de que el asistente está escribiendo -->
          <div class="message-wrapper assistant-message" *ngIf="asistenteEscribiendo">
            <div class="message assistant-msg typing">
              <div class="message-avatar">🤖</div>
              <div class="message-bubble">
                <div class="typing-indicator">
                  <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p class="typing-text">El asistente está escribiendo...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <!-- Formulario para enviar mensajes -->
      <footer class="chat-input">
        <form class="input-form" (ngSubmit)="enviarMensaje()" #chatForm="ngForm">
          <div class="input-wrapper">
            <textarea
              #messageInput
              [(ngModel)]="mensajeTexto"
              name="mensaje"
              placeholder="Escribe tu mensaje aquí... (presiona Enter para enviar, Shift+Enter para nueva línea)"
              class="message-input"
              [disabled]="enviandoMensaje || asistenteEscribiendo"
              (keydown)="manejarTeclaPresionada($event)"
              rows="1">
            </textarea>
            
            <button 
              type="submit"
              class="send-btn"
              [disabled]="!mensajeTexto.trim() || enviandoMensaje || asistenteEscribiendo"
              [class.sending]="enviandoMensaje">
              
              <!-- Icono de envío o spinner -->
              <span *ngIf="!enviandoMensaje">📤</span>
              <span class="sending-spinner" *ngIf="enviandoMensaje"></span>
            </button>
          </div>
          
          <!-- Información del estado -->
          <div class="input-status" *ngIf="mensajeError">
            <span class="error-text">❌ {{ mensajeError }}</span>
          </div>
        </form>
      </footer>
      
    </div>
  `,
  
  // Archivo de estilos CSS
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  
  // Inyectamos los servicios necesarios
  private authService = inject(AuthService);
  private chatService = inject(ChatService);
  private router = inject(Router);
  
  // Referencia al contenedor de mensajes para hacer scroll automático
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  // Variables del estado del componente
  usuario: any = null;                    // Información del usuario actual
  mensajes: MensajeChat[] = [];          // Lista de mensajes del chat
  mensajeTexto = '';                     // Texto del mensaje que está escribiendo el usuario
  enviandoMensaje = false;               // Indica si se está enviando un mensaje
  asistenteEscribiendo = false;          // Indica si el asistente está generando una respuesta
  cargandoHistorial = false;             // Indica si se está cargando el historial
  mensajeError = '';                     // Mensaje de error para mostrar al usuario
  
  // Suscripciones a observables
  private suscripciones: Subscription[] = [];
  
  // Control para hacer scroll automático
  private debeHacerScroll = false;

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente
   */
  async ngOnInit(): Promise<void> {
    console.log('💬 Inicializando componente de chat...');
    
    try {
      // Verificamos que el usuario esté autenticado
      await this.verificarAutenticacion();
      
      // Inicializamos el chat
      await this.inicializarChat();
      
      // Configuramos las suscripciones a observables
      this.configurarSuscripciones();
      
    } catch (error) {
      console.error('❌ Error al inicializar el chat:', error);
      this.mensajeError = 'Error al cargar el chat. Intenta recargar la página.';
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente
   */
  ngOnDestroy(): void {
    console.log('🧹 Limpiando componente de chat...');
    
    // Cancelamos todas las suscripciones para evitar memory leaks
    this.suscripciones.forEach(sub => sub.unsubscribe());
  }

  /**
   * Se ejecuta después de que Angular actualiza la vista
   * Lo usamos para hacer scroll automático cuando hay nuevos mensajes
   */
  ngAfterViewChecked(): void {
    if (this.debeHacerScroll) {
      this.scrollHaciaAbajo();
      this.debeHacerScroll = false;
    }
  }

  /**
   * Verifica que el usuario esté autenticado
   */
  private async verificarAutenticacion(): Promise<void> {
    this.usuario = this.authService.obtenerUsuarioActual();
    
    if (!this.usuario) {
      console.warn('⚠️ Usuario no autenticado, redirigiendo al login...');
      await this.router.navigate(['/auth']);
      throw new Error('Usuario no autenticado');
    }
    
    console.log('👤 Usuario autenticado:', this.usuario.displayName);
  }

  /**
   * Inicializa el servicio de chat para el usuario actual
   */
  private async inicializarChat(): Promise<void> {
    if (!this.usuario) return;
    
    console.log('🎬 === INICIALIZANDO CHAT EN COMPONENTE ===');
    console.log('🎬 Usuario para inicializar:', this.usuario.uid);
    
    this.cargandoHistorial = true;
    
    try {
      // Inicializamos el chat con el ID del usuario
      await this.chatService.inicializarChat(this.usuario.uid);
      console.log('✅ Chat inicializado correctamente en componente');
      
    } catch (error) {
      console.error('❌ Error al inicializar chat en componente:', error);
      throw error;
      
    } finally {
      this.cargandoHistorial = false;
    }
  }

  /**
   * Configura las suscripciones a los observables del servicio
   */
  private configurarSuscripciones(): void {
    console.log('🔗 Configurando suscripciones del componente...');
    
    // Suscribirse a los mensajes del chat
    const subMensajes = this.chatService.mensajes$.subscribe(mensajes => {
      console.log(`📨 === COMPONENTE RECIBIÓ MENSAJES ===`);
      console.log(`📨 Cantidad: ${mensajes.length} mensajes`);
      console.log(`📨 Mensajes recibidos:`, mensajes.map(m => ({ 
        tipo: m.tipo, 
        contenido: m.contenido.substring(0, 50),
        id: m.id || 'sin-id'
      })));
      
      this.mensajes = mensajes;
      console.log(`📨 this.mensajes actualizado a ${this.mensajes.length} elementos`);
      
      this.debeHacerScroll = true;
      
      console.log(`📨 === FIN RECEPCIÓN MENSAJES ===`);
    });
    
    // Suscribirse al estado del asistente
    const subAsistente = this.chatService.asistenteRespondiendo$.subscribe(respondiendo => {
      console.log(`🤖 Estado asistente cambiado: ${respondiendo ? 'escribiendo' : 'esperando'}`);
      this.asistenteEscribiendo = respondiendo;
      if (respondiendo) {
        this.debeHacerScroll = true;
      }
    });
    
    this.suscripciones.push(subMensajes, subAsistente);
    console.log('✅ Suscripciones configuradas correctamente');
  }

  /**
   * Envía un mensaje al asistente
   */
  async enviarMensaje(): Promise<void> {
    // Validamos que hay texto para enviar
    if (!this.mensajeTexto.trim()) {
      console.warn('⚠️ Intento de enviar mensaje vacío');
      return;
    }
    
    // Limpiamos errores previos
    this.mensajeError = '';
    this.enviandoMensaje = true;
    
    // Guardamos el texto del mensaje y limpiamos el input
    const texto = this.mensajeTexto.trim();
    this.mensajeTexto = '';
    
    console.log('📤 Enviando mensaje:', texto);
    
    try {
      // Enviamos el mensaje usando el servicio de chat
      await this.chatService.enviarMensaje(texto);
      
      // Hacemos focus en el input para continuar escribiendo
      this.enfocarInput();
      
    } catch (error: any) {
      console.error('❌ Error al enviar mensaje:', error);
      
      // Mostramos el error al usuario
      this.mensajeError = error.message || 'Error al enviar el mensaje';
      
      // Restauramos el texto en el input
      this.mensajeTexto = texto;
      
    } finally {
      this.enviandoMensaje = false;
    }
  }

  /**
   * Maneja las teclas presionadas en el textarea
   */
  manejarTeclaPresionada(evento: KeyboardEvent): void {
    // Enter sin Shift envía el mensaje
    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      this.enviarMensaje();
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async cerrarSesion(): Promise<void> {
    try {
      console.log('🚪 Cerrando sesión...');
      
      // Limpiamos el chat local
      this.chatService.limpiarChat();
      
      // Cerramos sesión en Firebase
      await this.authService.cerrarSesion();
      
      // Navegamos al login
      await this.router.navigate(['/auth']);
      
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      this.mensajeError = 'Error al cerrar sesión';
    }
  }

  /**
   * Hace scroll hacia abajo en el contenedor de mensajes
   */
  private scrollHaciaAbajo(): void {
    try {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    } catch (error) {
      console.warn('⚠️ Error al hacer scroll:', error);
    }
  }

  /**
   * Enfoca el input de texto
   */
  private enfocarInput(): void {
    setTimeout(() => {
      this.messageInput?.nativeElement?.focus();
    }, 100);
  }

  /**
   * Formatea la hora de un mensaje
   */
  formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formatea el contenido de los mensajes del asistente
   * Convierte texto plano en HTML básico
   */
  formatearMensajeAsistente(contenido: string): string {
    return contenido
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  /**
   * Función de tracking para ngFor (mejora el rendimiento)
   */
  trackByMensaje(index: number, mensaje: MensajeChat): string {
    return mensaje.id || `${mensaje.tipo}-${mensaje.fechaEnvio.getTime()}`;
  }

  /**
   * Maneja errores al cargar imágenes de perfil
   */
  manejarErrorImagen(evento: any): void {
    evento.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC42ODYyOSAxNCA2IDE2LjY4NjMgNiAyMEg2VjIySDZIMThINlYyMEM2IDE2LjY4NjMgMTUuMzEzNyAxNCAxMiAxNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K';
  }
}
