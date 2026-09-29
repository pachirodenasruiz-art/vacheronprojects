'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  Boxes, 
  FileText, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Plus, 
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';
import { mockPurchaseItems, mockSupplierComparisons, mockWarehouses } from '@/lib/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function ComprasPage() {
  const [activeTab, setActiveTab] = useState<'explosion' | 'comparativas' | 'almacenes'>('explosion');
  const [comparisons, setComparisons] = useState(mockSupplierComparisons);

  const selectSupplierOffer = (comparisonId: string, supplierName: string) => {
    setComparisons(prev => prev.map(c => {
      if (c.id === comparisonId) {
        return {
          ...c,
          offers: c.offers.map(o => ({
            ...o,
            selected: o.supplierName === supplierName
          }))
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
              MÓDULO C - LOGÍSTICA & COMPRAS
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Compras, Almacén y Gestión de Proveedores
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explosión automática de recursos presupuestados, comparativas matriciales de ofertas, pedidos y control multi-almacén.
          </p>
        </div>

        <button
          onClick={() => alert('Generar solicitud de cotización masiva a proveedores.')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Nueva Petición de Oferta</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('explosion')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'explosion'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Explosión de Necesidades de Compra</span>
        </button>

        <button
          onClick={() => setActiveTab('comparativas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'comparativas'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Matriz Comparativa de Ofertas ({comparisons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('almacenes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'almacenes'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Control Multi-Almacén & Acopios ({mockWarehouses.length})</span>
        </button>
      </div>

      {/* TAB 1: Explosión de Necesidades */}
      {activeTab === 'explosion' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Materiales Calculados por Descompuestos de Obra
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sincronizado con Presupuesto</span>
              </span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {mockPurchaseItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-850/40 transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-1 font-mono text-xs text-amber-400 font-bold">
                      {item.materialCode}
                    </div>

                    <div className="col-span-4">
                      <div className="text-xs font-semibold text-white">{item.description}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Proveedor Asignado: <strong className="text-slate-200">{item.selectedSupplier}</strong>
                      </div>
                    </div>

                    <div className="col-span-2 text-center font-mono">
                      <div className="text-xs font-bold text-white">{formatNumber(item.quantity, 0)} {item.unit}</div>
                      <div className="text-[10px] text-slate-400">Volumen Total</div>
                    </div>

                    <div className="col-span-2 text-right font-mono">
                      <div className="text-xs font-bold text-slate-300">Obj: {formatNumber(item.targetPrice, 2)} €/{item.unit}</div>
                      <div className="text-[11px] text-emerald-400 font-bold">Cdo: {formatNumber(item.bestQuotation, 2)} €/{item.unit}</div>
                    </div>

                    <div className="col-span-3 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'recibido_obra' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        item.status === 'ordenado' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Comparativas de Proveedores */}
      {activeTab === 'comparativas' && (
        <div className="space-y-6">
          {comparisons.map((comp) => (
            <div key={comp.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white">{comp.material}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Volumen de compra: <strong className="text-amber-400 font-mono">{formatNumber(comp.quantity, 0)} {comp.unit}</strong>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">3 Ofertas Recibidas</span>
              </div>

              {/* Matrix of offers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {comp.offers.map((offer, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectSupplierOffer(comp.id, offer.supplierName)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      offer.selected
                        ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{offer.rating}</span>
                      </div>
                      {offer.selected && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500 text-slate-950 font-bold">
                          SELECCIONADO
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-white mb-3">{offer.supplierName}</h4>

                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-slate-400">
                        <span className="font-sans">Precio Unitario:</span>
                        <span className="text-white font-bold">{formatNumber(offer.unitPrice, 2)} €/{comp.unit}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span className="font-sans">Importe Total:</span>
                        <span className="text-amber-400 font-bold text-sm">{formatCurrency(offer.totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800/80">
                        <span className="font-sans">Plazo Entrega:</span>
                        <span className="text-emerald-400 font-semibold">{offer.deliveryDays} días laborables</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Multi-Almacén */}
      {activeTab === 'almacenes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockWarehouses.map((stk) => (
              <div key={stk.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold">{stk.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    stk.status === 'bajo_minimo' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {stk.status === 'bajo_minimo' ? 'BAJO MÍNIMO' : 'STOCK OK'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{stk.name}</h3>
                <p className="text-xs text-slate-400">Ubicación: <strong className="text-slate-200">{stk.location}</strong></p>

                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400">Stock Actual:</span>
                    <span className="font-bold text-white">{formatNumber(stk.currentStock, 0)} {stk.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400">Stock Mínimo:</span>
                    <span>{formatNumber(stk.minStock, 0)} {stk.unit}</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span className="font-sans text-slate-400">Valoración (€):</span>
                    <span>{formatCurrency(stk.valuation)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
