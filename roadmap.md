# 🗺️ Roadmap de Implementación - Vecindario Tranquilo

Este documento contiene un análisis técnico completo de los módulos y componentes faltantes del proyecto, organizados de **más fácil a más difícil**, priorizando primero los flujos críticos de la base del sistema para evitar tener que reescribir código en el futuro.

---

## 🚀 Prioridad 1: Fácil & Estructura Base (Menos de 2 horas)
*Objetivo: Sentar las bases del enrutamiento inicial y consolidar las interfaces de comunicación HTTP.*

### 1. Landing (Página de Inicio)
*   **Nombre de Componente:** `LandingComponent`
*   **Propósito:** Página pública inicial con el eslogan del proyecto, introducción corta a "Vecindario Tranquilo" y botones formales para ingresar (`/login`) o registrarse (`/register`).
*   **Look & Feel:** Debe seguir el mismo fondo verde oscuro con esferas amarillas flotantes y tarjetas transparentes glassmorphism.
*   **Por qué primero:** Previene que los usuarios no autenticados entren directo a la ruta vacía `''` sin contexto.

### 2. Unificación y Consolidación de Servicios API
*   **Ubicación:** Centralizar en `src/app/services/`.
*   **Crear/Completar:**
    *   `CaseService`: Peticiones GET/POST para disputas (`/api/casos`).
    *   `SessionService`: Gestión de agendas de audiencias (`/api/sesiones`).
    *   `AgreementService`: Envío de actas de acuerdo (`/api/acuerdos`).
    *   `NotificationService`: Notificaciones internas al usuario.
*   **Por qué primero:** Definir los métodos de llamada HTTP y sus interfaces TypeScript antes de armar los formularios evita la reescritura de código en los componentes visuales.

---

## ⚖️ Prioridad 2: Medio & Flujo Ciudadano (4 a 6 horas)
*Objetivo: Permitir que los vecinos reporten sus disputas y monitoreen su estado.*

### 1. Formulario de Reporte de Casos
*   **Nombre de Componente:** `CaseReportFormComponent`
*   **Propósito:** Formulario para que el ciudadano reporte un conflicto (Título, Categoría, Dirección, Contraparte, Descripción y carga de evidencias fotográficas).
*   **Reto de Integración:** Habilitar el envío multipart/form-data para mandar fotos adjuntas a la API de .NET.

### 2. Centro de Casos del Ciudadano
*   **Nombre de Componentes:** `MyCasesComponent` (Historial/Lista) y `CaseStatusComponent` (Línea de tiempo).
*   **Propósito:**
    *   Listar las disputas del ciudadano (rol de afectado o contraparte).
    *   Visualizar una línea de tiempo animada: `Pendiente ➔ Asignado ➔ En Sesión ➔ Resuelto` de acuerdo al estado en base de datos.

### 3. Aprobación y Firma de Convenios
*   **Nombre de Componente:** `AgreementConfirmationComponent`
*   **Propósito:** Pantalla interactiva donde el ciudadano puede ver el documento final propuesto por el mediador y realizar dos acciones:
    *   **Aceptar / Firmar Digitalmente**: Cambia el estado del caso a "Cerrado/Resuelto".
    *   **Solicitar Cambios / Rechazar**: Agrega un comentario para que el mediador modifique la propuesta.

---

## 📅 Prioridad 3: Medio-Alto & Flujo Mediador (6 a 8 horas)
*Objetivo: Dotar al mediador de herramientas activas para agendar reuniones y redactar resoluciones.*

### 1. Agenda y Programación de Audiencias
*   **Nombre de Componente:** `SessionFormComponent`
*   **Propósito:** Formulario del mediador para citar a las partes. Permite seleccionar fecha, hora y modalidad (Presencial con salón físico / Virtual con enlace de videollamada).
*   **Reto:** Validar disponibilidad de fecha y zona para no empalmar reuniones.

### 2. Redacción de Acuerdos Estructurados
*   **Nombre de Componente:** `AgreementFormComponent`
*   **Propósito:** Editor formal donde el mediador redacta los compromisos logrados punto por punto, definiendo plazos máximos de cumplimiento para cada uno.

### 3. Vista de Casos Asignados e Historial
*   **Nombre de Componente:** `CaseOverviewComponent` / `AssignedCasesComponent`
*   **Propósito:** Listado de casos filtrados por la zona del mediador activo. Permite al mediador entrar al detalle (`CaseDetailComponent`) y dar seguimiento personalizado.

---

## 📊 Prioridad 4: Complejo & Panel Administrativo (8+ horas)
*Objetivo: Controlar la seguridad global del sistema y visualizar analíticas avanzadas.*

### 1. Mantenimiento y Alta de Mediadores
*   **Nombre de Componentes:** `MediatorManagementComponent` (Lista) y `MediatorFormComponent` (Formulario de creación).
*   **Propósito:** Permite al administrador crear cuentas de mediadores y asociarlos a zonas geográficas específicas.
*   **Regla de Negocio:** No se permite borrar el historial de un mediador, solo desactivar su cuenta (`IsActive: false` en Firestore).

### 2. Reportes y Estadísticas (Analítica Visual)
*   **Nombre de Componente:** `ReportsComponent`
*   **Propósito:** Dashboard visual utilizando **Chart.js** alimentado de `/api/admin/dashboard`.
*   **Métricas requeridas:**
    *   Distribución de casos por zona geográfica.
    *   Tasa de resolución (porcentaje de casos finalizados con acuerdo versus archivados).
    *   Gráficos temporales de audiencias programadas por mes.

---

## 🛠️ Consejos Técnicos Clave para Evitar Reescribir Código:

1.  **Validación del JWT:** Asegúrate de guardar siempre el token en `localStorage` tras el login. El interceptor HTTP debe inyectarlo automáticamente en el header `Authorization: Bearer <token>` para todos los requests a endpoints protegidos de la API.
2.  **Modularidad de Modelos:** Define las interfaces TypeScript de las entidades (`Caso`, `Acuerdo`, `Usuario`, `Sesion`) en `src/app/models/` antes de programar los componentes.
3.  **Roles Sanitizados:** Al comparar roles en los componentes, realiza siempre la validación case-insensitive (`role.toLowerCase() === 'mediador'`) para evitar discrepancias si en Firestore se guardan con mayúscula o minúscula.
