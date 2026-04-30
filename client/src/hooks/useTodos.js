import { useState, useEffect, useCallback } from 'react';
import { todoApi } from '../api/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  // ── Fetch all todos ──────────────────────────────────────────────────────────
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // ── Create ───────────────────────────────────────────────────────────────────
  const createTodo = async (title, description) => {
    // Optimistic: add a temporary placeholder
    const tempId = `temp-${Date.now()}`;
    const optimistic = { _id: tempId, title, description, done: false, createdAt: new Date() };
    setTodos((prev) => [optimistic, ...prev]);

    try {
      const created = await todoApi.create(title, description);
      setTodos((prev) => prev.map((t) => (t._id === tempId ? created : t)));
      return created;
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t._id !== tempId)); // roll back
      setError(err.message);
      throw err;
    }
  };

  // ── Update ───────────────────────────────────────────────────────────────────
  const updateTodo = async (id, title, description) => {
    const prev = todos.find((t) => t._id === id);
    // Optimistic update
    setTodos((list) => list.map((t) => t._id === id ? { ...t, title, description } : t));

    try {
      const updated = await todoApi.update(id, title, description);
      setTodos((list) => list.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setTodos((list) => list.map((t) => (t._id === id ? prev : t))); // roll back
      setError(err.message);
      throw err;
    }
  };

  // ── Toggle done ──────────────────────────────────────────────────────────────
  const toggleDone = async (id) => {
    // Optimistic toggle
    setTodos((list) => list.map((t) => t._id === id ? { ...t, done: !t.done } : t));

    try {
      const updated = await todoApi.toggleDone(id);
      setTodos((list) => list.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setTodos((list) => list.map((t) => t._id === id ? { ...t, done: !t.done } : t)); // roll back
      setError(err.message);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const deleteTodo = async (id) => {
    const snapshot = todos;
    setTodos((list) => list.filter((t) => t._id !== id)); // Optimistic remove

    try {
      await todoApi.delete(id);
    } catch (err) {
      setTodos(snapshot); // roll back
      setError(err.message);
    }
  };

  return { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo };
}
