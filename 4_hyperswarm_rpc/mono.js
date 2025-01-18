const RPC = require('@hyperswarm/rpc');
const Hyperswarm = require('hyperswarm');
const crypto = require('crypto');
const { rpcTopic } = require('../helpers/utils');
const { question } = require('../helpers/cli');

const swarm = new Hyperswarm();

function printMenu() {
  console.log('== Hyperswarm RPC: Choose Method ===');
  console.log('1. Echo');
  console.log('2. Exit');
}

async function main() {
  swarm.on('connection', async (_conn, peerInfo) => {
    console.log('New peer connected');
    const rpc = new RPC();
    const server = rpc.createServer();
    await server.listen(swarm.keyPair);

    server.respond('echo', (req) => {
      console.log(
        'Echoing Request from:',
        swarm.keyPair.publicKey.toString('hex')
      );
      return req;
    });

    const client = rpc.connect(peerInfo.publicKey);
    callMethods(client);
  });

  const topic = crypto.createHash('sha256').update(rpcTopic).digest();
  swarm.join(topic);

  async function callMethods(client, server) {
    while (true) {
      printMenu();
      const choice = await question('Enter your choice (1-2): ');

      switch (choice) {
        case '1':
          const message = 'hello world';
          console.log(`== Hyperswarm RPC: Echo ${message} ===`);
          const payload = Buffer.from(message);
          const resp = await client.request('echo', payload);
          console.log('Response:', resp.toString());
          break;
        case '2':
          console.log('Goodbye!');
          await client.end();
          await swarm.destroy();
          await server.close();
          break;
        default:
          console.log('Invalid choice! Please try again.');
      }
      console.log('\n\n\n');
    }
  }
}

main();
