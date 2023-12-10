// File: MyContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface HomeContextState {
  isLoading  : boolean
  pageLoading: boolean,
  setIsLoading: (loading: boolean) => void; 
}
const HomeContext = createContext<HomeContextState | undefined>(undefined);

export const HomeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const initialState: HomeContextState = {
    isLoading,
    pageLoading,
    setIsLoading
  };

  return (
    <HomeContext.Provider value={initialState}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeContextProvider');
  }
  return context;
};
