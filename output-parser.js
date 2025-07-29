import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

import { configDotenv } from "dotenv";
import { StructuredOutputParser } from "langchain/output_parsers";

configDotenv();

const model = new ChatOpenAI({
  model: process.env.OPENAI_API_MODEL,
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  maxTokens: 1024,
  verbose: true,
});

// Create a chat prompt template
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer the following question: {question}",
  ],
  ["user", "{question}"],
]);

async function callStringOutputParser() {
  // Create an output parser
  const parser = new StringOutputParser();

  // create a chain
  const chain = prompt.pipe(model).pipe(parser);

  // Call Chain

  const response = await chain.invoke({
    question: "What are the Seven Wonders of the World?",
  });

  console.log(response);
}

async function callListOutputParser() {
  // Create an output parser
  const Listparser = new CommaSeparatedListOutputParser();
  const StringParser = new StringOutputParser();

  // create a chain
  const chain = prompt.pipe(model).pipe(Listparser);

  // Call Chain

  return await chain.invoke({
    question: "List all the planets in our solar system.",
  });
}

async function callStructuredOutputParser() {
  //Create an output parser
  const prompt = ChatPromptTemplate.fromTemplate(`
    Extract information form following phrase.
    Phrase : {phrase}
    Fomatting Instructions: {format_instructions} 
    `);

  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    name: "The name of the person",
    age: "The age of the person",
  });

  const chain = prompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    phrase: "Max is 37 years old",
    format_instructions: outputParser.getFormatInstructions(),
  });
}
const response = await callStructuredOutputParser();
console.log("Result", response);
