# Mini-Projects: Hypercore, HyperDHT, and Hyperswarm

## Project: P2P Chat Application

A peer-to-peer group chat system using Hypercore's networking capabilities.

**Objective**: Build a decentralized chat application where:

- Multiple peers can connect and exchange messages
- Messages are stored in a Hypercore feed
- Peers can discover and replicate each other's feeds
- Demonstrates Hypercore's replication and networking features

**Learning Goals**:

- Understanding Hypercore's append-only data structure
- Working with feed creation and management
- Implementing peer discovery and replication
- Handling real-time updates and message synchronization

## Improvements

- Don't read messages read previously after reconnection.

## How to Run

1. Install Dependencies

```bash
npm install
```

2. Open more than one terminal. From the root directory of the project, run

- In Terminal 1, Run

```bash
node 2_hypercore/messaging.js <username>
```

- In Terminal 2, Run

```bash
node 2_hypercore/messaging.js <username>
```

- Run in as many terminals as you want.

3. You can type messages in one terminal and they will appear in the other terminals once they are connected.
