import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMovies } from '../../hooks/useMovies.js'
import Search from '../../components/Search/Search.jsx'
import Filters from '../../components/Filters/Filters.jsx'
import MovieList from '../../components/MovieList/MovieList.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import { filterAndSort, uniqueGenres, uniqueYears } from '../../utils/filterMovies.js'

const PAGE_SIZE = 8

export default function Catalog() {
  const { movies, loading, error } = useMovies()
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [searchParams])

  const genres = useMemo(() => uniqueGenres(movies), [movies])
  const years = useMemo(() => uniqueYears(movies), [movies])

  const filtered = useMemo(
    () => filterAndSort(movies, { query, genre, year, sort }),
    [movies, query, genre, year, sort]
  )

  useEffect(() => { setPage(1) }, [query, genre, year, sort])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const reset = () => {
    setQuery(''); setGenre(''); setYear(''); setSort('')
  }

  return (
    <div>
      <h1 className="section-title" style={{ marginTop: 0 }}>
        <span className="bar" />Каталог фильмов
      </h1>

      <Search value={query} onChange={setQuery} />

      <Filters
        genres={genres}
        years={years}
        genre={genre}
        year={year}
        sort={sort}
        onGenre={setGenre}
        onYear={setYear}
        onSort={setSort}
        onReset={reset}
      />

      {!loading && !error && (
        <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
          Найдено фильмов: {filtered.length}
        </p>
      )}

      <MovieList movies={paged} loading={loading} error={error} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
