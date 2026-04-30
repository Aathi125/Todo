import { useState } from 'react';
import { motion } from 'framer-motion';
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

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <motion.form 
      className={styles.form} 
      onSubmit={handleSubmit} 
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className={styles.formTitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Add a new task
      </motion.h2>

      <motion.div 
        className={styles.field}
        custom={0}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="title" className={styles.label}>Title <span className={styles.required}>*</span></label>
        <motion.input
          id="title"
          type="text"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
          maxLength={200}
          disabled={submitting}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        {errors.title && (
          <motion.span 
            className={styles.errorMsg}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.title}
          </motion.span>
        )}
        <span className={styles.charCount}>{title.length}/200</span>
      </motion.div>

      <motion.div 
        className={styles.field}
        custom={1}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <label htmlFor="description" className={styles.label}>Description <span className={styles.optional}>(optional)</span></label>
        <motion.textarea
          id="description"
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          placeholder="Add more details..."
          value={description}
          onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: '' })); }}
          maxLength={1000}
          rows={3}
          disabled={submitting}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        {errors.description && (
          <motion.span 
            className={styles.errorMsg}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.description}
          </motion.span>
        )}
        <span className={styles.charCount}>{description.length}/1000</span>
      </motion.div>

      <motion.button 
        type="submit" 
        className={styles.submitBtn} 
        disabled={submitting}
        custom={2}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {submitting ? <span className={styles.spinner} /> : null}
        {submitting ? 'Adding…' : 'Add Task'}
      </motion.button>
    </motion.form>
  );
}
