import styles from './StateView.module.css'

const ICONS = { loading: '⌛', error: '⚠️', empty: '🎬' }

export default function StateView({ type = 'empty', title, children }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{ICONS[type]}</div>
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  )
}
