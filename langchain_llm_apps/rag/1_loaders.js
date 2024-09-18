import 'dotenv/config';

import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

const ghLoader = new GithubRepoLoader(
  'https://github.com/langchain-ai/langchainjs',
  {
    recursive: false,
    ignorePaths: ['*.md', 'yarn.lock'],
  }
);
const ghDocs = await ghLoader.load();

console.log('==ghDocs==', ghDocs.slice(0, 3));

const pdfLoader = new PDFLoader('./Frontend - Chukwuma Zikora.pdf');
const pdfDocs = await pdfLoader.load();

console.log('==pdfDocs==', pdfDocs);
