import 'dotenv/config';
import { OpenAIAgent } from 'llamaindex';
import readline from 'readline';
import { amplifyQueryEngine } from './tools/guidelines.js';
import { webPageSummarizer } from './tools/web_reader.js';
import { reportGenerator } from './tools/report.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const chatHistory = [];
const amplifyTool = await amplifyQueryEngine();

async function chatWithAgent(question) {
  const agent = new OpenAIAgent({
    tools: [amplifyTool, webPageSummarizer, reportGenerator],
  });
  const response = await agent.chat({
    message: question,
    chatHistory,
  });
  return response.message;
}

function getUserInput() {
  return new Promise((resolve) => {
    rl.question('You: ', (data) => {
      resolve(data);
    });
  });
}

async function main() {
  let input = await getUserInput();
  while (input !== 'quit') {
    const response = await chatWithAgent(input);
    console.log('Assistant: ', response.content);
    chatHistory.push({ role: 'user', content: input });
    chatHistory.push({ role: 'assistant', content: response.content });
    input = await getUserInput();
  }
  rl.close();
}

main();

/**
 * Sample prompts
 *
 * generate a pdf report on cheerio
 *
 * summarize the content of this page for me: https://cheerio.js.org/docs/basics/loading
 * what is the main point of this news story https://www.vanguardngr.com/2024/09/fg-seeks-more-support-for-tinubus-reform-programmes
 */
