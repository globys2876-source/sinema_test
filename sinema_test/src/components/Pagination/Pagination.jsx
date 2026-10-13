import styles from './Pagination.module.css'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className={styles.pagination}>
      <button onClick={() => onChange(page - 1)} disabled={page === 1}>‹</button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? styles.active : ''}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}>›</button>
    </div>
  )
}
