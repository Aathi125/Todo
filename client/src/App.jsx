import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ErrorBanner from './components/ErrorBanner';
import Skeleton from './components/Skeleton';
import styles from './App.module.css';

export default function App() {
  const { todos, loading, error, clearError, createTodo, updateTodo, toggleDone, deleteTodo } = useTodos();

  const pending = todos.filter((t) => !t.done).length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>✦</span>
            <h1 className={styles.brandName}>Taskboard</h1>
          </div>
          {!loading && (
            <p className={styles.summary}>
              {pending === 0
                ? 'All done! 🎉'
                : `${pending} task${pending !== 1 ? 's' : ''} remaining`}
            </p>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <ErrorBanner message={error} onDismiss={clearError} />
        <TodoForm onSubmit={createTodo} />

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
      </main>

      <footer className={styles.footer}>
        <p>Built with React + Express + MongoDB</p>
      </footer>
    </div>
  );
}
