"use client"
import useLLM from "usellm"

export default function Home() {
  const llm = useLLM("https://usellm.org/api/llmservice");
  llm.chat({
    messages: [{role:"user", content:"What are you?"}],
    onSuccess: message:any => console.log(message)
  });

  return (
    <main>
      <h1>Hello Interview Assistant</h1>
    </main>
  )
}
