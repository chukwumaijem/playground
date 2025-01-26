import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a world renowned fashion designer.'],
  ['human', 'Suggest clothe combination a {gender} can wear for a {event}.'],
]);

const outputParser = new StringOutputParser();
const chain = prompt.pipe(model).pipe(outputParser);
const resp = await chain.invoke({
  product: 'a Canva alternative',
});

console.log('==resp==', resp);
