import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs/promises';
import { Document, Groq, Settings, VectorStoreIndex } from 'llamaindex';

async function main() {
  // Update LLM to use Groq
  Settings.llm = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // Load essay from abramov.txt in Node
  const path = 'node_modules/llamaindex/examples/abramov.txt';
  const essay = await fs.readFile(path, 'utf-8');
  const document = new Document({ text: essay, id_: 'essay' });

  // Load and index documents
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Get retriever
  const retriever = index.asRetriever();

  // Create a query engine
  const queryEngine = index.asQueryEngine({
    retriever,
  });

  const query = 'What is the meaning of life?';

  // Query
  const response = await queryEngine.query({
    query,
  });

  // Log the response
  console.log(response.response);
}

main().catch(console.error);
