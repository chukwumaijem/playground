import 'dotenv/config';

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const pdfLoader = new PDFLoader('./Frontend - Chukwuma Zikora.pdf');
const pdfDocs = await pdfLoader.load();

console.log('==pdfDocs==', pdfDocs);

/**
 * loader loads content in docs,
 * splitter splits them in small or bigger docs
 * depending on chunkSize
 */

// split document
const spliter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});

export const splitDocs = await spliter.splitDocuments(pdfDocs);
console.log('==splitDocs==', splitDocs);
