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
  PieChart,
  Edit3,
  Plus
} from 'lucide-react';
import { mockThreeAxisData, mockGanttTasks } from '@/lib/mockData';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { SCurveChart } from '@/components/dashboard/SCurveChart';
import { GanttPreview } from '@/components/dashboard/GanttPreview';
import { useProjects } from '@/context/ProjectContext';

export default function DashboardOverviewPage() {
  const { currentProject: project, setIsEditModalOpen, setIsCreateModalOpen } = useProjects();
  
  const grossMargin = project.certifiedAmount - project.actualCost;
  const marginPercentage = project.certifiedAmount > 0 ? (grossMargin / project.certifiedAmount) * 100 : 0;

  // Scale 3-axis points to current project's budget
  const dynamicThreeAxisData = mockThreeAxisData.map((d, i) => {
    const ratio = project.plannedBudget / 3850000;
    return {
      period: d.period,
      pv: Math.round(d.pv * ratio),
      ac: Math.round(d.ac * ratio * (project.actualCost / (2140000 * ratio || 1))),
      ev: Math.round(d.ev * ratio * (project.certifiedAmount / (2380000 * ratio || 1))),
    };
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Project Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Subtle decorative emerald accent border on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800" />

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-brand-50 text-brand-800 border border-brand-200">
              {project.code}
            </span>
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
              project.status === 'en_curso' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              {project.status === 'en_curso' ? 'En Ejecución Activa' : project.status.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-brand-800">{project.type}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {project.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            Cliente: <strong className="text-slate-800">{project.client}</strong> • Ubicación: <strong className="text-slate-800">{project.location}</strong> • Responsable: <strong className="text-brand-800">{project.manager}</strong>
          </p>
        </div>

        {/* Live Status Pill & Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-inner">
            <div className="text-center px-2">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Avance Físico</div>
              <div className="text-xl font-mono font-extrabold text-slate-900 mt-0.5">{project.progressPercentage}%</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Índice Coste (CPI)</div>
              <div className="text-xl font-mono font-extrabold text-emerald-700 mt-0.5">{project.cpi}</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] text-slate-500 uppercase font-bold">Índice Plazo (SPI)</div>
              <div className="text-xl font-mono font-extrabold text-blue-700 mt-0.5">{project.spi}</div>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-xs font-bold text-brand-800 transition-all shadow-sm"
              title="Modificar los datos, presupuesto y venta de esta obra"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Datos</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold transition-all shadow-md shadow-brand-700/20"
              title="Crear un nuevo proyecto propio"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Nueva Obra</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4 Main Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Presupuesto Total */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Venta Contratada al Cliente</span>
            <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {formatCurrency(project.targetContractValue)}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Coste Previsto (PV):</span>
            <span className="font-mono font-bold text-slate-700">{formatCurrency(project.plannedBudget)}</span>
          </div>
        </div>

        {/* Coste Real Acumulado */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Coste Real Incurrido (AC)</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 font-mono">
            {formatCurrency(project.actualCost)}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Gasto Acumulado:</span>
            <span className="font-mono text-slate-700 font-bold">
              {project.plannedBudget > 0 ? ((project.actualCost / project.plannedBudget) * 100).toFixed(1) : 0}% del coste
            </span>
          </div>
        </div>

        {/* Total Certificado a Origen */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Certificado a Origen (EV)</span>
            <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-brand-800 font-mono">
            {formatCurrency(project.certifiedAmount)}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Facturado a Cliente:</span>
            <span className="font-mono font-bold text-slate-700">{formatCurrency(project.invoicedAmount)}</span>
          </div>
        </div>

        {/* Margen Bruto Real Devengado */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Margen Real Devengado</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-extrabold font-mono ${grossMargin >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {grossMargin >= 0 ? `+${formatCurrency(grossMargin)}` : formatCurrency(grossMargin)}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Margen sobre certificado:</span>
            <span className={`font-mono font-bold ${grossMargin >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {marginPercentage.toFixed(1)}%
            </span>
          </div>
        </div>

      </div>

      {/* S-Curve Chart (EVM 3-Axes) */}
      <SCurveChart data={dynamicThreeAxisData} />

      {/* Interactive Gantt Timeline */}
      <GanttPreview tasks={mockGanttTasks} />

      {/* Quick Access to the 5 Core Functional Modules */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Acceso Directo a Módulos de Gestión
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <Link
            href="/presupuestos"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500/60 hover:shadow-card-hover transition-all space-y-2 group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
              Estudios & BC3
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Árbol de capítulos, descompuestos y exportación FIEBDC.
            </p>
          </Link>

          <Link
            href="/planificacion"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500/60 hover:shadow-card-hover transition-all space-y-2 group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CalendarRange className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
              Planificador Gantt
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Cronograma de tareas, dependencias e hitos críticos.
            </p>
          </Link>

          <Link
            href="/ejecucion"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500/60 hover:shadow-card-hover transition-all space-y-2 group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <HardHat className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
              Ejecución & Campo
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Partes diarios de operarios, subcontratas y maquinaria.
            </p>
          </Link>

          <Link
            href="/compras"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500/60 hover:shadow-card-hover transition-all space-y-2 group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
              Compras & Stock
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Explosión de recursos, comparativas y albaranes.
            </p>
          </Link>

          <Link
            href="/facturacion"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500/60 hover:shadow-card-hover transition-all space-y-2 group shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
              Facturas & Veri*Factu
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              Certificaciones, encadenamiento AEAT y cobros.
            </p>
          </Link>

        </div>
      </div>

    </div>
  );
}
