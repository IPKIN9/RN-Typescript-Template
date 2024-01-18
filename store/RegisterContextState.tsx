import React, { ReactNode, createContext, useContext, useState } from "react";

interface RegisterContextState {
    isLoading          : boolean
    setIsLoading       : (payload: boolean) => void
    pageLoading        : boolean
    setPageLoading     : (payload: boolean) => void
}

const RegisterContext = createContext<RegisterContextState | undefined>(undefined)
export const RegisterContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading , setIsLoading ] = useState (true);
    const [pageLoading , setPageLoading ] = useState (true);

    const initialState: RegisterContextState = {
        isLoading,
        pageLoading,
        setIsLoading,
        setPageLoading,
    }
    return (
        <RegisterContext.Provider value={initialState}>
            {children}
        </RegisterContext.Provider>
    )
}

export const useRegisterContext = () => {
    const context = useContext(RegisterContext)
    if (!context) {
        throw new Error('useHomeContext must be used within a HomeContextProvider');
      }
    return context;
}