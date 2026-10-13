import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMovie } from '../../hooks/useMovies.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import Button from '../../components/Button/Button.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import BookingForm from '../../components/BookingForm/BookingForm.jsx'
import StateView from '../../components/StateView/StateView.jsx'
import MovieCardSkeleton from '../../components/Skeleton/MovieCardSkeleton.jsx'
import styles from './MovieDetails.module.css'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movie, loading, error } = useMovie(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [bookingOpen, setBookingOpen] = useState(false)

  if (loading) {
    return (
      <div className={styles.layout}>
        <div style={{ maxWidth: 320 }}><MovieCardSkeleton /></div>
        <div style={{ flex: 1 }}><StateView type="loading" title="Загрузка..." /></div>
      </div>
    )
  }
  if (error || !movie) {
    return <StateView type="error" title={error || 'Фильм не найден.'} />
  }

  const fav = isFavorite(movie.id)

  const handleFav = () => {
    toggleFavorite(movie.id)
    showToast(
      fav ? 'Фильм удалён из избранного' : 'Фильм добавлен в избранное',
      fav ? 'info' : 'success'
    )
  }

  const handleConfirm = (booking) => {
    addItem(booking)
    setBookingOpen(false)
    showToast('Билет добавлен в корзину', 'success')
    navigate('/cart')
  }

  return (
    <div>
      <button className={styles.back} onClick={() => navigate(-1)}>← Назад</button>

      <div className={styles.layout}>
        <div className={styles.posterCol}>
          <img className={styles.poster} src={movie.poster} alt={movie.title} />
        </div>

        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <div className={styles.badges}>
            <span className={styles.rating}>★ {movie.rating.toFixed(1)}</span>
            <span className={styles.badge}>{movie.genre}</span>
            <span className={styles.badge}>{movie.year}</span>
            <span className={styles.badge}>{movie.duration} мин</span>
          </div>

          <p className={styles.desc}>{movie.description}</p>

          <div className={styles.actors}>
            <h3>В ролях:</h3>
            <ul>
              {movie.actors.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>

          <div className={styles.price}>Цена билета: <strong>{movie.price} ₽</strong></div>

          <div className={styles.actions}>
            <Button variant="primary" size="lg" onClick={() => setBookingOpen(true)}>
              Купить билет
            </Button>
            <Button variant="secondary" size="lg" onClick={handleFav}>
              {fav ? '❤️ В избранном' : '🤍 В избранное'}
            </Button>
          </div>
        </div>
      </div>

      <Modal open={bookingOpen} onClose={() => setBookingOpen(false)} title={`Бронирование: ${movie.title}`}>
        <BookingForm movie={movie} onConfirm={handleConfirm} />
      </Modal>
    </div>
  )
}
