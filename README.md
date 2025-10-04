# 🌍 NASA Terra Bolivia

**Explorando Ciencias de la Tierra con Datos del Satélite Terra de la NASA**

Una aplicación web interactiva que permite explorar datos históricos de ciencias de la Tierra recopilados por el satélite Terra de la NASA, enfocada específicamente en Bolivia.

## 🚀 Características

### 📊 Datos Disponibles
- **🔥 Incendios Forestales**: Datos MODIS/VIIRS sobre incendios forestales
- **🌱 Cobertura Vegetal**: Análisis NDVI para deforestación y cambios en vegetación
- **🏔️ Glaciares y Nieve**: Monitoreo de glaciares y cobertura de nieve (ASTER/MODIS)
- **🌫️ Contaminación del Aire**: Niveles de CO usando datos MOPITT

### 🗺️ Funcionalidades del Mapa
- Mapa interactivo centrado en Bolivia
- Capas de datos NASA con iconos distintivos
- Marcadores de usuarios para observaciones locales
- Selección por departamento
- Datos históricos 2019-2024

### 👥 Sistema de Usuarios
- Registro e inicio de sesión simple (correo + apodo)
- Marcadores personalizados en el mapa
- Interfaz de tiempo real (actualización cada 5 segundos)

## 🛠️ Tecnologías

### Backend
- **Node.js** + **Express.js**
- **SQLite** para almacenamiento local
- **node-fetch** para APIs externas
- **CORS** habilitado

### Frontend
- **HTML5**, **CSS3**, **JavaScript** vanilla
- **Leaflet.js** para mapas interactivos
- Diseño responsive y moderno
- Interfaz con glassmorphism

### APIs
- **NASA API** con clave: `L5AzKARqX636RqJsZ5gm4Z0fyuVyYUi7mvUlSg1T`
- Datos simulados para MVP (hackathon)

## 📁 Estructura del Proyecto

```
NASA/
├── backend/
│   ├── server.js          # Servidor Express con endpoints NASA
│   ├── db.js             # Configuración SQLite
│   └── terra.db          # Base de datos SQLite
├── frontend/
│   ├── index.html        # Página principal
│   ├── css/
│   │   └── style.css     # Estilos modernos
│   └── js/
│       ├── api.js        # Cliente API
│       └── map.js        # Lógica del mapa y UI
├── package.json          # Dependencias Node.js
└── README.md            # Documentación
```

## 🚀 Instalación y Uso

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar el Servidor
```bash
npm start
```

### 3. Acceder a la Aplicación
- Abrir `http://localhost:4000` en el navegador
- O abrir `frontend/index.html` directamente

## 📡 Endpoints de la API

### Usuarios
- `POST /register` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión

### Rastros de Usuarios
- `POST /rastro` - Agregar punto al mapa
- `GET /rastros` - Obtener todos los puntos

### Datos NASA
- `GET /incendios?start=YYYY-MM-DD&end=YYYY-MM-DD` - Incendios forestales
- `GET /ndvi?start=YYYY-MM-DD&end=YYYY-MM-DD` - Cobertura vegetal
- `GET /glaciares?start=YYYY-MM-DD&end=YYYY-MM-DD` - Glaciares y nieve
- `GET /contaminacion?start=YYYY-MM-DD&end=YYYY-MM-DD` - Contaminación del aire
- `GET /departamento/:nombre` - Datos consolidados por departamento

## 🎯 Flujo de Usuario

1. **Acceso**: Usuario abre la web y ve el mapa de Bolivia
2. **Registro/Login**: Se registra o inicia sesión para interactuar
3. **Exploración**: Selecciona un departamento para ver datos históricos
4. **Capas**: Activa capas específicas de datos NASA
5. **Marcadores**: Agrega observaciones personales al mapa
6. **Tiempo Real**: Ve actualizaciones automáticas cada 5 segundos

## 📊 Datos de Ejemplo

### Incendios Forestales
- **Chiquitania (Santa Cruz)**: 1,250 km² afectados (2023)
- **Parque Nacional Sajama (La Paz)**: 890 km² afectados (2022)
- **Chapare (Cochabamba)**: 450 km² afectados (2021)

### Glaciares
- **Illimani (La Paz)**: 45.2% cobertura de nieve, tendencia decreciente
- **Sajama (Oruro)**: 32.8% cobertura de nieve, retroceso glaciar

## 🔧 Configuración para Producción

### Variables de Entorno
```bash
NASA_API_KEY=L5AzKARqX636RqJsZ5gm4Z0fyuVyYUi7mvUlSg1T
PORT=4000
```

### Base de Datos
- SQLite se crea automáticamente
- Tablas: `usuarios`, `rastros`
- Datos persisten entre reinicios

## 🌟 Características del MVP (Hackathon)

- ✅ Datos históricos 2019-2024
- ✅ Registro mínimo (correo + apodo)
- ✅ Eventos por departamento
- ✅ 4 tipos de datos NASA
- ✅ Interfaz moderna y responsive
- ✅ Tiempo real básico

## 🚧 Próximas Mejoras

- [ ] Integración real con APIs de NASA
- [ ] Datos en tiempo real
- [ ] Gráficos y visualizaciones
- [ ] Exportar datos
- [ ] Notificaciones push
- [ ] Autenticación avanzada

## 👥 Equipo

Desarrollado para hackathon NASA con enfoque en ciencias de la Tierra y sostenibilidad ambiental.

## 📄 Licencia

ISC License - Proyecto educativo y de investigación.

---

**🌍 Explorando nuestro planeta con tecnología espacial** 🛰️
