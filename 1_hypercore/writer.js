const Hyperswarm = require('hyperswarm');
const Hypercore = require('hypercore');
const crypto = require('crypto');
const {
  writerReaderTopic,
  writerReaderBasePath,
  getKeyPair,
} = require('../helpers/utils');

const corePath = writerReaderBasePath + (process.argv[2] || 'writer-storage');
async function main() {
  const keyPair = getKeyPair(corePath);
  const core = new Hypercore(corePath, keyPair.publicKey, {
    keyPair,
  });
  const swarm = new Hyperswarm({ keyPair });
  await core.ready();

  // Append all stdin data as separate blocks to the core
  process.stdin.on('data', (data) => core.append(data));

  const topic = crypto.createHash('sha256').update(writerReaderTopic).digest();
  swarm.on('connection', (conn) => {
    console.log('New peer connected');
    core.replicate(conn);
  });
  swarm.join(topic);
}

main();
