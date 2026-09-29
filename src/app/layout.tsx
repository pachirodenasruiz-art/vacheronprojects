'use client';

import React, { useState } from 'react';
import './globals.css';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { BC3ImportModal } from '@/components/dashboard/BC3ImportModal';
import { mockProjects } from '@/lib/mockData';
import { Project } from '@/lib/types';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentProject, setCurrentProject] = useState<Project>(mockProjects[0]);
  const [isBC3ModalOpen, setIsBC3ModalOpen] = useState(false);

  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <title>Vacheron Projects | Portal SaaS de Gestión de Obras</title>
        <meta name="description" content="Plataforma SaaS Cloud de gestión integral, control presupuestario a 3 ejes, planificación Gantt y facturación Veri*Factu." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" />
      </head>
      <body className="min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300">
        <div className="flex h-screen overflow-hidden bg-[#070b14] text-slate-100 font-sans">
          
          {/* Fixed Left Navigation Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            
            {/* Sticky Topbar */}
            <Topbar
              currentProject={currentProject}
              onSelectProject={(p) => setCurrentProject(p)}
              onOpenBC3Modal={() => setIsBC3ModalOpen(true)}
            />

            {/* Dynamic Page Content */}
            <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
              {children}
            </main>
          </div>

          {/* Global BC3 Importer Modal */}
          <BC3ImportModal
            isOpen={isBC3ModalOpen}
            onClose={() => setIsBC3ModalOpen(false)}
          />
        </div>
      </body>
    </html>
  );
}
