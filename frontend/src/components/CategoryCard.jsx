import { Link } from 'react-router-dom'

export default function CategoryCard({ category, compact = false }) {
  return (
    <Link to={`/collection?category=${category.name}`} className="group block overflow-hidden border hairline bg-porcelain">
      <div className={`${compact ? 'aspect-[5/4]' : 'aspect-[4/5]'} overflow-hidden`}>
        <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className={compact ? 'p-3' : 'p-5'}>
        <div className={`${compact ? 'mb-3' : 'mb-4'} h-px w-10 bg-charcoal transition-all duration-300 group-hover:w-full`} />
        <h3 className={`serif font-semibold ${compact ? 'text-xl' : 'text-3xl'}`}>{category.name}</h3>
        <p className={`mt-2 text-charcoal/64 ${compact ? 'line-clamp-2 text-xs leading-5' : 'text-sm leading-6'}`}>{category.text}</p>
      </div>
    </Link>
  )
}
