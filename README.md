# Sistema de Encuestas en Tiempo Real

Aplicación full-stack con Angular 22 + Spring Boot 3 + PostgreSQL. Sistema de encuestas en tiempo real con autenticación JWT, roles de administrador y usuario, y resultados en vivo vía WebSocket.

## Stack Tecnológico

### Backend
- **Java 21** + **Spring Boot 3.3**
- **PostgreSQL** con migraciones **Flyway**
- **WebSocket** para actualizaciones en tiempo real
- **JWT** con Spring Security
- **JDBC Template** con NamedParameterJdbcTemplate
- **Testcontainers** para testing

### Frontend
- **Angular 22** con standalone components
- **TypeScript 6**
- Reactive Forms, Guards, Interceptors
- Diseño responsive con CSS moderno

## Funcionalidades

- Registro e inicio de sesión con JWT
- Roles: **admin** (gestiona encuestas) y **usuario** (vota)
- CRUD de encuestas con ciclo de vida: `borrador → activa → finalizada`
- Votación en tiempo real con WebSocket
- Resultados agregados con porcentajes
- Protección de rutas por rol

## Estructura del Proyecto

```
Encuestas/
├── Encuestas-backend/              # Backend Spring Boot
│   ├── src/main/java/cibertec/edu/
│   │   ├── auth/                   # Autenticación JWT
│   │   ├── encuesta/               # CRUD de encuestas
│   │   ├── opcion/                 # Opciones de respuesta
│   │   ├── voto/                   # Votación y resultados
│   │   ├── config/                 # WebSocket y Security config
│   │   ├── exception/              # Manejo de errores
│   │   └── dto/                    # DTOs de request/response
│   └── src/main/resources/
│       └── db/migration/           # Migraciones Flyway
│
├── encuestas-frontend/             # Frontend Angular
│   └── src/app/
│       ├── components/             # Componentes standalone
│       │   ├── encuesta-list/      # Listado de encuestas
│       │   ├── encuesta-form/      # Crear encuesta
│       │   ├── encuesta-detail/    # Detalle y votación
│       │   ├── resultados/         # Resultados
│       │   ├── login/              # Inicio de sesión
│       │   └── register/           # Registro
│       ├── services/               # Servicios HTTP
│       ├── guards/                 # Guards de rutas
│       ├── interceptors/           # JWT interceptor
│       └── models/                 # Interfaces TypeScript
└── README.md
```

## API Endpoints

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| POST | `/api/auth/register` | Público | Registrar usuario |
| POST | `/api/auth/login` | Público | Iniciar sesión |
| GET | `/api/encuestas` | Público | Listar encuestas |
| GET | `/api/encuestas/{id}` | Público | Obtener encuesta |
| POST | `/api/encuestas` | Admin | Crear encuesta |
| PUT | `/api/encuestas/{id}/estado` | Admin | Cambiar estado |
| DELETE | `/api/encuestas/{id}` | Admin | Eliminar encuesta |
| GET | `/api/encuestas/{id}/opciones` | Público | Opciones de encuesta |
| POST | `/api/votos` | Usuario | Votar |
| GET | `/api/votos/{encuestaId}/resultados` | Usuario | Ver resultados |

## Ejecución Local

### Backend
```bash
cd Encuestas-backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd encuestas-frontend
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200`.
