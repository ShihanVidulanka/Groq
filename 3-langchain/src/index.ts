import dotenv from 'dotenv';
dotenv.config();

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";

async function main() {
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
  });

  const chatPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant that translates {input_language} to {output_language}.",
    ],
    ["human", "{input}"],
  ]);

  const chain = chatPrompt.pipe(llm);
  const response = await chain.invoke({
    input_language: "English",
    output_language: "German",
    input: "I love programming.",
  });

  console.log("response", response);
}

main().catch(console.error);
