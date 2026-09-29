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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Motor de Importación / Exportación BC3
            </h3>
            <p className="text-xs text-slate-400">
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
                  ? 'border-amber-500/80 bg-amber-500/5' 
                  : 'border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/40'
              }`}
            >
              <FileUp className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <div className="text-sm font-semibold text-white">
                {selectedFile ? selectedFile : 'Arrastra tu archivo .BC3 o haz clic para seleccionarlo'}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Compatible con Presto, Arquímedes, CYPE, Menfis y bases paramétricas
              </p>
            </div>

            {selectedFile && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Archivo detectado: <strong>{selectedFile}</strong> (1.4 MB)</span>
                </div>
                <span className="text-amber-400 font-mono font-bold">5 Capítulos / 42 Partidas</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
              >
                Cancelar
              </button>
              <button
                disabled={!selectedFile}
                onClick={handleSimulateImport}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  selectedFile
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 cursor-not-allowed'
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
            <RefreshCw className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
            <div>
              <h4 className="text-lg font-bold text-white">Procesando estructura BC3...</h4>
              <p className="text-xs text-slate-400 mt-1">
                Generando árbol de capítulos, descompuestos de materiales, mano de obra y rendimientos.
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="py-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">¡Presupuesto BC3 Importado con Éxito!</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
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
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
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
