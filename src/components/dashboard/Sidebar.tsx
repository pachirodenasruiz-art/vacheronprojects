'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
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
  ChevronRight
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';

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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0 z-40 shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
      
      {/* Brand Header with Official Logo */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size="sm" showText={true} />
        </Link>
      </div>

      {/* Main Nav Section */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1">
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
                  ? 'bg-brand-50 text-brand-800 font-bold border border-brand-200/80 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-700 stroke-[2.5]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-brand-200/80 text-brand-900 font-bold' : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Status & System Info */}
      <div className="p-4 border-t border-slate-100 space-y-2.5 bg-slate-50/60">
        
        {/* Veri*Factu Status Indicator */}
        <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 shadow-sm flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Veri*Factu SIF Activo</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Cloud Sync Status */}
        <div className="px-2 text-[10px] text-slate-500 flex items-center justify-between font-medium">
          <span>Servidor Cloud UE:</span>
          <span className="text-brand-700 font-mono font-semibold">Online (42ms)</span>
        </div>
      </div>

    </aside>
  );
};
