import styles from './Skeleton.module.css';

function SkeletonItem() {
  return (
    <div className={styles.item}>
      <div className={`${styles.box} ${styles.checkbox}`} />
      <div className={styles.lines}>
        <div className={`${styles.box} ${styles.title}`} />
        <div className={`${styles.box} ${styles.desc}`} />
      </div>
    </div>
  );
}

export default function Skeleton({ count = 3 }) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </div>
  );
}
