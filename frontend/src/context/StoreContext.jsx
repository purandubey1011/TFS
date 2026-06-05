import { useMemo, useState } from 'react'
import { StoreContext } from './StoreContextObject'


export function StoreProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      }
      return [...items, { ...product, quantity }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      setCartItems((items) => items.filter((item) => item.id !== id))
      return
    }
    setCartItems((items) => items.map((item) => item.id === id ? { ...item, quantity } : item))
  }

  const value = useMemo(() => ({
    addToCart,
    cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
  }), [cartItems, cartOpen])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
