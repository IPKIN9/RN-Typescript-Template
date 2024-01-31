import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


export interface schedulesInterface {
  id: number
  schedule_id: number
  poly_id: number
  start_time: string
  end_time: string
  created_at: string
  updated_at: string
  nama_poly: string
  nama_ruangan: string
  jam_praktek: string
}
// Buat tipe untuk profil dan histori pembayaran
interface GlobalContextType {
  loading: boolean;
  isAuth: boolean;
  setLoading: (loading: boolean) => void;
  setAuth: (auth: boolean) => void;
  cameraImage: null | string
  setCameraImage: Dispatch<SetStateAction<null | string>>;
  scheduleList    : schedulesInterface[]
  setScheduleList : (payload: schedulesInterface[]) => void;
}

// Buat konteks untuk profil dan histori pembayaran
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Komponen penyedia konteks
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [cameraImage, setCameraImage] = useState<null | string>(null);
  const [scheduleList, setScheduleList] = useState<schedulesInterface[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        isAuth,
        setAuth,
        cameraImage,
        setCameraImage,
        scheduleList,
        setScheduleList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook untuk menggunakan state global
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
