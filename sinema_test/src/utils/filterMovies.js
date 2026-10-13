
export function filterAndSort(movies, { query, genre, year, sort }) {
  let result = [...movies]

  if (query) {
    const q = query.trim().toLowerCase()
    result = result.filter((m) => m.title.toLowerCase().includes(q))
  }
  if (genre) {
    result = result.filter((m) => m.genre === genre)
  }
  if (year) {
    result = result.filter((m) => String(m.year) === String(year))
  }

  switch (sort) {
    case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break
    case 'rating-asc': result.sort((a, b) => a.rating - b.rating); break
    case 'title-asc': result.sort((a, b) => a.title.localeCompare(b.title, 'ru')); break
    case 'title-desc': result.sort((a, b) => b.title.localeCompare(a.title, 'ru')); break
    default: break
  }

  return result
}

export function uniqueGenres(movies) {
  return [...new Set(movies.map((m) => m.genre))].sort((a, b) => a.localeCompare(b, 'ru'))
}

export function uniqueYears(movies) {
  return [...new Set(movies.map((m) => m.year))].sort((a, b) => b - a)
}
