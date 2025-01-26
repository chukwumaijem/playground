import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});

const template = `
You are an expert at combining letters of the english alphabet to make names for a domain.
SHOW A MINIMUM OF 20 domain names.
SHOW ONLY NAMES PRONOUNCEABLE IN THE ENGLISH LANGUAGE.
ONLY SHOW NAMES NOT IN THE DICTIONARY.
DO NOT ADD DOMAINS NAMES THAT EXIST ALREADY.
`;
const prompt = ChatPromptTemplate.fromMessages([
  ['system', template],
  [
    'human',
    'Generate domain names for a restaurant chain. Use 4 to 6 letter words.',
  ],
]);

const outputParser = new StringOutputParser();
const chain = prompt.pipe(model).pipe(outputParser);
const resp = await chain.invoke();

console.log('==resp==', resp);
