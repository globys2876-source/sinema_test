import { Link } from 'react-router-dom'
import { useMovies } from '../../hooks/useMovies.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import MovieList from '../../components/MovieList/MovieList.jsx'
import Button from '../../components/Button/Button.jsx'
import StateView from '../../components/StateView/StateView.jsx'

export default function Favorites() {
  const { movies, loading, error } = useMovies()
  const { favorites } = useFavorites()

  const favMovies = movies.filter((m) => favorites.includes(m.id))

  return (
    <div>
      <h1 className="section-title" style={{ marginTop: 0 }}>
        <span className="bar" />Избранное
      </h1>

      {!loading && !error && favorites.length === 0 ? (
        <StateView type="empty" title="В избранном пока пусто">
          <Link to="/catalog"><Button variant="primary">Найти фильмы</Button></Link>
        </StateView>
      ) : (
        <MovieList
          movies={favMovies}
          loading={loading}
          error={error}
          emptyText="В избранном пока пусто"
        />
      )}
    </div>
  )
}
