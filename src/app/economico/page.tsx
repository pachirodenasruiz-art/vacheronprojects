'use client';

import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  PieChart, 
  Download, 
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { mockChapters, mockThreeAxisData, mockProjects } from '@/lib/mockData';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { SCurveChart } from '@/components/dashboard/SCurveChart';

export default function EconomicoPage() {
  const project = mockProjects[0];

  // Totals
  const totalPV = mockChapters.reduce((acc, c) => acc + c.plannedTotal, 0);
  const totalAC = mockChapters.reduce((acc, c) => acc + c.realTotalCost, 0);
  const totalEV = mockChapters.reduce((acc, c) => acc + c.certifiedTotal, 0);
  
  const costVariance = totalEV - totalAC; // Positive is good (earned more than spent)
  const scheduleVariance = totalEV - totalPV; // Positive is ahead of schedule
  const cpi = totalAC > 0 ? (totalEV / totalAC) : 1;
  const spi = totalPV > 0 ? (totalEV / totalPV) : 1;

  // Forecast at completion (EAC)
  const eac = project.plannedBudget / cpi;
  const vac = project.plannedBudget - eac; // Savings at completion

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
              MÓDULO D - CONTROL ECONÓMICO
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Control de Desviaciones a 3 Ejes & Analítica EVM
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Matriz comparativa de Presupuesto Previsto (PV), Coste Real Ejecutado (AC) y Valor Certificado (EV) con cálculo de Valor Ganado.
          </p>
        </div>

        <button
          onClick={() => alert('Exportando Informe Económico Ejecutivo en PDF para la Dirección...')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span>Exportar Informe Económico PDF</span>
        </button>
      </div>

      {/* EVM Key Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CPI */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Rendimiento de Costes (CPI)</span>
            <span className="text-[10px] font-mono">EV / AC</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono flex items-center gap-2">
            <span>{cpi.toFixed(2)}</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            Por cada 1,00 € invertido, se han certificado <strong className="text-white">{cpi.toFixed(2)} €</strong>.
          </p>
        </div>

        {/* SPI */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Rendimiento de Plazo (SPI)</span>
            <span className="text-[10px] font-mono">EV / PV</span>
          </div>
          <div className="text-3xl font-extrabold text-blue-400 font-mono flex items-center gap-2">
            <span>{spi.toFixed(2)}</span>
            <ArrowUpRight className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            Ritmo de ejecución <strong className="text-white">ligeramente adelantado</strong> al calendario.
          </p>
        </div>

        {/* Desviación Neta Costes */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Desviación en Costes (CV)</span>
            <span className="text-[10px] font-mono">EV - AC</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            +{formatCurrency(costVariance)}
          </div>
          <p className="text-[11px] text-slate-400">
            Margen neto directo devengado a favor de la constructora.
          </p>
        </div>

        {/* Previsión a Fin de Obra EAC */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Estimación a Cierre (EAC)</span>
            <span className="text-[10px] font-mono">BAC / CPI</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono">
            {formatCurrency(eac)}
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">
            Ahorro proyectado de +{formatCurrency(vac)}
          </p>
        </div>

      </div>

      {/* S-Curve Graph */}
      <SCurveChart data={mockThreeAxisData} />

      {/* 3-Axes Chapter Matrix Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Matriz Analítica de 3 Ejes por Capítulo de Obra
          </span>
          <span className="text-xs text-slate-400 font-mono">Cifras en Euros (€)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-sans">
                <th className="p-4 font-semibold">Capítulo de Obra</th>
                <th className="p-4 text-right font-semibold">1. Previsto (PV)</th>
                <th className="p-4 text-right font-semibold">2. Real Gastado (AC)</th>
                <th className="p-4 text-right font-semibold">3. Certificado (EV)</th>
                <th className="p-4 text-right font-semibold">Desvío (€)</th>
                <th className="p-4 text-right font-semibold">Margen (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockChapters.map((ch) => {
                const diff = ch.certifiedTotal - ch.realTotalCost;
                const margin = ch.certifiedTotal > 0 ? (diff / ch.certifiedTotal) * 100 : 0;
                return (
                  <tr key={ch.id} className="hover:bg-slate-850/40 text-slate-300">
                    <td className="p-4 font-sans font-bold text-white">
                      {ch.name}
                    </td>
                    <td className="p-4 text-right text-slate-300">
                      {formatCurrency(ch.plannedTotal)}
                    </td>
                    <td className="p-4 text-right text-rose-400 font-semibold">
                      {formatCurrency(ch.realTotalCost)}
                    </td>
                    <td className="p-4 text-right text-amber-400 font-semibold">
                      {formatCurrency(ch.certifiedTotal)}
                    </td>
                    <td className="p-4 text-right text-emerald-400 font-bold">
                      +{formatCurrency(diff)}
                    </td>
                    <td className="p-4 text-right text-emerald-300 font-bold">
                      {margin.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-950 border-t-2 border-slate-800 font-bold text-white text-xs">
                <td className="p-4 font-sans">TOTALES CONSOLIDADOS</td>
                <td className="p-4 text-right text-slate-200">{formatCurrency(totalPV)}</td>
                <td className="p-4 text-right text-rose-400">{formatCurrency(totalAC)}</td>
                <td className="p-4 text-right text-amber-400">{formatCurrency(totalEV)}</td>
                <td className="p-4 text-right text-emerald-400 font-mono">+{formatCurrency(costVariance)}</td>
                <td className="p-4 text-right text-emerald-300 font-mono">
                  {((costVariance / totalEV) * 100).toFixed(1)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}
