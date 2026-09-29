'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Calculator, 
  CalendarRange, 
  HardHat, 
  Truck, 
  TrendingUp, 
  FileCheck2, 
  Code2, 
  ShieldCheck,
  CheckCircle2,
  FolderKanban,
  SlidersHorizontal,
  HelpCircle
} from 'lucide-react';

const navItems = [
  {
    name: 'Visión General',
    href: '/',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Estudios & Presupuestos',
    href: '/presupuestos',
    icon: Calculator,
    badge: 'BC3',
  },
  {
    name: 'Planificador Gantt',
    href: '/planificacion',
    icon: CalendarRange,
    badge: null,
  },
  {
    name: 'Ejecución & Mediciones',
    href: '/ejecucion',
    icon: HardHat,
    badge: 'Campo',
  },
  {
    name: 'Compras & Almacén',
    href: '/compras',
    icon: Truck,
    badge: null,
  },
  {
    name: 'Control Económico (3 Ejes)',
    href: '/economico',
    icon: TrendingUp,
    badge: 'CPI/SPI',
  },
  {
    name: 'Facturación & Veri*Factu',
    href: '/facturacion',
    icon: FileCheck2,
    badge: 'AEAT',
  },
  {
    name: 'API REST & Docs',
    href: '/api-docs',
    icon: Code2,
    badge: 'v1.0',
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#080d1a] border-r border-slate-800 flex flex-col shrink-0 h-screen sticky top-0 z-40">
      
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Building2 className="w-5 h-5 text-slate-950 stroke-[2.3]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white font-sans leading-none">
              VACHERON
            </span>
            <span className="text-[10px] tracking-wider uppercase text-amber-400 font-semibold mt-0.5">
              Projects Cloud ERP
            </span>
          </div>
        </Link>
      </div>

      {/* Main Nav Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Módulos de Gestión
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-300 border border-amber-500/20'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Status & System Info */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/50">
        
        {/* Veri*Factu Status Indicator */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Veri*Factu SIF Activo</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Cloud Sync Status */}
        <div className="px-2 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Servidor Cloud UE:</span>
          <span className="text-emerald-400 font-mono font-semibold">Online (42ms)</span>
        </div>
      </div>

    </aside>
  );
};
