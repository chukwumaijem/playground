# Mini-Project: Hyperbee

## Project: Terminal-Based Todo Application

A simple todo application that allows users to add, view, edit, delete, and toggle the status of tasks.

**Objective**: Build a terminal-based todo application using Hyperbee as a persistent key-value store to manage and track tasks.

- Uses Hyperbee as the underlying database
- Stores todos with timestamp-based keys
- JSON serialization for todo data
- CLI interface for user interaction

**Learning Goals**:

- Working with Hyperbee/Hypercore for data persistence
- Implementing CRUD operations with a key-value store
- Managing structured data with JSON serialization
- Building interactive CLI applications

## How to Run

1. Install dependencies:

   ```bash
   npm install hyperbee hypercore
   ```

2. From the root directory of the project, run:
   ```bash
   node 3_hyperbee/todo.js
   ```
