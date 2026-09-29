'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  HardHat, 
  Truck, 
  TrendingUp, 
  FileCheck2, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers,
  Calendar,
  DollarSign,
  Boxes,
  PieChart,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ModuleItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  accentColor: string;
  appRoute: string;
  features: string[];
  metricsPreview: {
    label: string;
    value: string;
    sublabel: string;
  };
  details: string;
}

const modulesData: ModuleItem[] = [
  {
    id: 'estudios',
    code: 'MOD-01',
    title: 'Estudios, Presupuestos y Planificación',
    tagline: 'Estructura jerárquica de costes y cronograma Gantt dinámico.',
    icon: Calculator,
    accentColor: 'from-amber-500 to-amber-700',
    appRoute: '/app/presupuestos',
    features: [
      'Árbol multinivel: Capítulos, Subcapítulos, Partidas y Unidades de Obra',
      'Descompuestos analíticos (Materiales, Mano de Obra, Maquinaria, Subcontratas)',
      'Importación / Exportación estándar FIEBDC-3 / BC3 y Excel bidireccional',
      'Planificador Gantt interactivo con ruta crítica y dependencias fin-inicio',
      'Bases de precios centralizadas y vinculación con bancos paramétricos'
    ],
    metricsPreview: {
      label: 'Precisión Presupuestaria',
      value: '99.4%',
      sublabel: 'Sin fugas de descompuestos'
    },
    details: 'Calcula con exactitud milimétrica el coste directo e indirecto de cada partida antes de licitar o iniciar la obra.'
  },
  {
    id: 'ejecucion',
    code: 'MOD-02',
    title: 'Ejecución y Seguimiento a Pie de Obra',
    tagline: 'Mediciones reales en campo, partes de operarios y certificaciones.',
    icon: HardHat,
    accentColor: 'from-blue-500 to-indigo-700',
    appRoute: '/app/ejecucion',
    features: [
      'Medición de obra ejecutada en tiempo real desde tablet o móvil en campo',
      'Certificaciones periódicas a origen por porcentaje o medición con retenciones',
      'Partes de trabajo diarios por cuadrilla, categoría y vinculación a partida',
      'Control de subcontratistas: contratos marco, avances aprobados y liquidaciones',
      'Gestión de maquinaria: horas de uso, amortizaciones, alquileres y combustible'
    ],
    metricsPreview: {
      label: 'Tiempo Registro Campo',
      value: '< 2 min',
      sublabel: 'Por parte diario de cuadrilla'
    },
    details: 'Digitaliza el flujo de información entre el jefe de obra en el tajo y la oficina técnica central.'
  },
  {
    id: 'compras',
    code: 'MOD-03',
    title: 'Compras, Almacén y Logística de Materiales',
    tagline: 'Explosión de necesidades, comparativas de ofertas y stock en obra.',
    icon: Truck,
    accentColor: 'from-emerald-500 to-teal-700',
    appRoute: '/app/compras',
    features: [
      'Explosión y cálculo automático de necesidades según planificación temporal',
      'Matriz comparativa de ofertas de proveedores con puntuación técnica/precio',
      'Ciclo completo: Solicitud de pedido → Orden de compra → Albarán de entrega',
      'Control multi-almacén: Almacenes centrales, acopios y traspasos entre obras',
      'Alertas de rotura de stock y validación de precios pactados en pedido'
    ],
    metricsPreview: {
      label: 'Ahorro Medio en Compras',
      value: '-8.5%',
      sublabel: 'Gracias a comparativas ágiles'
    },
    details: 'Garantiza que nunca falte material en obra evitando sobrecostes por compras urgentes descontroladas.'
  },
  {
    id: 'economico',
    code: 'MOD-04',
    title: 'Control Económico, Desviaciones y Analítica',
    tagline: 'Matriz a 3 ejes: Previsto vs. Coste Real vs. Certificado/Cobrado.',
    icon: TrendingUp,
    accentColor: 'from-amber-500 to-orange-700',
    appRoute: '/app/economico',
    features: [
      'Control de desviaciones a 3 ejes en tiempo real (PV, AC, EV / Curva S)',
      'Rentabilidad y margen bruto/neto recalculado automáticamente por obra y fase',
      'Cálculo de índices de Valor Ganado: CPI (Cost Performance) y SPI (Schedule)',
      'Previsión de cierre a fin de obra (EAC - Estimate at Completion)',
      'Informes ejecutivos automáticos en PDF y dashboards interactivos'
    ],
    metricsPreview: {
      label: 'Visibilidad de Margen',
      value: '100% Real',
      sublabel: 'Actualizado al segundo'
    },
    details: 'Detecta desviaciones económicas antes de que consuman el margen de la constructora o promotora.'
  },
  {
    id: 'facturacion',
    code: 'MOD-05',
    title: 'Administración, Facturación & Veri*Factu',
    tagline: 'Facturación vinculada a certificaciones y cumplimiento fiscal AEAT.',
    icon: FileCheck2,
    accentColor: 'from-purple-500 to-indigo-800',
    appRoute: '/app/facturacion',
    features: [
      'Generación automática de facturas a partir de certificaciones de obra aprobadas',
      'Módulo homologado Veri*Factu: Encadenamiento criptográfico (Hash) y códigos QR',
      'Control de facturas de proveedores casadas contra albaranes de entrega reales',
      'Calendario de tesorería: Previsión dinámica de cobros, pagos y vencimientos',
      'Capa de API REST abierta (OpenAPI) para sincronización con ERPs contables'
    ],
    metricsPreview: {
      label: 'Cumplimiento AEAT',
      value: 'Ley Antifraude',
      sublabel: 'Homologado Veri*Factu'
    },
    details: 'Emisión rigurosa, encadenamiento inalterable de registros y exportaciones directas para contabilidad.'
  }
];

