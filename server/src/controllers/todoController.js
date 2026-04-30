const Todo = require('../models/Todo');

/**
 * GET /api/todos
 * Returns all todos sorted by creation date (newest first)
 */
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/todos
 * Creates a new todo
 */
const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await Todo.create({ title: title.trim(), description: description?.trim() || '' });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/todos/:id
 * Updates title and/or description of a todo
 */
const updateTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/todos/:id/done
 * Toggles the done status of a todo
 */
const toggleDone = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/todos/:id
 * Deletes a todo
 */
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully', id: req.params.id });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTodos, createTodo, updateTodo, toggleDone, deleteTodo };
