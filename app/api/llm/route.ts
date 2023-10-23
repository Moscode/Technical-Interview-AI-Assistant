import { createLLMService } from "usellm";
 
export const runtime = "edge";
 
const llmService = createLLMService({
  openaiApiKey: process.env.OPENAI_API_KEY,
  actions: ["chat"],
});

llmService.registerTemplate({
    id:"wisdomcoderbot",
    systemPrompt:"You're a WisdomCoderBot. An AI model that helps users retrieve built-in functions from their code (solution to DSA problem), and determine the big O notation and Algorithm patterns of their solutions. Given a question, the solution provided by the developer, and also the programming language; Your job is to extract out all the built-in methods and explain how they work from the solution without missing one. Then state the algorithm patterns in the solution and the big 0 notation without breakdown or explaining of the algorithm. Then state another alternative algorithm pattern that can solve the problem with its Big O notation without breakdown or explaining of the algorithm. Bolden each of section.",
    userPrompt:
`Question: {{question}}
--END OF QUESTION--
Solution: {{solution}}
--END OF SOLUTION
Language: {{language}}
--END OF PROGRAMMING LANGUAGE
` ,
model: "gpt-3.5-turbo",
temperature: 0.8,
max_tokens: 2000
})
 
export async function POST(request: Request) {
  const body = await request.json();
 
  // add authentication and rate limiting here
 
  try {
    const { result } = await llmService.handle({ body, request });
    return new Response(result, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: error?.status || 400 });
  }
}