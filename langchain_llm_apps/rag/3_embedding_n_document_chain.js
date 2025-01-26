import 'dotenv/config';

import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RunnableSequence } from '@langchain/core/runnables';

import { splitDocs } from './2_splitter.js';

// embeddings
const embeddings = new OpenAIEmbeddings();
const vectorstore = new MemoryVectorStore(embeddings);
await vectorstore.addDocuments(splitDocs);

/**
 * Get Query Contexts
 */
// similarity search
// const docs1 = await vectorstore.similaritySearch('Who is Chukwuma?', 3);
// const pageContent1 = docs1.map((doc) => doc.pageContent);
// console.log('==pageContent1==', pageContent1);

// retriever query
const retriever = vectorstore.asRetriever();
// const docs2 = await retriever.invoke('Who is Chukwuma?');
// const pageContent2 = docs2.map((doc) => doc.pageContent);
// console.log('==pageContent2==', pageContent2);

// convert returned docs to string with <doc></doc> tag separating the pages.
const convertDocsToString = (documents) => {
  return documents
    .map((document) => {
      return `<doc>\n${document.pageContent}\n</doc>`;
    })
    .join('\n');
};

export const documentChain = RunnableSequence.from([
  (input) => input.question,
  retriever,
  convertDocsToString,
]);

// const docChainResp = await documentChain.invoke({
//   question: 'Who is Chukwuma?',
// });
// see context returned by document chain when invoked
// console.log('==docChainResp==', docChainResp);
