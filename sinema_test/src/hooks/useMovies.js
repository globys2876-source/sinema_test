import { useState, useEffect } from 'react'
import { fetchMovies, fetchMovieById } from '../services/moviesApi.js'

export function useMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fetchMovies()
      .then((data) => { if (active) setMovies(data) })
      .catch(() => { if (active) setError('Не удалось загрузить данные.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return { movies, loading, error }
}

export function useMovie(id) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fetchMovieById(id)
      .then((data) => { if (active) setMovie(data) })
      .catch((err) => {
        if (active) setError(err.code === 404 ? 'Фильм не найден.' : 'Не удалось загрузить данные.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id])

  return { movie, loading, error }
}
