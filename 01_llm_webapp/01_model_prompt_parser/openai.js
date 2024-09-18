import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function getCompletion(prompt) {
  const messages = [{ role: 'user', content: prompt }];
  const response = await client.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
  });

  const message = response.choices[0].message.content;
  console.log('=message==', message);
}

const customerEmail = `
Arrr, I be fuming that the blender lid flew off and splattered me
kitchen walls with smoothie! And to make matters worse,
the warranty don't cover the cost of cleaning the kitchen.
I need your help right now, matey!
`;

const style = 'American english in a calm and respectful tone.';
const prompt = `Translate the text that is delimited by triple quotes to ${style}: """${customerEmail}""".`;

getCompletion(prompt);