import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface ILoginPayload {
    username: string,
    password: string
}

interface ILoginContextState {
    isLoading       : boolean
    setIsLoading    : (loading: boolean) => void;
    pageLoading     : boolean
    setPageLoading  : (loading: boolean) => void;
    loginPayload    : ILoginPayload
    setLoginPayload : (payload: ILoginPayload) => void;
  }
const LoginContext = createContext<ILoginContextState | undefined>(undefined);
export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [isLoading , setIsLoading ] = useState (true);
    const [pageLoading , setPageLoading ] = useState (true);

    const [loginPayload , setLoginPayload ] = useState ({
        username: '',
        password: ''
    });

    const initialState: ILoginContextState = {
        isLoading,
        pageLoading,
        setIsLoading,
        setPageLoading,
        loginPayload,
        setLoginPayload
    };

    return (
        <LoginContext.Provider value={initialState}>
          {children}
        </LoginContext.Provider>
    );
}

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) {
      throw new Error('useLoginContext must be used within a HomeContextProvider');
    }
    return context;
};