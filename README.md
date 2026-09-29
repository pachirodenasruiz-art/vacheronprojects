# VACHERON PROJECTS 🏗️ | Enterprise Construction Cloud ERP Platform

> **Portal SaaS y Panel Integral para la Gestión, Planificación, Ejecución y Control Financiero de Obras y Proyectos de Construcción.**

Plataforma SaaS de alta gama diseñada específicamente para empresas constructoras, promotoras e ingenierías (benchmark directo con *BrickControl*). Proporciona control total a pie de obra, presupuestación jerárquica con descompuestos analíticos (FIEBDC-3 / BC3), cronograma Gantt interactivo, compras y control económico en 3 ejes con análisis de Valor Ganado (EVM) y cumplimiento normativo Veri*Factu (AEAT).

---

## 🏛️ Arquitectura de Módulos del Portal SaaS

### 1. Visión General & Cuadro de Mando ([`/`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/page.tsx))
- **KPIs Financieros Consolidados:** Presupuesto contratado, Coste real devengado (AC), Certificado a origen (EV) y Margen bruto real.
- **Curva S Interactiva (EVM):** Representación gráfica reactiva de los 3 ejes con cálculo de CPI y SPI.
- **Línea Temporal Gantt:** Monitorización del avance de hitos y tareas críticas.
- **Acceso Modular Rápido:** Accesos directos a todas las áreas de gestión.

### 2. Estudios, Presupuestos y Descompuestos ([`/presupuestos`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/presupuestos/page.tsx))
- **Árbol Jerárquico:** Capítulos, subcapítulos, partidas y unidades de obra.
- **Descompuestos Analíticos:** Detalle de rendimientos y precios unitarios clasificados en *Materiales*, *Mano de Obra*, *Maquinaria* y *Subcontratas*.
- **Interoperabilidad FIEBDC-3:** Importación y exportación de archivos estándar `.bc3` compatibles con Presto, Arquímedes, CYPE y Menfis.

### 3. Planificador de Obras & Diagrama Gantt ([`/planificacion`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/planificacion/page.tsx))
- **Cronograma de Tareas:** Dependencias fin-inicio, hitos del proyecto y cálculo dinámico de la **Ruta Crítica (CPM)**.
- **Asignación de Recursos:** Monitorización de cuadrillas, empresas especializadas y medios auxiliares.

### 4. Ejecución y Seguimiento a Pie de Obra ([`/ejecucion`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/ejecucion/page.tsx))
- **Partes de Mano de Obra:** Imputación diaria de horas de operarios y cuadrillas vinculadas al código de partida.
- **Certificaciones de Obra:** Emisión y control de certificaciones periódicas a origen con retenciones automáticas de garantía (5%).
- **Control de Subcontratas:** Contratos marco, avance certificado, saldo pendiente y retenciones acumuladas.
- **Maquinaria y Equipos:** Registro de horas de uso, amortización y combustible de equipos propios y alquilados.

### 5. Compras, Almacén y Logística ([`/compras`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/compras/page.tsx))
- **Explosión de Recursos:** Cálculo automático de necesidades de material a partir del presupuesto y la planificación.
- **Matriz Comparativa de Ofertas:** Cuadro comparativo de proveedores con precios unitarios, plazos de entrega y valoración.
- **Control Multi-Almacén:** Stock en almacén central y acopios a pie de obra con alertas automáticas de nivel mínimo.

### 6. Control Económico & Desviaciones a 3 Ejes ([`/economico`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/economico/page.tsx))
- **Matriz a 3 Ejes:** Comparativa matricial continua de:
  1. *Previsto (PV - Planned Value):* Presupuesto base de coste.
  2. *Coste Real (AC - Actual Cost):* Gasto incurrido real.
  3. *Certificado (EV - Earned Value):* Venta devengada y cobrable.
- **Indicadores EVM:** CPI (*Cost Performance Index*), SPI (*Schedule Performance Index*), EAC (*Estimate at Completion*) y VAC (*Variance at Completion*).

### 7. Facturación, Tesorería & Veri*Factu ([`/facturacion`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/facturacion/page.tsx))
- **Facturación Automática:** Emisión vinculada directamente a certificaciones y albaranes aprobados.
- **Inspector Veri\*Factu (AEAT):** Sellado criptográfico con huella SHA-256 encadenada al registro precedente y generación de código QR reglamentario (RD 1007/2023).
- **Tesorería:** Previsión y calendario de vencimientos de cobros y pagos a 60/90 días.

### 8. API REST & Conectores ERP ([`/api-docs`](file:///Users/pachirodenasruiz/Desktop/VacheronProjects/src/app/api-docs/page.tsx))
- **Capa OpenAPI 3.1:** Endpoints documentados con autenticación Bearer Token para integración con SAP, Microsoft Dynamics, A3 y PowerBI.

---

## 💻 Stack Tecnológico

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript.
- **Estilos:** Tailwind CSS con diseño corporativo *Dark Slate & Industrial Amber*.
- **Iconos:** Lucide Icons.
- **Visualización:** Gráficas SVG interactivas para Curva S y Cronograma Gantt.

---

## 🚀 Puesta en Marcha

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - Portal SaaS: [http://localhost:3000](http://localhost:3000)

---

© 2025 **Vacheron Projects Inc.**
