# 🔥 Firebase Best Practices - Tutorial Sergie Code

## 📋 Índice

1. [Configuración Segura](#configuración-segura)
2. [Authentication Patterns](#authentication-patterns)  
3. [Firestore Database Design](#firestore-database-design)
4. [Security Rules](#security-rules)
5. [Performance Optimization](#performance-optimization)
6. [Error Handling](#error-handling)
7. [Real-time Subscriptions](#real-time-subscriptions)

## 🔐 Configuración Segura

### 1. Gestión de Claves API

```typescript
// ✅ CORRECTO - Variables de entorno
export const environment = {
  firebaseConfig: {
    apiKey: process.env['FIREBASE_API_KEY'],
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
    projectId: process.env['FIREBASE_PROJECT_ID'],
    // ... resto de configuración
  }
};

// ❌ INCORRECTO - Hardcodear claves
export const environment = {
  firebaseConfig: {
    apiKey: "AIzaSyDirect_API_Key_Here", // ¡Nunca hagas esto!
  }
};
```

### 2. Configuración por Entornos

```typescript
// environment.ts (desarrollo)
export const environment = {
  production: false,
  firebaseConfig: {
    projectId: "mi-app-dev", // Proyecto de desarrollo
    // ...
  }
};

// environment.prod.ts (producción)
export const environment = {
  production: true,
  firebaseConfig: {
    projectId: "mi-app-prod", // Proyecto de producción
    // ...
  }
};
```

### 3. Inicialización Segura

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    // Inicialización con validación
    provideFirebaseApp(() => {
      const config = environment.firebaseConfig;
      
      // Validar configuración antes de inicializar
      if (!config.apiKey || !config.projectId) {
        throw new Error('🔥 Firebase no está configurado correctamente');
      }
      
      return initializeApp(config);
    }),
    
    // Configuración de servicios
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
```

## 🔑 Authentication Patterns

### 1. Gestión del Estado de Autenticación

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  
  // Observable reactivo del usuario actual
  usuario$ = user(this.auth);
  
  // Estado de autenticación derivado
  estaAutenticado$ = this.usuario$.pipe(
    map(usuario => !!usuario),
    startWith(false) // Valor inicial mientras carga
  );
  
  // Información del usuario con cache
  private usuarioInfo$ = this.usuario$.pipe(
    map(usuario => usuario ? {
      uid: usuario.uid,
      email: usuario.email,
      nombre: usuario.displayName,
      fotoUrl: usuario.photoURL
    } : null),
    shareReplay(1) // Cache del último valor
  );
}
```

### 2. Login Robusto con Manejo de Errores

```typescript
async iniciarSesionConGoogle(): Promise<Usuario | null> {
  try {
    const proveedor = new GoogleAuthProvider();
    
    // Configurar scopes específicos
    proveedor.addScope('email');
    proveedor.addScope('profile');
    
    // Configurar parámetros adicionales
    proveedor.setCustomParameters({
      prompt: 'select_account' // Siempre mostrar selector de cuenta
    });
    
    const resultado = await signInWithPopup(this.auth, proveedor);
    
    // Validar que obtuvimos los datos necesarios
    if (!resultado.user?.email) {
      throw new Error('No se pudo obtener el email del usuario');
    }
    
    return this.mapearUsuarioFirebase(resultado.user);
    
  } catch (error: any) {
    // Manejo específico de errores de Firebase Auth
    this.manejarErrorAuth(error);
    throw error;
  }
}

private manejarErrorAuth(error: any): void {
  const erroresFrecuentes = {
    'auth/popup-closed-by-user': 'Ventana de login cerrada por el usuario',
    'auth/popup-blocked': 'Popup bloqueado por el navegador',
    'auth/network-request-failed': 'Error de conexión',
    'auth/too-many-requests': 'Demasiados intentos de login',
    'auth/user-disabled': 'Cuenta de usuario deshabilitada'
  };
  
  const mensaje = erroresFrecuentes[error.code] || 'Error de autenticación';
  console.error(`🔥 Auth Error [${error.code}]:`, mensaje);
}
```

### 3. Logout Limpio

```typescript
async cerrarSesion(): Promise<void> {
  try {
    // Limpiar datos locales primero
    this.limpiarDatosLocales();
    
    // Cerrar sesión en Firebase
    await signOut(this.auth);
    
    // Opcional: Limpiar caché del navegador
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(name => caches.delete(name))
      );
    }
    
  } catch (error) {
    console.error('🔥 Error al cerrar sesión:', error);
    throw error;
  }
}

private limpiarDatosLocales(): void {
  // Limpiar localStorage/sessionStorage si es necesario
  localStorage.removeItem('chat-draft');
  sessionStorage.clear();
}
```

## 🗄️ Firestore Database Design

### 1. Estructura de Colecciones Optimizada

```typescript
// 📁 Estructura de Firestore
/*
/mensajes/{mensajeId}
  - usuarioId: string
  - contenido: string
  - tipo: 'usuario' | 'asistente'
  - fechaEnvio: Timestamp
  - metadata: {
      tokens?: number,
      modelo?: string,
      version?: string
    }

/usuarios/{userId}
  - email: string
  - nombre: string
  - fotoUrl?: string
  - configuracion: {
      tema: 'claro' | 'oscuro',
      notificaciones: boolean
    }
  - estadisticas: {
      mensajesEnviados: number,
      ultimaActividad: Timestamp
    }

/conversaciones/{conversacionId}
  - usuarioId: string
  - titulo: string
  - fechaCreacion: Timestamp
  - ultimaActividad: Timestamp
  - resumen?: string
  - etiquetas?: string[]
*/
```

### 2. Operaciones CRUD Optimizadas

```typescript
@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private firestore = inject(Firestore);
  
  // ✅ Guardar con validación y retry
  async guardarMensaje(mensaje: MensajeChat): Promise<void> {
    // Validación previa
    this.validarMensaje(mensaje);
    
    try {
      const coleccion = collection(this.firestore, 'mensajes');
      const mensajeFirestore = this.prepararParaFirestore(mensaje);
      
      await addDoc(coleccion, mensajeFirestore);
      
    } catch (error: any) {
      // Retry automático para errores de red
      if (this.esErrorDeRed(error)) {
        await this.reintentarOperacion(() => 
          addDoc(collection(this.firestore, 'mensajes'), this.prepararParaFirestore(mensaje))
        );
      } else {
        throw error;
      }
    }
  }
  
  // ✅ Consulta optimizada con filtros
  obtenerMensajesUsuario(usuarioId: string, limite = 50): Observable<MensajeChat[]> {
    return new Observable(observer => {
      const consulta = query(
        collection(this.firestore, 'mensajes'),
        where('usuarioId', '==', usuarioId),
        orderBy('fechaEnvio', 'desc'), // Más recientes primero
        limit(limite) // Limitar resultados para performance
      );
      
      const unsubscribe = onSnapshot(
        consulta,
        (snapshot) => {
          const mensajes = snapshot.docs.map(doc => 
            this.convertirDesdFirestore(doc)
          );
          
          // Ordenar en cliente para mostrar cronológicamente
          mensajes.reverse();
          observer.next(mensajes);
        },
        (error) => {
          console.error('🔥 Error en snapshot:', error);
          observer.error(error);
        }
      );
      
      return () => unsubscribe();
    });
  }
  
  // Conversión segura de datos
  private prepararParaFirestore(mensaje: MensajeChat): any {
    return {
      usuarioId: mensaje.usuarioId,
      contenido: mensaje.contenido.trim(),
      tipo: mensaje.tipo,
      fechaEnvio: Timestamp.fromDate(mensaje.fechaEnvio),
      metadata: {
        version: '1.0',
        cliente: 'angular-web'
      }
    };
  }
  
  private convertirDesdFirestore(doc: any): MensajeChat {
    const data = doc.data();
    return {
      id: doc.id,
      usuarioId: data.usuarioId,
      contenido: data.contenido,
      tipo: data.tipo,
      fechaEnvio: data.fechaEnvio.toDate(),
      estado: 'enviado'
    };
  }
  
  private validarMensaje(mensaje: MensajeChat): void {
    if (!mensaje.usuarioId) throw new Error('usuarioId requerido');
    if (!mensaje.contenido?.trim()) throw new Error('contenido requerido');
    if (!['usuario', 'asistente'].includes(mensaje.tipo)) {
      throw new Error('tipo de mensaje inválido');
    }
  }
}
```

### 3. Batch Operations para Operaciones Múltiples

```typescript
// Para operaciones que afectan múltiples documentos
async guardarConversacionCompleta(conversacion: ConversacionChat): Promise<void> {
  const batch = writeBatch(this.firestore);
  
  try {
    // 1. Crear documento de conversación
    const conversacionRef = doc(collection(this.firestore, 'conversaciones'));
    batch.set(conversacionRef, {
      usuarioId: conversacion.usuarioId,
      titulo: conversacion.titulo,
      fechaCreacion: Timestamp.fromDate(conversacion.fechaCreacion),
      ultimaActividad: Timestamp.fromDate(conversacion.ultimaActividad)
    });
    
    // 2. Crear documentos de mensajes
    conversacion.mensajes.forEach(mensaje => {
      const mensajeRef = doc(collection(this.firestore, 'mensajes'));
      batch.set(mensajeRef, {
        ...this.prepararParaFirestore(mensaje),
        conversacionId: conversacionRef.id
      });
    });
    
    // 3. Actualizar estadísticas del usuario
    const usuarioRef = doc(this.firestore, 'usuarios', conversacion.usuarioId);
    batch.update(usuarioRef, {
      'estadisticas.ultimaActividad': Timestamp.fromDate(new Date()),
      'estadisticas.conversaciones': increment(1)
    });
    
    // Ejecutar todas las operaciones de forma atómica
    await batch.commit();
    
  } catch (error) {
    console.error('🔥 Error en batch operation:', error);
    throw error;
  }
}
```

## 🛡️ Security Rules

### 1. Reglas de Seguridad Básicas

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Reglas para mensajes
    match /mensajes/{messageId} {
      // Solo el propietario puede leer sus mensajes
      allow read: if request.auth != null 
        && request.auth.uid == resource.data.usuarioId;
      
      // Solo usuarios autenticados pueden crear mensajes
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.usuarioId
        && validarMensaje();
      
      // No permitir actualización o eliminación
      allow update, delete: if false;
    }
    
    // Reglas para usuarios
    match /usuarios/{userId} {
      // Solo el usuario puede acceder a su documento
      allow read, write: if request.auth != null 
        && request.auth.uid == userId;
    }
    
    // Función de validación
    function validarMensaje() {
      let data = request.resource.data;
      return data.keys().hasAll(['usuarioId', 'contenido', 'tipo', 'fechaEnvio'])
        && data.contenido is string
        && data.contenido.size() > 0
        && data.contenido.size() <= 10000  // Máximo 10k caracteres
        && data.tipo in ['usuario', 'asistente'];
    }
  }
}
```

### 2. Reglas Avanzadas con Funciones

```javascript
// firestore.rules (versión avanzada)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Funciones de utilidad
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isValidTimestamp(timestamp) {
      return timestamp is timestamp 
        && timestamp <= request.time;
    }
    
    function hasValidMessageStructure() {
      let data = request.resource.data;
      return data.keys().hasAll(['usuarioId', 'contenido', 'tipo', 'fechaEnvio'])
        && data.contenido is string
        && data.contenido.size() > 0
        && data.contenido.size() <= 10000
        && data.tipo in ['usuario', 'asistente']
        && isValidTimestamp(data.fechaEnvio);
    }
    
    // Rate limiting básico (máximo 100 mensajes por hora)
    function withinRateLimit() {
      return request.auth.token.firebase.sign_in_provider != null;
      // En un escenario real, esto se implementaría con Cloud Functions
    }
    
    match /mensajes/{messageId} {
      allow read: if isAuthenticated() 
        && isOwner(resource.data.usuarioId);
      
      allow create: if isAuthenticated() 
        && isOwner(request.resource.data.usuarioId)
        && hasValidMessageStructure()
        && withinRateLimit();
    }
  }
}
```

## ⚡ Performance Optimization

### 1. Indexing Strategy

```typescript
// Las queries requieren índices específicos
// Firebase automáticamente sugerirá crear estos índices

// ✅ Query simple (no requiere índice compuesto)
const mensajesSimple = query(
  collection(firestore, 'mensajes'),
  where('usuarioId', '==', userId)
);

// ✅ Query con ordenamiento (requiere índice compuesto)
const mensajesOrdenados = query(
  collection(firestore, 'mensajes'),
  where('usuarioId', '==', userId),
  orderBy('fechaEnvio', 'desc')
);

// ❌ Query compleja (múltiples índices)
const queryCompleja = query(
  collection(firestore, 'mensajes'),
  where('usuarioId', '==', userId),
  where('tipo', '==', 'usuario'),
  orderBy('fechaEnvio', 'desc')
);
```

### 2. Paginación Eficiente

```typescript
export class FirestoreService {
  private ultimoDocumento: any = null;
  
  async cargarMensajesPaginados(
    usuarioId: string, 
    tamanioPagina = 20
  ): Promise<MensajeChat[]> {
    let consulta = query(
      collection(this.firestore, 'mensajes'),
      where('usuarioId', '==', usuarioId),
      orderBy('fechaEnvio', 'desc'),
      limit(tamanioPagina)
    );
    
    // Si hay más páginas, continuar desde el último documento
    if (this.ultimoDocumento) {
      consulta = query(consulta, startAfter(this.ultimoDocumento));
    }
    
    const snapshot = await getDocs(consulta);
    
    if (snapshot.docs.length > 0) {
      this.ultimoDocumento = snapshot.docs[snapshot.docs.length - 1];
    }
    
    return snapshot.docs.map(doc => this.convertirDesdFirestore(doc));
  }
  
  reiniciarPaginacion(): void {
    this.ultimoDocumento = null;
  }
}
```

### 3. Caché Local Inteligente

```typescript
@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache = new Map<string, { data: any, timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  
  obtenerConCache<T>(
    clave: string, 
    factory: () => Promise<T>
  ): Promise<T> {
    const cached = this.cache.get(clave);
    
    // Verificar si está en caché y no ha expirado
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return Promise.resolve(cached.data);
    }
    
    // Obtener datos frescos y cachear
    return factory().then(data => {
      this.cache.set(clave, { data, timestamp: Date.now() });
      return data;
    });
  }
  
  limpiarCache(): void {
    this.cache.clear();
  }
}

// Uso en el servicio
async obtenerDatosUsuario(userId: string): Promise<Usuario> {
  return this.cacheService.obtenerConCache(
    `usuario_${userId}`,
    () => this.obtenerUsuarioDesdFirestore(userId)
  );
}
```

## 🚨 Error Handling

### 1. Categorización de Errores

```typescript
export enum TipoErrorFirestore {
  RED = 'network',
  PERMISOS = 'permission',
  CUOTA = 'quota',
  VALIDACION = 'validation',
  DESCONOCIDO = 'unknown'
}

export class FirestoreErrorHandler {
  static categorizar(error: any): TipoErrorFirestore {
    if (error.code) {
      switch (error.code) {
        case 'unavailable':
        case 'deadline-exceeded':
          return TipoErrorFirestore.RED;
        
        case 'permission-denied':
        case 'unauthenticated':
          return TipoErrorFirestore.PERMISOS;
        
        case 'resource-exhausted':
          return TipoErrorFirestore.CUOTA;
        
        case 'invalid-argument':
        case 'failed-precondition':
          return TipoErrorFirestore.VALIDACION;
        
        default:
          return TipoErrorFirestore.DESCONOCIDO;
      }
    }
    
    return TipoErrorFirestore.DESCONOCIDO;
  }
  
  static obtenerMensajeAmigable(error: any): string {
    const tipo = this.categorizar(error);
    
    switch (tipo) {
      case TipoErrorFirestore.RED:
        return 'Problema de conexión. Verifica tu internet y vuelve a intentar.';
      
      case TipoErrorFirestore.PERMISOS:
        return 'No tienes permisos para realizar esta acción.';
      
      case TipoErrorFirestore.CUOTA:
        return 'Se ha excedido el límite de uso. Intenta más tarde.';
      
      case TipoErrorFirestore.VALIDACION:
        return 'Los datos proporcionados no son válidos.';
      
      default:
        return 'Ha ocurrido un error inesperado. Intenta de nuevo.';
    }
  }
}
```

### 2. Retry Logic

```typescript
export class RetryHandler {
  static async ejecutarConReintentos<T>(
    operacion: () => Promise<T>,
    maxReintentos = 3,
    delayBase = 1000
  ): Promise<T> {
    let ultimoError: any;
    
    for (let intento = 0; intento <= maxReintentos; intento++) {
      try {
        return await operacion();
      } catch (error: any) {
        ultimoError = error;
        
        // No reintentar errores que no son temporales
        if (!this.esErrorReinentable(error)) {
          throw error;
        }
        
        // Si no es el último intento, esperar antes del siguiente
        if (intento < maxReintentos) {
          const delay = delayBase * Math.pow(2, intento); // Backoff exponencial
          await this.esperar(delay);
        }
      }
    }
    
    throw ultimoError;
  }
  
  private static esErrorReinentable(error: any): boolean {
    const codigosReinentables = [
      'unavailable',
      'deadline-exceeded',
      'internal',
      'aborted'
    ];
    
    return codigosReinentables.includes(error.code);
  }
  
  private static esperar(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Uso en servicios
async guardarMensajeConReintentos(mensaje: MensajeChat): Promise<void> {
  return RetryHandler.ejecutarConReintentos(
    () => this.guardarMensaje(mensaje),
    3, // 3 reintentos
    1000 // 1 segundo base
  );
}
```

## 🔄 Real-time Subscriptions

### 1. Gestión Eficiente de Listeners

```typescript
@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private listeners = new Map<string, () => void>();
  
  crearListener<T>(
    nombre: string,
    query: Query,
    callback: (data: T[]) => void,
    transformador: (doc: any) => T
  ): void {
    // Limpiar listener anterior si existe
    this.limpiarListener(nombre);
    
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const datos = snapshot.docs.map(transformador);
        callback(datos);
      },
      (error) => {
        console.error(`🔥 Error en listener ${nombre}:`, error);
        // Reintento automático después de un delay
        setTimeout(() => {
          this.crearListener(nombre, query, callback, transformador);
        }, 5000);
      }
    );
    
    this.listeners.set(nombre, unsubscribe);
  }
  
  limpiarListener(nombre: string): void {
    const unsubscribe = this.listeners.get(nombre);
    if (unsubscribe) {
      unsubscribe();
      this.listeners.delete(nombre);
    }
  }
  
  limpiarTodosLosListeners(): void {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners.clear();
  }
}
```

### 2. Optimización de Subscriptions en Componentes

```typescript
@Component({
  selector: 'app-chat',
  template: `...`
})
export class ChatComponent implements OnInit, OnDestroy {
  private readonly realtimeService = inject(RealtimeService);
  
  ngOnInit(): void {
    const userId = this.authService.obtenerUidUsuario();
    
    if (userId) {
      const consulta = query(
        collection(this.firestore, 'mensajes'),
        where('usuarioId', '==', userId),
        orderBy('fechaEnvio', 'desc'),
        limit(50)
      );
      
      this.realtimeService.crearListener(
        `mensajes_${userId}`,
        consulta,
        (mensajes: MensajeChat[]) => {
          this.mensajes = mensajes.reverse(); // Mostrar cronológicamente
          this.cdr.detectChanges(); // Trigger change detection
        },
        (doc) => this.convertirMensaje(doc)
      );
    }
  }
  
  ngOnDestroy(): void {
    const userId = this.authService.obtenerUidUsuario();
    if (userId) {
      this.realtimeService.limpiarListener(`mensajes_${userId}`);
    }
  }
}
```

---

## 🎯 Conclusiones y Mejores Prácticas

### ✅ DO's (Hacer)

1. **Siempre validar datos** antes de enviar a Firestore
2. **Usar TypeScript** para tipado fuerte
3. **Implementar retry logic** para operaciones críticas
4. **Gestionar subscriptions** correctamente para evitar memory leaks
5. **Usar índices compuestos** para queries complejas
6. **Implementar caché local** para mejor UX
7. **Manejar errores específicamente** según su tipo
8. **Usar batch operations** para operaciones atómicas

### ❌ DON'Ts (No hacer)

1. **No hardcodear** claves API en el código
2. **No hacer queries** sin límites en producción
3. **No ignorar** las reglas de seguridad
4. **No crear** listeners sin cleanup
5. **No usar** campos como arrays para datos relacionales
6. **No hacer** llamadas síncronas a Firestore
7. **No exponer** datos sensibles en reglas de seguridad

### 🚀 Performance Tips

1. Usa **compound indexes** para queries complejas
2. Implementa **pagination** para grandes datasets
3. Considera **subcollections** para datos jerárquicos
4. Usa **FieldValue.serverTimestamp()** para timestamps consistentes
5. Implementa **offline support** con enableNetwork/disableNetwork

---

*Desarrollado por [Sergie Code](https://www.youtube.com/@sergiecode) - Master en desarrollo con Firebase* 🔥
