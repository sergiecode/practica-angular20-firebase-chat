# 🔥 Firebase CLI - Guía Completa de Comandos

## 📋 Índice
- [Instalación y Configuración](#instalación-y-configuración)
- [Autenticación](#autenticación)
- [Gestión de Proyectos](#gestión-de-proyectos)
- [Inicialización y Configuración](#inicialización-y-configuración)
- [Despliegue (Hosting)](#despliegue-hosting)
- [Base de Datos (Firestore)](#base-de-datos-firestore)
- [Functions](#functions)
- [Debugging y Monitoreo](#debugging-y-monitoreo)
- [Comandos Avanzados](#comandos-avanzados)
- [Comandos Usados en Este Proyecto](#comandos-usados-en-este-proyecto)

---

## 📦 Instalación y Configuración

### Instalar Firebase CLI
```bash
npm install -g firebase-tools
```
**Cuándo usar**: Primera vez configurando Firebase en tu máquina.

### Verificar versión instalada
```bash
firebase --version
```
**Cuándo usar**: Para verificar que Firebase CLI está instalado correctamente o para comprobar actualizaciones.

### Actualizar Firebase CLI
```bash
npm update -g firebase-tools
```
**Cuándo usar**: Cuando necesites las últimas funcionalidades o correcciones de bugs.

---

## 🔐 Autenticación

### Iniciar sesión en Firebase
```bash
firebase login
```
**Cuándo usar**: Primera vez usando Firebase CLI o cuando cambias de cuenta de Google.
**Por qué**: Necesitas autenticarte para acceder a tus proyectos de Firebase.

### Forzar re-autenticación
```bash
firebase login --reauth
```
**Cuándo usar**: Cuando tienes problemas de permisos o quieres cambiar de cuenta.
**Ejemplo de uso**: Lo usamos en el proyecto cuando necesitábamos asegurar la autenticación correcta.

### Cerrar sesión
```bash
firebase logout
```
**Cuándo usar**: Al cambiar de cuenta o por seguridad en máquinas compartidas.

### Verificar usuario autenticado
```bash
firebase login:list
```
**Cuándo usar**: Para ver qué cuenta de Google está actualmente autenticada.

---

## 🏗️ Gestión de Proyectos

### Listar todos los proyectos
```bash
firebase projects:list
```
**Cuándo usar**: Para ver todos tus proyectos de Firebase disponibles.
**Ejemplo de uso**: Lo usamos para encontrar el proyecto `practica-angular20-chat-llm`.

### Crear nuevo proyecto
```bash
firebase projects:create mi-nuevo-proyecto
```
**Cuándo usar**: Cuando quieres crear un proyecto desde la CLI (alternativa a Firebase Console).

### Seleccionar proyecto activo
```bash
firebase use mi-proyecto-id
```
**Cuándo usar**: Para establecer qué proyecto Firebase usar en el directorio actual.
**Ejemplo de uso**: Usamos `firebase use practica-angular20-chat-llm` para asociar nuestro proyecto local con Firebase.

### Ver proyecto activo
```bash
firebase use
```
**Cuándo usar**: Para verificar qué proyecto está actualmente seleccionado.
**Ejemplo de uso**: Lo usamos para confirmar que no teníamos proyecto activo antes de configurarlo.

### Agregar alias a un proyecto
```bash
firebase use --add
```
**Cuándo usar**: Para crear alias como "staging" o "production" para diferentes proyectos.

### Cambiar entre proyectos con alias
```bash
firebase use staging
firebase use production
```
**Cuándo usar**: En proyectos con múltiples entornos.

---

## ⚙️ Inicialización y Configuración

### Inicializar Firebase en proyecto
```bash
firebase init
```
**Cuándo usar**: Primera vez configurando Firebase en un proyecto nuevo.
**Qué hace**: Te guía por la configuración de servicios como Hosting, Firestore, Functions, etc.

### Inicializar solo Hosting
```bash
firebase init hosting
```
**Cuándo usar**: Cuando solo necesitas configurar Firebase Hosting en un proyecto existente.

### Inicializar solo Firestore
```bash
firebase init firestore
```
**Cuándo usar**: Para configurar solo la base de datos Firestore.

### Inicializar Functions
```bash
firebase init functions
```
**Cuándo usar**: Para agregar Cloud Functions a tu proyecto.

---

## 🚀 Despliegue (Hosting)

### Desplegar todo el proyecto
```bash
firebase deploy
```
**Cuándo usar**: Para desplegar todos los servicios configurados (hosting, functions, firestore rules, etc.).
**Ejemplo de uso**: Lo usamos para desplegar nuestra aplicación Angular después del build.

### Desplegar solo Hosting
```bash
firebase deploy --only hosting
```
**Cuándo usar**: Cuando solo quieres actualizar los archivos estáticos del hosting.
**Por qué es útil**: Más rápido que desplegar todo, ideal para actualizaciones frecuentes de frontend.

### Desplegar solo Functions
```bash
firebase deploy --only functions
```
**Cuándo usar**: Cuando solo actualizaste Cloud Functions.

### Desplegar función específica
```bash
firebase deploy --only functions:miFuncion
```
**Cuándo usar**: Para desplegar solo una función específica (más rápido).

### Probar hosting localmente
```bash
firebase serve
```
**Cuándo usar**: Para probar tu build de producción localmente antes de desplegar.
**Puerto por defecto**: http://localhost:5000

### Probar hosting en puerto específico
```bash
firebase serve --port 8080
```
**Cuándo usar**: Cuando el puerto 5000 está ocupado o necesitas un puerto específico.

---

## 🗄️ Base de Datos (Firestore)

### Importar datos a Firestore
```bash
firebase firestore:import ruta/del/archivo.json
```
**Cuándo usar**: Para importar datos de respaldo o migrar datos.

### Exportar datos de Firestore
```bash
firebase firestore:export ruta/destino/
```
**Cuándo usar**: Para hacer respaldos o migrar datos a otro proyecto.

### Eliminar datos de Firestore
```bash
firebase firestore:delete coleccion/documento --recursive
```
**Cuándo usar**: Para limpiar datos de desarrollo o eliminar colecciones completas.

---

## ⚡ Functions

### Ver logs de Functions
```bash
firebase functions:log
```
**Cuándo usar**: Para debuggear problemas en Cloud Functions.

### Ver logs de función específica
```bash
firebase functions:log --only miFuncion
```
**Cuándo usar**: Para ver logs de una función específica.

### Ejecutar Functions localmente
```bash
firebase emulators:start --only functions
```
**Cuándo usar**: Para desarrollar y probar Functions localmente.

---

## 🔍 Debugging y Monitoreo

### Abrir Firebase Console
```bash
firebase open
```
**Cuándo usar**: Para abrir rápidamente la consola de Firebase de tu proyecto.
**Nota**: En nuestro proyecto dio error porque faltaba configurar Realtime Database.

### Abrir sección específica
```bash
firebase open hosting
firebase open firestore
firebase open functions
```
**Cuándo usar**: Para ir directamente a una sección específica de Firebase Console.

### Ver información del proyecto
```bash
firebase projects:list --format=json
```
**Cuándo usar**: Para obtener información detallada en formato JSON.

---

## 🛠️ Comandos Avanzados

### Emuladores (desarrollo local)
```bash
# Inicializar emuladores
firebase init emulators

# Ejecutar todos los emuladores
firebase emulators:start

# Ejecutar emuladores específicos
firebase emulators:start --only hosting,firestore

# Ejecutar con datos de prueba
firebase emulators:start --import=./data --export-on-exit=./data
```
**Cuándo usar**: Para desarrollo local sin afectar datos de producción.

### Configuración de CI/CD
```bash
# Generar token para CI/CD
firebase login:ci

# Usar en CI/CD
firebase deploy --token "$FIREBASE_TOKEN"
```
**Cuándo usar**: Para automatizar despliegues en pipelines de CI/CD.

### Configuración de targets
```bash
# Configurar target para staging
firebase target:apply hosting staging mi-app-staging

# Desplegar a target específico
firebase deploy --only hosting:staging
```
**Cuándo usar**: En proyectos con múltiples entornos.

---

## 📝 Comandos Usados en Este Proyecto

### 1. Verificación de versión
```bash
firebase --version
```
**Por qué**: Para confirmar que Firebase CLI estaba instalado (versión 14.15.1).

### 2. Re-autenticación
```bash
firebase login --reauth
```
**Por qué**: Para asegurar permisos correctos y refrescar la autenticación.
**Resultado**: Autenticación exitosa como sergiosnsdk@gmail.com.

### 3. Listar proyectos
```bash
firebase projects:list
```
**Por qué**: Para encontrar el proyecto correcto entre los 5 proyectos disponibles.
**Resultado**: Encontramos `practica-angular20-chat-llm`.

### 4. Verificar proyecto activo
```bash
firebase use
```
**Por qué**: Para comprobar si había un proyecto ya seleccionado.
**Resultado**: "No project is currently active" - necesitábamos configurarlo.

### 5. Seleccionar proyecto
```bash
firebase use practica-angular20-chat-llm
```
**Por qué**: Para asociar nuestro directorio local con el proyecto Firebase correcto.
**Resultado**: "Now using project practica-angular20-chat-llm".

### 6. Build de la aplicación
```bash
npm run build
```
**Por qué**: Para generar los archivos optimizados para producción en `dist/`.

### 7. Despliegue completo
```bash
firebase deploy
```
**Por qué**: Para subir los archivos al hosting de Firebase.
**Resultado**: 10 archivos desplegados exitosamente.

---

## 🎯 Mejores Prácticas

### ✅ **Antes de cada deploy**
```bash
# 1. Verificar proyecto activo
firebase use

# 2. Hacer build
npm run build

# 3. Probar localmente (opcional)
firebase serve

# 4. Desplegar
firebase deploy
```

### ✅ **Para desarrollo diario**
```bash
# Deploy rápido (si ya tienes build)
firebase deploy --only hosting

# O usar nuestro script personalizado
npm run deploy:quick
```

### ✅ **Para proyectos con múltiples entornos**
```bash
# Configurar aliases
firebase use --add  # Seleccionar proyecto y crear alias

# Desplegar a staging
firebase use staging && firebase deploy

# Desplegar a production
firebase use production && firebase deploy
```

### ⚠️ **Comandos a evitar en producción**
```bash
# NO hagas esto en producción
firebase firestore:delete --recursive  # Puede borrar todos los datos
firebase functions:delete nombre       # Elimina functions permanentemente
```

---

## 🔧 Configuración del package.json

### Scripts recomendados para agregar:
```json
{
  "scripts": {
    "firebase:login": "firebase login",
    "firebase:use": "firebase use",
    "firebase:serve": "firebase serve",
    "firebase:deploy": "firebase deploy",
    "firebase:deploy:hosting": "firebase deploy --only hosting",
    "deploy": "npm run build && firebase deploy",
    "deploy:quick": "firebase deploy --only hosting",
    "deploy:staging": "firebase use staging && npm run build && firebase deploy",
    "deploy:prod": "firebase use production && npm run build && firebase deploy"
  }
}
```

---

## 🆘 Solución de Problemas Comunes

### ❌ Error: "No project is currently active"
```bash
# Solución:
firebase use mi-proyecto-id
```

### ❌ Error de permisos
```bash
# Solución:
firebase login --reauth
```

### ❌ Error: "Firebase project not found"
```bash
# Verificar proyectos disponibles:
firebase projects:list

# Usar proyecto correcto:
firebase use proyecto-correcto
```

### ❌ Build no encontrado
```bash
# Asegurar que el build existe:
npm run build

# Verificar configuración en firebase.json
```

### ❌ Error en emuladores
```bash
# Verificar puertos disponibles:
firebase emulators:start --inspect-functions

# Usar puertos diferentes:
firebase emulators:start --port=8080
```

---

## 📚 Recursos Adicionales

- **Documentación oficial**: https://firebase.google.com/docs/cli
- **Referencia de comandos**: https://firebase.google.com/docs/cli/targets
- **Troubleshooting**: https://firebase.google.com/docs/cli/troubleshooting

---

**💡 Tip**: Guarda este archivo como referencia rápida y úsalo siempre que necesites recordar un comando específico de Firebase CLI.
