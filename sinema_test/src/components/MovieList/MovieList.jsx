import MovieCard from '../MovieCard/MovieCard.jsx'
import MovieCardSkeleton from '../Skeleton/MovieCardSkeleton.jsx'
import StateView from '../StateView/StateView.jsx'
import styles from './MovieList.module.css'

export default function MovieList({ movies, loading, error, emptyText }) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <StateView type="error" title={error} />
  }

  if (!movies || movies.length === 0) {
    return (
      <StateView
        type="empty"
        title={emptyText || 'По вашему запросу фильмы не найдены'}
      />
    )
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
