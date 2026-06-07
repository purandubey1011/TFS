import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, variant = 'default' }) {
  const columns = variant === 'shop' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'
  const imageShape = variant === 'shop' || variant === 'related' ? 'square' : 'portrait'

  return (
    <motion.div
      className={`grid auto-rows-max content-start items-start gap-5 ${columns}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}>
          <ProductCard product={product} imageShape={imageShape} />
        </motion.div>
      ))}
    </motion.div>
  )
}
