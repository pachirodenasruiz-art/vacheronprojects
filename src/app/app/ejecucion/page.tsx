'use client';

import React, { useState } from 'react';
import { 
  HardHat, 
  FileCheck, 
  Users, 
  Truck, 
  Plus, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  AlertCircle,
  Building,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  mockCertifications, 
  mockWorkLogs, 
  mockSubcontracts, 
  mockMachinery 
} from '@/lib/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function EjecucionPage() {
  const [activeTab, setActiveTab] = useState<'partes' | 'certificaciones' | 'subcontratas' | 'maquinaria'>('partes');
  const [workLogs, setWorkLogs] = useState(mockWorkLogs);
  const [newLogModal, setNewLogModal] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300">
              MÓDULO B - A PIE DE OBRA
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Ejecución, Seguimiento y Partes de Campo
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registro diario de cuadrillas, control de horas de operarios, certificaciones periódicas con retención, subcontratas y maquinaria.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Modal para registrar nuevo parte de trabajo diario de cuadrilla.')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nuevo Parte de Trabajo</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('partes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'partes'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Partes de Mano de Obra ({workLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificaciones')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'certificaciones'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Certificaciones a Origen ({mockCertifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subcontratas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'subcontratas'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Control de Subcontratas ({mockSubcontracts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('maquinaria')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'maquinaria'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Maquinaria & Equipos ({mockMachinery.length})</span>
        </button>
      </div>

      {/* TAB 1: Partes de Trabajo */}
      {activeTab === 'partes' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Registro de Partes de Trabajo Diarios en Tajo
              </span>
              <span className="text-xs text-slate-400 font-mono">Última jornada: 28 Marzo 2025</span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {workLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-slate-850/40 transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-3">
                      <div className="text-xs font-bold text-white">{log.workerName}</div>
                      <div className="text-[11px] text-amber-400">{log.category}</div>
                    </div>

                    <div className="col-span-4">
                      <div className="text-[11px] text-slate-300 font-semibold">
                        Partida {log.partidaCode}: {log.partidaName}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 italic">"{log.notes}"</div>
                    </div>

                    <div className="col-span-2 text-center font-mono">
                      <div className="text-xs font-bold text-white">{log.hours} horas</div>
                      <div className="text-[10px] text-slate-400">{log.hourlyRate} €/hora</div>
                    </div>

                    <div className="col-span-2 text-right font-mono">
                      <div className="text-xs font-bold text-rose-400">{formatCurrency(log.totalCost)}</div>
                      <div className="text-[10px] text-slate-400">Coste Directo</div>
                    </div>

                    <div className="col-span-1 text-right">
                      <span className="p-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Aprobado
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Certificaciones de Obra */}
      {activeTab === 'certificaciones' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Historial de Certificaciones Periódicas a Origen (Garantía 5%)
              </span>
              <button 
                onClick={() => alert('Generando borrador de Certificación #7 para Abril...')}
                className="text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                + Nueva Certificación
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {mockCertifications.map((cert) => (
                <div key={cert.id} className="p-4 hover:bg-slate-850/40 transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-3">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Certificación Nº {cert.number}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          cert.status === 'facturada' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {cert.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{cert.period} • {cert.date}</div>
                    </div>

                    <div className="col-span-3 font-mono text-xs">
                      <div className="text-slate-400 text-[10px]">Total a Origen Acumulado:</div>
                      <div className="font-bold text-white">{formatCurrency(cert.totalToDate)}</div>
                    </div>

                    <div className="col-span-3 font-mono text-xs">
                      <div className="text-slate-400 text-[10px]">Importe Este Periodo:</div>
                      <div className="font-bold text-amber-400">{formatCurrency(cert.currentCertification)}</div>
                    </div>

                    <div className="col-span-3 font-mono text-xs text-right">
                      <div className="text-slate-400 text-[10px]">Líquido a Cobrar (-5% Retención):</div>
                      <div className="font-bold text-emerald-400">{formatCurrency(cert.netPayable)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Subcontratas */}
      {activeTab === 'subcontratas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockSubcontracts.map((sub) => (
              <div key={sub.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold">{sub.cif}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                    {sub.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{sub.contractorName}</h3>
                <p className="text-xs text-slate-400">{sub.scope}</p>

                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-sans text-slate-400">Importe Contrato:</span>
                    <span className="font-bold">{formatCurrency(sub.contractAmount)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span className="font-sans text-slate-400">Certificado a la Fecha:</span>
                    <span>{formatCurrency(sub.certifiedAmount)} ({sub.progress}%)</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span className="font-sans text-slate-400">Retención Acumulada:</span>
                    <span>{formatCurrency(sub.retentionHeld)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Maquinaria */}
      {activeTab === 'maquinaria' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockMachinery.map((mach) => (
              <div key={mach.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold">{mach.code}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 font-bold">
                    {mach.type === 'propia' ? 'PROPIA' : 'ALQUILER'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{mach.machineName}</h3>
                <p className="text-xs text-slate-400 font-sans">Ubicación: {mach.currentLocation}</p>

                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400">Horas Trabajadas:</span>
                    <span className="font-bold text-white">{mach.hoursWorked} h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400">Coste Horario:</span>
                    <span>{mach.hourlyCost} €/h</span>
                  </div>
                  <div className="flex justify-between text-rose-400 font-bold">
                    <span className="font-sans text-slate-400">Coste Total Devengado:</span>
                    <span>{formatCurrency(mach.totalCost)}</span>
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
