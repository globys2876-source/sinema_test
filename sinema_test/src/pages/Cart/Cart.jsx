import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import Button from '../../components/Button/Button.jsx'
import StateView from '../../components/StateView/StateView.jsx'
import styles from './Cart.module.css'

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalCount } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div>
        <h1 className="section-title" style={{ marginTop: 0 }}><span className="bar" />Корзина</h1>
        <StateView type="empty" title="В корзине пока нет билетов">
          <Link to="/catalog"><Button variant="primary">Перейти в каталог</Button></Link>
        </StateView>
      </div>
    )
  }

  const handleClear = () => {
    clearCart()
    showToast('Корзина очищена', 'info')
  }

  return (
    <div>
      <h1 className="section-title" style={{ marginTop: 0 }}><span className="bar" />Корзина</h1>

      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.poster} alt={item.title} className={styles.poster} />
            <div className={styles.info}>
              <h3>{item.title}</h3>
              <p className={styles.meta}>
                Дата: {item.date.split('-').reverse().join('.')} · Сеанс: {item.time}
              </p>
              {item.seats && item.seats.length > 0 && (
                <p className={styles.seats}>Места: {item.seats.join(', ')}</p>
              )}
              <p className={styles.unit}>Цена билета: {item.price} ₽</p>
            </div>

            <div className={styles.controls}>
              <div className={styles.counter}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.seats && item.seats.length > 0}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} disabled={item.seats && item.seats.length > 0}>+</button>
              </div>
              <div className={styles.sum}>{item.qty * item.price} ₽</div>
              <button className={styles.remove} onClick={() => removeItem(item.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Button variant="ghost" onClick={handleClear}>Очистить корзину</Button>
        <div className={styles.total}>
          <div>Билетов: <strong>{totalCount}</strong></div>
          <div className={styles.grand}>Итого: <strong>{totalPrice} ₽</strong></div>
          <Button variant="primary" size="lg" onClick={() => navigate('/checkout')}>
            Оформить
          </Button>
        </div>
      </div>
    </div>
  )
}
