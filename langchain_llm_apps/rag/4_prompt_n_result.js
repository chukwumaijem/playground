import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { documentChain } from './3_embedding_n_document_chain.js';

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
