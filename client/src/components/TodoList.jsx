import { useState } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

const FILTERS = ['All', 'Active', 'Done'];

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  const [filter, setFilter] = useState('All');

  const filtered = todos.filter((t) => {
    if (filter === 'Active') return !t.done;
    if (filter === 'Done') return t.done;
    return true;
  });

  const counts = {
    All: todos.length,
    Active: todos.filter((t) => !t.done).length,
    Done: todos.filter((t) => t.done).length,
  };

  return (
    <div className={styles.container}>
      {/* Filter tabs */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
            <span className={styles.badge}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {filter === 'All' ? (
            <>
              <span className={styles.emptyIcon}>✦</span>
              <p>No tasks yet. Add your first task above.</p>
            </>
          ) : (
            <>
              <span className={styles.emptyIcon}>○</span>
              <p>No {filter.toLowerCase()} tasks.</p>
            </>
          )}
        </div>
      ) : (
        <ul className={styles.list}>
          {filtered.map((todo) => (
            <li key={todo._id}>
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
