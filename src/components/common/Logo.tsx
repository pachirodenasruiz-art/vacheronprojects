'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: { title: 'text-sm', subtitle: 'text-[9px] tracking-[0.25em]' },
    md: { title: 'text-lg', subtitle: 'text-[10px] tracking-[0.3em]' },
    lg: { title: 'text-2xl', subtitle: 'text-xs tracking-[0.35em]' },
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Geometric Isometric 3D Vacheron Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="vach_teal_light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id="vach_teal_dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0c4a45" />
            </linearGradient>
            <linearGradient id="vach_teal_deep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#042f2e" />
            </linearGradient>
          </defs>

          {/* Left Angle Symbol (V-chevron bottom) */}
          <g transform="translate(4, 20)">
            {/* Top facet */}
            <path
              d="M 5 25 L 35 45 L 65 25 L 65 37 L 35 57 L 5 37 Z"
              fill="url(#vach_teal_light)"
            />
            {/* Left side facet */}
            <path
              d="M 5 37 L 35 57 L 35 70 L 5 50 Z"
              fill="url(#vach_teal_dark)"
            />
            {/* Right side facet */}
            <path
              d="M 35 57 L 65 37 L 65 50 L 35 70 Z"
              fill="url(#vach_teal_deep)"
            />
            
            {/* Lower parallel strip */}
            <path
              d="M 5 55 L 35 75 L 35 83 L 5 63 Z"
              fill="url(#vach_teal_dark)"
            />
            <path
              d="M 35 75 L 65 55 L 65 63 L 35 83 Z"
              fill="url(#vach_teal_deep)"
            />
          </g>

          {/* Right Upper Peak Symbol (A-chevron top) */}
          <g transform="translate(48, 2)">
            {/* Top facet */}
            <path
              d="M 35 10 L 65 30 L 65 42 L 35 22 L 5 42 L 5 30 Z"
              fill="url(#vach_teal_light)"
            />
            {/* Left side facet */}
            <path
              d="M 5 30 L 35 10 L 35 22 L 5 42 Z"
              fill="url(#vach_teal_dark)"
            />
            {/* Right side facet */}
            <path
              d="M 35 10 L 65 30 L 65 42 L 35 22 Z"
              fill="url(#vach_teal_deep)"
            />
            {/* Lower parallel border */}
            <path
              d="M 5 48 L 35 28 L 35 36 L 5 56 Z"
              fill="url(#vach_teal_dark)"
            />
            <path
              d="M 35 28 L 65 48 L 65 56 L 35 36 Z"
              fill="url(#vach_teal_deep)"
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-extrabold tracking-tight text-[#0c4a45] font-sans leading-none ${textSizes[size].title}`}
          >
            VACHERON
          </span>
          <span
            className={`font-semibold uppercase text-slate-500 font-sans mt-0.5 ${textSizes[size].subtitle}`}
          >
            PROJECTS
          </span>
        </div>
      )}
    </div>
  );
};
