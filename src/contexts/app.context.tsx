import { createContext, useState } from 'react'
import { ExtendPurchase } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
    extendPurchase: ExtendPurchase[]
    setExtendPurchase: React.Dispatch<React.SetStateAction<ExtendPurchase[]>>
    reset: () => void
}

const initialContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLS()),
    setIsAuthenticated: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    extendPurchase: [],
    setExtendPurchase: () => null,
    reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initialContext.profile)
    const [extendPurchase, setExtendPurchase] = useState<ExtendPurchase[]>(initialContext.extendPurchase)

    const reset = () => {
        setIsAuthenticated(false)
        setProfile(null)
        setExtendPurchase([])
    }

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                profile,
                setProfile,
                extendPurchase,
                setExtendPurchase,
                reset
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
