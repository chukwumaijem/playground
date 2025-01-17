const DHT = require('hyperdht');
const fs = require('fs');

const writerReaderBasePath = './data/1_hypercore/writer-reader/';
const writerReaderTopic = 'writer-reader-group';

const messagingBasePath = './data/2_hyperdht/messaging/';
const messagingTopic = 'messaging-group';

const todoBasePath = './data/3_hyperbee/todo/';

function getKeyPair(feedDir) {
  const keyPairPath = `${feedDir}/keys`;
  const publicKeyFile = `${keyPairPath}/public.key`;
  const secretKeyFile = `${keyPairPath}/secret.key`;
  if (fs.existsSync(publicKeyFile) && fs.existsSync(secretKeyFile)) {
    return {
      publicKey: fs.readFileSync(publicKeyFile),
      secretKey: fs.readFileSync(secretKeyFile),
    };
  } else {
    const keyPair = DHT.keyPair();
    fs.mkdirSync(keyPairPath, { recursive: true });
    fs.writeFileSync(publicKeyFile, keyPair.publicKey);
    fs.writeFileSync(secretKeyFile, keyPair.secretKey);
    return keyPair;
  }
}

module.exports = {
  messagingBasePath,
  messagingTopic,
  writerReaderBasePath,
  writerReaderTopic,
  todoBasePath,
  getKeyPair,
};
