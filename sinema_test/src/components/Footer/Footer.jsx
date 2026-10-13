import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <div className={styles.logo}><span>◉</span> CineBook</div>
          <p className={styles.about}>
            Онлайн-кинотеатр и сервис бронирования билетов. Демо-проект на React.
          </p>
        </div>
        <div className={styles.col}>
          <h4>Навигация</h4>
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/favorites">Избранное</Link>
          <Link to="/cart">Корзина</Link>
        </div>
        <div className={styles.col}>
          <h4>Контакты</h4>
          <span>г. Москва, ул. Кинопроката, 1</span>
          <span>+7 (900) 000-00-00</span>
          <span>support@cinebook.demo</span>
        </div>
      </div>
      <div className={styles.bottom}>
        © {new Date().getFullYear()} CineBook. Все права защищены.
      </div>
    </footer>
  )
}
