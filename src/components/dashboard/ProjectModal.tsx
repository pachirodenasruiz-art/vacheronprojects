'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Trash2, 
  DollarSign, 
  Calendar, 
  MapPin, 
  User, 
  Layers,
  Activity
} from 'lucide-react';
import { Project } from '@/lib/types';
import { useProjects } from '@/context/ProjectContext';
import { formatCurrency } from '@/lib/utils';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'edit' | 'create';
  projectToEdit?: Project;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  mode,
  projectToEdit,
}) => {
  const { updateProject, createProject, deleteProject } = useProjects();

  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    code: '',
    client: '',
    location: '',
    manager: 'Miguel Ángel Rodenas (Construction Manager)',
    type: 'Residencial',
    status: 'en_curso',
    startDate: '',
    endDate: '',
    plannedBudget: 2500000,
    targetContractValue: 3100000,
    actualCost: 950000,
    certifiedAmount: 1100000,
    invoicedAmount: 1045000,
    collectedAmount: 950000,
    progressPercentage: 35.0,
  });

  useEffect(() => {
    if (mode === 'edit' && projectToEdit) {
      setFormData({ ...projectToEdit });
    } else if (mode === 'create') {
      const today = new Date().toISOString().split('T')[0];
      const nextYear = new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0];
      setFormData({
        name: '',
        code: `PRJ-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
        client: '',
        location: '',
        manager: 'Miguel Ángel Rodenas (Construction Manager)',
        type: 'Residencial',
        status: 'en_curso',
        startDate: today,
        endDate: nextYear,
        plannedBudget: 1800000,
        targetContractValue: 2250000,
        actualCost: 450000,
        certifiedAmount: 520000,
        invoicedAmount: 494000,
        collectedAmount: 450000,
        progressPercentage: 25.0,
      });
    }
  }, [mode, projectToEdit, isOpen]);

  if (!isOpen) return null;

  const planned = Number(formData.plannedBudget) || 0;
  const contract = Number(formData.targetContractValue) || 0;
  const actual = Number(formData.actualCost) || 0;
  const certified = Number(formData.certifiedAmount) || 0;
  const grossProfit = certified - actual;
  const marginPercent = certified > 0 ? ((grossProfit / certified) * 100).toFixed(1) : '0';
  const calculatedCPI = actual > 0 ? (certified / actual).toFixed(2) : '1.00';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'edit' && projectToEdit) {
      updateProject({
        ...projectToEdit,
        ...formData,
        plannedBudget: planned,
        targetContractValue: contract,
        actualCost: actual,
        certifiedAmount: certified,
        invoicedAmount: Number(formData.invoicedAmount) || certified * 0.95,
        collectedAmount: Number(formData.collectedAmount) || actual,
        progressPercentage: Number(formData.progressPercentage) || 0,
        cpi: Number(calculatedCPI),
      } as Project);
    } else {
      createProject(formData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (mode === 'edit' && projectToEdit) {
      if (confirm(`¿Estás seguro de que deseas eliminar el proyecto "${projectToEdit.name}"?`)) {
        deleteProject(projectToEdit.id);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {mode === 'edit' ? 'Modificar Datos de la Obra' : 'Crear Nuevo Proyecto Personalizado'}
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'edit' 
                ? 'Actualiza el presupuesto, venta contratada, avance y responsables en tiempo real.'
                : 'Añade tu propia obra a la cartera de Vacheron Projects con métricas personalizadas.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* Section 1: General Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>1. Identificación y Localización de la Obra</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Proyecto / Obra *</label>
              <input
                type="text"
                required
                placeholder="Ej. Edificio Residencial Castellana Skyline"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Código de Referencia *</label>
                <input
                  type="text"
                  required
                  placeholder="PRJ-2025-01"
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cliente / Promotora *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Metrópolis Promociones Inmobiliarias"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ubicación / Dirección *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Paseo de la Castellana 214, Madrid"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Construction Manager / Responsable</label>
                <input
                  type="text"
                  value={formData.manager || ''}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipología de Proyecto</label>
                <select
                  value={formData.type || 'Residencial'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                >
                  <option value="Residencial">Edificación Residencial</option>
                  <option value="Comercial">Edificación Comercial & Oficinas</option>
                  <option value="Reforma Integral">Reforma Integral & Interiorismo</option>
                  <option value="Industrial">Parque Industrial & Logístico</option>
                  <option value="Obra Civil">Obra Civil e Infraestructura</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estado de Ejecución</label>
                <select
                  value={formData.status || 'en_curso'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                >
                  <option value="en_curso">En Ejecución Activa</option>
                  <option value="planificacion">En Fase de Planificación</option>
                  <option value="paralizada">Temporalmente Paralizada</option>
                  <option value="finalizada">Completada y Entregada</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Financial Metrics & Dates */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>2. Presupuesto, Costes y Control Financiero</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Presupuesto Previsto de Coste (PV) € *</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  required
                  value={formData.plannedBudget || 0}
                  onChange={(e) => setFormData({ ...formData, plannedBudget: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venta Contratada al Cliente € *</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  required
                  value={formData.targetContractValue || 0}
                  onChange={(e) => setFormData({ ...formData, targetContractValue: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-brand-800 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Coste Real Incurrido (AC) €</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.actualCost || 0}
                  onChange={(e) => setFormData({ ...formData, actualCost: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-rose-600 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Certificado a Origen (EV) €</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.certifiedAmount || 0}
                  onChange={(e) => setFormData({ ...formData, certifiedAmount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-brand-800 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">% Avance Físico (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={formData.progressPercentage || 0}
                  onChange={(e) => setFormData({ ...formData, progressPercentage: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-brand-600 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Calculated Preview Box */}
            <div className="p-3.5 rounded-xl bg-brand-50/70 border border-brand-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-600">Margen Bruto Devengado: </span>
                <strong className={`font-mono ${grossProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  +{formatCurrency(grossProfit)} ({marginPercent}%)
                </strong>
              </div>
              <div>
                <span className="text-slate-600">Índice Rendimiento Costes (CPI): </span>
                <strong className="font-mono text-brand-800">{calculatedCPI}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Inicio de Obra</label>
                <input
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Prevista de Entrega</label>
                <input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-600"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {mode === 'edit' ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar Obra</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 flex items-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{mode === 'edit' ? 'Guardar Cambios' : 'Crear Obra'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
