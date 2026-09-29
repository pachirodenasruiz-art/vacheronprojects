'use client';

import React, { useState } from 'react';
import { FinancialThreeAxisPoint } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, Info } from 'lucide-react';

interface SCurveChartProps {
  data: FinancialThreeAxisPoint[];
}

export const SCurveChart: React.FC<SCurveChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(data.length - 1);

  // Determine max value for scaling
  const maxValue = Math.max(...data.flatMap(d => [d.pv, d.ac, d.ev])) * 1.1;
  const width = 650;
  const height = 260;
  const padding = 45;

  // Coordinate converter
  const getX = (index: number) => padding + (index / (data.length - 1)) * (width - padding * 2);
  const getY = (val: number) => height - padding - (val / maxValue) * (height - padding * 2);

  // Generate SVG path strings
  const pvPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.pv)}`).join(' ');
  const acPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.ac)}`).join(' ');
  const evPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.ev)}`).join(' ');

  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1];

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-700" />
            <span>Curva S & Análisis de Valor Ganado (EVM)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Evolución acumulada de los 3 Ejes: Previsto (PV), Coste Real (AC) y Certificado (EV)
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-slate-600 font-mono text-[11px]">Previsto (PV)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-600 font-mono text-[11px]">Coste Real (AC)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-700" />
            <span className="text-brand-900 font-mono text-[11px] font-bold">Certificado (EV)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full overflow-hidden bg-slate-50/50 rounded-xl p-2 border border-slate-100">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = height - padding - ratio * (height - padding * 2);
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />
                <text x={padding - 8} y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  {formatCurrency(maxValue * ratio)}
                </text>
              </g>
            );
          })}

          {/* Lines */}
          <path d={pvPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          <path d={acPath} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          <path d={evPath} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />

          {/* Interactive Hoverable Points */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoveredIndex === i;
            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)}>
                {/* Vertical hover guide */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={padding / 2}
                    x2={x}
                    y2={height - padding}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Point markers */}
                <circle cx={x} cy={getY(d.pv)} r={isHovered ? 5 : 3.5} fill="#3b82f6" />
                <circle cx={x} cy={getY(d.ac)} r={isHovered ? 5 : 3.5} fill="#f43f5e" />
                <circle cx={x} cy={getY(d.ev)} r={isHovered ? 6 : 4.5} fill="#0f766e" stroke="#ffffff" strokeWidth="2" />

                {/* X Axis labels */}
                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  fill={isHovered ? '#0f766e' : '#64748b'}
                  fontSize="10"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {d.period.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Period Metric Details */}
      {activePoint && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{activePoint.period}:</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <div>
              <span className="text-slate-500">PV (Previsto): </span>
              <span className="text-blue-600 font-bold">{formatCurrency(activePoint.pv)}</span>
            </div>
            <div>
              <span className="text-slate-500">AC (Coste Real): </span>
              <span className="text-rose-600 font-bold">{formatCurrency(activePoint.ac)}</span>
            </div>
            <div>
              <span className="text-slate-500">EV (Certificado): </span>
              <span className="text-brand-800 font-bold">{formatCurrency(activePoint.ev)}</span>
            </div>
            <div>
              <span className="text-slate-500">Margen Devengado: </span>
              <span className="text-emerald-700 font-bold">+{formatCurrency(activePoint.ev - activePoint.ac)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
