"use client"
import SignUp from "@/firebase/auth/signup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSignUp =async (event:any) => {
        event.preventDefault()

        const {result, error} = await SignUp({email, password})

        if (error){
            setError("Failed to signup")
            return;
        }

        console.log(result)
        return router.push("/")
    }

    return(
        <div className="bg-indigo-600 flex flex-col h-[100vh]">
            <div><Image className="w-[8%] rounded-[40%] ml-[30px] mt-[30px] mb-[5%]" src="./wisdomcoderbotlogo.png" alt="wisdomcoderbot"/></div>
        <div className="w-full md:w-1/2 bg-indigo-600 p-6 mx-auto">
        <div className="form-wrapper">
            <h1 className="text-white text-3xl mt-6 mb-6">Sign up</h1>
            <form onSubmit={handleSignUp} className="form">
                <label htmlFor="email" className="text-white text-lg">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@mail.com"
                        className="w-full py-2 px-3 rounded-lg bg-indigo-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-300"
                    />
                </label>
                <label htmlFor="password" className="text-white text-lg">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className="w-full py-2 px-3 rounded-lg bg-indigo-800 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-300"
                    />
                </label>
                <p className={`text-[#b42b3c] text-sm mt-2 ${error===''?'hidden':'bg-[#f6e6e4] rounded-lg'} px-2 py-2 w-[20%]`}>{error}</p>
                <p className="font-bold pt-4">Already have an account?{' '}<span className="text-[#ffca44] underline cursor-pointer pt-2" onClick={()=> router.push("/signin")}>Login</span></p>
                <button
                    type="submit"
                    className="bg-indigo-900 text-white text-lg py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
                >
                    Sign up
                </button>
            </form>
        </div>
    </div>
</div>
    )
}