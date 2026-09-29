'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { ModulesGrid } from '@/components/landing/ModulesGrid';
import { RoleSelector } from '@/components/landing/RoleSelector';
import { InteractiveDemo } from '@/components/landing/InteractiveDemo';
import { VeriFactuBadge } from '@/components/landing/VeriFactuBadge';
import { DemoModal } from '@/components/landing/DemoModal';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Core 5 Functional Modules Benchmark Grid */}
      <ModulesGrid />

      {/* Solutions by Role & Industry */}
      <RoleSelector />

      {/* Live 3-Axis & Profit Interactive Simulation */}
      <InteractiveDemo />

      {/* Regulatory & Veri*Factu AEAT Security Badge */}
      <VeriFactuBadge />

      {/* Corporate Footer */}
      <Footer />

      {/* Lead Capture & Demo Scheduler Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </main>
  );
}
