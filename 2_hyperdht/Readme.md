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
