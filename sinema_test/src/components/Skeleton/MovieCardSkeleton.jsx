import styles from './Skeleton.module.css'

export default function MovieCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.poster} ${styles.shimmer}`} />
      <div className={styles.body}>
        <div className={`${styles.line} ${styles.shimmer}`} />
        <div className={`${styles.lineShort} ${styles.shimmer}`} />
        <div className={`${styles.btn} ${styles.shimmer}`} />
      </div>
    </div>
  )
}
