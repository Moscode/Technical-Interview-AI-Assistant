import { createLLMService } from "usellm";

export const runtime = "edge";

const llmService = createLLMService(
    {openaiApiKey:process.env.OPENAI_API_KEY}
);

export async function GET(request:Request){
    return new Response("Hello Engineer", {status:200})
}

