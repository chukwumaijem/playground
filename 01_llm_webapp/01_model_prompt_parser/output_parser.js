import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from "zod";
// import { StructuredOutputParser } from "langchain/output_parsers";

let personSchema = z
  .object({
    gift: z.optional(z.boolean()).describe("Is this a gift?"),
    delivery_days: z
      .optional(z.number())
      .describe("How long did it take to deliver?"),
      price_value: z
      .array(z.string())
      .describe("the value or perceived value of item"),
  })
  .describe("Information about a person.");

const parser = StructuredOutputParser.fromZodSchema(personSchema);
async function getCompletion(prompt) {
  const model = new ChatOpenAI({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    apiKey: process.env['OPENAI_API_KEY'],
  });

  
  // model.parser(parser)
  const message = await model.invoke(prompt);
  console.log('=message==', message);
}

const customer_review = `
This leaf blower is pretty amazing.  It has four settings:
candle blower, gentle breeze, windy city, and tornado. 
It arrived in two days, just in time for my wife's 
anniversary present. 
I think my wife liked it so much she was speechless. 
So far I've been the only one using it, and I've been 
using it every other morning to clear the leaves on our lawn. 
It's slightly more expensive than the other leaf blowers 
out there, but I think it's worth it for the extra features.
`;

const review_template = `
For the following text, extract the following information:

gift: Was the item purchased as a gift for someone else?
Answer True if yes, False if not or unknown.

delivery_days: How many days did it take for the product
to arrive? If this information is not found, output -1.

price_value: Extract any sentences about the value or price,
and output them as a comma separated array.

Format the output as JSON with the following keys:
gift
delivery_days
price_value

text: {text}
`;

async function getReviewResponse() {
  const promptTemplate = ChatPromptTemplate.fromTemplate(review_template);
  promptTemplate.partial(parser.getFormatInstructions())
  const messages = await promptTemplate.formatMessages({
    text: customer_review,
  });
  return messages;
}

const customerMessages = await getReviewResponse();

getCompletion(customerMessages);
