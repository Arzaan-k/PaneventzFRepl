import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AdminContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  saveContent: (contentType: string, data: any) => Promise<void>;
  contentChanged: boolean;
  markContentChanged: () => void;
  resetContentChanged: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode && contentChanged) {
      toast({
        title: "Unsaved changes",
        description: "You have unsaved changes. Please save your content before exiting edit mode.",
        variant: "destructive"
      });
    }
  };

  const markContentChanged = () => {
    setContentChanged(true);
  };

  const resetContentChanged = () => {
    setContentChanged(false);
  };

  const saveContent = async (contentType: string, data: any) => {
    setIsLoading(true);
    try {
      const endpoint = `/api/admin/${contentType}`;
      const method = data.id ? 'PUT' : 'POST';
      const url = data.id ? `${endpoint}/${data.id}` : endpoint;
      
      await apiRequest({
        url,
        method,
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      toast({
        title: "Success",
        description: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} content saved successfully!`
      });
      
      resetContentChanged();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: `Failed to save ${contentType} content. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{
      isEditMode,
      toggleEditMode,
      saveContent,
      contentChanged,
      markContentChanged,
      resetContentChanged,
      isLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminContextProvider');
  }
  return context;
};