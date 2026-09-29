'use client';

import React, { useState } from 'react';
import { 
  CalendarRange, 
  Clock, 
  Users, 
  Flame, 
  CheckCircle2, 
  Plus, 
  AlertCircle,
  Calendar,
  Layers
} from 'lucide-react';
import { mockGanttTasks } from '@/lib/mockData';
import { GanttPreview } from '@/components/dashboard/GanttPreview';

export default function PlanificacionPage() {
  const [tasks, setTasks] = useState(mockGanttTasks);
  const [viewMode, setViewMode] = useState<'meses' | 'semanas'>('meses');

  const completedTasks = tasks.filter(t => t.status === 'completada').length;
  const criticalTasks = tasks.filter(t => t.isCritical).length;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300">
              MÓDULO B - CRONOGRAMA
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Planificador de Obras & Diagrama Gantt
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gestión temporal del proyecto, dependencias fin-inicio, asignación de cuadrillas y control de ruta crítica.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('meses')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'meses' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vista Mensual
            </button>
            <button
              onClick={() => setViewMode('semanas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'semanas' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vista Semanal
            </button>
          </div>

          <button
            onClick={() => alert('Modal para añadir una nueva tarea o hito al cronograma.')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nuevo Hito / Tarea</span>
          </button>
        </div>
      </div>

      {/* KPI Timeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Total Tareas de Obra</div>
          <div className="text-2xl font-bold text-white mt-1 font-mono">{tasks.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Hitos Completados</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{completedTasks} / {tasks.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Tareas en Ruta Crítica</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 font-mono">{criticalTasks}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Fecha Estimada de Entrega</div>
          <div className="text-lg font-bold text-amber-400 mt-1 font-mono">30 Mar 2026</div>
        </div>
      </div>

      {/* Interactive Gantt Component */}
      <GanttPreview tasks={tasks} />

      {/* Resource Allocation & Squads Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <span>Cuadrillas y Recursos Activos Asignados al Cronograma</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Equipo Forjados & Estructura</span>
              <span className="text-emerald-400 font-mono">92% Avance</span>
            </div>
            <p className="text-[11px] text-slate-400">8 oficiales encofradores y ferrallistas + Grúa Torre 1</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Fachadas Técnicas Iberia</span>
              <span className="text-amber-400 font-mono">52% Avance</span>
            </div>
            <p className="text-[11px] text-slate-400">Montaje de subestructura y placas cerámicas exteriores</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-white">
              <span>ClimaSmart Proyectos</span>
              <span className="text-blue-400 font-mono">35% Avance</span>
            </div>
            <p className="text-[11px] text-slate-400">Instalaciones de suelo radiante y redes de aerotermia</p>
          </div>
        </div>
      </div>

    </div>
  );
}
