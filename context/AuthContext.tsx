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
            {loading ? <div className="bg-indigo-600 w-[100%] mx-auto flex justify-center h-[100vh] items-center"><div className="w-[50px] h-[50px] border-[3px] rounded-[50px] border-[#ffffff36] border-t-[#fff] animate-spin"></div></div>:children}
        </AuthContext.Provider>
    )
}