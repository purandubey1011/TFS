import { MessageCircle, Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CTAButton from '../components/CTAButton'
import ProductGrid from '../components/ProductGrid'
import { useStore } from '../context/useStore'
import { formatPrice, products } from '../data/catalog'

const accordions = ['Product Details', 'Material & Care', 'Measurement Guide', 'Installation', 'Shipping & Returns']

export default function ProductDetailPage() {
  const { handle } = useParams()
  const product = products.find((item) => item.handle === handle) || products[0]
  const [image, setImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState('Product Details')
  const { addToCart } = useStore()
  const related = useMemo(() => products.filter((item) => item.category === product.category && item.id !== product.id).concat(products).slice(0, 4), [product])

  return (
    <div className="container-pad py-12">
      <Link to="/collection" className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">Back to collection</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 md:grid-cols-[90px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:grid">
            {product.images.map((src) => (
              <button key={src} type="button" onClick={() => setImage(src)} className="aspect-square overflow-hidden border hairline">
                <img src={src} alt={product.title} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <img src={image} alt={product.title} className="order-1 aspect-[4/5] w-full object-cover md:order-2" />
        </div>
        <section>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => <span key={tag} className="border hairline px-3 py-2 text-[11px] uppercase tracking-[0.16em]">{tag}</span>)}
          </div>
          <h1 className="serif mt-6 text-6xl font-semibold leading-none">{product.title}</h1>
          <p className="mt-4 text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-5 max-w-xl leading-7 text-charcoal/68">{product.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Select label="Color" options={[product.color, 'Oat', 'Taupe', 'Olive']} />
            <Select label="Fabric" options={[product.material, 'Linen', 'Cotton Blend', 'Boucle']} />
            <Select label="Size" options={['Custom', 'Window', 'Door', 'King']} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center border hairline">
              <button type="button" className="p-4" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button>
              <span className="w-10 text-center">{quantity}</span>
              <button type="button" className="p-4" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button>
            </div>
            <CTAButton onClick={() => addToCart(product, quantity)}>Add to Cart</CTAButton>
            <CTAButton variant="light">Get Custom Quote</CTAButton>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <CTAButton to="/consultation" variant="light">Book Measurement</CTAButton>
            <button type="button" className="button-magnetic inline-flex items-center gap-2 border border-olive px-5 py-3 text-sm font-semibold text-olive"><MessageCircle size={17} /> WhatsApp Enquiry</button>
          </div>
          <div className="mt-6 flex gap-2 border hairline p-2">
            <input placeholder="Enter pincode" className="min-w-0 flex-1 bg-transparent px-3 outline-none" />
            <button className="bg-charcoal px-4 text-xs font-semibold uppercase tracking-[0.16em] text-porcelain">Check</button>
          </div>
          <div className="mt-8 border-t hairline">
            {accordions.map((item) => (
              <div key={item} className="border-b hairline">
                <button type="button" onClick={() => setOpen(open === item ? '' : item)} className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold uppercase tracking-[0.16em]">
                  {item}<span>{open === item ? '-' : '+'}</span>
                </button>
                {open === item && <p className="pb-5 text-sm leading-7 text-charcoal/65">Premium materials, custom sizing and careful installation support are available for this product. Our team confirms exact measurements before production.</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="mt-20">
        <h2 className="serif mb-8 text-5xl font-semibold">Related Products</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  )
}

function Select({ label, options }) {
  return (
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
      {label}
      <select className="border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal">
        {[...new Set(options)].map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}
