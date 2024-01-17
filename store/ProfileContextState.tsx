import React, { ReactNode, createContext, useContext, useState } from "react";

export interface IUserProfile {
    id: number;
    no_rm: string;
    nik: string;
    nama: string;
    alamat: string;
    jk: string;
    agama: string;
    status_nikah: number;
    pekerjaan: string;
    kewarganegaraan: string;
    verified: number;
    created_at: string;
    updated_at: string;
    user_id: number;
}

interface ProfileContextState {
    isLoading          : boolean
    setIsLoading       : (payload: boolean) => void
    pageLoading        : boolean
    setPageLoading     : (payload: boolean) => void
    profile            : IUserProfile
    setProfile         : (payload: IUserProfile) => void
    showLogoutModal    : boolean
    setShowLogOutModal : (payload: boolean) => void
}

const ProfileContext = createContext<ProfileContextState | undefined>(undefined)

export const ProfileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading , setIsLoading ] = useState (true);
    const [pageLoading , setPageLoading ] = useState (true);
    const [showLogoutModal , setShowLogOutModal ] = useState (false);
    const [ profile, setProfile ] = useState<IUserProfile>({
        id: 0,
        no_rm: "",
        nik: "",
        nama: "",
        alamat: "",
        jk: "",
        agama: "",
        status_nikah: 0,
        pekerjaan: "",
        kewarganegaraan: "",
        verified: 0,
        created_at: "",
        updated_at: "",
        user_id: 0,
    })

    const initialState: ProfileContextState = {
        isLoading,
        pageLoading,
        setIsLoading,
        setPageLoading,
        profile,
        setProfile,
        showLogoutModal,
        setShowLogOutModal
    }

    return (
        <ProfileContext.Provider value={initialState}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error('useHomeContext must be used within a HomeContextProvider');
      }
    return context;
}