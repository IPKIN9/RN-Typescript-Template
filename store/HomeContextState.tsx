// File: MyContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface HomeContextState {
  isLoading  : boolean
  pageLoading: boolean
}
const HomeContext = createContext<HomeContextState | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: HomeContextState = {
    isLoading  : true,
    pageLoading: true
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
    throw new Error('useHomeContext must be used within a MyContextProvider');
  }
  return context;
};
