import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import Button from '../../components/Button/Button.jsx'
import StateView from '../../components/StateView/StateView.jsx'
import styles from './Checkout.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Checkout() {
  const { items, totalPrice, totalCount, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  if (items.length === 0 && !success) {
    return (
      <div>
        <h1 className="section-title" style={{ marginTop: 0 }}><span className="bar" />Оформление</h1>
        <StateView type="empty" title="Корзина пуста — нечего оформлять">
          <Link to="/catalog"><Button variant="primary">Перейти в каталог</Button></Link>
        </StateView>
      </div>
    )
  }

  if (success) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✅</div>
        <h1>Бронирование успешно создано</h1>
        <p>Спасибо! Мы отправили детали брони на вашу почту.</p>
        <Link to="/"><Button variant="primary" size="lg">На главную</Button></Link>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Укажите имя'
    if (!form.phone.trim()) e.phone = 'Укажите телефон'
    if (!form.email.trim()) e.email = 'Укажите email'
    else if (!EMAIL_RE.test(form.email)) e.email = 'Некорректный формат email'
    return e
  }

  const handleChange = (field) => (ev) => {
    setForm((prev) => ({ ...prev, [field]: ev.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    clearCart()
    setSuccess(true)
    showToast('Бронирование успешно создано', 'success')
  }

  return (
    <div>
      <h1 className="section-title" style={{ marginTop: 0 }}><span className="bar" />Оформление брони</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label>Имя *</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className={errors.name ? styles.invalid : ''}
              placeholder="Иван Иванов"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label>Телефон *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              className={errors.phone ? styles.invalid : ''}
              placeholder="+7 900 000-00-00"
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>

          <div className={styles.field}>
            <label>Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className={errors.email ? styles.invalid : ''}
              placeholder="example@mail.com"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <Button type="submit" variant="primary" size="lg" full>
            Подтвердить бронирование
          </Button>
          <p className={styles.note}>Оплата в демо-режиме не взимается.</p>
        </form>

        <aside className={styles.summary}>
          <h3>Ваш заказ</h3>
          {items.map((item) => (
            <div key={item.id} className={styles.row}>
              <span>{item.title} × {item.qty}</span>
              <span>{item.qty * item.price} ₽</span>
            </div>
          ))}
          <div className={styles.divider} />
          <div className={styles.row}><span>Билетов</span><span>{totalCount}</span></div>
          <div className={`${styles.row} ${styles.grand}`}><span>Итого</span><span>{totalPrice} ₽</span></div>
        </aside>
      </div>
    </div>
  )
}
