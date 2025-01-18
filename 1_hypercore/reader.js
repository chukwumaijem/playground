const Hyperswarm = require('hyperswarm');
const Hypercore = require('hypercore');
const crypto = require('crypto');
const { writerReaderTopic, writerReaderBasePath } = require('../helpers/utils');

const corePath = writerReaderBasePath + (process.argv[2] || 'reader-storage');
async function main() {
  const swarm = new Hyperswarm();
  let currentCore = null;
  let currentStream = null;

  const topic = crypto.createHash('sha256').update(writerReaderTopic).digest();
  swarm.join(topic);

  swarm.on('connection', async (conn, peerInfo) => {
    console.log('New peer connected');
    if (currentStream) {
      currentStream.destroy();
    }
    if (currentCore) {
      await currentCore
        .close()
        .catch((err) => console.error('Error closing core:', err));
    }

    const coreKey = peerInfo.publicKey.toString('hex');
    currentCore = new Hypercore(corePath, coreKey);
    await currentCore.ready();
    currentCore.replicate(conn);
    await currentCore.update();

    let position = currentCore.length;
    currentStream = currentCore.createReadStream({ live: true });

    try {
      for await (const block of currentStream) {
        console.log(`Block ${position++}: ${block}`);
      }
    } catch (err) {
      console.error('Stream error:', err);
    }
  });
}

main();
