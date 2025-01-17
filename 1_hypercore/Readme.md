# Mini-Projects: Hypercore Basics

## Project 1: Writer/Reader System

A basic demonstration of Hypercore's append-only log functionality.

**Objective**: Create a simple writer/reader system where:

- One process writes messages to a Hypercore feed
- Another process reads messages from the same feed
- Demonstrates basic Hypercore feed creation and data retrieval

## How to Run

1. Install Dependencies

```bash
npm install
```

2. Open Two Terminals. From the root directory of the project, run

- In Terminal 1, Run

```bash
node 1_hypercore/writer.js
```

- In Terminal 2, Run

```bash
node 1_hypercore/reader.js
```

3. Type Messages in Terminal 1 and once Terminal 2 is connected, you should see the messages appear in Terminal 2.
