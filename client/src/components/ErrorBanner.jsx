import styles from './ErrorBanner.module.css';

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className={styles.banner} role="alert">
      <div className={styles.content}>
        <svg viewBox="0 0 20 20" fill="currentColor" className={styles.icon}>
          <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7-4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0V6zm-1 8a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 14z" />
        </svg>
        <span>{message}</span>
      </div>
      <button className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss error">✕</button>
    </div>
  );
}
