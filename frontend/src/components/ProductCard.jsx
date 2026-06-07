import { Eye, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/useStore'
import { formatPrice } from '../data/catalog'

export default function ProductCard({ product, imageShape = 'portrait' }) {
  const { addToCart } = useStore()
  const imageClass = imageShape === 'square' ? 'aspect-square' : 'aspect-[4/5]'
  const cardMinHeight = imageShape === 'square' ? 'min-h-[420px]' : 'min-h-[500px]'
  const bodyMinHeight = imageShape === 'square' ? 'min-h-[150px]' : 'min-h-[180px]'
  const titleClass = imageShape === 'square' ? 'min-h-[48px] text-[1.4rem]' : 'min-h-[56px] text-2xl'

  return (
    <article className={`group relative flex h-full ${cardMinHeight} flex-col border hairline bg-[#fbf8f2] transition duration-300 hover:-translate-y-1`}>
      <Link to={`/product/${product.handle}`} className={`block ${imageClass} overflow-hidden bg-mist`}>
        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </Link>
      <div className={`flex ${bodyMinHeight} flex-1 flex-col p-3.5`}>
        <div className="mb-2 flex min-h-6 items-start justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-charcoal/58">
          <span className="shrink-0">Customisable</span>
          <span className="line-clamp-2 text-right">{product.material}</span>
        </div>
        <Link to={`/product/${product.handle}`} className={`serif line-clamp-2 ${titleClass} font-semibold leading-tight transition-colors group-hover:text-walnut`}>{product.title}</Link>
        <p className="mt-1.5 text-sm text-charcoal/65">Starting at {formatPrice(product.price)}</p>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-3.5">
          <button type="button" onClick={() => addToCart(product)} className="button-magnetic flex items-center justify-center gap-2 bg-charcoal px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-porcelain">
            <ShoppingBag size={15} /> Add
          </button>
          <Link to={`/product/${product.handle}`} className="grid h-10 w-10 place-items-center border hairline" aria-label="Quick view">
            <Eye size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
