const Hypercore = require('hypercore');
const Hyperswarm = require('hyperswarm');
const crypto = require('crypto');
const DHT = require('hyperdht');
const fs = require('fs');
const { messagingBasePath, messagingTopic, getKeyPair } = require('./helpers');

const uname = process.argv[2]; // get username
if (!uname) {
  console.error('Usage: node messaging.js <username>');
  process.exit(1);
}

const feedDir = `${messagingBasePath}/${uname}-feed`;
const keyPair = getKeyPair(feedDir);
const swarm = new Hyperswarm({ keyPair });

async function main() {
  let feed = null;
  let pFeed = null;
  if (feed) {
    await feed.close().catch((err) => {
      console.error('Error closing user core:', err);
    });
  }
  feed = new Hypercore(feedDir, keyPair.publicKey, {
    keyPair,
  });

  swarm.on('connection', async (conn, peerInfo) => {
    console.log('New peer connected');
    feed.replicate(conn);

    if (pFeed) {
      await pFeed.close().catch((err) => {
        console.error('Error closing peer core:', err);
      });
    }

    const peerId = peerInfo.publicKey.toString('hex');
    pFeed = new Hypercore(`${messagingBasePath}/${peerId}-feed`, peerId);
    await pFeed.ready();
    pFeed.replicate(conn);
    await pFeed.update();

    readPeerMessages();
  });

  const topic = crypto.createHash('sha256').update(messagingTopic).digest();
  swarm.join(topic);

  function sendMessage(content) {
    const message = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sender: feed.discoveryKey.toString('hex'),
      content: content.toString('utf8'),
    };

    feed.append(JSON.stringify(message), (err) => {
      if (err) console.error('Failed to append message:', err);
      else console.log('Message sent:', message);
    });
  }

  async function readPeerMessages() {
    let pStream = null;
    if (pStream) {
      pStream.destroy();
    }

    try {
      pStream = pFeed.createReadStream({ live: true });
      for await (const block of pStream) {
        const message = JSON.parse(block);
        const prefix = `[Peer ${message.sender}]-[${message.timestamp}]`;
        console.log(`${prefix}: ${message.content}`);
      }
    } catch (err) {
      console.error('Peer stream error:', err);
    }
  }

  async function readUserMessages() {
    let currentStream = null;
    if (currentStream) {
      currentStream.destroy();
    }

    try {
      currentStream = feed.createReadStream({ live: true });
      for await (const block of currentStream) {
        const message = JSON.parse(block);
        console.log(`[Me]-[${message.timestamp}]: ${message.content}`);
      }
    } catch (err) {
      console.error('User stream error:', err);
    }
  }

  feed.on('ready', () => {
    console.log('Your feed public key:', feed.discoveryKey.toString('hex'));
    readUserMessages();

    // Append all stdin data as separate blocks to the core
    process.stdin.on('data', (data) => {
      sendMessage(data);
    });
  });
}

main();
