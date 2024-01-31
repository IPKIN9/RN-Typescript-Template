import React, { ReactNode, createContext, useContext, useState } from "react";

export interface IFormData {
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

export interface IOcrResponse {
    nik: string
    nama: string
    ttl: string
    jk: string
    alamat: string
}
interface RegisterContextState {
    isLoading: boolean;
    setIsLoading: (payload: boolean) => void;
    pageLoading: boolean;
    setPageLoading: (payload: boolean) => void;
    formStep: number;
    setFormStep: (payload: number) => void;
    registerForm: IFormData
    setRegisterForm: (payload: IFormData) => void;
}

const RegisterContext = createContext<RegisterContextState | undefined>(
    undefined
);
export const RegisterContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [formStep, setFormStep] = useState(1);
    const [registerForm, setRegisterForm] = useState({
        nik: "",
        email: "",
        password: "",
        password_confirmation: "",
        nama: "",
        alamat: "",
        jk: "",
        agama: "islam",
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
        setRegisterForm,
        formStep,
        setFormStep
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
