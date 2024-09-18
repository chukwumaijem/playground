import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts';

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});

const prompt = ChatPromptTemplate.fromMessages([
  // ============== pattern 1 ================
  // SystemMessagePromptTemplate.fromTemplate(
  //   'You are a world renowned fashion designer.'
  // ),
  // HumanMessagePromptTemplate.fromTemplate(
  //   'Suggest clothe combination a {gender} can wear for a {event}'
  // ),

  // ============== pattern 2 ================
  ['system', 'You are a world renowned fashion designer.'],
  ['human', 'Suggest clothe combination a {gender} can wear for a {event}.'],
]);

const messageInput = await prompt.formatMessages({
  gender: 'man',
  event: 'night out.',
});
console.log('==messageInput==', messageInput);
