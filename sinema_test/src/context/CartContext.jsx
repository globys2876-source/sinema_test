import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const CartContext = createContext(null)

function makeKey(item) {
  return `${item.movieId}_${item.date}_${item.time}`
}

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('cart', [])

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const key = makeKey(item)
      const existing = prev.find((x) => makeKey(x) === key)
      if (existing) {
        const seats = Array.from(new Set([...(existing.seats || []), ...(item.seats || [])]))
        return prev.map((x) =>
          makeKey(x) === key
            ? { ...x, seats, qty: seats.length || x.qty + item.qty }
            : x
        )
      }
      return [...prev, { ...item, id: key }]
    })
  }, [setItems])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }, [setItems])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)))
  }, [setItems])

  const clearCart = useCallback(() => setItems([]), [setItems])

  const totalCount = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, x) => sum + x.qty * x.price, 0),
    [items]
  )

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalCount,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart можно использовать только внутри CartProvider')
  return ctx
}
