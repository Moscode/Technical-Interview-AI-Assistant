"use client"
import SignIn from "@/firebase/auth/signin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const imageStyle = {
    borderRadius: '100%',
    marginLeft: '30px',
    marginTop:'30px',
    marginBottom:'5%'
  }
  
export default function Page(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

    const handleSignIn =async (event:any) => {
        event.preventDefault()

        const {result, error} = await SignIn({email, password})

        if (error){
            setError("Failed to Signin")
            return;
        }

        console.log(result)
        return router.push("/")
    }

    return(
        <div className="bg-indigo-600 flex flex-col h-[100vh]">
        <div><Image width={50} height={50} style={imageStyle} src="/../public/wisdomcoderbotlogo.png" alt="wisdomcoderbot"/></div>
        <div className="w-full md:w-1/2 bg-indigo-600 p-6 mx-auto">
        <div className="form-wrapper">
            <h1 className="text-white text-3xl mt-6 mb-6">Sign in</h1>
            <form onSubmit={handleSignIn} className="form">
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
                <p className="font-bold pt-4">Forgot Password? <span className="text-[#ffca44] underline cursor-pointer" onClick={()=> router.push("/passwordreset")}>Recover it</span></p>
                <p className="font-bold">Do not have an account? <span className="text-[#ffca44] underline cursor-pointer" onClick={()=> router.push("/signup")}>Create one for free</span></p>
                <button
                    type="submit"
                    className="bg-indigo-900 text-white text-lg py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
                >
                    Sign in
                </button>
            </form>
        </div>
    </div>
</div>

    )
}