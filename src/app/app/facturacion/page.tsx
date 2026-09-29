'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  QrCode, 
  Lock, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  ExternalLink
} from 'lucide-react';
import { mockInvoices } from '@/lib/mockData';
import { Invoice } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function FacturacionPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [activeTab, setActiveTab] = useState<'emitidas' | 'recibidas' | 'tesoreria'>('emitidas');

  const emitidas = invoices.filter(i => i.type === 'emitida');
  const recibidas = invoices.filter(i => i.type === 'recibida');

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">
              MÓDULO E - ADMINISTRACIÓN & FISCAL
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Facturación, Tesorería y Cumplimiento Veri*Factu
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Facturas vinculadas a certificaciones aprobadas, encadenamiento criptográfico conforme al Reglamento Veri*Factu de la AEAT y previsión de tesorería.
          </p>
        </div>

        <button
          onClick={() => alert('Generar factura oficial para la Certificación #6 con sellado Veri*Factu.')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Emitir Factura de Certificación</span>
        </button>
      </div>

      {/* Veri*Factu Homologation Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Sistema Informático de Facturación (SIF) Veri*Factu Homologado</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                RD 1007/2023
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Todos los registros emitidos quedan encadenados mediante SHA-256 inalterable y preparados para verificación en la sede electrónica de la AEAT.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-mono text-emerald-400 font-bold block">100% AUDIT-READY</span>
          <span className="text-[10px] text-slate-400">Encadenamiento activo</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('emitidas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'emitidas'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Facturas Emitidas a Clientes ({emitidas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recibidas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'recibidas'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Facturas Recibidas de Proveedores ({recibidas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tesoreria')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tesoreria'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Previsión de Tesorería & Vencimientos</span>
        </button>
      </div>

      {/* Invoices List View (Emitidas or Recibidas) */}
      {(activeTab === 'emitidas' || activeTab === 'recibidas') && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {activeTab === 'emitidas' ? 'Registro de Facturación Emitida' : 'Facturas Recibidas y Validadas'}
            </span>
            <span className="text-xs text-slate-400 font-mono">Libro Registro Oficial</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {(activeTab === 'emitidas' ? emitidas : recibidas).map((inv) => (
              <div key={inv.id} className="p-5 hover:bg-slate-850/40 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  
                  {/* Number & Date */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{inv.invoiceNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'pagada' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">
                      Fecha: <strong className="text-slate-300">{inv.date}</strong> • Vencimiento: <strong className="text-slate-300">{inv.dueDate}</strong>
                    </div>
                  </div>

                  {/* Counterpart */}
                  <div className="col-span-4">
                    <div className="text-xs font-bold text-white">{inv.counterpartName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">CIF/NIF: {inv.cif}</div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="col-span-3 font-mono text-xs text-right space-y-0.5">
                    <div className="text-slate-400 text-[10px]">Base: {formatCurrency(inv.taxBase)} + IVA (21%): {formatCurrency(inv.vatAmount)}</div>
                    <div className="text-sm font-bold text-white">{formatCurrency(inv.total)}</div>
                  </div>

                  {/* Veri*Factu Inspector Button */}
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-400 text-[11px] font-bold flex items-center gap-1.5 ml-auto transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Veri*Factu</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Tesorería & Vencimientos */}
      {activeTab === 'tesoreria' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400">Previsión de Cobros Próximos 60 Días</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono">+425.315 €</div>
              <div className="text-[10px] text-slate-400">Factura #0089 (Metrópolis Promociones)</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400">Previsión de Pagos Próximos 60 Días</div>
              <div className="text-2xl font-bold text-rose-400 font-mono">-223.850 €</div>
              <div className="text-[10px] text-slate-400">Subcontrata Estructuras Castellana</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400">Flujo Neto de Caja Previsto</div>
              <div className="text-2xl font-bold text-amber-400 font-mono">+201.465 €</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Superávit de liquidez garantizado</div>
            </div>
          </div>
        </div>
      )}

      {/* Veri*Factu Inspector Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  REGISTRO DE FACTURACIÓN VERI*FACTU
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Documento & Emisor:</div>
                <div className="text-white font-bold">{selectedInvoice.invoiceNumber} • {selectedInvoice.counterpartName}</div>
                <div className="text-amber-400 text-[11px]">Total Oficial: {formatCurrency(selectedInvoice.total)}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400">Huella Criptográfica SHA-256 (Registro Actual):</div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 break-all text-[10px] mt-1">
                  {selectedInvoice.veriFactuHash}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400">Huella Encadenada Registro Precedente:</div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 break-all text-[10px] mt-1">
                  {selectedInvoice.previousRecordHash}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-800">
                <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                  <QrCode className="w-full h-full text-slate-950" />
                </div>
                <div className="text-[10px] text-slate-400">
                  <span className="text-emerald-400 font-bold block">✓ Sellado y Validado por SIF</span>
                  Cumple con el Reglamento Técnico de Sistemas de Facturación de la AEAT.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
