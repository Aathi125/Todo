import { motion, AnimatePresence } from 'framer-motion';
import styles from './ErrorBanner.module.css';

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <AnimatePresence>
      <motion.div 
        className={styles.banner} 
        role="alert"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <div className={styles.content}>
          <motion.svg 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className={styles.icon}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0zm-7-4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0V6zm-1 8a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 10 14z" />
          </motion.svg>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {message}
          </motion.span>
        </div>
        <motion.button 
          className={styles.dismiss} 
          onClick={onDismiss} 
          aria-label="Dismiss error"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
