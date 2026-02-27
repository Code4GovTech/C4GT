import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Framework, Category } from '../types/framework';
import { fetchFrameworks, createFramework, updateFramework, deleteFramework } from '../services/api';

interface FrameworkContextType {
  frameworks: Framework[];
  loading: boolean;
  error: string | null;
  selectedFramework: Framework | null;
  setSelectedFramework: (framework: Framework | null) => void;
  saveFramework: (framework: Framework) => Promise<boolean>;
  removeFramework: (id: string) => Promise<boolean>;
  refreshFrameworks: () => Promise<void>;
}

const FrameworkContext = createContext<FrameworkContextType | undefined>(undefined);

export const useFramework = () => {
  const context = useContext(FrameworkContext);
  if (!context) {
    throw new Error('useFramework must be used within a FrameworkProvider');
  }
  return context;
};

interface FrameworkProviderProps {
  children: ReactNode;
}

export const FrameworkProvider: React.FC<FrameworkProviderProps> = ({ children }) => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  const refreshFrameworks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFrameworks();
      setFrameworks(data);
    } catch (err) {
      setError('Failed to fetch frameworks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFrameworks();
  }, []);

  const saveFramework = async (framework: Framework): Promise<boolean> => {
    try {
      setLoading(true);
      if (framework.id) {
        await updateFramework(framework);
      } else {
        await createFramework(framework);
      }
      await refreshFrameworks();
      return true;
    } catch (err) {
      setError('Failed to save framework');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFramework = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteFramework(id);
      await refreshFrameworks();
      return true;
    } catch (err) {
      setError('Failed to delete framework');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    frameworks,
    loading,
    error,
    selectedFramework,
    setSelectedFramework,
    saveFramework,
    removeFramework,
    refreshFrameworks,
  };

  return <FrameworkContext.Provider value={value}>{children}</FrameworkContext.Provider>;
};