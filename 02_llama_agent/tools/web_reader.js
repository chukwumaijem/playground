import { FunctionTool, HTMLReader, SummaryIndex } from 'llamaindex';
import * as cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';

const dataPath = path.join(process.cwd(), 'data');
const persistDir = path.join(dataPath, 'tmp_html');

async function readAndSummarizeWebpage({ url, query }) {
  const $ = await cheerio.fromURL(url);
  const html = $.html();
  const fileName = Date.now() + '.html';
  const filePath = path.join(persistDir, fileName);
  fs.writeFileSync(filePath, html);

  const reader = new HTMLReader();
  const document = await reader.loadData(filePath);
  const index = await SummaryIndex.fromDocuments(document);
  const response = await index.asQueryEngine().query({ query });
  return response?.message?.content;
}

export const webPageSummarizer = FunctionTool.from(readAndSummarizeWebpage, {
  name: 'web_reader',
  description: 'This tool can read and extract information from html pages.',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'the url of the webpage to be read',
      },
      query: {
        type: 'string',
        description: 'the action to be performed on the extracted web page',
      },
    },
    required: ['url', 'query'],
  },
});
