'use client';

import React, { useState } from 'react';
import { 
  HardHat, 
  TrendingUp, 
  Building2, 
  Paintbrush, 
  Landmark, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';
import Link from 'next/link';

interface RoleProfile {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  headline: string;
  description: string;
  dailyBenefits: string[];
  keyKPI: string;
  kpiLabel: string;
}

const roleProfiles: RoleProfile[] = [
  {
    id: 'jefe-obra',
    name: 'Jefe de Obra & Encargado',
    badge: 'A Pie de Obra',
    icon: HardHat,
    headline: 'Elimina el papeleo y reporta avances y partes diarios en 2 minutos',
    description: 'Diseñado específicamente para ser utilizado desde tablets o móviles en el tajo. Registra mediciones reales, valida albaranes de entrega de materiales e imputa horas de operarios y subcontratistas al instante.',
    dailyBenefits: [
      'Imputación de partes de trabajo y cuadrillas por partida de presupuesto',
      'Recepción y firma digital de albaranes de entrega de hormigón y materiales',
      'Mediciones fotográficas y registro de unidades ejecutadas en tiempo real',
      'Consulta del cronograma Gantt y alertas de hitos críticos desde el móvil'
    ],
    keyKPI: '100%',
    kpiLabel: 'Sincronización directa campo-oficina sin duplicar datos'
  },
  {
    id: 'controller',
    name: 'Controller de Costes & Finanzas',
    badge: 'Control Económico',
    icon: TrendingUp,
    headline: 'Detección inmediata de desviaciones antes de que erosionen tu margen',
    description: 'Controla en una única matriz a 3 ejes: lo que presupuestaste (PV), lo que realmente has gastado (AC) y lo que tienes certificado y cobrado al cliente (EV). Conoce el margen exacto de cada obra.',
    dailyBenefits: [
      'Matriz a 3 ejes en tiempo real con cálculo automático de márgenes',
      'Indicadores de Valor Ganado (CPI / SPI) y Curvas S comparativas',
      'Alerta temprana de partidas con sobrecostes en mano de obra o materiales',
      'Previsión de cierre económico a fin de obra (Estimate at Completion)'
    ],
    keyKPI: '+15.4%',
    kpiLabel: 'Aumento del margen neto promedio en empresas usuarias'
  },
  {
    id: 'direccion',
    name: 'Dirección General & Promotora',
    badge: 'Visión Estratégica',
    icon: Building2,
    headline: 'Visión 360º de toda tu cartera de obras en un único panel ejecutivo',
    description: 'Accede a informes consolidados en tiempo real del estado de cada proyecto: tesorería, previsiones de cobro, certificaciones pendientes y riesgos operativos sin tener que esperar al cierre de mes.',
    dailyBenefits: [
      'Cuadro de mando integral con el estado de todas las obras activas',
      'Previsión de liquidez y calendario de cobros y pagos unificado',
      'Informes automáticos en PDF para inversores y entidades financieras',
      'Toma de decisiones respaldada por datos fiables e inalterables'
    ],
    keyKPI: '360º',
    kpiLabel: 'Visibilidad ejecutiva de flujo de caja y rentabilidad'
  },
  {
    id: 'reformas',
    name: 'Empresas de Reformas',
    badge: 'Agilidad & Margen',
    icon: Paintbrush,
    headline: 'Presupuestos rápidos y control estricto de compras y liquidaciones',
    description: 'Elabora presupuestos atractivos y detallados en cuestión de minutos, controla las compras de azulejos, carpintería e instalaciones, y factura por fases asegurando el cobro antes de la entrega.',
    dailyBenefits: [
      'Creación rápida de presupuestos con bancos de precios prediseñados',
      'Control de gastos adicionales y extras solicitados por el cliente',
      'Liquidación transparente de autónomos e instaladores por tarea',
      'Facturación progresiva y aviso automático de vencimientos'
    ],
    keyKPI: '3x',
    kpiLabel: 'Velocidad en la entrega de presupuestos a clientes'
  },
  {
    id: 'obra-civil',
    name: 'Edificación & Obra Civil',
    badge: 'Gran Envergadura',
    icon: Landmark,
    headline: 'Gestión robusta de grandes volúmenes, subcontratas y maquinaria pesada',
    description: 'Gestiona estructuras complejas con miles de partidas descompuestas, control riguroso de subcontratas con retenciones de garantía, y control de costes de maquinaria propia y alquilada.',
    dailyBenefits: [
      'Importación masiva y exportación de archivos BC3 / FIEBDC',
      'Gestión exhaustiva de contratos marco y retenciones de garantía',
      'Control horario y de combustible de retroexcavadoras, grúas y dumpers',
      'Certificaciones complejas a origen con cuadro de precios contradictorios'
    ],
    keyKPI: 'BC3 Full',
    kpiLabel: 'Compatibilidad estándar FIEBDC-3 para licitaciones'
  }
];

export const RoleSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('jefe-obra');
  const currentProfile = roleProfiles.find(p => p.id === activeTab) || roleProfiles[0];

  return (
    <section id="roles" className="py-24 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>ADAPTADO A CADA PERFIL Y ESCALA DE PROYECTO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Una Solución a Medida para Cada <span className="gradient-text-amber">Profesional del Sector</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Descubre cómo Vacheron Projects resuelve los retos cotidianos desde el operario a pie de obra hasta la dirección financiera.
          </p>
        </div>

        {/* Roles Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {roleProfiles.map((p) => {
            const Icon = p.icon;
            const isSelected = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Role Deep Dive */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-amber-400 border border-amber-500/20">
                  {currentProfile.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                  {currentProfile.headline}
                </h3>
                <p className="text-base text-slate-300 mt-3 leading-relaxed">
                  {currentProfile.description}
                </p>
              </div>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentProfile.dailyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 group"
                >
                  <span>Explorar el panel adaptado a {currentProfile.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Highlight Metric Box */}
            <div className="lg:col-span-4">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-center relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
                  <currentProfile.icon className="w-7 h-7" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                  {currentProfile.keyKPI}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-3">
                  {currentProfile.kpiLabel}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
