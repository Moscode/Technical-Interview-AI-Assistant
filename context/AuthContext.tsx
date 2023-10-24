"use client"
import firebase_app from "@/firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const auth = getAuth(firebase_app)

export const AuthContext = createContext<{} | any>({})

export const useAuthContext = () => {
    return(
        useContext(AuthContext)
    )
}

export const AuthContextProvider = ({children}:any) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user)
            }else {
                setUser(null);
            }
            setLoading(false)
        })
        return ()=> unsubscribe()
    }, [])

    return(
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div>:children}
        </AuthContext.Provider>
    )
}