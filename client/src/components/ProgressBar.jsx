import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <motion.div 
      className={styles.progressContainer}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.progressHeader}>
        <h3 className={styles.progressTitle}>Task Progress</h3>
        <span className={styles.progressText}>
          {completed} of {total} completed ({percentage}%)
        </span>
      </div>
      <div className={styles.progressBarTrack}>
        <div 
          className={styles.progressBarFill} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </motion.div>
  );
}
