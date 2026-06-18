# 🎨 Frontend Guidelines - Vecindario Tranquilo

Este documento describe la estructura, configuraciones, componentes y lógica del cliente web desarrollado en **WebStorm** utilizando **Angular 22** y administrado mediante **pnpm** para la plataforma "Vecindario Tranquilo".

## 📌 Contexto General
* **Proyecto:** ProyectoFinal-Frontend ("Vecindario Tranquilo")
* **Asignatura:** Programación IV-Web (Q2 2026)
* **Objetivo:** Interfaz SPA reactiva que consume las Web APIs de .NET y se comunica directamente con el ecosistema cliente cuando se requiera.

## ⚙️ Stack Tecnológico & Scripts (WebStorm)
* **Manejador de Paquetes:** `pnpm@11.4.0`
* **Framework:** Angular v22.0.0 (Componentes estables, control de flujo nativo con `@if`, `@for`).
* **UI Framework:** Angular Material v22.0.0
* **Gráficos:** Chart.js (Dashboard administrativo).
* **Testing:** **Vitest v4.0.8** y **Jsdom** (Reemplazando por completo la infraestructura de Karma).
* **Formateador:** Prettier v3.8.1

### Scripts Disponibles (Utilizar exclusivamente con pnpm):
* `pnpm start` : Corre el servidor de desarrollo local en `http://localhost:4200/`.
* `pnpm build` : Compila la aplicación en producción.
* `pnpm test` : Ejecuta las pruebas unitarias con Vitest de manera instantánea.

## 🗂️ Arquitectura de Componentes y Servicios Obligatorios
Los archivos en `src/app/` deben organizarse jerárquicamente siguiendo la estructura modular o funcional requerida:

### Componentes Públicos:
* `LandingComponent`: Página introductoria con el eslogan y acceso.
* `LoginComponent` y `RegisterComponent`: Control de accesos y registro (Ciudadano por defecto).

### Componentes de Administrador:
* `AdminDashboardComponent`: Vista global con indicadores clave.
* `MediatorManagementComponent` y `MediatorFormComponent`: Gestión técnica y alta de mediadores (sin borrar historial).
* `CaseOverviewComponent`: Monitoreo general de estados.
* `ReportsComponent`: Contenedor de gráficos temporales y de distribución.

### Componentes de Mediador:
* `MediatorDashboardComponent` y `AssignedCasesComponent`: Casos bajo tutela del mediador.
* `CaseDetailComponent`: Expediente digital completo.
* `SessionFormComponent`: Programación y selección de modalidad (Presencial/Virtual).
* `AgreementFormComponent`: Redactor de acuerdos estructurados con plazos por punto.

### Componentes de Ciudadano:
* `CitizenDashboardComponent` y `MyCasesComponent`: Centro de control para vecinos involucrados.
* `CaseReportFormComponent`: Registro de disputas con opción de carga de evidencias fotográficas.
* `CaseStatusComponent`: Línea de tiempo visual del conflicto.
* `AgreementConfirmationComponent`: Módulo de revisión y firma digital (Aceptar/Solicitar cambios).
* `ComplianceReportComponent`: Registro de cumplimiento o denuncia de vencimiento de plazos.

### Servicios Angular:
* `AuthService`, `CaseService`, `SessionService`, `AgreementService`, `NotificationService`, `ReportService`. Todos consumen los endpoints de la API de .NET.

## 📡 Estrategia de Conexión y Validaciones
* **CORS & Base URL:** Todas las peticiones HTTP (`HttpClient`) apuntan a la URL del backend de .NET asignada en Rider, configurada dinámicamente en los archivos `environments`.
* **Seguridad Visual:** Deshabilitar o esconder componentes y opciones según el rol activo decodificado del JWT (`Administrador`, `Mediador`, `Ciudadano`).
* **Manejo Reactivo:** Implementar **RxJS** para los flujos asíncronos y respuestas del servidor.

## 🛑 Reglas de Comportamiento para la IA (Antigravity)
* **Rol:** Tutor académico y consultor de frontend.
* **REGLA DE ORO:** **NO** modifiques, crees ni elimines archivos por tu cuenta. Guíame paso a paso con explicaciones claras o fragmentos aislados en el chat.
* Respeta el uso estricto de **pnpm** como motor de dependencias y **Vitest** como framework de pruebas.

---

## 📊 CRITERIOS DE EVALUACIÓN FRONTEND E INTEGRACIÓN (10 Puntos)
* **Componentes TypeScript (1.5 pts):** Lógica limpia y tipado estricto.
* **Landing y autenticación (1 pt):** Flujo de login y persistencia segura de sesión.
* **Interfaces Administrador y Mediador (1.5 pts):** Control de flujos de asignación y calendarios de audiencias.
* **Interfaz de Ciudadano (1 pt):** Formularios de reportes, adjuntar evidencias y aprobación de convenios.
* **Gráficos y reportes (1 pt):** Integración de Chart.js actualizada en tiempo real (múltiples visualizaciones).
* **Comunicación e Integración (2 pts):** Conexión HTTP limpia con .NET, manejo de errores globales con interceptores y sincronización estricta de roles.
* **Flujo completo (1.5 pts):** Trazabilidad total de extremo a extremo sin caídas del sistema.
