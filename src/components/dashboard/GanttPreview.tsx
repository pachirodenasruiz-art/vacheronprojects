'use client';

import React, { useState } from 'react';
import { GanttTask } from '@/lib/types';
import { CalendarRange, AlertCircle, CheckCircle2, Users, Flame, Clock } from 'lucide-react';

interface GanttPreviewProps {
  tasks: GanttTask[];
  onUpdateTaskProgress?: (taskId: string, newProgress: number) => void;
}

export const GanttPreview: React.FC<GanttPreviewProps> = ({
  tasks,
  onUpdateTaskProgress,
}) => {
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [taskList, setTaskList] = useState<GanttTask[]>(tasks);

  const filteredTasks = showCriticalOnly 
    ? taskList.filter(t => t.isCritical) 
    : taskList;

  const handleProgressChange = (id: string, val: number) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, progress: val, status: val === 100 ? 'completada' : val > 0 ? 'en_curso' : 'no_iniciada' } : t));
    if (onUpdateTaskProgress) onUpdateTaskProgress(id, val);
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CalendarRange className="w-4 h-4 text-brand-700" />
            <span>Planificador de Obras & Cronograma Gantt</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Dependencias fin-inicio, asignación de cuadrillas y cálculo de Ruta Crítica (CPM)
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCriticalOnly(!showCriticalOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showCriticalOnly
                ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>Solo Ruta Crítica</span>
          </button>
        </div>
      </div>

      {/* Gantt Matrix Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] space-y-2.5">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 pb-1 border-b border-slate-100">
            <div className="col-span-1 font-mono">Cód.</div>
            <div className="col-span-4">Hito / Tarea de Obra</div>
            <div className="col-span-2">Recurso Asignado</div>
            <div className="col-span-1 text-center">Días</div>
            <div className="col-span-4">Línea Temporal & Avance</div>
          </div>

          {/* Task Rows */}
          {filteredTasks.map((task) => {
            return (
              <div 
                key={task.id}
                className="grid grid-cols-12 gap-2 items-center p-3 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/20 transition-all text-xs"
              >
                {/* Code */}
                <div className="col-span-1 font-mono font-bold text-brand-800">
                  {task.code}
                </div>

                {/* Name */}
                <div className="col-span-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{task.name}</span>
                    {task.isCritical && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Crítica
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {task.startDate} al {task.endDate}
                  </div>
                </div>

                {/* Assigned Resource */}
                <div className="col-span-2 text-[11px] text-slate-600 truncate flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{task.assignedResource}</span>
                </div>

                {/* Duration */}
                <div className="col-span-1 text-center font-mono text-slate-700 font-bold">
                  {task.durationDays}d
                </div>

                {/* Visual Gantt Bar & Slider */}
                <div className="col-span-4 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">
                      {task.status === 'completada' ? 'Finalizada' : `${task.progress}% completado`}
                    </span>
                    <span className="font-mono font-bold text-slate-800">{task.progress}%</span>
                  </div>

                  {/* Visual Bar with Track */}
                  <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden relative shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        task.status === 'completada'
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : task.isCritical
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                          : 'bg-gradient-to-r from-brand-600 to-brand-700'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>

                  {/* Interactive Slider */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={task.progress}
                    onChange={(e) => handleProgressChange(task.id, Number(e.target.value))}
                    className="w-full h-1 bg-transparent opacity-40 hover:opacity-100 transition-opacity cursor-pointer accent-brand-700"
                    title="Ajustar avance de tarea"
                  />
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};
