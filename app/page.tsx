"use client";
import useLLM from "usellm";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import getData from '@/firebase/firestore/getData'

const imageStyle = {
  borderRadius: '100%',
  marginLeft: '30px',
  marginTop:'30px',
  marginBottom:'5%'
}

export default function Home() {

  interface historyType{
      question?: string;
      solution?: string;
      language?: string;
      message?: string;
  }

  const llm = useLLM();
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<historyType>()

  function handleSignOut(){
    const auth = getAuth();
  signOut(auth).then(() => {
    console.log("succefully signout")
  }).catch((error) => {
    console.log(error)
  });
  }

  async function handleClick() {
    try {
      const uid = getAuth().currentUser?.uid
      await llm.chat({
        template: "wisdomcoderbot",
        inputs:{
          question: question,
          solution: solution,
          language: language
        },
        stream: true,
        onStream: async ({ message }) => {
          setResult(message.content)
          const messageObj = {question: question, solution: solution, language: language, message: message.content}
          const {result, error} = await addData('history', uid, messageObj)
          if (error){
            console.log('error', error)
            return
          }
        },
        onError: (error:any) => {
          console.error("Failed to connect", error)
        }
      });      
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
  const { user } = useAuthContext()
  const router = useRouter()
  useEffect(()=>{
    if(user === null){
      router.push("/signin")
    }
  })

  useEffect(()=>{
    async function fetchHistory(){
    const uid = getAuth().currentUser?.uid
    const { result, error } = await getData('history', uid)
    if(error){
      console.error(error)
    }
    const historyData = result?.data()
    if (historyData){
      setHistory(historyData)
    }
    }
    fetchHistory()
  })
 
   return (
     <div className="min-h-screen flex justify-between my-8 max-w-[95%] mx-auto">
      <div className="w-[40%]">
        <Image width={50} height={50} style={imageStyle} src="/../public/wisdomcoderbotlogo.png" alt="wisdomcoderbot"/>
        <div className="border-2 mt-[50px]">{history?.question}</div>
      </div>
      <div className="w-[50%]">
      <div className="text-center mb-4">
      <h1 className="text-2xl font-bold">WisdomCoderBot</h1>
      <p className="font-small">I am an AI assistant that helps you keep note of your DSA practice problem and provide you a download PDF copy</p>
      </div>
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex flex-col w-[100%]">
        <label>Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your coding question"
          className="rounded border p-4 mr-2 text-black"
        />
        </div>
        <div className="flex flex-col w-[100%]">
        <label>Solution</label>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="Enter your solution"
          className="rounded border p-4 mr-2 text-black"
        />
        </div>
        <div className="flex flex-col w-[100%]">
        <label>Language</label>
        <textarea
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Enter the programming language"
          className="rounded border p-4 mr-2 text-black"
        />
        </div>
        <button
          className="rounded border border-black dark:border-white p-2 hover:bg-gray-700 hover:text-white"
          onClick={handleClick}
        >
          Submit
        </button>
        <button
          className="rounded border border-black dark:border-white p-2 hover:bg-red-700 hover:text-white"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
      <div className="mt-4 whitespace-pre-wrap">
        <h1 className="text-3x font-semibold gray-900 underline">Built-in Methods, Algorithm Pattern and Big O Notation, & Alternative Pattern and Big O Notation</h1>
        <p className={`${result === ""?"":"border-2 p-[4px]"}`}>{result}</p>
      </div>
      </div>
      </div>)
}
