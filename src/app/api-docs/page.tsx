'use client';

import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Lock, 
  Sparkles,
  Layers,
  FileCode
} from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    path: '/api/v1/projects',
    tag: 'Proyectos',
    description: 'Obtiene el listado de obras activas con sus métricas consolidadas (PV, AC, EV, CPI, SPI).',
    responseSample: `{
  "status": "success",
  "data": [
    {
      "id": "prj-01",
      "code": "PRJ-2025-01",
      "name": "Edificio Residencial Castellana Skyline",
      "planned_budget": 3850000,
      "actual_cost": 2140000,
      "certified_amount": 2380000,
      "cpi": 1.11,
      "spi": 1.04
    }
  ]
}`
  },
  {
    method: 'POST',
    path: '/api/v1/projects/{id}/bc3/import',
    tag: 'Presupuestos BC3',
    description: 'Importa un archivo estándar FIEBDC-3 (BC3) y genera el árbol jerárquico de partidas y descompuestos.',
    responseSample: `{
  "status": "success",
  "imported_chapters": 5,
  "imported_partidas": 42,
  "total_budget": 3850000.00
}`
  },
  {
    method: 'POST',
    path: '/api/v1/field/work-logs',
    tag: 'A Pie de Obra',
    description: 'Sincroniza partes diarios de trabajo de cuadrillas y operarios desde la app móvil.',
    responseSample: `{
  "status": "created",
  "work_log_id": "wl-8910",
  "worker": "Antonio Gallego",
  "cost_allocated": 221.00
}`
  },
  {
    method: 'GET',
    path: '/api/v1/invoices/{id}/verifactu-chain',
    tag: 'Fiscal & Veri*Factu',
    description: 'Devuelve el registro de encadenamiento SHA-256 inalterable y el token QR de la AEAT.',
    responseSample: `{
  "invoice_number": "FAC-2025/0089",
  "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "previous_hash": "7d8b5f6e8a9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
  "aeat_qr_url": "https://verifactu.agenciatributaria.gob.es/valida?..."
}`
  }
];

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-50 text-brand-800 border border-brand-200">
              OPENAPI SPEC v3.1
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Capa de API REST & Conectores ERP
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Conecta Vacheron Projects con SAP, Microsoft Dynamics, Sage, A3, PowerBI o desarrolla integraciones a medida.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-brand-800 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-200 font-bold shadow-sm">
            https://api.vacheronprojects.cloud/v1
          </span>
        </div>
      </div>

      {/* Grid of Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Endpoints List */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Endpoints Disponibles
          </div>

          {endpoints.map((ep, idx) => {
            const isSelected = selectedEndpoint.path === ep.path;
            return (
              <button
                key={idx}
                onClick={() => setSelectedEndpoint(ep)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-brand-50/80 border-brand-600 ring-2 ring-brand-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    ep.method === 'GET' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="text-xs font-mono text-slate-900 font-bold truncate">{ep.path}</span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1">{ep.description}</div>
              </button>
            );
          })}
        </div>

        {/* Right Endpoint Detail & Code Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                  selectedEndpoint.method === 'GET' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {selectedEndpoint.method}
                </span>
                <span className="font-mono text-sm font-bold text-slate-900">{selectedEndpoint.path}</span>
              </div>
              <span className="text-xs text-brand-800 font-bold bg-brand-50 px-2 py-0.5 rounded border border-brand-200">{selectedEndpoint.tag}</span>
            </div>

            <p className="text-xs text-slate-600">
              {selectedEndpoint.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono">Ejemplo de Respuesta JSON (200 OK):</span>
                <button
                  onClick={() => handleCopy(selectedEndpoint.responseSample)}
                  className="flex items-center gap-1 text-brand-700 hover:text-brand-800 transition-colors font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                {selectedEndpoint.responseSample}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-brand-700 shrink-0" />
              <span>Autenticación mediante cabecera Bearer Token (<code className="text-slate-800 font-bold font-mono">Authorization: Bearer vach_live_...</code>)</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
