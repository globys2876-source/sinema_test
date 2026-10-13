import styles from './Search.module.css'

export default function Search({ value, onChange, placeholder }) {
  return (
    <div className={styles.search}>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Поиск по названию...'}
        aria-label="Поиск по названию"
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Очистить">✕</button>
      )}
    </div>
  )
}
