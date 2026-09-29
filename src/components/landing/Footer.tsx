import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05080f] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Building2 className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                VACHERON <span className="text-amber-400">PROJECTS</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Plataforma cloud especializada en la gestión integral de obras, control de desviaciones económicas en 3 ejes, presupuestos FIEBDC-3 y facturación homologada Veri*Factu.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Preparado y Homologado para el Reglamento Veri*Factu (AEAT)</span>
            </div>
          </div>

          {/* Módulos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Módulos ERP</h4>
            <ul className="space-y-2">
              <li><Link href="/app/presupuestos" className="hover:text-amber-400 transition-colors">Estudios y Presupuestos BC3</Link></li>
              <li><Link href="/app/planificacion" className="hover:text-amber-400 transition-colors">Planificador Gantt Dinámico</Link></li>
              <li><Link href="/app/ejecucion" className="hover:text-amber-400 transition-colors">Seguimiento a Pie de Obra</Link></li>
              <li><Link href="/app/compras" className="hover:text-amber-400 transition-colors">Compras y Multi-Almacén</Link></li>
              <li><Link href="/app/economico" className="hover:text-amber-400 transition-colors">Control de Desviaciones (3 Ejes)</Link></li>
              <li><Link href="/app/facturacion" className="hover:text-amber-400 transition-colors">Facturación & Veri*Factu</Link></li>
            </ul>
          </div>

          {/* Soluciones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Soluciones</h4>
            <ul className="space-y-2">
              <li><a href="#roles" className="hover:text-amber-400 transition-colors">Jefes de Obra & Campo</a></li>
              <li><a href="#roles" className="hover:text-amber-400 transition-colors">Controllers Financieros</a></li>
              <li><a href="#roles" className="hover:text-amber-400 transition-colors">Dirección & Promoción</a></li>
              <li><a href="#roles" className="hover:text-amber-400 transition-colors">Empresas de Reformas</a></li>
              <li><a href="#roles" className="hover:text-amber-400 transition-colors">Edificación & Obra Civil</a></li>
              <li><Link href="/app/api-docs" className="hover:text-amber-400 transition-colors">API REST & Desarrolladores</Link></li>
            </ul>
          </div>

          {/* Contacto & Sede */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contacto & Sede</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Paseo de la Castellana 95, Madrid</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contacto@vacheronprojects.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+34 910 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>vacheronprojects.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Vacheron Projects Inc. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Aviso Legal</a>
            <a href="#" className="hover:text-white">Política de Privacidad</a>
            <a href="#" className="hover:text-white">Seguridad & RGPD</a>
            <a href="#" className="hover:text-white">Certificación ISO 27001</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
