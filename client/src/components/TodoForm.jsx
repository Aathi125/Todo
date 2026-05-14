import { useState } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length > 200) {
      newErrors.title = "Title must be under 200 characters";
    }

    if (description.length > 1000) {
      newErrors.description = "Description must be under 1000 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit(title.trim(), description.trim());

      setTitle("");
      setDescription("");
      setErrors({});
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      
      <h2 className={styles.formTitle}>Add a new task</h2>

      {/* Title */}
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Title <span className={styles.required}>*</span>
        </label>

        <input
          id="title"
          type="text"
          className={`${styles.input} ${
            errors.title ? styles.inputError : ""
          }`}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors({ ...errors, title: "" });
          }}
          maxLength={200}
          disabled={submitting}
        />

        {errors.title && (
          <span className={styles.errorMsg}>
            {errors.title}
          </span>
        )}

        <span className={styles.charCount}>
          {title.length}/200
        </span>
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Description{" "}
          <span className={styles.optional}>
            (optional)
          </span>
        </label>

        <textarea
          id="description"
          className={`${styles.textarea} ${
            errors.description ? styles.inputError : ""
          }`}
          placeholder="Add more details..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors({ ...errors, description: "" });
          }}
          maxLength={1000}
          rows={3}
          disabled={submitting}
        />

        {errors.description && (
          <span className={styles.errorMsg}>
            {errors.description}
          </span>
        )}

        <span className={styles.charCount}>
          {description.length}/1000
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}