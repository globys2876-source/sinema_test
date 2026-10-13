import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  )

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [setFavorites])

  const value = {
    favorites,
    count: favorites.length,
    isFavorite,
    toggleFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites можно использовать только внутри FavoritesProvider')
  return ctx
}
