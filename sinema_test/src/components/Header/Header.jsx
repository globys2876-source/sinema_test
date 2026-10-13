import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { count: favCount } = useFavorites()
  const { totalCount } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog')
    setMenuOpen(false)
  }

  const navClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoMark}>◉</span>
          CineBook
        </Link>

        <form className={styles.search} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Поиск фильма..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Поиск фильма"
          />
          <button type="submit" aria-label="Искать">🔍</button>
        </form>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <NavLink to="/" className={navClass} end onClick={() => setMenuOpen(false)}>Главная</NavLink>
          <NavLink to="/catalog" className={navClass} onClick={() => setMenuOpen(false)}>Каталог</NavLink>
          <NavLink to="/favorites" className={navClass} onClick={() => setMenuOpen(false)}>
            Избранное{favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={navClass} onClick={() => setMenuOpen(false)}>
            Корзина{totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </NavLink>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
