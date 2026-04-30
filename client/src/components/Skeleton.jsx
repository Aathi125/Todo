import { motion } from 'framer-motion';
import styles from './Skeleton.module.css';

function SkeletonItem({ index }) {
  return (
    <motion.div 
      className={styles.item}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <motion.div 
        className={`${styles.box} ${styles.checkbox}`}
        animate={{ 
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <div className={styles.lines}>
        <motion.div 
          className={`${styles.box} ${styles.title}`}
          animate={{ 
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div 
          className={`${styles.box} ${styles.desc}`}
          animate={{ 
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.1
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skeleton({ count = 3 }) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} index={i} />
      ))}
    </div>
  );
}
