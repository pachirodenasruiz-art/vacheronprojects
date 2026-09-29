'use client';

import React, { useState } from 'react';
import './globals.css';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { BC3ImportModal } from '@/components/dashboard/BC3ImportModal';
import { ProjectModal } from '@/components/dashboard/ProjectModal';
import { ProjectProvider, useProjects } from '@/context/ProjectContext';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { 
    currentProject, 
    setCurrentProject,
    isEditModalOpen,
    setIsEditModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen
  } = useProjects();

  const [isBC3ModalOpen, setIsBC3ModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Sticky Topbar */}
        <Topbar
          currentProject={currentProject}
          onSelectProject={(p) => setCurrentProject(p)}
          onOpenBC3Modal={() => setIsBC3ModalOpen(true)}
          onOpenEditModal={() => setIsEditModalOpen(true)}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
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

      {/* Global Project Edit Modal */}
      <ProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mode="edit"
        projectToEdit={currentProject}
      />

      {/* Global Project Create Modal */}
      <ProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
      />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <title>Vacheron Projects | Portal SaaS de Gestión de Obras</title>
        <meta name="description" content="Plataforma SaaS Cloud de gestión integral, control presupuestario a 3 ejes, planificación Gantt y facturación Veri*Factu." />
        <link rel="icon" href="/vacheron-logo.jpg" />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-brand-100 selection:text-brand-900">
        <ProjectProvider>
          <DashboardContent>
            {children}
          </DashboardContent>
        </ProjectProvider>
      </body>
    </html>
  );
}
