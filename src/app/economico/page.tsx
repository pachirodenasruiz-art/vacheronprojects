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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-50 text-brand-800 border border-brand-200">
              MÓDULO D - CONTROL ECONÓMICO
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Control de Desviaciones a 3 Ejes & Analítica EVM
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Matriz comparativa de Presupuesto Previsto (PV), Coste Real Ejecutado (AC) y Valor Certificado (EV) con cálculo de Valor Ganado.
          </p>
        </div>

        <button
          onClick={() => alert('Exportando Informe Económico Ejecutivo en PDF para la Dirección...')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-brand-700" />
          <span>Exportar Informe Económico PDF</span>
        </button>
      </div>

      {/* EVM Key Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CPI */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Rendimiento de Costes (CPI)</span>
            <span className="text-[10px] font-mono font-bold text-slate-400">EV / AC</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono flex items-center gap-2">
            <span>{cpi.toFixed(2)}</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-[11px] text-slate-500">
            Por cada 1,00 € invertido, se han certificado <strong className="text-slate-900">{cpi.toFixed(2)} €</strong>.
          </p>
        </div>

        {/* SPI */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Rendimiento de Plazo (SPI)</span>
            <span className="text-[10px] font-mono font-bold text-slate-400">EV / PV</span>
          </div>
          <div className="text-3xl font-extrabold text-blue-700 font-mono flex items-center gap-2">
            <span>{spi.toFixed(2)}</span>
            <ArrowUpRight className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-[11px] text-slate-500">
            Ritmo de ejecución <strong className="text-slate-900">ligeramente adelantado</strong> al calendario.
          </p>
        </div>

        {/* Desviación Neta Costes */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Desviación en Costes (CV)</span>
            <span className="text-[10px] font-mono font-bold text-slate-400">EV - AC</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono">
            +{formatCurrency(costVariance)}
          </div>
          <p className="text-[11px] text-slate-500">
            Margen neto directo devengado a favor de la constructora.
          </p>
        </div>

        {/* Previsión a Fin de Obra EAC */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Estimación a Cierre (EAC)</span>
            <span className="text-[10px] font-mono font-bold text-slate-400">BAC / CPI</span>
          </div>
          <div className="text-2xl font-extrabold text-brand-900 font-mono">
            {formatCurrency(eac)}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            Ahorro proyectado de +{formatCurrency(vac)}
          </p>
        </div>

      </div>

      {/* S-Curve Graph */}
      <SCurveChart data={mockThreeAxisData} />

      {/* 3-Axes Chapter Matrix Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Matriz Analítica de 3 Ejes por Capítulo de Obra
          </span>
          <span className="text-xs text-slate-500 font-mono">Cifras en Euros (€)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-sans">
                <th className="p-4 font-semibold">Capítulo de Obra</th>
                <th className="p-4 text-right font-semibold">1. Previsto (PV)</th>
                <th className="p-4 text-right font-semibold">2. Real Gastado (AC)</th>
                <th className="p-4 text-right font-semibold">3. Certificado (EV)</th>
                <th className="p-4 text-right font-semibold">Desvío (€)</th>
                <th className="p-4 text-right font-semibold">Margen (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockChapters.map((ch) => {
                const diff = ch.certifiedTotal - ch.realTotalCost;
                const margin = ch.certifiedTotal > 0 ? (diff / ch.certifiedTotal) * 100 : 0;
                return (
                  <tr key={ch.id} className="hover:bg-slate-50/60 text-slate-700">
                    <td className="p-4 font-sans font-bold text-slate-900">
                      {ch.name}
                    </td>
                    <td className="p-4 text-right text-slate-600">
                      {formatCurrency(ch.plannedTotal)}
                    </td>
                    <td className="p-4 text-right text-rose-600 font-semibold">
                      {formatCurrency(ch.realTotalCost)}
                    </td>
                    <td className="p-4 text-right text-brand-800 font-semibold">
                      {formatCurrency(ch.certifiedTotal)}
                    </td>
                    <td className="p-4 text-right text-emerald-700 font-bold">
                      +{formatCurrency(diff)}
                    </td>
                    <td className="p-4 text-right text-emerald-700 font-bold">
                      {margin.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900 text-xs">
                <td className="p-4 font-sans">TOTALES CONSOLIDADOS</td>
                <td className="p-4 text-right text-slate-700">{formatCurrency(totalPV)}</td>
                <td className="p-4 text-right text-rose-600">{formatCurrency(totalAC)}</td>
                <td className="p-4 text-right text-brand-800">{formatCurrency(totalEV)}</td>
                <td className="p-4 text-right text-emerald-700 font-mono">+{formatCurrency(costVariance)}</td>
                <td className="p-4 text-right text-emerald-700 font-mono">
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
