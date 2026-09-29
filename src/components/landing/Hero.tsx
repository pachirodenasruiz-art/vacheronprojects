'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Building, 
  Calendar, 
  Layers, 
  Sparkles,
  BarChart2,
  FileSpreadsheet
} from 'lucide-react';

interface HeroProps {
  onOpenDemoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold backdrop-blur-md hover:border-amber-400/50 transition-all cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nueva Versión Vacheron Cloud 2025: Módulo Veri*Factu & Motor BC3 Integrado</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Control Total de Costes, Obra y Planificación en una{' '}
            <span className="gradient-text-amber">Única Plataforma Cloud</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            El ERP definitivo para constructoras, promotoras e ingenierías. Desde el estudio de presupuestos jerárquicos (BC3) y planificación Gantt, hasta el seguimiento a pie de obra, compras y el control de desviaciones a 3 ejes en tiempo real.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 transition-all"
            >
              <span>Entrar al Dashboard SaaS</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700/80 hover:border-slate-600 flex items-center justify-center gap-3 transition-all backdrop-blur-md"
            >
              <span>Solicitar Demostración Guiada</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Key Value Highlights */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sin instalaciones, 100% Cloud Web & Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Compatibilidad nativa con archivos BC3 / FIEBDC</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Garantía de cumplimiento Ley Antifraude / Veri*Factu</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Preview Showcase */}
        <div className="mt-16 relative">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
            
            {/* Mock Header Window */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/70 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-slate-400 font-mono">vacheronprojects.cloud/app/proyecto/PRJ-2025-01</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[11px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Obra Activa • 58.5% Ejecución
                </span>
              </div>
            </div>

            {/* Mock Dashboard Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/40 rounded-b-xl">
              
              {/* Left KPI Highlights */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Presupuesto Contratado</span>
                    <Building className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mt-1">4.620.000 €</div>
                  <div className="text-[11px] text-slate-400 mt-1">Edificio Residencial Castellana Skyline</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Certificado vs Coste Real</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-emerald-400">2.380.000 €</span>
                    <span className="text-xs text-slate-400">/ 2.140.000 € coste</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-semibold">+240.000 € Margen Bruto (+11.2%)</span>
                    <span className="text-slate-400 font-mono">CPI: 1.11</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Registro Veri*Factu Encadenado</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    Última certificación #6 sellada criptográficamente con código QR reglamentario de la AEAT.
                  </p>
                </div>
              </div>

              {/* Right Gantt & Partidas Spreadsheet Mock */}
              <div className="lg:col-span-8 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Cronograma & Desglose de Partidas</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Gantt Dinámico</span>
                  </div>

                  {/* Micro Partidas Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2 font-medium">Cód.</th>
                          <th className="pb-2 font-medium">Unidad de Obra</th>
                          <th className="pb-2 font-medium text-right">Presupuestado</th>
                          <th className="pb-2 font-medium text-right">Ejecutado</th>
                          <th className="pb-2 font-medium text-center">Avance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                        <tr>
                          <td className="py-2.5 text-amber-400 font-semibold">02.01</td>
                          <td className="py-2.5 font-sans text-slate-200">Losa de cimentación e=80cm hormigón HA-30</td>
                          <td className="py-2.5 text-right text-slate-300">388.500 €</td>
                          <td className="py-2.5 text-right text-emerald-400">373.700 €</td>
                          <td className="py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-sans font-bold">100%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-amber-400 font-semibold">03.02</td>
                          <td className="py-2.5 font-sans text-slate-200">Forjado reticular casetón recuperable 30+5</td>
                          <td className="py-2.5 text-right text-slate-300">873.200 €</td>
                          <td className="py-2.5 text-right text-amber-400">820.050 €</td>
                          <td className="py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-sans font-bold">95.9%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-amber-400 font-semibold">04.01</td>
                          <td className="py-2.5 font-sans text-slate-200">Fachada ventilada porcelánica gran formato</td>
                          <td className="py-2.5 text-right text-slate-300">546.000 €</td>
                          <td className="py-2.5 text-right text-blue-400">272.600 €</td>
                          <td className="py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 font-sans font-bold">51.8%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Micro Gantt Visual Progress Bars */}
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Cimentación y Estructura</span>
                      <span className="text-emerald-400 font-bold">Completado</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '100%' }} />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Envolventes, Fachadas y Climatización</span>
                      <span className="text-amber-400 font-bold">En curso (Fase Crítica)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: '58.5%' }} />
                    </div>
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
