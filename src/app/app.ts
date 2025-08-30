/**
 * Componente raíz de la aplicación Angular
 * Este es el componente principal que contiene toda la aplicación
 * Utiliza standalone components (sin NgModules)
 * 
 * @autor Sergie Code - Tutorial Angular 20 + Firebase
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  // Selector del componente raíz (se usa en index.html)
  selector: 'app-root',
  
  // Importamos los módulos que necesitamos
  imports: [CommonModule, RouterOutlet],
  
  // Template HTML simple que contiene el router-outlet
  templateUrl: './app.html',
  
  // Estilos CSS específicos para este componente
  styleUrl: './app.css'
})
export class App {
  // Título de la aplicación usando signals (nueva característica de Angular)
  protected readonly title = signal('Chat Asistente con Angular 20 y Firebase');
  
  /**
   * Constructor del componente
   * Se ejecuta cuando se crea una instancia del componente
   */
  constructor() {
    console.log('🚀 Aplicación Angular inicializada');
    console.log('📱 Chat Asistente v1.0 - Sergie Code');
  }
}
