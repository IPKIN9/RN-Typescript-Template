import React, { ReactNode, createContext, useContext, useState } from "react";

interface FormData {
    nik: string;
    email: string;
    password: string;
    password_confirmation: string;
    nama: string;
    alamat: string;
    jk: string; // Pilihan jenis kelamin
    agama: string;
    status_nikah: number; // Pilihan status nikah (0: Belum Menikah, 1: Menikah, 2: Duda/Janda)
    pekerjaan: string;
    kewarganegaraan: string;
}
interface RegisterContextState {
    isLoading: boolean;
    setIsLoading: (payload: boolean) => void;
    pageLoading: boolean;
    setPageLoading: (payload: boolean) => void;
    registerForm: FormData
    setRegisterForm: (payload: FormData) => void;
}

const RegisterContext = createContext<RegisterContextState | undefined>(
    undefined
);
export const RegisterContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    const [registerForm, setRegisterForm] = useState({
        nik: "",
        email: "",
        password: "",
        password_confirmation: "",
        nama: "",
        alamat: "",
        jk: "",
        agama: "",
        status_nikah: 0 ,
        pekerjaan: "",
        kewarganegaraan: "",
    })

    const initialState: RegisterContextState = {
        isLoading,
        pageLoading,
        setIsLoading,
        setPageLoading,
        registerForm,
        setRegisterForm
    };
    return (
        <RegisterContext.Provider value={initialState}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegisterContext = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error(
            "useHomeContext must be used within a HomeContextProvider"
        );
    }
    return context;
};
