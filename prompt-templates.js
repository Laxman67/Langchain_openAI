import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { configDotenv } from "dotenv";

configDotenv();

const model = new ChatOpenAI({
  model: process.env.OPENAI_API_MODEL,
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  maxTokens: 1024,
  verbose: true,
});

// Create a chat prompt template

// const prompt = ChatPromptTemplate.fromTemplate(
//   "You are a helpful assistant. Answer the following question: {question}"
// );

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer the following question: {question}",
  ],
  ["user", "{question}"],
]);

// console.log(await prompt.format({ question: "What is the capital of India?" }));

// create a chain

const chain = prompt.pipe(model);
// Call Chain

// 1 Question
const response = await chain.invoke({
  question: "What is the capital of India?",
});

console.log(response);

// 2. Question

const response2 = await chain.invoke({
  question: "What is the capital of France?",
});

console.log(response2);
