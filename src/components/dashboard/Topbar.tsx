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
  Sparkles,
  Layers
} from 'lucide-react';
import { mockProjects } from '@/lib/mockData';
import { Project } from '@/lib/types';

interface TopbarProps {
  currentProject: Project;
  onSelectProject: (p: Project) => void;
  onOpenBC3Modal?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentProject,
  onSelectProject,
  onOpenBC3Modal,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-20 bg-[#080d1a]/90 backdrop-blur-xl border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Left Project Switcher */}
      <div className="flex items-center gap-4">
        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 transition-all text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                {currentProject.name}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentProject.code} • {currentProject.type}
              </span>
            </div>
          </button>

          {/* Projects Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                Cambiar de Proyecto Activo
              </div>
              <div className="space-y-1 mt-1">
                {mockProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between ${
                      proj.id === currentProject.id
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{proj.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{proj.code} • {proj.client}</div>
                    </div>
                    {proj.id === currentProject.id && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-slate-300 font-medium">Avance: <strong>{currentProject.progressPercentage}%</strong></span>
        </div>
      </div>

      {/* Right Controls: Actions, Search, Notifications & User */}
      <div className="flex items-center gap-3">
        
        {/* Quick Action: Import BC3 / FIEBDC */}
        {onOpenBC3Modal && (
          <button
            onClick={onOpenBC3Modal}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-colors"
          >
            <FileUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Importar BC3</span>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-4 z-50 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-bold text-white">
                <span>Notificaciones de Obra</span>
                <span className="text-[10px] text-amber-400 font-normal">3 nuevas</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-emerald-400 text-[11px]">Certificación #6 Generada</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">320.000 € listos para firma y sellado Veri*Factu.</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-amber-400 text-[11px]">Alerta de Stock (Mortero cola)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Quedan 85 sacos en el Almacén Central.</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="font-semibold text-blue-400 text-[11px]">Avance Forjado 6ª Planta</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Parte de encofrado y hormigonado registrado.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
            CM
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">Carlos Mendoza</span>
            <span className="text-[10px] text-slate-400">Jefe de Obra / PM</span>
          </div>
        </div>

      </div>

    </header>
  );
};
