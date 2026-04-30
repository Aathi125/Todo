import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={styles.container}>
      {/* Filter tabs */}
      <motion.div 
        className={styles.filters}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {FILTERS.map((f) => (
          <motion.button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {f}
            <span className={styles.badge}>{counts[f]}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* List */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div 
            key="empty"
            className={styles.empty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        ) : (
          <motion.ul 
            key="list"
            className={styles.list}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filtered.map((todo) => (
                <motion.li key={todo._id} variants={itemVariants} layout>
                  <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