export const ModulesGrid: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('estudios');
  const activeModule = modulesData.find(m => m.id === selectedModule) || modulesData[0];

  return (
    <section id="modulos" className="py-24 bg-[#080d1a] relative border-t border-b border-slate-800/80">
      
      {/* Background Decor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
            <Boxes className="w-3.5 h-3.5" />
            <span>ARQUITECTURA DE MÓDULOS INTEGRADA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Los 5 Pilares de Control para una <span className="gradient-text-amber">Gestión de Obra Impecable</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Inspirado en los mejores estándares del sector de la construcción y potenciado con tecnología cloud reactiva de última generación.
          </p>
        </div>

        {/* Modules Grid Tabs Selector */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10">
          {modulesData.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedModule(item.id)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-850 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{item.code}</span>
                </div>
                <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {item.title.split(',')[0]}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Module Detailed Showcase Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description & Feature List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeModule.code}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Módulo Central
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {activeModule.title}
                </h3>
                <p className="text-base text-slate-300 mt-3 leading-relaxed">
                  {activeModule.details}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Funcionalidades Incluidas en Vacheron Projects:
                </h4>
                <div className="space-y-2.5">
                  {activeModule.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      </div>
                      <span className="text-sm text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button to try the module directly */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={activeModule.appRoute}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Abrir este módulo en la App</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
                <span className="text-xs text-slate-400">
                  Totalmente interactivo con datos de muestra reales
                </span>
              </div>
            </div>

            {/* Right Interactive Preview Widget */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                      <activeModule.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Indicador de Rendimiento</h4>
                      <p className="text-xs text-slate-400">Impacto operativo directo</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    Verificado
                  </span>
                </div>

                {/* Big Metric Box */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-medium">{activeModule.metricsPreview.label}</div>
                  <div className="text-4xl font-extrabold text-amber-400 mt-2 font-mono">{activeModule.metricsPreview.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{activeModule.metricsPreview.sublabel}</div>
                </div>

                {/* Mock Live Status Feed */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300">Compatibilidad de Formatos</span>
                    <span className="text-amber-400 font-mono font-bold">BC3, FIEBDC, Excel, PDF</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-300">Modo de Despliegue</span>
                    <span className="text-emerald-400 font-bold">Cloud SaaS Multiusuario</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
