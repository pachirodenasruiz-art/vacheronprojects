# VACHERON PROJECTS 🏗️ | Enterprise Construction Cloud ERP & SaaS Platform

> **Plataforma SaaS Cloud de Gestión Integral de Obras, Control Presupuestario en Tiempo Real, Mediciones de Campo, Planificación Gantt y Cumplimiento Normativo Veri*Factu (AEAT).**

Inspirada funcionalmente en los más altos estándares de la industria de la construcción (benchmark directo con *BrickControl*), elevando su propuesta de valor con una arquitectura moderna, diseño corporativo de alta gama (*Dark Slate & Luxury Amber*), compatibilidad nativa con presupuestos **FIEBDC-3 (BC3)** y cálculo reactivo del **Valor Ganado (EVM)**.

---

## 🏛️ 1. Arquitectura de Módulos Funcionales

### A. Estudios, Presupuestos y Descompuestos (BC3)
- **Árbol Jerárquico Multinivel:** Capítulos, subcapítulos, partidas y unidades de obra.
- **Descompuestos Analíticos:** Detalle de rendimientos y precios unitarios clasificados en *Materiales*, *Mano de Obra*, *Maquinaria* y *Subcontratas*.
- **Interoperabilidad FIEBDC-3:** Motor preparado para importación y exportación de archivos estándar `.bc3` compatibles con Presto, Arquímedes, CYPE y Menfis.

### B. Ejecución y Seguimiento a Pie de Obra
- **Mediciones Reales en Campo:** Registro ágil de unidades ejecutadas desde tablet o móvil en el tajo.
- **Certificaciones a Origen:** Generación y control de certificaciones periódicas con retención automática de garantía (ej. 5%).
- **Partes Diarios de Cuadrilla:** Imputación de horas por operario y categoría vinculadas directamente al código de partida.
- **Subcontratas y Maquinaria:** Contratos marco, avance certificado, saldo pendiente y control de horas y combustible de equipos.

### C. Compras, Almacén y Logística
- **Explosión de Recursos:** Cálculo automático de necesidades de material según la planificación temporal.
- **Matriz Comparativa de Ofertas:** Comparador multicriterio de proveedores (precio unitario, plazo de entrega en días y valoración técnica).
- **Control Multi-Almacén:** Gestión de stocks centrales y acopios a pie de obra con alertas de rotura bajo mínimo.

### D. Control Económico, Desviaciones a 3 Ejes y EVM
- **Matriz a 3 Ejes:** Comparativa matricial continua de:
  1. **Previsto (PV - Planned Value):** Presupuesto base de coste.
  2. **Coste Real (AC - Actual Cost):** Gasto devengado acumulado.
  3. **Certificado (EV - Earned Value):** Venta devengada y aprobada.
- **Analítica de Valor Ganado:** Cálculo instantáneo de índices **CPI** (*Cost Performance Index*), **SPI** (*Schedule Performance Index*), **EAC** (*Estimate at Completion*) y **Curva S**.

### E. Administración, Facturación y Cumplimiento Veri*Factu
- **Facturación Encadenada:** Emisión automática a partir de certificaciones aprobadas.
- **Cumplimiento Ley Antifraude / Veri\*Factu (RD 1007/2023):** Generación de huella criptográfica SHA-256 encadenada al registro precedente y código QR reglamentario de la AEAT.
- **Tesorería y Vencimientos:** Previsión dinámica de cobros y pagos a 60/90 días.
- **Capa OpenAPI / REST:** Endpoints documentados para integración con SAP, Microsoft Dynamics, A3 y PowerBI.

---

## 💻 2. Stack Tecnológico

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) con React 19 y TypeScript.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) con paleta corporativa personalizada (`#080d1a`, `#0B1120`, acentos en oro ámbar y esmeralda).
- **Iconografía:** [Lucide Icons](https://lucide.dev/).
- **Componentes:** Primitivas accesibles, modals interactivos, simulación de importación BC3 y visualizador SVG reactivo de Curva S.

---

## 🚀 3. Puesta en Marcha en Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - Landing Page Pública: [http://localhost:3000](http://localhost:3000)
   - Portal SaaS Dashboard: [http://localhost:3000/app](http://localhost:3000/app)

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📁 4. Estructura del Repositorio

```
vacheronprojects/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout con SEO metadata y tipografía Plus Jakarta Sans
│   │   ├── globals.css             # Directivas Tailwind, efectos Glassmorphism y scrollbars
│   │   ├── page.tsx                # Landing Page interactiva con simulador de márgenes y lead capture
│   │   └── app/                    # Portal SaaS / Dashboard de Aplicación
│   │       ├── layout.tsx          # Layout del Dashboard con Sidebar sticky y selector de proyectos
│   │       ├── page.tsx            # Visión General / Resumen de Proyecto & KPIs
│   │       ├── presupuestos/       # Estudios, Capítulos jerárquicos, Partidas, Descompuestos y BC3
│   │       ├── planificacion/      # Planificador de Obras Gantt interactivo y Ruta Crítica
│   │       ├── ejecucion/          # Partes de mano de obra, Certificaciones (5% retención), Subcontratas y Maquinaria
│   │       ├── compras/            # Explosión de recursos, Comparativas de ofertas y Multi-Almacén
│   │       ├── economico/          # Matriz de 3 Ejes (PV/AC/EV), Curva S y Analítica EVM (CPI/SPI)
│   │       ├── facturacion/        # Facturación, Inspector de Hash Veri*Factu y Calendario de Tesorería
│   │       └── api-docs/           # Documentación OpenAPI REST y conectores ERP
│   ├── components/
│   │   ├── landing/                # Navbar, Hero, ModulesGrid, RoleSelector, InteractiveDemo, VeriFactuBadge, DemoModal, Footer
│   │   └── dashboard/              # Sidebar, Topbar, SCurveChart, GanttPreview, BC3ImportModal
│   └── lib/
│       ├── types.ts                # Modelos de dominio tipados para ERP de construcción
│       ├── mockData.ts             # Datos reales simulados (Edificio Castellana, Sede Norte, Parque Logístico A-2)
│       └── utils.ts                # Formateadores de moneda (€), porcentajes y funciones auxiliares
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

© 2025 **Vacheron Projects Inc.** Todos los derechos reservados.
