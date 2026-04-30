import { useTodos } from './hooks/useTodos';
import { useTheme } from './contexts/ThemeContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ErrorBanner from './components/ErrorBanner';
import Skeleton from './components/Skeleton';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './App.module.css';

export default function App() {
  const { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo } = useTodos();
  const { theme, toggleTheme } = useTheme();

  const pending = todos.filter((t) => !t.done).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className={styles.page}>
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>✦</span>
            <h1 className={styles.brandName}>Taskboard</h1>
          </div>
          <div className={styles.headerRight}>
            {!loading && (
              <motion.p 
                className={styles.summary}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {pending === 0
                  ? 'All done! 🎉'
                  : `${pending} task${pending !== 1 ? 's' : ''} remaining`}
              </motion.p>
            )}
            <motion.button 
              className={styles.themeToggle}
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={20} />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.main 
        className={styles.main}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <ErrorBanner message={error} onDismiss={clearError} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <TodoForm onSubmit={createTodo} />
        </motion.div>

        <motion.div variants={itemVariants}>
          {loading ? (
            <Skeleton count={3} />
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleDone}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          )}
        </motion.div>
      </motion.main>

      <motion.footer 
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p>Built with React + Express + MongoDB</p>
      </motion.footer>
    </div>
  );
}
