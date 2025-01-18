const RPC = require('@hyperswarm/rpc');

async function main() {
  const rpc = new RPC();

  const server = rpc.createServer();
  server.on('listening', () => {
    console.log('Server is listening on', server.address().publicKey.toString('hex'));
  });
  await server.listen();

  server.respond('echo', (req) => req);
}

main();
