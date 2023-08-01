"use client"
import useLLM from "usellm"

export default function Home() {
  const llm = useLLM();

  llm.chat({
    messages: [{role:"user", content:"What are you?"}],
    stream: true,
    onStream: message => console.log(message)
  });

  return (
    <main>
      <h1>Hello Interview Assistant</h1>
    </main>
  )
}
