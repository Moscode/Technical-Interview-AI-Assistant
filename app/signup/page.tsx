"use client"
import SignUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSignUp =async (event:any) => {
        event.preventDefault()

        const {result, error} = await SignUp({email, password})

        if (error){
            console.log(error)
            return;
        }

        console.log(result)
        return router.push("/")
    }

    return(
        <div className="">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign up</h1>
            <form onSubmit={handleSignUp} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>
    )
}