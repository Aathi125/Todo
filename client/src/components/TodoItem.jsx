import { useState } from 'react';
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
    <article className={`${styles.item} ${todo.done ? styles.done : ''} ${todo._id.startsWith('temp-') ? styles.optimistic : ''}`}>
      <button
        className={`${styles.checkbox} ${todo.done ? styles.checked : ''}`}
        onClick={() => onToggle(todo._id)}
        aria-label={todo.done ? 'Mark as undone' : 'Mark as done'}
        title={todo.done ? 'Mark as undone' : 'Mark as done'}
      >
        {todo.done && (
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </button>

      <div className={styles.content}>
        {editing ? (
          <div className={styles.editForm} onKeyDown={handleKeyDown}>
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
                <button className={styles.cancelBtn} onClick={handleCancel} disabled={saving}>Cancel</button>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className={styles.title}>{todo.title}</p>
            {todo.description && <p className={styles.description}>{todo.description}</p>}
            <span className={styles.timestamp}>
              {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </>
        )}
      </div>

      {!editing && (
        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => setEditing(true)}
            aria-label="Edit task"
            title="Edit"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.5 2.5a1.5 1.5 0 0 1 2.12 2.12L5 13.24l-3 .76.76-3z" />
            </svg>
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(todo._id)}
            aria-label="Delete task"
            title="Delete"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2,4 14,4" />
              <path d="M5 4V2h6v2" />
              <path d="M6 7v5M10 7v5" />
              <rect x="3" y="4" width="10" height="10" rx="1" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
}
