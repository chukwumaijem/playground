import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a world renowned fashion designer.'],
  ['human', 'Suggest clothe combination a {gender} can wear for a {event}.'],
]);

const messageInput = await prompt.formatMessages({
  gender: 'man',
  event: 'night out.',
});
console.log('==messageInput==', messageInput);

const outputParser = new StringOutputParser();

const chain = RunnableSequence.from([prompt, model, outputParser]);
const resp = await chain.invoke({
  gender: 'man',
  event: 'night out.',
});

console.log('==resp==', resp);
