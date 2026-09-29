'use client';

import React, { useState } from 'react';
import { X, FileUp, FileCode, CheckCircle2, Download, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface BC3ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete?: () => void;
}

export const BC3ImportModal: React.FC<BC3ImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSimulateImport = () => {
    setIsProcessing(true);
    setStatus('parsing');
    setTimeout(() => {
      setIsProcessing(false);
      setStatus('success');
      if (onImportComplete) onImportComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Motor de Importación / Exportación BC3
            </h3>
            <p className="text-xs text-slate-500">
              Estándar FIEBDC-3 / 2020 para intercambio de presupuestos de construcción
            </p>
          </div>
        </div>

        {status === 'idle' && (
          <div className="space-y-4">
            
            {/* Dropzone mock */}
            <div 
              onClick={() => setSelectedFile('Presupuesto_Ejecucion_Castellana_v4.bc3')}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                selectedFile 
                  ? 'border-brand-600 bg-brand-50/50' 
                  : 'border-slate-300 hover:border-brand-500 hover:bg-slate-50'
              }`}
            >
              <FileUp className="w-10 h-10 text-brand-700 mx-auto mb-3" />
              <div className="text-sm font-semibold text-slate-900">
                {selectedFile ? selectedFile : 'Arrastra tu archivo .BC3 o haz clic para seleccionarlo'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Compatible con Presto, Arquímedes, CYPE, Menfis y bases paramétricas
              </p>
            </div>

            {selectedFile && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Archivo detectado: <strong>{selectedFile}</strong> (1.4 MB)</span>
                </div>
                <span className="text-brand-800 font-mono font-bold">5 Capítulos / 42 Partidas</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedFile}
                onClick={handleSimulateImport}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  selectedFile
                    ? 'bg-brand-700 hover:bg-brand-800 text-white shadow-md shadow-brand-700/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Procesar e Importar al Proyecto</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {status === 'parsing' && (
          <div className="py-12 text-center space-y-4">
            <RefreshCw className="w-12 h-12 text-brand-700 animate-spin mx-auto" />
            <div>
              <h4 className="text-lg font-bold text-slate-900">Procesando estructura BC3...</h4>
              <p className="text-xs text-slate-500 mt-1">
                Generando árbol de capítulos, descompuestos de materiales, mano de obra y rendimientos.
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="py-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900">¡Presupuesto BC3 Importado con Éxito!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                Se han sincronizado 5 capítulos jerárquicos y 42 partidas con sus descompuestos correspondientes en el proyecto.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setStatus('idle');
                  setSelectedFile(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md"
              >
                Ver Presupuesto Actualizado
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
