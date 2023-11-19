# Proyecto Final - Formula 1

## Instrucciones para Iniciar la Aplicación

### Base de Datos

1. Importa el archivo SQL llamado `formula1` en tu gestor de base de datos MySQL.
2. Asegúrate de tener un usuario `root` sin contraseña y crea una base de datos llamada `formula1`.

### Backend (Node.js)

1. Abre la terminal y navega a la carpeta `backend`.
2. Ejecuta el comando para iniciar el servidor Node.js:

   ```bash
   node app.js
   
### Frontend (Angular)

1. Abre otra terminal.

2. Navega a la carpeta proyectofinal.

3. Ejecuta el siguiente comando para iniciar la aplicación Angular:

   ```bash
   ng serve

## Endpoints de Node.js

### 1. Actualización de Datos

- **Descripción**: Se realiza una actualización de datos cada lunes a las 9 de la mañana, obteniendo información de la última carrera de Fórmula 1.

### 2. Cambio de Equipo Fantasy

- **Endpoint**: `/fantasy/:id` (POST)
- **Uso**: Actualiza los pilotos y escuderías de un fantasy específico.

### 3. Consulta de Puntos Fantasy

- **Endpoint**: `/puntosFantasy/:id` (GET)
- **Uso**: Obtiene los puntos acumulados de un fantasy específico.

### 4. Autenticación de Usuario

- **Endpoint**: `/login` (POST)
- **Uso**: Autentica a un usuario mediante nombre de usuario y contraseña.

### 5. Registro de Usuario

- **Endpoint**: `/registrar` (POST)
- **Uso**: Registra un nuevo usuario en la base de datos y crea un fantasy asociado.

### 6. Consultas a la Base de Datos

- `/circuitos` (GET): Obtiene información sobre los circuitos de Fórmula 1.
- `/pilotosActivos` (GET): Obtiene información sobre los pilotos activos.
- `/escuderias` (GET): Obtiene información sobre las escuderías de Fórmula 1.
- `/pilotosFantasy/:id` (GET): Obtiene los pilotos de un fantasy específico.
- `/escuderiasFantasy/:id` (GET): Obtiene las escuderías de un fantasy específico.
- `/ganadores` (GET): Obtiene información sobre los pilotos ganadores de mundiales.

---

**Nota**: Asegúrate de tener todas las dependencias instaladas y la base de datos configurada antes de iniciar la aplicación.
