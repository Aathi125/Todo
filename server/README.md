# TODO App — Backend

Express.js REST API backed by MongoDB.

## Tech Stack

- **Node.js** + **Express.js** — HTTP server and routing
- **Mongoose** — MongoDB ODM for schema modeling and validation
- **dotenv** — Environment variable management
- **cors** — Cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill in values
cp .env.example .env

# 3. Start the development server (with auto-reload)
npm run dev

# 4. Or start in production mode
npm start
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Port the server listens on |
| `MONGODB_URI` | `mongodb://localhost:27017/todo-app` | MongoDB connection string |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin (your React app) |

**MongoDB Atlas**: replace `MONGODB_URI` with your Atlas connection string, e.g.:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
```

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos` | Get all TODO items (newest first) |
| `POST` | `/api/todos` | Create a new TODO |
| `PUT` | `/api/todos/:id` | Update title and/or description |
| `PATCH` | `/api/todos/:id/done` | Toggle done status |
| `DELETE` | `/api/todos/:id` | Delete a TODO |
| `GET` | `/api/health` | Health check |

### Example Payloads

**POST /api/todos**
```json
{ "title": "Buy groceries", "description": "Milk, eggs, bread" }
```

**PUT /api/todos/:id**
```json
{ "title": "Updated title", "description": "Updated description" }
```

## Project Structure

```
server/
├── src/
│   ├── index.js          # Entry point — connects DB and starts server
│   ├── app.js            # Express app setup (middleware, routes)
│   ├── db.js             # Mongoose connection
│   ├── models/
│   │   └── Todo.js       # Mongoose schema
│   ├── controllers/
│   │   └── todoController.js  # Route handlers / business logic
│   ├── routes/
│   │   └── todos.js      # Route definitions
│   └── middleware/
│       └── errorHandler.js    # Global error handler
├── .env.example
└── package.json
```

## Assumptions & Limitations

- No authentication — this is a single-user demo app.
- No pagination — all TODOs are returned in one request. For production, add cursor-based pagination.
- Validation is handled at both the Mongoose schema level and the controller level for clear error messages.
