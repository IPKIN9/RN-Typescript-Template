// File: MyContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface schedulesInterface {
  id         : number,
  polyId     : number,
  dokterId   : number,
  tgl        : string,
  startDate  : string,
  endDate    : string,
  created_at : string,
  updated_at : string,
  doctor_name: string,
  poly       : string,
}

interface HomeContextState {
  isLoading      : boolean
  pageLoading    : boolean
  scheduleList   : schedulesInterface[]
  setIsLoading   : (loading: boolean) => void;
  setPageLoading : (loading: boolean) => void; 
  setScheduleList : (payload: schedulesInterface[]) => void; 
}

const HomeContext = createContext<HomeContextState | undefined>(undefined);

export const HomeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [scheduleList, setScheduleList] = useState<schedulesInterface[]>([]);

  const initialState: HomeContextState = {
    isLoading,
    pageLoading,
    setIsLoading,
    setPageLoading,
    scheduleList,
    setScheduleList
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
