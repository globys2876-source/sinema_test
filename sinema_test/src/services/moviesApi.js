import moviesData from '../data/movies.json'

const DELAY = 600

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchMovies() {
  await wait(DELAY)
  return moviesData
}

export async function fetchMovieById(id) {
  await wait(DELAY)
  const movie = moviesData.find((m) => m.id === Number(id))
  if (!movie) {
    const err = new Error('not_found')
    err.code = 404
    throw err
  }
  return movie
}
