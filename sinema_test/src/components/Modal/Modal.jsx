import { useEffect } from 'react'
import styles from './Modal.module.css'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.head}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={onClose} aria-label="Закрыть">✕</button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
