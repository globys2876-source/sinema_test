import { Link } from 'react-router-dom'
import { useMovies } from '../../hooks/useMovies.js'
import MovieList from '../../components/MovieList/MovieList.jsx'
import Button from '../../components/Button/Button.jsx'
import styles from './Home.module.css'

export default function Home() {
  const { movies, loading, error } = useMovies()

  const popular = movies.filter((m) => m.category === 'popular')
  const now = movies.filter((m) => m.category === 'now')
  const soon = movies.filter((m) => m.category === 'soon')

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Бронируй билеты в кино за пару кликов</h1>
          <p>Самые ожидаемые премьеры, удобный выбор мест и любимые фильмы в одном месте.</p>
          <Link to="/catalog"><Button variant="primary" size="lg">Смотреть каталог</Button></Link>
        </div>
      </section>

      <h2 className="section-title"><span className="bar" />Популярные фильмы</h2>
      <MovieList movies={popular} loading={loading} error={error} />

      <h2 className="section-title"><span className="bar" />Сейчас в кино</h2>
      <MovieList movies={now} loading={loading} error={error} />

      <h2 className="section-title"><span className="bar" />Скоро в кино</h2>
      <MovieList movies={soon} loading={loading} error={error} />
    </div>
  )
}
