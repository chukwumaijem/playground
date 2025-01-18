require('dotenv').config();
const RPC = require('@hyperswarm/rpc');

async function main() {
  const rpc = new RPC();

  const serverPublicKey = Buffer.from(process.env.SERVER_PUBLIC_KEY, 'hex');
  const client = rpc.connect(serverPublicKey);

  client.on('open', async () => {
    console.log('Client is open');
  });

  const response = await client.request('echo', Buffer.from('hello world'));
  console.log('Response:', response.toString());
}

main();
