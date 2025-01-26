import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});

const prompt = ChatPromptTemplate.fromTemplate(
  'What are the good names for software company developing {product}?'
);

const messageInput = await prompt.formatMessages({
  product: 'a blogging application',
});
console.log('==messageInput==', messageInput);
