import 'dotenv/config';

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

/**
 * Load and Embed Documents
 */
const pdfLoader = new PDFLoader('./Frontend - Chukwuma Zikora.pdf', {
  splitPages: false,
});
const pdfDocs = await pdfLoader.load();

// split document
const spliter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});
const splitDocs = await spliter.splitDocuments(pdfDocs);

// embeddings
const embeddings = new OpenAIEmbeddings();
const vectorstore = new MemoryVectorStore(embeddings);
await vectorstore.addDocuments(splitDocs);

/**
 * Get Query Contexts
 */
// similarity search
const docs1 = await vectorstore.similaritySearch('Who is Chukwuma?', 3);
const content = docs1.map((doc) => doc.pageContent);

// retriever query
const retriever = vectorstore.asRetriever();
// const docs2 = await retriever.invoke('Who is Chukwuma?');
// const contents = docs2.map((doc) => doc.pageContent);

const convertDocsToString = (documents) => {
  return documents
    .map((document) => {
      return `<doc>\n${document.pageContent}\n</doc>`;
    })
    .join('\n');
};

const documentChain = RunnableSequence.from([
  (input) => input.question,
  retriever,
  convertDocsToString,
]);

// const docChainResp = await documentChain.invoke({
//   question: 'Who is Chukwuma?',
// });
// console.log('==docChainResp==', docChainResp);

/**
 * Create Prompt and run chain
 */
const TEMPLATE = `You are an experience interview able to look at
a candidates give a summary about them. Using the provided context,
answer the user's question to the best your ability. Be verbose.

<context>
{context}
</context>

Now, answer the question:
{question}
`;

const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);
const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});

// const answerChain = prompt.pipe(model).pipe(new StringOutputParser());
// const resp = await answerChain.invoke({
//   context: docChainResp,
//   question: 'Who is Chukwuma?',
// });
// console.log('==resp==', resp);

const answerChain2 = RunnableSequence.from([
  {
    context: documentChain,
    question: (input) => input.question,
  },
  prompt,
  model,
  new StringOutputParser(),
]);
const resp2 = await answerChain2.invoke({ question: 'Who is Chukwuma?' });
console.log('==resp2==', resp2);
