import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";


export const AuthContext = createContext<{ isAuthenticated: boolean, isLoading: boolean, user:any, setIsLoading: any, setIsError: any, isError: boolean, setIsAuthenticated: (status: boolean) => void }>({ user:null,isAuthenticated: false, setIsAuthenticated: (status) => null, isLoading: false, setIsLoading: () => null, isError: false, setIsError: () => null })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState<any>(null);
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    })

    const setAuthStatus = (status: boolean) => {
        setIsAuthenticated(status)
    }
    return <AuthContext.Provider
        value={{ user:user,isAuthenticated, isLoading, setIsLoading, isError, setIsError, setIsAuthenticated: setAuthStatus }}
    >
        {children}
    </AuthContext.Provider>
}