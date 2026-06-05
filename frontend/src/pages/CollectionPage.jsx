import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/catalog'

const emptyFilters = {
  fabric: [],
  color: [],
  room: [],
  style: [],
  availability: [],
}

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('Featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState(emptyFilters)
  const activeCategory = searchParams.get('category') || ''

  const visibleProducts = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    const matchesGroup = (values, value) => values.length === 0 || values.includes(value)
    const filtered = products.filter((product) => {
      const searchable = [
        product.title,
        product.category,
        product.material,
        product.color,
        product.room,
        product.style,
        ...product.tags,
      ].join(' ').toLowerCase()

      return (
        (!activeCategory || product.category === activeCategory) &&
        (!searchTerm || searchable.includes(searchTerm)) &&
        matchesGroup(activeFilters.fabric, product.material) &&
        matchesGroup(activeFilters.color, product.color) &&
        matchesGroup(activeFilters.room, product.room) &&
        matchesGroup(activeFilters.style, product.style) &&
        (activeFilters.availability.length === 0 || product.available)
      )
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'Price Low to High') return a.price - b.price
      if (sort === 'Price High to Low') return b.price - a.price
      return 0
    })
  }, [activeCategory, activeFilters, query, sort])

  const setCategory = (category) => {
    if (category) setSearchParams({ category })
    else setSearchParams({})
    setFiltersOpen(false)
  }

  const toggleFilter = (key, option) => {
    setActiveFilters((current) => ({
      ...current,
      [key]: current[key].includes(option)
        ? current[key].filter((item) => item !== option)
        : [...current[key], option],
    }))
  }

  const clearFilters = () => {
    setSearchParams({})
    setQuery('')
    setActiveFilters(emptyFilters)
    setFiltersOpen(false)
  }

  const activeChips = [
    activeCategory,
    query ? `Search: ${query}` : '',
    ...Object.values(activeFilters).flat(),
  ].filter(Boolean)

  return (
    <div className="container-pad py-10">
      <div className="relative mb-10 overflow-hidden bg-charcoal">
        <img
          src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="relative min-h-[280px] px-6 py-10 text-porcelain md:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-porcelain/75">Shop</p>
            <h1 className="serif mt-3 text-6xl font-semibold leading-none md:text-7xl">{activeCategory || 'Premium Furnishings'}</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-porcelain/78">
              Search, filter and refine custom furnishing pieces for rooms with texture, proportion and detail.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 border-y hairline py-4 xl:grid-cols-[1fr_auto] xl:items-end">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">
          Search products
          <span className="flex max-w-2xl items-center gap-3 border hairline bg-[#fbf8f2] px-4 py-3">
            <Search size={17} className="text-charcoal/45" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search curtains, rugs, linen, olive..."
              className="min-w-0 flex-1 bg-transparent text-sm font-normal normal-case tracking-normal text-charcoal outline-none"
            />
          </span>
        </label>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 border hairline px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-charcoal/50">{visibleProducts.length} pieces</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {activeChips.length ? activeChips.map((chip) => (
                <span key={chip} className="border border-charcoal/20 bg-[#fbf8f2] px-3 py-2 text-xs uppercase tracking-[0.14em]">
                  {chip}
                </span>
              )) : <span className="text-sm text-charcoal/58">All categories</span>}
            </div>
          </div>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/50">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="min-w-[220px] border hairline bg-transparent px-4 py-3 text-sm font-normal normal-case tracking-normal text-charcoal">
              {['Featured', 'New Arrivals', 'Price Low to High', 'Price High to Low'].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar
            activeCategory={activeCategory}
            activeFilters={activeFilters}
            onCategoryChange={setCategory}
            onToggleFilter={toggleFilter}
            onClear={clearFilters}
          />
        </div>
        {visibleProducts.length ? (
          <ProductGrid products={visibleProducts} variant="shop" />
        ) : (
          <div className="grid min-h-[420px] place-items-center border hairline bg-[#fbf8f2] p-10 text-center">
            <div>
              <h2 className="serif text-4xl font-semibold">No pieces found</h2>
              <p className="mt-3 text-sm leading-6 text-charcoal/62">Try clearing your search or filters.</p>
              <button type="button" onClick={clearFilters} className="mt-6 bg-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-porcelain">View All</button>
            </div>
          </div>
        )}
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-charcoal/35" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[88vw] max-w-sm overflow-auto bg-porcelain p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b hairline pb-4">
              <h2 className="serif text-3xl">Refine</h2>
              <button type="button" className="grid h-10 w-10 place-items-center border hairline" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <FilterSidebar
              activeCategory={activeCategory}
              activeFilters={activeFilters}
              onCategoryChange={setCategory}
              onToggleFilter={toggleFilter}
              onClear={clearFilters}
            />
          </aside>
        </div>
      )}
    </div>
  )
}
