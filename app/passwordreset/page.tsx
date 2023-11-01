"use client"
import PasswordReset from "@/firebase/auth/passwordreset";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image'

const imageStyle = {
    borderRadius: '100%',
    marginLeft: '30px',
    marginTop:'30px',
    marginBottom:'5%'
  }

export default function Page(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const router = useRouter()

    const handlePasswordReset =async (event:any) => {
        event.preventDefault()

        const {result, error} = await PasswordReset(email)

        if (error){
            setError("Failed to Signin")
            return;
        }

        console.log(result)
        setTimeout(()=>setSuccess("Check your email for reset link"), 10000)
        return router.push("/signin")
    }

    return(
        <div className="bg-indigo-600 flex flex-col h-[100vh]">
        <div><Image width={50} height={50} style={imageStyle} src="/../public/wisdomcoderbotlogo.png" alt="wisdomcoderbot"/></div>
        <div className="w-full md:w-1/2 bg-indigo-600 p-6 mx-auto">
        <div className="form-wrapper">
            <h1 className="text-white text-3xl mt-6 mb-6">Sign in</h1>
            <form onSubmit={handlePasswordReset} className="form">
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
                <p className={`text-sm mt-2 ${error===''?'hidden':'text-[#b42b3c] bg-[#f6e6e4] rounded-lg'} px-2 py-2 w-[20%] ${success==''?'hidden':'text-[#2bb464] bg-[#f6e6e4] rounded-lg'}`}>{error || success}</p>
                <button
                    type="submit"
                    className="bg-indigo-900 text-white text-lg py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
                >
                    Reset Password
                </button>
            </form>
        </div>
    </div>
</div>

    )
}