'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  FolderTree, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  FileUp, 
  Download, 
  Search, 
  FileSpreadsheet, 
  Layers, 
  Sparkles,
  Info,
  CheckCircle2,
  HardHat,
  Truck,
  Wrench
} from 'lucide-react';
import { mockChapters } from '@/lib/mockData';
import { Chapter, Partida } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function PresupuestosPage() {
  const [chapters, setChapters] = useState<Chapter[]>(mockChapters);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'ch-01': true,
    'ch-02': true,
    'ch-03': true,
    'ch-04': false,
    'ch-05': false,
  });
  const [expandedPartidas, setExpandedPartidas] = useState<Record<string, boolean>>({
    'p-0101': true,
    'p-0201': true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePartida = (id: string) => {
    setExpandedPartidas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExportBC3 = () => {
    setExportNotice('Archivo "Castellana_Presupuesto_FIEBDC3.bc3" generado y descargado correctamente.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Calculate totals
  const totalPlanned = chapters.reduce((sum, ch) => sum + ch.plannedTotal, 0);
  const totalReal = chapters.reduce((sum, ch) => sum + ch.realTotalCost, 0);
  const totalCertified = chapters.reduce((sum, ch) => sum + ch.certifiedTotal, 0);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
              MÓDULO A
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Estudios, Presupuestos y Descompuestos (BC3)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Estructura jerárquica de unidades de obra, precios unitarios, rendimientos analíticos y compatibilidad FIEBDC-3.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportBC3}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Exportar BC3</span>
          </button>

          <button
            onClick={() => alert('Funcionalidad para añadir nuevo capítulo o partida personalizada.')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nueva Partida</span>
          </button>
        </div>
      </div>

      {/* Export notification banner */}
      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{exportNotice}</span>
          </div>
        </div>
      )}

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Total Presupuesto Previsto (Coste)</div>
          <div className="text-xl font-bold text-white mt-1 font-mono">{formatCurrency(totalPlanned)}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Coste Real Incurrido a la Fecha</div>
          <div className="text-xl font-bold text-rose-400 mt-1 font-mono">{formatCurrency(totalReal)}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">Total Certificado Acumulado</div>
          <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{formatCurrency(totalCertified)}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar por código de partida (ej. 02.01) o término (ej. hormigón, forjado, fachada)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Hierarchical Tree of Chapters and Partidas */}
      <div className="space-y-4">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters[chapter.id];
          const filteredPartidas = chapter.partidas.filter(p => 
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.code.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredPartidas.length === 0) return null;

          return (
            <div key={chapter.id} className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
              
              {/* Chapter Header Row */}
              <div
                onClick={() => toggleChapter(chapter.id)}
                className="p-4 bg-slate-850/90 border-b border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <button className="text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <FolderTree className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">{chapter.name}</span>
                  <span className="text-xs text-slate-400 font-mono">({chapter.partidas.length} partidas)</span>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-sans">Presupuestado</span>
                    <span className="text-white font-bold">{formatCurrency(chapter.plannedTotal)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-sans">Real Ejecutado</span>
                    <span className="text-rose-400 font-bold">{formatCurrency(chapter.realTotalCost)}</span>
                  </div>
                </div>
              </div>

              {/* Partidas Spreadsheet Body */}
              {isExpanded && (
                <div className="divide-y divide-slate-800/80">
                  {filteredPartidas.map((partida) => {
                    const isPartidaExpanded = expandedPartidas[partida.id];
                    return (
                      <div key={partida.id} className="p-4 hover:bg-slate-850/40 transition-colors">
                        
                        {/* Partida Main Row */}
                        <div className="grid grid-cols-12 gap-3 items-start">
                          
                          {/* Code & Expander */}
                          <div className="col-span-1 flex items-center gap-1.5 font-mono text-xs text-amber-400 font-bold">
                            {partida.descompuestos && partida.descompuestos.length > 0 && (
                              <button 
                                onClick={() => togglePartida(partida.id)}
                                className="text-slate-400 hover:text-amber-400"
                                title="Ver descompuestos de la partida"
                              >
                                {isPartidaExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                              </button>
                            )}
                            <span>{partida.code}</span>
                          </div>

                          {/* Description */}
                          <div className="col-span-5 space-y-1">
                            <div className="text-xs font-semibold text-slate-100">
                              {partida.description}
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-400">
                              <span>Unidad: <strong className="font-mono text-slate-300">{partida.unit}</strong></span>
                              <span>•</span>
                              <span>Cant. Prevista: <strong className="font-mono text-slate-300">{formatNumber(partida.plannedQuantity, 0)} {partida.unit}</strong></span>
                              <span>•</span>
                              <span>P.U. Previsto: <strong className="font-mono text-slate-300">{formatNumber(partida.plannedUnitPrice, 2)} €</strong></span>
                            </div>
                          </div>

                          {/* Planned Total */}
                          <div className="col-span-2 text-right">
                            <div className="text-[10px] text-slate-400 font-sans">Total Previsto</div>
                            <div className="text-xs font-mono font-bold text-white">
                              {formatCurrency(partida.plannedTotal)}
                            </div>
                          </div>

                          {/* Real Total */}
                          <div className="col-span-2 text-right">
                            <div className="text-[10px] text-slate-400 font-sans">Coste Real</div>
                            <div className="text-xs font-mono font-bold text-rose-400">
                              {formatCurrency(partida.realTotalCost)}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="col-span-2 text-right">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              partida.status === 'certificada'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : partida.status === 'en_progreso'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {partida.status.toUpperCase()}
                            </span>
                          </div>

                        </div>

                        {/* Descompuestos Sub-Table (Breakdown) */}
                        {isPartidaExpanded && partida.descompuestos && (
                          <div className="mt-3 ml-6 pl-4 border-l-2 border-amber-500/40 space-y-2 pt-2">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              <span>Descompuesto de Costes Unitarios (Por cada {partida.unit})</span>
                            </div>

                            <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-3 overflow-x-auto">
                              <table className="w-full text-left text-xs font-mono">
                                <thead>
                                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                                    <th className="pb-1.5 font-sans">Naturaleza</th>
                                    <th className="pb-1.5">Cód.</th>
                                    <th className="pb-1.5 font-sans">Descripción del Recurso</th>
                                    <th className="pb-1.5 text-right font-sans">Rendimiento</th>
                                    <th className="pb-1.5 text-right font-sans">Precio Base</th>
                                    <th className="pb-1.5 text-right font-sans">Importe / {partida.unit}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 text-[11px]">
                                  {partida.descompuestos.map((d) => (
                                    <tr key={d.id} className="text-slate-300">
                                      <td className="py-1.5 font-sans">
                                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300">
                                          {d.type === 'maquinaria' ? 'Maquinaria' : d.type === 'mano_obra' ? 'Mano de Obra' : 'Material'}
                                        </span>
                                      </td>
                                      <td className="py-1.5 text-amber-400 font-bold">{d.code}</td>
                                      <td className="py-1.5 font-sans">{d.description}</td>
                                      <td className="py-1.5 text-right">{d.yield} {d.unit}</td>
                                      <td className="py-1.5 text-right">{formatNumber(d.unitPrice, 2)} €</td>
                                      <td className="py-1.5 text-right text-emerald-400 font-bold">{formatNumber(d.totalCost, 2)} €</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
