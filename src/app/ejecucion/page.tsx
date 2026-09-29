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

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-50 text-brand-800 border border-brand-200">
              MÓDULO B - A PIE DE OBRA
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Ejecución, Seguimiento y Partes de Campo
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registro diario de cuadrillas, control de horas de operarios, certificaciones periódicas con retención, subcontratas y maquinaria.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Modal para registrar nuevo parte de trabajo diario de cuadrilla.')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nuevo Parte de Trabajo</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('partes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'partes'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Partes de Mano de Obra ({workLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificaciones')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'certificaciones'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Certificaciones a Origen ({mockCertifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subcontratas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'subcontratas'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Control de Subcontratas ({mockSubcontracts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('maquinaria')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'maquinaria'
              ? 'bg-brand-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Maquinaria & Equipos ({mockMachinery.length})</span>
        </button>
      </div>

      {/* TAB 1: Partes de Trabajo */}
      {activeTab === 'partes' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Registro de Partes de Trabajo Diarios en Tajo
              </span>
              <span className="text-xs text-slate-500 font-mono">Última jornada: 28 Marzo 2025</span>
            </div>

            <div className="divide-y divide-slate-100">
              {workLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-3">
                      <div className="text-xs font-bold text-slate-900">{log.workerName}</div>
                      <div className="text-[11px] text-brand-700 font-semibold">{log.category}</div>
                    </div>

                    <div className="col-span-4">
                      <div className="text-[11px] text-slate-800 font-semibold">
                        Partida {log.partidaCode}: {log.partidaName}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 italic">"{log.notes}"</div>
                    </div>

                    <div className="col-span-2 text-center font-mono">
                      <div className="text-xs font-bold text-slate-900">{log.hours} horas</div>
                      <div className="text-[10px] text-slate-500">{log.hourlyRate} €/hora</div>
                    </div>

                    <div className="col-span-2 text-right font-mono">
                      <div className="text-xs font-bold text-rose-600">{formatCurrency(log.totalCost)}</div>
                      <div className="text-[10px] text-slate-500">Coste Directo</div>
                    </div>

                    <div className="col-span-1 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
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
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Historial de Certificaciones Periódicas a Origen (Garantía 5%)
              </span>
              <button 
                onClick={() => alert('Generando borrador de Certificación #7 para Abril...')}
                className="text-xs font-bold text-brand-700 hover:text-brand-800"
              >
                + Nueva Certificación
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {mockCertifications.map((cert) => (
                <div key={cert.id} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-3">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>Certificación Nº {cert.number}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cert.status === 'facturada' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-brand-50 text-brand-800 border border-brand-200'
                        }`}>
                          {cert.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{cert.period} • {cert.date}</div>
                    </div>

                    <div className="col-span-3 font-mono text-xs">
                      <div className="text-slate-500 text-[10px]">Total a Origen Acumulado:</div>
                      <div className="font-bold text-slate-900">{formatCurrency(cert.totalToDate)}</div>
                    </div>

                    <div className="col-span-3 font-mono text-xs">
                      <div className="text-slate-500 text-[10px]">Importe Este Periodo:</div>
                      <div className="font-bold text-brand-800">{formatCurrency(cert.currentCertification)}</div>
                    </div>

                    <div className="col-span-3 font-mono text-xs text-right">
                      <div className="text-slate-500 text-[10px]">Líquido a Cobrar (-5% Retención):</div>
                      <div className="font-bold text-emerald-700">{formatCurrency(cert.netPayable)}</div>
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
              <div key={sub.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-800 font-bold">{sub.cif}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    {sub.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{sub.contractorName}</h3>
                <p className="text-xs text-slate-500">{sub.scope}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-sans text-slate-500">Importe Contrato:</span>
                    <span className="font-bold">{formatCurrency(sub.contractAmount)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span className="font-sans text-slate-500 font-normal">Certificado a la Fecha:</span>
                    <span>{formatCurrency(sub.certifiedAmount)} ({sub.progress}%)</span>
                  </div>
                  <div className="flex justify-between text-brand-800 font-semibold">
                    <span className="font-sans text-slate-500 font-normal">Retención Acumulada:</span>
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
              <div key={mach.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-800 font-bold">{mach.code}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                    {mach.type === 'propia' ? 'PROPIA' : 'ALQUILER'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{mach.machineName}</h3>
                <p className="text-xs text-slate-500 font-sans">Ubicación: {mach.currentLocation}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-500">Horas Trabajadas:</span>
                    <span className="font-bold text-slate-900">{mach.hoursWorked} h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-500">Coste Horario:</span>
                    <span className="text-slate-700">{mach.hourlyCost} €/h</span>
                  </div>
                  <div className="flex justify-between text-rose-600 font-bold">
                    <span className="font-sans text-slate-500 font-normal">Coste Total Devengado:</span>
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
