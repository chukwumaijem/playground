import { FunctionTool } from 'llamaindex';
import path from 'path';
import { mdToPdf } from 'md-to-pdf';

const dataPath = path.join(process.cwd(), 'data');
const persistDir = path.join(dataPath, 'report');

async function generateReport({ mdText }) {
  const fileName = Date.now() + '.pdf';
  const filePath = path.join(persistDir, fileName);
  try {
    await mdToPdf({ content: mdText }, { dest: filePath });
    return filePath;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const reportGenerator = FunctionTool.from(generateReport, {
  name: 'report_generator',
  description: 'Generate pdf report from markdown text',
  parameters: {
    type: 'object',
    properties: {
      mdText: {
        type: 'string',
        description: 'the markdown content be written to pdf',
      },
    },
    required: ['mdText'],
  },
});
