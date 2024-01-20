import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Buat tipe untuk profil dan histori pembayaran
interface GlobalContextType {
  loading: boolean;
  isAuth: boolean;
  setLoading: (loading: boolean) => void;
  setAuth: (auth: boolean) => void;
  cameraImage: null | string
  setCameraImage: Dispatch<SetStateAction<null | string>>;
}

// Buat konteks untuk profil dan histori pembayaran
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Komponen penyedia konteks
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [cameraImage, setCameraImage] = useState<null | string>(null);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        isAuth,
        setAuth,
        cameraImage,
        setCameraImage,
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
