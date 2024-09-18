import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

async function getCompletion(prompt) {
  const model = new ChatOpenAI({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    apiKey: process.env['OPENAI_API_KEY'],
  });

  const message = await model.invoke(prompt);
  console.log('=message==', message);
}
const template = `Translate the text that is delimited by triple quotes to {style}: """{email}""".`;

async function getCustomerMessage() {
  const style = 'American english in a calm and respectful tone.';
  const customerEmail = `
  Arrr, I be fuming that the blender lid flew off and splattered me
  kitchen walls with smoothie! And to make matters worse,
  the warranty don't cover the cost of cleaning the kitchen.
  I need your help right now, matey!
  `;

  const promptTemplate = ChatPromptTemplate.fromTemplate(template);
  const messages = await promptTemplate.formatMessages({
    style,
    email: customerEmail,
  });
  return messages;
}

async function getCustomerRepMessage() {
  const style = 'a polite tone that speaks pirate english';
  const customerRepReply = `Hi, our warranty does not cover cleaning expenses for your kitchen
  because it is your fault that you misused the product by not covering it properly. See ya.
  `;

  const promptTemplate = ChatPromptTemplate.fromTemplate(template);
  const messages = await promptTemplate.formatMessages({
    style,
    email: customerRepReply,
  });
  return messages;
}

const customerMessages = await getCustomerMessage();
getCompletion(customerMessages);
const customerRepReply = await getCustomerRepMessage();
getCompletion(customerRepReply);
