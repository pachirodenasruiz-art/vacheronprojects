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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-50 text-brand-800 border border-brand-200">
              MÓDULO E - ADMINISTRACIÓN & FISCAL
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Facturación, Tesorería y Cumplimiento Veri*Factu
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Facturas vinculadas a certificaciones aprobadas, encadenamiento criptográfico conforme al Reglamento Veri*Factu de la AEAT y previsión de tesorería.
          </p>
        </div>

        <button
          onClick={() => alert('Generar factura oficial para la Certificación #6 con sellado Veri*Factu.')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Emitir Factura de Certificación</span>
        </button>
      </div>

      {/* Veri*Factu Homologation Banner */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>Sistema Informático de Facturación (SIF) Veri*Factu Homologado</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                RD 1007/2023
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Todos los registros emitidos quedan encadenados mediante SHA-256 inalterable y preparados para verificación en la sede electrónica de la AEAT.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-mono text-emerald-700 font-bold block">100% AUDIT-READY</span>
          <span className="text-[10px] text-slate-500">Encadenamiento activo</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('emitidas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'emitidas'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Facturas Emitidas a Clientes ({emitidas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recibidas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'recibidas'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Facturas Recibidas de Proveedores ({recibidas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tesoreria')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tesoreria'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Previsión de Tesorería & Vencimientos</span>
        </button>
      </div>

      {/* Invoices List View (Emitidas or Recibidas) */}
      {(activeTab === 'emitidas' || activeTab === 'recibidas') && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {activeTab === 'emitidas' ? 'Registro de Facturación Emitida' : 'Facturas Recibidas y Validadas'}
            </span>
            <span className="text-xs text-slate-500 font-mono">Libro Registro Oficial</span>
          </div>

          <div className="divide-y divide-slate-100">
            {(activeTab === 'emitidas' ? emitidas : recibidas).map((inv) => (
              <div key={inv.id} className="p-5 hover:bg-slate-50/60 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  
                  {/* Number & Date */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-800">{inv.invoiceNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'pagada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-brand-50 text-brand-800 border border-brand-200'
                      }`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-sans">
                      Fecha: <strong className="text-slate-700">{inv.date}</strong> • Vencimiento: <strong className="text-slate-700">{inv.dueDate}</strong>
                    </div>
                  </div>

                  {/* Counterpart */}
                  <div className="col-span-4">
                    <div className="text-xs font-bold text-slate-900">{inv.counterpartName}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">CIF/NIF: {inv.cif}</div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="col-span-3 font-mono text-xs text-right space-y-0.5">
                    <div className="text-slate-500 text-[10px]">Base: {formatCurrency(inv.taxBase)} + IVA: {formatCurrency(inv.vatAmount)}</div>
                    <div className="text-sm font-bold text-slate-900">{formatCurrency(inv.total)}</div>
                  </div>

                  {/* Veri*Factu Inspector Button */}
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 text-[11px] font-bold flex items-center gap-1.5 ml-auto transition-colors shadow-sm"
                    >
                      <QrCode className="w-3.5 h-3.5 text-brand-700" />
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
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Previsión de Cobros Próximos 60 Días</div>
              <div className="text-2xl font-bold text-emerald-700 font-mono">+425.315 €</div>
              <div className="text-[10px] text-slate-500">Factura #0089 (Metrópolis Promociones)</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Previsión de Pagos Próximos 60 Días</div>
              <div className="text-2xl font-bold text-rose-600 font-mono">-223.850 €</div>
              <div className="text-[10px] text-slate-500">Subcontrata Estructuras Castellana</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Flujo Neto de Caja Previsto</div>
              <div className="text-2xl font-bold text-brand-800 font-mono">+201.465 €</div>
              <div className="text-[10px] text-emerald-700 font-semibold">Superávit de liquidez garantizado</div>
            </div>
          </div>
        </div>
      )}

      {/* Veri*Factu Inspector Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 text-slate-800 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-700" />
                <h3 className="text-sm font-bold text-slate-900 font-mono">
                  REGISTRO DE FACTURACIÓN VERI*FACTU
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] text-slate-500 font-sans">Documento & Emisor:</div>
                <div className="text-slate-900 font-bold">{selectedInvoice.invoiceNumber} • {selectedInvoice.counterpartName}</div>
                <div className="text-brand-800 text-[11px] font-bold">Total Oficial: {formatCurrency(selectedInvoice.total)}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 font-sans">Huella Criptográfica SHA-256 (Registro Actual):</div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-brand-900 break-all text-[10px] mt-1 font-bold">
                  {selectedInvoice.veriFactuHash}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 font-sans">Huella Encadenada Registro Precedente:</div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 break-all text-[10px] mt-1">
                  {selectedInvoice.previousRecordHash}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-100">
                <div className="w-14 h-14 bg-slate-100 p-1 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  <span className="text-emerald-700 font-bold block">✓ Sellado y Validado por SIF</span>
                  Cumple con el Reglamento Técnico de Sistemas de Facturación de la AEAT (RD 1007/2023).
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
