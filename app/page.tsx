"use client";
import useLLM from "usellm";
import { useState } from "react";

export default function Home() {
  const llm = useLLM();
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");

  async function handleClick() {
    try {
      await llm.chat({
        template: "wisdomcoderbot",
        inputs:{
          question: question,
          solution: solution,
          language: language
        },
        stream: true,
        onStream: ({ message }) => {
          setResult(message.content)
        },
        onError: (error:any) => {
          console.error("Failed to connect", error)
        }
      });
      
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
  return (
    <div className="min-h-screen mx-auto my-8 max-w-[60%]">
      <div className="text-center mb-4">
      <h1 className="text-2xl font-bold">WisdomCoderBot</h1>
      <p className="font-small">I am an AI assistant that helps you keep note of your DSA practice problem and provide you a download PDF copy</p>
      </div>
      <div className="flex flex-col gap-y-[20px] w-[80%] mx-auto">
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
      </div>
      <div className="mt-4 whitespace-pre-wrap">
        <h1 className="text-3x font-semibold gray-900 underline">Built-in Methods, Algorithm Pattern and Big O Notation, & Alternative Pattern and Big O Notation</h1>
        <p className={`${result === ""?"":"border-2 p-[4px]"}`}>{result}</p>
      </div>
      </div>
  );
}
