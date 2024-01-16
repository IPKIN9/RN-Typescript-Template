// File: MyContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface schedulesInterface {
  id: number
  schedule_id: number
  polyId: number
  start_time: string
  end_time: string
  created_at: string
  updated_at: string
  nama_poly: string
  nama_ruangan: string
  jam_praktek: string
}

export interface doctorInterface {
  id: string
  nama: string
  alamat: string
  no_hp: string
  jk: string
  email: string
  pekerjaan: string
  status: string
  tgl_lahir: string
  agama: string
}

export interface IMedicalCardInterface {
  id: number
  no_rm: string
  nama_profile: string
  tl: string
  barcode: string
}

interface HomeContextState {
  isLoading       : boolean
  setIsLoading    : (loading: boolean) => void;
  pageLoading     : boolean
  setPageLoading  : (loading: boolean) => void;
  scheduleList    : schedulesInterface[]
  setScheduleList : (payload: schedulesInterface[]) => void;
  doctorList      : doctorInterface[]
  setDoctorList   : (payload: doctorInterface[]) => void;
  medicalCard     : IMedicalCardInterface
  setMedicalCard  : (payload: IMedicalCardInterface) => void;
}

const HomeContext = createContext<HomeContextState | undefined>(undefined);

export const HomeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isLoading , setIsLoading ] = useState (true);
  const [pageLoading , setPageLoading ] = useState (true);
  const [scheduleList, setScheduleList] = useState<schedulesInterface[]>([]);
  const [doctorList, setDoctorList] = useState<doctorInterface[]>([]);
  const [medicalCard, setMedicalCard] = useState<IMedicalCardInterface>({
    id: 0,
    barcode: '',
    no_rm: '',
    nama_profile: '',
    tl: ''
  })

  const initialState: HomeContextState = {
    isLoading,
    pageLoading,
    setIsLoading,
    setPageLoading,
    scheduleList,
    setScheduleList,
    doctorList,
    setDoctorList,
    medicalCard,
    setMedicalCard
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
