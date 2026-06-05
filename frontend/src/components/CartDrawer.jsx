import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useStore } from '../context/useStore'
import { formatPrice, products } from '../data/catalog'
import CTAButton from './CTAButton'

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, updateQuantity } = useStore()
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-50 bg-charcoal/35"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[460px] flex-col bg-porcelain shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 230 }}
          >
            <div className="flex items-center justify-between border-b hairline p-5">
              <h2 className="serif text-3xl">Your Cart</h2>
              <button type="button" onClick={() => setCartOpen(false)} className="p-2" aria-label="Close cart"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              {cartItems.length === 0 ? (
                <p className="text-sm text-charcoal/64">Your cart is waiting for a finishing detail.</p>
              ) : (
                <div className="grid gap-5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-[92px_1fr] gap-4 border-b hairline pb-5">
                      <img src={item.images[0]} alt={item.title} className="h-28 w-full object-cover" />
                      <div>
                        <h3 className="serif text-xl font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-charcoal/60">{formatPrice(item.price)}</p>
                        <div className="mt-4 inline-flex items-center border hairline">
                          <button type="button" className="p-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span className="w-9 text-center text-sm">{item.quantity}</span>
                          <button type="button" className="p-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 border hairline p-4">
                <h3 className="serif text-2xl">Complete the Look</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {products.slice(4, 6).map((product) => (
                    <div key={product.id} className="text-sm">
                      <img src={product.images[0]} alt={product.title} className="aspect-square w-full object-cover" />
                      <p className="mt-2">{product.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t hairline p-5">
              <input className="mb-3 w-full border hairline bg-transparent px-4 py-3 text-sm" placeholder="Coupon code" />
              <textarea className="mb-4 w-full border hairline bg-transparent px-4 py-3 text-sm" placeholder="Add order note" rows="2" />
              <div className="mb-4 flex items-center justify-between text-sm font-semibold uppercase tracking-[0.14em]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <CTAButton className="w-full">Checkout</CTAButton>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
