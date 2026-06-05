import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { categories } from '../data/catalog'
import { useStore } from '../context/useStore'
import AnnouncementBar from './AnnouncementBar'

const navItems = ['Home', 'Furniture', 'Furnishing', 'Projects', 'Consultation', 'Contact']
const furnitureCategories = [
  { name: 'Sofas', text: 'Modular sofas, sectionals and tailored seating.' },
  { name: 'Chairs', text: 'Accent chairs, lounge chairs and dining silhouettes.' },
  { name: 'Tables', text: 'Coffee tables, side tables and dining tables.' },
  { name: 'Beds', text: 'Upholstered beds and refined bedroom anchors.' },
  { name: 'Consoles', text: 'Entryway consoles and display pieces.' },
  { name: 'Ottomans', text: 'Benches, poufs and soft accent seating.' },
]
const furnishingCategories = categories.filter((category) => category.name !== 'Sofas')

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, setCartOpen } = useStore()

  const navTarget = (item) => {
    if (item === 'Home') return '/'
    if (item === 'Furniture') return '/collection?category=Sofas'
    if (item === 'Furnishing') return '/collection'
    if (item === 'Projects') return '/projects'
    if (item === 'Consultation') return '/consultation'
    if (item === 'Contact') return '/contact'
    return '/'
  }

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-porcelain/95 backdrop-blur">
      <AnnouncementBar />
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="serif text-3xl font-semibold tracking-wide">TFS</Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
          {navItems.map((item) => {
            const hasDropdown = item === 'Furniture' || item === 'Furnishing'
            const dropdownItems = item === 'Furniture' ? furnitureCategories : furnishingCategories

            if (hasDropdown) {
              return (
                <div key={item} className="nav-menu-group">
                  <NavLink to={navTarget(item)} className="nav-link py-8">{item}</NavLink>
                  <MegaMenu title={item} items={dropdownItems} />
                </div>
              )
            }

            return (
              <NavLink key={item} to={navTarget(item)} className="nav-link py-8">
                {item}
              </NavLink>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <IconButton label="Search"><Search size={18} /></IconButton>
          <button type="button" onClick={() => setCartOpen(true)} className="relative p-2" aria-label="Cart">
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-charcoal text-[10px] text-porcelain">{cartCount}</span>}
          </button>
          <IconButton label="Account" className="hidden sm:inline-flex"><UserRound size={18} /></IconButton>
          <button type="button" className="p-2 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t hairline bg-porcelain px-4 py-6 lg:hidden">
          <nav className="grid gap-4 text-sm font-semibold uppercase tracking-[0.16em]">
            {navItems.map((item) => (
              <Link key={item} to={navTarget(item)} onClick={() => setMenuOpen(false)}>{item}</Link>
            ))}
          </nav>
          <div className="mt-6 grid gap-6 border-t hairline pt-6 text-sm normal-case tracking-normal">
            <MobileGroup title="Furniture" items={furnitureCategories} close={() => setMenuOpen(false)} />
            <MobileGroup title="Furnishing" items={furnishingCategories} close={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}

function IconButton({ children, label, className = '' }) {
  return <button type="button" className={`p-2 ${className}`} aria-label={label}>{children}</button>
}

function MegaMenu({ title, items }) {
  return (
    <div className="nav-menu-panel hidden border-t hairline bg-porcelain shadow-[0_18px_50px_rgba(30,30,30,0.08)] lg:block">
      <div className="container-pad py-8">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-walnut">{title} Categories</p>
        <div className="grid grid-cols-3 gap-8 xl:grid-cols-6">
          {items.map((category) => (
            <Link key={category.name} to={`/collection?category=${category.name}`} className="group border-l hairline pl-5">
              <span className="serif text-2xl normal-case tracking-normal">{category.name}</span>
              <p className="mt-2 text-sm font-normal normal-case leading-6 tracking-normal text-charcoal/65">{category.text}</p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-walnut">Explore</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileGroup({ title, items, close }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-walnut">{title}</p>
      <div className="grid grid-cols-2 gap-3 text-charcoal/70">
        {items.map((item) => (
          <Link key={item.name} to={`/collection?category=${item.name}`} onClick={close}>{item.name}</Link>
        ))}
      </div>
    </div>
  )
}
