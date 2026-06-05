import { useContext } from 'react'
import { StoreContext } from './StoreContextObject'

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) {
    throw new Error('useStore must be used inside StoreProvider')
  }
  return value
}
