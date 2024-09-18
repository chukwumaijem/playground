import {
  VectorStoreIndex,
  QueryEngineTool,
  storageContextFromDefaults,
  PDFReader,
} from 'llamaindex';
import path from 'path';
import fs from 'fs';

const dataPath = path.join(process.cwd(), 'data');
const pdfPath = path.join(dataPath, 'amplify_guideline.pdf');
const persistDir = path.join(dataPath, 'embeddings');

async function loadOrInitStore() {
  const embeddingsExist = fs.existsSync(persistDir);
  const storageContext = await storageContextFromDefaults({
    persistDir,
  });

  if (embeddingsExist) {
    console.log('Embeddings already exist, using them');
    return VectorStoreIndex.init({ storageContext });
  }

  console.log('Embeddings do not exist, generating them');
  const reader = new PDFReader();
  const document = await reader.loadData(pdfPath);
  return VectorStoreIndex.fromDocuments(document, {
    storageContext,
  });
}

export async function amplifyQueryEngine() {
  const index = await loadOrInitStore();
  const queryEngine = index.asQueryEngine();
  return new QueryEngineTool({
    queryEngine,
    metadata: {
      name: 'amplify_guide',
      description: 'This tool can help with amplify setup and troubleshooting.',
    },
  });
}
