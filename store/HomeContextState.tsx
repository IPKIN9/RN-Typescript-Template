// File: MyContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

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

export interface IVisitHistory {
  id: number;
  visit_id: number;
  ket: string;
  tgl: string;
  visit_sugest: number;
  created_at: string;
  updated_at: string;
  profile_id: number;
  no_rm: string;
  no_registrasi: string;
}

interface HomeContextState {
  isLoading       : boolean
  setIsLoading    : (loading: boolean) => void;
  pageLoading     : boolean
  setPageLoading  : (loading: boolean) => void;
  doctorList      : doctorInterface[]
  setDoctorList   : (payload: doctorInterface[]) => void;
  medicalCard     : IMedicalCardInterface
  setMedicalCard  : (payload: IMedicalCardInterface) => void;
  visitHistory    : IVisitHistory[]
  setVisitHistory : (payload: IVisitHistory[]) => void;
}

const HomeContext = createContext<HomeContextState | undefined>(undefined);

export const HomeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isLoading , setIsLoading ] = useState (true);
  const [pageLoading , setPageLoading ] = useState (true);
  const [doctorList, setDoctorList] = useState<doctorInterface[]>([]);
  const [visitHistory, setVisitHistory] = useState<IVisitHistory[]>([]);
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
    doctorList,
    setDoctorList,
    medicalCard,
    setMedicalCard,
    visitHistory,
    setVisitHistory
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
