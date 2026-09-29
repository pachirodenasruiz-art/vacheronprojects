'use client';

import React from 'react';
import { 
  ShieldCheck, 
  QrCode, 
  Lock, 
  FileCheck, 
  Server, 
  CheckCircle2,
  ExternalLink,
  Cpu
} from 'lucide-react';

export const VeriFactuBadge: React.FC = () => {
  return (
    <section id="verifactu" className="py-24 bg-[#070b14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NORMATIVA ESPAÑOLA VERI*FACTU / LEY ANTIFRAUDE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Emisión de Facturas y Certificaciones{' '}
                <span className="gradient-text-amber">100% Homologadas</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Vacheron Projects implementa de manera nativa los requerimientos técnicos del Reglamento Veri*Factu de la Agencia Tributaria Española. Garantiza la inalterabilidad de tus registros de obra y factura con total tranquilidad jurídica.
              </p>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Encadenamiento Criptográfico</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cada factura y certificación incorpora el hash SHA-256 del registro precedente, formando una cadena inmutable e infalsificable.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <QrCode className="w-4 h-4" />
                    <span>Códigos QR Oficiales AEAT</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Generación automática del código QR verificable para el cliente final y remisión opcional directa a los servidores tributarios.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <FileCheck className="w-4 h-4" />
                    <span>Trazabilidad de Modificaciones</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Registro de eventos de auditoría que documenta cualquier creación, rectificación o anulación de partidas certificadas.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <Server className="w-4 h-4" />
                    <span>Cloud Seguro en la UE</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Centros de datos en la Unión Europea con copias de seguridad continuas y cumplimiento estricto del RGPD.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Visual QR / Hash Certificate Preview */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white font-mono">REGISTRO SIF-VERIFACTU</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    ESTADO: SELLADO
                  </span>
                </div>

                {/* Simulated Hash Block */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">Huella Criptográfica SHA-256 (Hash Actual):</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 break-all text-[11px] mt-1">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400">Hash Encadenado Anterior:</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 break-all text-[11px] mt-1">
                      7d8b5f6e8a9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e
                    </div>
                  </div>
                </div>

                {/* QR Code and Validation Notice */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-full h-full text-slate-950" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-white font-semibold block">Validación Oficial QR AEAT</span>
                    Comprueba la autenticidad al escanear el recibo de certificación.
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
