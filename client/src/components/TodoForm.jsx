import { useState } from 'react';
import styles from './TodoForm.module.css';

export default function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    else if (title.trim().length > 200) e.title = 'Title must be under 200 characters';
    if (description.length > 1000) e.description = 'Description must be under 1000 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      await onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setErrors({});
    } catch {
      // error handled by hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.formTitle}>Add a new task</h2>

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>Title <span className={styles.required}>*</span></label>
        <input
          id="title"
          type="text"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
          maxLength={200}
          disabled={submitting}
        />
        {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}
        <span className={styles.charCount}>{title.length}/200</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>Description <span className={styles.optional}>(optional)</span></label>
        <textarea
          id="description"
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          placeholder="Add more details..."
          value={description}
          onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
          maxLength={1000}
          rows={3}
          disabled={submitting}
        />
        {errors.description && <span className={styles.errorMsg}>{errors.description}</span>}
        <span className={styles.charCount}>{description.length}/1000</span>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? <span className={styles.spinner} /> : null}
        {submitting ? 'Adding…' : 'Add Task'}
      </button>
    </form>
  );
}
