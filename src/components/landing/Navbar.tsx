'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ChevronRight, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  CalendarClock,
  Menu,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-slate-950 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                VACHERON
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PROJECTS
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
              Enterprise Construction Cloud
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#soluciones" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
            Soluciones
          </a>
          <a href="#modulos" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
            Módulos Funcionales
          </a>
          <a href="#roles" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
            Por Rol & Industria
          </a>
          <a href="#verifactu" className="text-sm font-medium text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Veri*Factu</span>
          </a>
          <a href="#calculadora" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
            Simulador
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenDemoModal}
            className="text-xs font-semibold px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-700/60"
          >
            Agendar Demo VIP
          </button>
          
          <Link
            href="/app"
            className="text-xs font-bold px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5"
          >
            <span>Entrar al Portal SaaS</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B1120] px-6 py-6 space-y-4">
          <a
            href="#soluciones"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Soluciones
          </a>
          <a
            href="#modulos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Módulos Funcionales
          </a>
          <a
            href="#roles"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Por Rol & Industria
          </a>
          <a
            href="#verifactu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Normativa Veri*Factu
          </a>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full text-center py-3 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800"
            >
              Agendar Demo
            </button>
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg text-sm font-bold bg-amber-500 text-slate-950 flex items-center justify-center gap-2"
            >
              <span>Acceder al Portal SaaS</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
