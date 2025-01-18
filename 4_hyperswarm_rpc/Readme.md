# Mini-Project: Hyperswarm RPC Communication

## Project: Client-Server RPC API

A demonstration of peer-to-peer RPC (Remote Procedure Call) communication using Hyperswarm.

**Objective**: Learn how to set up a basic RPC server and client using Hyperswarm.

- Allows peers to invoke procedures/functions on remote systems
- Secure peer identification and connection
- A library for peer-to-peer RPC communication
- Converting between string and buffer formats for network communication
- Call the RPC server from a terminal using the hp-rpc-cli tool

**Learning Goals**:

- Understanding peer-to-peer RPC communication
- Working with public key cryptography
- Managing secure connections between peers
- Handling environment variables and configuration

## How to Run

1. First, start the server:

```bash
node server.js
```

The server will output its public key. Copy this key.

2. Create a .env file in the root directory of the project and add the server public key:

```bash
SERVER_PUBLIC_KEY=<paste-server-public-key-here>
```

3. In a new terminal, run the client:

```bash
node client.js
```

This will print a message once it connects to the server. it will call the `echo` procedure on the server and print the response.

4. Using the hp-rpc-cli tool, call the `echo` procedure on the server:

```bash
npx hp-rpc-cli -s <paste-server-public-key-here> -m "echo" -d "Hello World"
```

This will print the response from the server.

5. Mono. Using rpc over Hyperswarm, run the server and client in separate processes.
   Run the following command in a two separate terminals:

```bash
node mono.js <username>
```

After connecting to each other, you will see a prompt to choose a method to call. Terminal 1 will call the selected method on Terminal 2. Choosing exit will end the connection and close the processes.
