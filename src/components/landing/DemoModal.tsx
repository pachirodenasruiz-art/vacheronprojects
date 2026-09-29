'use client';

import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Shield,
  Clock,
  Users
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    companySize: '11-50',
    projectType: 'Edificación Residencial',
    preferredDate: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Agendar Demostración Personalizada
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Un consultor especialista adaptará la sesión a la operativa de tu empresa.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Empresa Constructora / Promotora *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Vacheron Construcciones S.L."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Profesional *</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@tuempresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono Directo *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tamaño de la Empresa</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="1-10">1 a 10 empleados (Estudio / Reformas)</option>
                    <option value="11-50">11 a 50 empleados (Constructora mediana)</option>
                    <option value="51-200">51 a 200 empleados (Gran constructora)</option>
                    <option value="+200">+200 empleados (Corporativo / Multinacional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Proyectos Principal</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Edificación Residencial">Edificación Residencial</option>
                    <option value="Reformas e Interiorismo">Reformas e Interiorismo</option>
                    <option value="Obra Civil e Infraestructura">Obra Civil e Infraestructura</option>
                    <option value="Promoción Inmobiliaria">Promoción Inmobiliaria</option>
                    <option value="Instalaciones y Mantenimiento">Instalaciones y Mantenimiento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">¿Qué módulos te interesan más? (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Control de desviaciones 3 ejes, importación BC3, partes diarios"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all"
                >
                  <span>Confirmar Solicitud de Demostración</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tus datos están protegidos bajo RGPD y no compartimos información con terceros.</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                ¡Solicitud Registrada con Éxito!
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Hemos asignado tu petición a un consultor de Vacheron Projects. Te contactaremos en menos de 2 horas hábiles a <strong className="text-amber-400">{formData.email}</strong> para coordinar la sesión.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Empresa:</span>
                <span className="text-white font-semibold">{formData.company || 'Vacheron Demo'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sector:</span>
                <span className="text-amber-400 font-semibold">{formData.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Entorno Demo:</span>
                <span className="text-emerald-400 font-semibold">Listo para probar ahora</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/app"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>Acceder Ya al Sandbox SaaS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
