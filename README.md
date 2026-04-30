# Taskboard — Full-Stack TODO App

A full-stack TODO application built with React, Express.js, and MongoDB.

## Quick Start

```bash
# Terminal 1 — Backend
cd server
npm install
cp .env.example .env   # edit MONGODB_URI if needed
npm run dev

# Terminal 2 — Frontend
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
hiring-fullstack-todo/
├── client/       # React + Vite frontend
│   └── README.md
├── server/       # Express + Mongoose backend
│   └── README.md
└── README.md     # This file
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, CSS Modules, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |

## Architecture Decisions

**Separation of concerns**: The `client/` and `server/` directories are completely independent projects, each with their own `package.json`. This mirrors real-world monorepo patterns without adding unnecessary tooling complexity.

**Custom hook (`useTodos`)**: All data-fetching and mutation logic lives in a single hook. Components stay simple and focused only on rendering.

**Optimistic UI**: Create, toggle, update, and delete operations update the UI immediately and automatically roll back if the API call fails. This keeps the app feeling fast.

**CSS Modules**: Scoped styles per component avoid class name collisions and keep styling co-located with components.

**Controller/Route split**: Business logic is separated from route definitions, making the backend easy to test and extend.

## Features

- Create, read, update, delete TODOs
- Toggle done/undone with optimistic UI
- Inline editing with keyboard shortcuts (Ctrl+Enter to save, Esc to cancel)
- Filter by All / Active / Done
- Form validation with character limits and inline error messages
- Loading skeleton and dismissable error banner
- Responsive layout
