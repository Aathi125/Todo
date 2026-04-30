import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Normalize error messages from the server
const handleError = (err) => {
  const message = err.response?.data?.error || 'Something went wrong. Please try again.';
  throw new Error(message);
};

export const todoApi = {
  getAll: () =>
    api.get('/todos').then((r) => r.data).catch(handleError),

  create: (title, description) =>
    api.post('/todos', { title, description }).then((r) => r.data).catch(handleError),

  update: (id, title, description) =>
    api.put(`/todos/${id}`, { title, description }).then((r) => r.data).catch(handleError),

  toggleDone: (id) =>
    api.patch(`/todos/${id}/done`).then((r) => r.data).catch(handleError),

  delete: (id) =>
    api.delete(`/todos/${id}`).then((r) => r.data).catch(handleError),
};
