import { createContext, useContext, useState, ReactNode } from 'react'
import { UserRoles } from '../types/user.type'
import decode from 'jwt-decode'

type UserType = {
    id: number
    name: string
    surname: string
    email: string
    forms: string[]
    companyName: string
    role: UserRoles
}

interface AppContextValues {
    auth: boolean
    setAuth: (auth: boolean) => void
    isLoading: boolean
    setIsLoading: (auth: boolean) => void
    user: UserType | undefined
    setUser: (token: string) => void
}

const AppContext = createContext<AppContextValues | undefined>(undefined)

export function ContextProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [user, setUser] = useState<UserType>()
    const [auth, setAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
        const decoded: any = decode(token)
        setUser(decoded)
    }
    return (
        <AppContext.Provider
            value={{ auth, setAuth, setIsLoading, isLoading, user, setUser: setToken }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }
    return context
}
