import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    else if (title.trim().length > 200) errs.title = 'Max 200 characters';
    if (description.length > 1000) errs.description = 'Max 1000 characters';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSaving(true);
    try {
      await onUpdate(todo._id, title.trim(), description.trim());
      setEditing(false);
      setErrors({});
    } catch {
      // error surfaced by parent
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setErrors({});
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <motion.article 
      className={`${styles.item} ${todo.done ? styles.done : ''} ${todo._id.startsWith('temp-') ? styles.optimistic : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      layout
    >
      <motion.button
        className={`${styles.checkbox} ${todo.done ? styles.checked : ''}`}
        onClick={() => onToggle(todo._id)}
        aria-label={todo.done ? 'Mark as undone' : 'Mark as done'}
        title={todo.done ? 'Mark as undone' : 'Mark as done'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {todo.done && (
            <motion.svg
              key="checkmark"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <polyline points="2,6 5,9 10,3" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div 
              key="edit"
              className={styles.editForm} 
              onKeyDown={handleKeyDown}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                className={`${styles.editInput} ${errors.title ? styles.inputError : ''}`}
                value={title}
                onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
                autoFocus
                maxLength={200}
                placeholder="Task title"
              />
              {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}

              <textarea
                className={`${styles.editTextarea} ${errors.description ? styles.inputError : ''}`}
                value={description}
                onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
                maxLength={1000}
                rows={2}
                placeholder="Description (optional)"
              />
              {errors.description && <span className={styles.errorMsg}>{errors.description}</span>}

              <div className={styles.editActions}>
                <span className={styles.editHint}>Ctrl+Enter to save · Esc to cancel</span>
                <div className={styles.editButtons}>
                  <motion.button 
                    className={styles.cancelBtn} 
                    onClick={handleCancel} 
                    disabled={saving}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    className={styles.saveBtn} 
                    onClick={handleSave} 
                    disabled={saving}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <p className={styles.title}>{todo.title}</p>
              {todo.description && <p className={styles.description}>{todo.description}</p>}
              <span className={styles.timestamp}>
                {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!editing && (
          <motion.div 
            className={styles.actions}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className={styles.editBtn}
              onClick={() => setEditing(true)}
              aria-label="Edit task"
              title="Edit"
              whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-light)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.5 2.5a1.5 1.5 0 0 1 2.12 2.12L5 13.24l-3 .76.76-3z" />
              </svg>
            </motion.button>
            <motion.button
              className={styles.deleteBtn}
              onClick={() => onDelete(todo._id)}
              aria-label="Delete task"
              title="Delete"
              whileHover={{ scale: 1.1, backgroundColor: 'var(--danger-light)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,4 14,4" />
                <path d="M5 4V2h6v2" />
                <path d="M6 7v5M10 7v5" />
                <rect x="3" y="4" width="10" height="10" rx="1" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
