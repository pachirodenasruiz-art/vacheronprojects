'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  TrendingUp, 
  CalendarRange, 
  HardHat, 
  Truck, 
  FileCheck2, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet,
  PieChart
} from 'lucide-react';
import { mockProjects, mockThreeAxisData, mockGanttTasks } from '@/lib/mockData';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { SCurveChart } from '@/components/dashboard/SCurveChart';
import { GanttPreview } from '@/components/dashboard/GanttPreview';

export default function DashboardOverviewPage() {
  const project = mockProjects[0]; // Active project
  const grossMargin = project.certifiedAmount - project.actualCost;
  const marginPercentage = (grossMargin / project.certifiedAmount) * 100;

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Project Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {project.code}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              En Ejecución Activa
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Cliente: <strong className="text-slate-200">{project.client}</strong> • Responsable: <strong className="text-slate-200">{project.manager}</strong>
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Avance Físico</div>
            <div className="text-xl font-mono font-extrabold text-white mt-0.5">{project.progressPercentage}%</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Índice Coste (CPI)</div>
            <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">{project.cpi}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Índice Plazo (SPI)</div>
            <div className="text-xl font-mono font-extrabold text-blue-400 mt-0.5">{project.spi}</div>
          </div>
        </div>
      </div>

      {/* 4 Main Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Presupuesto Total */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Presupuesto Contratado</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {formatCurrency(project.targetContractValue)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Coste Previsto (PV):</span>
            <span className="font-mono text-slate-200">{formatCurrency(project.plannedBudget)}</span>
          </div>
        </div>

        {/* Coste Real Acumulado */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Coste Real Incurrido (AC)</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">
            {formatCurrency(project.actualCost)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Desvío sobre previsto:</span>
            <span className="font-mono text-emerald-400 font-semibold">-4.2% (Ahorro)</span>
          </div>
        </div>

        {/* Total Certificado a Origen */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Certificado a Origen (EV)</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">
            {formatCurrency(project.certifiedAmount)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Facturado a Cliente:</span>
            <span className="font-mono text-slate-200">{formatCurrency(project.invoicedAmount)}</span>
          </div>
        </div>

        {/* Margen Bruto Real Devengado */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Margen Real Devengado</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            +{formatCurrency(grossMargin)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Margen sobre venta:</span>
            <span className="font-mono text-emerald-400 font-bold">{marginPercentage.toFixed(1)}%</span>
          </div>
        </div>

      </div>

      {/* S-Curve Chart (EVM 3-Axes) */}
      <SCurveChart data={mockThreeAxisData} />

      {/* Interactive Gantt Timeline */}
      <GanttPreview tasks={mockGanttTasks} />

      {/* Quick Access to the 5 Core Functional Modules */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Acceso Directo a Módulos de Gestión
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <Link
            href="/app/presupuestos"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
              Estudios & BC3
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Árbol de capítulos, descompuestos y exportación FIEBDC.
            </p>
          </Link>

          <Link
            href="/app/planificacion"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <CalendarRange className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
              Planificador Gantt
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Cronograma de tareas, dependencias e hitos críticos.
            </p>
          </Link>

          <Link
            href="/app/ejecucion"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <HardHat className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
              Ejecución & Campo
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Partes diarios de operarios, subcontratas y maquinaria.
            </p>
          </Link>

          <Link
            href="/app/compras"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
              Compras & Stock
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Explosión de recursos, comparativas y albaranes.
            </p>
          </Link>

          <Link
            href="/app/facturacion"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all space-y-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
              Facturas & Veri*Factu
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              Certificaciones, encadenamiento AEAT y cobros.
            </p>
          </Link>

        </div>
      </div>

    </div>
  );
}
