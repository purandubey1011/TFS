import { Check, MessageCircle, Minus, Plus, Ruler, Truck } from 'lucide-react'
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
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState('Product Details')
  const { addToCart } = useStore()
  const related = useMemo(() => products.filter((item) => item.category === product.category && item.id !== product.id).concat(products).slice(0, 4), [product])

  return (
    <div className="container-pad py-8">
      <div className="mb-5 flex items-center justify-between border-b hairline pb-4">
        <Link to="/collection" className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">Back to collection</Link>
        <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45 md:inline">{product.category}</span>
      </div>

      <div className="grid gap-8 lg:h-[calc(100vh-178px)] lg:grid-cols-[1.08fr_0.92fr] lg:overflow-hidden">
        <section className="lg:overflow-y-auto lg:pr-2">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {product.images.map((src, index) => (
              <figure key={src} className="group overflow-hidden bg-mist">
                <img
                  src={src}
                  alt={`${product.title} view ${index + 1}`}
                  className="aspect-square h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="lg:overflow-y-auto lg:pl-4">
          <div className="border hairline bg-[#fbf8f2] p-5 md:p-7">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="border hairline bg-porcelain px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-charcoal/70">{tag}</span>
              ))}
            </div>

            <h1 className="serif mt-6 text-5xl font-semibold leading-none md:text-6xl">{product.title}</h1>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-y hairline py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-charcoal/45">Starting at</p>
                <p className="mt-1 text-3xl">{formatPrice(product.price)}</p>
              </div>
              <p className="max-w-xs text-right text-sm leading-6 text-charcoal/60">Custom pricing is finalized after measurement and fabric confirmation.</p>
            </div>

            <p className="mt-6 leading-7 text-charcoal/68">{product.description}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <Select label="Color" options={[product.color, 'Oat', 'Taupe', 'Olive']} />
              <Select label="Fabric" options={[product.material, 'Linen', 'Cotton Blend', 'Boucle']} />
              <Select label="Size" options={['Custom', 'Window', 'Door', 'King']} />
            </div>

            <div className="mt-7 grid gap-3 border-y hairline py-5 sm:grid-cols-3">
              <ServiceNote icon={Ruler} title="Measurement" text="Free support" />
              <ServiceNote icon={Truck} title="Delivery" text="By appointment" />
              <ServiceNote icon={Check} title="Install" text="Available" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center border hairline bg-porcelain">
                <button type="button" className="p-4" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
                <span className="w-10 text-center">{quantity}</span>
                <button type="button" className="p-4" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
              </div>
              <CTAButton onClick={() => addToCart(product, quantity)} className="flex-1 sm:flex-none">Add to Cart</CTAButton>
              <CTAButton variant="light">Get Custom Quote</CTAButton>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <CTAButton to="/consultation" variant="light">Book Measurement</CTAButton>
              <button type="button" className="button-magnetic inline-flex items-center justify-center gap-2 border border-olive px-5 py-3 text-sm font-semibold text-olive">
                <MessageCircle size={17} /> WhatsApp Enquiry
              </button>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">Delivery check</label>
              <div className="flex gap-2 border hairline bg-porcelain p-2">
                <input placeholder="Enter pincode" className="min-w-0 flex-1 bg-transparent px-3 outline-none" />
                <button className="bg-charcoal px-4 text-xs font-semibold uppercase tracking-[0.16em] text-porcelain">Check</button>
              </div>
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
          </div>

        </section>
      </div>

      <section className="mt-16 border-t hairline pt-12">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">Complete the room</p>
            <h2 className="serif mt-3 text-5xl font-semibold leading-none">Related Products</h2>
          </div>
          <Link to="/collection" className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/55 md:inline">View collection</Link>
        </div>
        <ProductGrid products={related} variant="related" />
      </section>
    </div>
  )
}

function Select({ label, options }) {
  return (
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/55">
      {label}
      <select className="border hairline bg-porcelain px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal">
        {[...new Set(options)].map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function ServiceNote({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center border hairline bg-porcelain">
        <Icon size={17} strokeWidth={1.5} />
      </span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">{title}</span>
        <span className="text-sm text-charcoal/70">{text}</span>
      </span>
    </div>
  )
}
