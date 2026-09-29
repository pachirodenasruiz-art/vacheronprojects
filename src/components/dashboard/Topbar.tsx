'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  Search, 
  Bell, 
  Plus, 
  FileUp, 
  Download, 
  CheckCircle2, 
  Edit3, 
  Sparkles,
  FolderPlus
} from 'lucide-react';
import { Project } from '@/lib/types';
import { useProjects } from '@/context/ProjectContext';

interface TopbarProps {
  currentProject: Project;
  onSelectProject: (p: Project) => void;
  onOpenBC3Modal?: () => void;
  onOpenEditModal?: () => void;
  onOpenCreateModal?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentProject,
  onSelectProject,
  onOpenBC3Modal,
  onOpenEditModal,
  onOpenCreateModal,
}) => {
  const { projects } = useProjects();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      
      {/* Left Project Switcher & Editor Button */}
      <div className="flex items-center gap-3">
        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-500/50 hover:bg-brand-50/40 transition-all text-left shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 border border-brand-200 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4 text-brand-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                {currentProject.name}
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {currentProject.code} • {currentProject.type}
              </span>
            </div>
          </button>

          {/* Projects Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-84 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Cartera de Obras ({projects.length})
                </span>
                {onOpenCreateModal && (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenCreateModal();
                    }}
                    className="text-[11px] text-brand-700 hover:text-brand-800 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Nueva Obra</span>
                  </button>
                )}
              </div>

              <div className="space-y-1 mt-1 max-h-64 overflow-y-auto">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between ${
                      proj.id === currentProject.id
                        ? 'bg-brand-50 border border-brand-200 text-brand-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{proj.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{proj.code} • {proj.client}</div>
                    </div>
                    {proj.id === currentProject.id && (
                      <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>

              {onOpenCreateModal && (
                <div className="pt-2 mt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenCreateModal();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-brand-200"
                  >
                    <FolderPlus className="w-3.5 h-3.5 text-brand-700" />
                    <span>+ Añadir Mi Propio Proyecto</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Edit Project Button */}
        {onOpenEditModal && (
          <button
            onClick={onOpenEditModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-brand-800 hover:border-brand-300 transition-all shadow-sm"
            title="Editar datos de la obra activa"
          >
            <Edit3 className="w-3.5 h-3.5 text-brand-700" />
            <span className="hidden md:inline">Editar Obra</span>
          </button>
        )}

        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Avance: <strong className="text-slate-900">{currentProject.progressPercentage}%</strong></span>
        </div>
      </div>

      {/* Right Controls: Actions, Notifications & User */}
      <div className="flex items-center gap-3">
        
        {/* Quick Action: Import BC3 / FIEBDC */}
        {onOpenBC3Modal && (
          <button
            onClick={onOpenBC3Modal}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100/80 border border-brand-200/80 text-xs font-bold text-brand-800 transition-colors shadow-sm"
          >
            <FileUp className="w-3.5 h-3.5 text-brand-700" />
            <span>Importar BC3</span>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative shadow-sm"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-50 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
                <span>Notificaciones de Obra</span>
                <span className="text-[10px] text-brand-700 font-semibold">3 nuevas</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                  <div className="font-semibold text-emerald-800 text-[11px]">Certificación #6 Generada</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">320.000 € listos para firma y sellado Veri*Factu.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
                  <div className="font-semibold text-amber-800 text-[11px]">Alerta de Stock (Mortero cola)</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">Quedan 85 sacos en el Almacén Central.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/70">
                  <div className="font-semibold text-blue-800 text-[11px]">Avance Forjado 6ª Planta</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">Parte de encofrado y hormigonado registrado.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            MR
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-tight">Miguel Ángel Rodenas</span>
            <span className="text-[10px] text-brand-800 font-semibold">Construction Manager</span>
          </div>
        </div>

      </div>

    </header>
  );
};
