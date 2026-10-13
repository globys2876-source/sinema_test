import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import styles from './MovieCard.module.css'

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const fav = isFavorite(movie.id)

  const handleFav = (e) => {
    e.stopPropagation()
    toggleFavorite(movie.id)
    showToast(
      fav ? 'Фильм удалён из избранного' : 'Фильм добавлен в избранное',
      fav ? 'info' : 'success'
    )
  }

  const open = () => navigate(`/movie/${movie.id}`)

  return (
    <article className={styles.card}>
      <div className={styles.posterWrap} onClick={open}>
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
        <button
          className={`${styles.heart} ${fav ? styles.heartActive : ''}`}
          onClick={handleFav}
          aria-label={fav ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title} onClick={open}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.genre}>{movie.genre}</span>
          <span className={styles.year}>{movie.year}</span>
        </div>
        <Button variant="secondary" size="sm" full onClick={open}>
          Подробнее
        </Button>
      </div>
    </article>
  )
}
