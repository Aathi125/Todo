# TODO App — Frontend

React SPA that communicates with the Express backend to manage TODO items.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **Axios** — HTTP client
- **CSS Modules** — Scoped, component-level styling

## Getting Started

### Prerequisites

- Node.js ≥ 18
- The backend server running (see `../server/README.md`)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The Vite dev server is configured to proxy `/api/*` requests to `http://localhost:5000`, so no CORS configuration is needed during development.

### Build for Production

```bash
npm run build    # Output goes to dist/
npm run preview  # Preview the production build locally
```

## Features

- **View TODOs** — Listed newest first, with All / Active / Done filter tabs
- **Create TODO** — Form with title  (required) and description (optional), with character limits and inline validation
- **Edit TODO** — Click the edit icon on any task to edit inline; Ctrl+Enter to save, Esc to cancel
- **Toggle done** — Click the checkbox to mark as done/undone; completed tasks show with strikethrough
- **Delete TODO** — Click the trash icon to remove a task
- **Optimistic UI** — All mutations update the UI immediately and roll back gracefully on error
- **Loading state** — Skeleton placeholders while fetching
- **Error handling** — Dismissable error banner for API failures

## Project Structure

```
client/
├── src/
│   ├── api/
│   │   └── todos.js          # Axios API calls
│   ├── components/
│   │   ├── ErrorBanner.jsx   # Dismissable error message
│   │   ├── Skeleton.jsx      # Loading placeholder
│   │   ├── TodoForm.jsx      # Create TODO form
│   │   ├── TodoItem.jsx      # Single TODO row (view + edit mode)
│   │   └── TodoList.jsx      # List with filter tabs
│   ├── hooks/
│   │   └── useTodos.js       # All state logic + optimistic updates
│   ├── App.jsx               # Root layout
│   ├── App.module.css
│   └── index.css             # Global design tokens + animations
├── index.html
└── vite.config.js
```

## Assumptions & Limitations

- The app expects the backend to be available at `http://localhost:5000` (proxied via Vite config).
- For production deployment, set the `VITE_API_URL` or update the proxy target in `vite.config.js`.
- No client-side routing — this is a single-page application with one view.
