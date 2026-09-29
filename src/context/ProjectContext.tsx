'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { mockProjects } from '@/lib/mockData';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  createProject: (projectData: Partial<Project>) => Project;
  deleteProject: (projectId: string) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vacheron_projects_data_v1';
const ACTIVE_PROJECT_KEY = 'vacheron_active_project_id_v1';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProjectState] = useState<Project>(mockProjects[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(LOCAL_STORAGE_KEY);
      const savedActiveId = localStorage.getItem(ACTIVE_PROJECT_KEY);
      
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects) as Project[];
        if (parsed && parsed.length > 0) {
          setProjects(parsed);
          const matched = parsed.find(p => p.id === savedActiveId) || parsed[0];
          setCurrentProjectState(matched);
        }
      }
    } catch (e) {
      console.error('Error loading projects from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever projects change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
      localStorage.setItem(ACTIVE_PROJECT_KEY, currentProject.id);
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [projects, currentProject, isLoaded]);

  const setCurrentProject = (project: Project) => {
    setCurrentProjectState(project);
    try {
      localStorage.setItem(ACTIVE_PROJECT_KEY, project.id);
    } catch (e) {}
  };

  const updateProject = (updated: Project) => {
    setProjects(prev => {
      const next = prev.map(p => p.id === updated.id ? updated : p);
      return next;
    });
    if (currentProject.id === updated.id) {
      setCurrentProjectState(updated);
    }
  };

  const createProject = (data: Partial<Project>): Project => {
    const newId = `prj-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      code: data.code || `PRJ-${new Date().getFullYear()}-${String(projects.length + 1).padStart(2, '0')}`,
      name: data.name || 'Nueva Obra Personalizada',
      client: data.client || 'Cliente Principal',
      location: data.location || 'Madrid, España',
      manager: data.manager || 'Miguel Ángel Rodenas (Construction Manager)',
      type: data.type || 'Residencial',
      status: data.status || 'en_curso',
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      plannedBudget: Number(data.plannedBudget) || 1200000,
      targetContractValue: Number(data.targetContractValue) || 1450000,
      actualCost: Number(data.actualCost) || 350000,
      certifiedAmount: Number(data.certifiedAmount) || 420000,
      invoicedAmount: Number(data.invoicedAmount) || 399000,
      collectedAmount: Number(data.collectedAmount) || 350000,
      progressPercentage: Number(data.progressPercentage) || 28.5,
      cpi: data.actualCost && data.certifiedAmount && data.actualCost > 0 ? Number((data.certifiedAmount / data.actualCost).toFixed(2)) : 1.2,
      spi: 1.05,
    };

    setProjects(prev => [newProject, ...prev]);
    setCurrentProjectState(newProject);
    return newProject;
  };

  const deleteProject = (id: string) => {
    setProjects(prev => {
      const filtered = prev.filter(p => p.id !== id);
      if (filtered.length > 0) {
        if (currentProject.id === id) {
          setCurrentProjectState(filtered[0]);
        }
        return filtered;
      }
      return prev; // keep at least one
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        setCurrentProject,
        updateProject,
        createProject,
        deleteProject,
        isEditModalOpen,
        setIsEditModalOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
