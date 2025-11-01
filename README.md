# 📋 TodoList Firebase

Una aplicación moderna de gestión de tareas con React, Vite y Firebase. Interfaz similar a Microsoft To Do con autenticación, sincronización en tiempo real y modo oscuro.

## ✨ Características

- 🔐 **Autenticación Firebase** - Registro e inicio de sesión seguro
- 📝 **Crear tareas** - Agrega nuevas tareas fácilmente
- ⭐ **Marcar importante** - Resalta tus tareas más importantes
- 📅 **Fechas de vencimiento** - Organiza por fecha
- 📋 **Notas** - Agrega detalles a tus tareas
- 🌙 **Modo oscuro** - Tema claro y oscuro
- 📊 **Sincronización en tiempo real** - Cambios instantáneos con Firebase
- 🗂️ **Listas personalizadas** - Crea tus propias categorías
- 🔍 **Búsqueda** - Encuentra tareas rápidamente
- 📱 **Responsive** - Funciona en móvil, tablet y desktop

## 🎨 Interfaz

Similar a Microsoft To Do con:
- Sidebar con navegación
- Header con búsqueda
- Panel de detalles lateral
- Selector de vista (Lista, Cuadrícula, Calendario)
- Panel de estadísticas

## 🚀 Quick Start

### Requisitos

- Node.js 16+
- npm o yarn
- Cuenta en Firebase

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/todolist-firebase.git
cd todolist-firebase

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env.local
cp .env.local.example .env.local

# 4. Llenar .env.local con tus credenciales de Firebase
# Abre Firebase Console → Settings → Project Settings → Your apps
# Copia los valores en .env.local

# 5. Ejecutar servidor de desarrollo
npm run dev
```

La app estará disponible en: `http://localhost:5173`

### Crear una Cuenta de Firebase

1. Ve a: https://console.firebase.google.com
2. Crea un nuevo proyecto
3. Ve a "Settings" → "Project Settings" → "Your apps"
4. Copia los valores de configuración
5. Pégalos en tu `.env.local`

### Configurar Firestore

1. En Firebase Console, ve a **Firestore Database**
2. Crea una base de datos en modo test
3. Ve a **Rules** y pega:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. **Publish** los cambios

## 🔐 Variables de Entorno

Necesitas las siguientes variables en `.env.local`:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

⚠️ **IMPORTANTE:** `.env.local` está en `.gitignore` y NUNCA se sube a GitHub

## 🛠️ Tecnologías

- **React 18** - Librería de UI
- **Vite** - Herramienta de build rápida
- **Tailwind CSS** - Framework de estilos
- **Firebase** - Autenticación y base de datos
  - Firebase Auth - Gestión de usuarios
  - Firestore - Base de datos NoSQL en tiempo real
- **Lucide React** - Iconos SVG
- **JavaScript ES6+** - Lenguaje base

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Sidebar.jsx           # Menú lateral
│   ├── Header.jsx            # Barra superior
│   ├── Auth.jsx              # Pantalla de login
│   ├── TodoForm.jsx          # Formulario de tarea
│   ├── TodoItem.jsx          # Componente de tarea
│   ├── TodoList.jsx          # Lista de tareas
│   └── ...
├── context/
│   └── AuthContext.jsx       # Contexto de autenticación
├── lib/
│   └── firebaseClient.js     # Configuración de Firebase
├── App.jsx                   # Componente principal
├── main.jsx                  # Punto de entrada
└── index.css                 # Estilos globales
```

## 🎯 Funcionalidades Detalladas

### Autenticación
- Registro con email/contraseña
- Login seguro
- Logout
- Sesión persistente

### Gestión de Tareas
- ✅ Crear tareas
- ✏️ Editar tareas
- 🗑️ Eliminar tareas
- ✓ Marcar como completada
- ⭐ Marcar como importante
- 📅 Agregar fecha de vencimiento
- 📝 Agregar notas

### Filtros
- **Mi día** - Tareas para hoy
- **Importante** - Tareas marcadas
- **Planeado** - Tareas con fecha
- **Tareas** - Todas las tareas
- **Listas personalizadas**

### Búsqueda
- Busca en tiempo real
- Filtra por nombre de tarea

### Temas
- Modo claro (default)
- Modo oscuro

## 📊 Base de Datos (Firestore)

### Colección: `todos`

```javascript
{
  id: "unique-id",
  userId: "user-uid",
  text: "Mi tarea",
  completed: false,
  important: false,
  dueDate: "2025-12-25",
  notes: "Notas importantes",
  listId: "tareas",
  createdAt: Timestamp
}
```

### Colección: `lists`

```javascript
{
  id: "list-id",
  userId: "user-uid",
  name: "Mi lista personalizada",
  createdAt: Timestamp
}
```

## 🚀 Deployment en Vercel

### 1. Subir a GitHub

```bash
git push origin main
```

### 2. Conectar con Vercel

1. Ve a: https://vercel.com/dashboard
2. Haz clic en "New Project"
3. Selecciona tu repositorio de GitHub
4. Configura:
   - Framework: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Agregar Variables de Entorno

En Vercel, ve a **Settings** → **Environment Variables**

Agrega:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### 4. Deploy

Haz clic en **Deploy**

Tu app estará en vivo en: `https://tu-proyecto.vercel.app`

## 📱 Compartir con Amigos y Familia

Una vez en producción:

1. Cada persona se registra con su email
2. Cada persona tiene su propia lista de tareas
3. Los datos se sincronizan en tiempo real
4. No pueden ver las tareas de otros

## 🐛 Solución de Problemas

### "Faltan variables de entorno de Firebase"
→ Crea `.env.local` y llena con tus credenciales

### "Missing or insufficient permissions"
→ Ve a Firestore Rules y configúralas (ver arriba)

### "Cannot find module"
→ Ejecuta `npm install`

### Las tareas no se guardan
→ Verifica que Firestore esté habilitada en Firebase Console

## 📚 Recursos Útiles

- [Firebase Console](https://console.firebase.google.com)
- [Documentación de Firestore](https://firebase.google.com/docs/firestore)
- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

[Tu Nombre](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- [Firebase](https://firebase.google.com)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)

---

**¿Preguntas?** Abre un issue o contáctame. ¡Espero que disfrutes usando TodoList Firebase! 🚀