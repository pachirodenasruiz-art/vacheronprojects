'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/utils';
import Link from 'next/link';

export const InteractiveDemo: React.FC = () => {
  const [budget, setBudget] = useState<number>(1500000);
  const [progress, setProgress] = useState<number>(60);
  const [costDeviation, setCostDeviation] = useState<number>(-4); // -4% savings (good) or +5% (over budget)
  const [targetMargin, setTargetMargin] = useState<number>(18); // 18% target profit margin

  // Calculations
  const contractValue = budget * (1 + targetMargin / 100);
  const plannedCostToDate = (budget * progress) / 100;
  const actualCostToDate = plannedCostToDate * (1 + costDeviation / 100);
  const certifiedToDate = (contractValue * progress) / 100;
  const grossProfitToDate = certifiedToDate - actualCostToDate;
  const cpi = actualCostToDate > 0 ? (plannedCostToDate / actualCostToDate) : 1;
  const projectedFinalCost = budget * (1 + costDeviation / 100);
  const projectedFinalProfit = contractValue - projectedFinalCost;
  const projectedFinalMargin = (projectedFinalProfit / contractValue) * 100;

  return (
    <section id="calculadora" className="py-24 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>SIMULADOR DE DESVIACIONES Y VALOR GANADO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experimenta el <span className="gradient-text-amber">Control a 3 Ejes</span> en Tiempo Real
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Ajusta las variables de tu obra y observa cómo el motor de Vacheron Projects calcula al instante el CPI, el margen real devengado y la previsión a fin de obra.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Parámetros de Simulación</span>
              </h3>
              <button
                onClick={() => {
                  setBudget(1500000);
                  setProgress(60);
                  setCostDeviation(-4);
                  setTargetMargin(18);
                }}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </div>

            {/* Slider: Presupuesto Base de Coste */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Presupuesto de Coste de Obra:</span>
                <span className="text-amber-400 font-mono font-bold">{formatCurrency(budget)}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={5000000}
                step={50000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>200.000 € (Reforma)</span>
                <span>5.000.000 € (Edificación)</span>
              </div>
            </div>

            {/* Slider: % Avance Físico */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Avance Físico de Obra:</span>
                <span className="text-white font-mono font-bold">{progress}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5% (Iniciando)</span>
                <span>100% (Entrega final)</span>
              </div>
            </div>

            {/* Slider: Desviación en Compras/Mano de obra */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Desviación en Costes Reales:</span>
                <span className={`font-mono font-bold ${costDeviation <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {costDeviation > 0 ? `+${costDeviation}% (Sobrecoste)` : `${costDeviation}% (Ahorro)`}
                </span>
              </div>
              <input
                type="range"
                min={-15}
                max={15}
                step={1}
                value={costDeviation}
                onChange={(e) => setCostDeviation(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span className="text-emerald-400">-15% Ahorro Compras</span>
                <span className="text-rose-400">+15% Desvío Operativo</span>
              </div>
            </div>

            {/* Slider: Margen Comercial de Venta */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-300">Margen Objetivo Contratado al Cliente:</span>
                <span className="text-white font-mono font-bold">{targetMargin}%</span>
              </div>
              <input
                type="range"
                min={8}
                max={35}
                step={1}
                value={targetMargin}
                onChange={(e) => setTargetMargin(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Valor Contratado al Cliente (Venta): <strong className="text-white font-mono">{formatCurrency(contractValue)}</strong>
              </span>
            </div>
          </div>

          {/* Results Output (Right) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Resultados Devengados a Fecha de Hoy</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  cpi >= 1 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {cpi >= 1 ? 'Rentabilidad Favorable' : 'Riesgo de Sobrecoste'}
                </span>
              </div>

              {/* 3 Axes Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">1. Previsto (PV)</div>
                  <div className="text-lg font-bold text-slate-200 mt-1 font-mono">{formatCurrency(plannedCostToDate)}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Coste Teórico ({progress}%)</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">2. Real Gastado (AC)</div>
                  <div className={`text-lg font-bold mt-1 font-mono ${costDeviation <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatCurrency(actualCostToDate)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Gasto Acumulado</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">3. Certificado (EV)</div>
                  <div className="text-lg font-bold text-amber-400 mt-1 font-mono">{formatCurrency(certifiedToDate)}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Venta Devengada</div>
                </div>
              </div>

              {/* Executive Summary Cards */}
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Margen Bruto a Fecha de Hoy:</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">
                    +{formatCurrency(grossProfitToDate)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Índice Rendimiento Costes (CPI = PV/AC):</span>
                  <span className={`font-mono font-bold ${cpi >= 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {cpi.toFixed(2)} {cpi >= 1 ? '(Excelente)' : '(Desviación Negativa)'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Proyección de Beneficio a Fin de Obra:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {formatCurrency(projectedFinalProfit)} ({projectedFinalMargin.toFixed(1)}% margen final)
                  </span>
                </div>
              </div>

              {/* Action Button to Dashboard */}
              <div className="pt-2">
                <Link
                  href="/app/economico"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>Ver Panel Económico Completo en la App</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
