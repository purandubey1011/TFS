import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/useStore'
import AnnouncementBar from './AnnouncementBar'

const navItems = ['Home', 'Furniture', 'Home Decor', 'Projects', 'Consultation', 'Contact']
const furnitureGroups = [
  {
    title: 'Living Room',
    items: [
      'Arm Chairs',
      'Lounge Chairs',
      'Rocking Chairs',
      'Chairs with Ottoman',
      'Sofas',
      'Sofa Cum Bed',
      'Recliners',
      'Coffee Tables',
      'Accent Tables',
      'Console Table',
      'Poufs',
      'Stools',
      'Rugs',
    ],
  },
  {
    title: 'Dining',
    items: [
      'Dining Tables',
      'Dining Chairs',
      'Serving Bowls',
      'Choping Boards',
      'Tools & Utensils',
      'Shelf with Hooks & Hangers',
    ],
  },
  {
    title: 'Bed Room',
    items: ['Beds', 'Bed Sides', 'Storage Benches', 'Coat Hangers', 'TV Units', 'Cabinets'],
  },
  {
    title: 'Outdoor',
    items: [
      'Outdoor Dining Chairs',
      'Outdoor Coffee Tables',
      'Outdoor Accent Tables',
      'Outdoor Benches',
      'Outdoor Swings',
      'Outdoor Sofas',
      'Outdoor Stools',
    ],
  },
  {
    title: 'Bar',
    items: ['Bar Chairs', 'Bar Poufs'],
  },
  {
    title: 'Office Furniture',
    items: ['Office Tables'],
  },
  {
    title: 'Restaurant',
    items: ['Restaurant Tables', 'Restaurant Chairs'],
  },
]
const homeDecorGroups = [
  { title: 'Vases', items: ['Table Vases', 'Floor Vases', 'Vases Accessories'] },
  { title: 'Table Decor', items: ['Table Accents', 'Table Accessories', 'Decorative Boxes', 'Trays and Bowls'] },
  { title: 'Wall Decor', items: ['Wall Art (Metal)', 'Wall Art (Wooden)', 'Wall Painting'] },
  { title: 'Gardening', items: ['Indoor Planters', 'Outdoor Planters'] },
  { title: 'Pillows & Throws', items: ['Cushion Covers', 'Throws'] },
  { title: 'Mirrors', items: ['Wall Mirrors'] },
  { title: 'Baskets', items: ['Storage Baskets'] },
  { title: 'Bath', items: ['Bath Accessories', 'Bath Mat', 'Bath Towels'] },
  { title: 'Clocks', items: ['Wall Clocks', 'Table Clocks'] },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { cartCount, setCartOpen } = useStore()

  const navTarget = (item) => {
    if (item === 'Home') return '/'
    if (item === 'Furniture') return '/collection?department=Furniture'
    if (item === 'Home Decor') return '/collection?department=Home%20Decor'
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
            const hasDropdown = item === 'Furniture' || item === 'Home Decor'
            const dropdownGroups = item === 'Furniture' ? furnitureGroups : homeDecorGroups

            if (hasDropdown) {
              return (
                <div
                  key={item}
                  className="nav-menu-group"
                  onMouseEnter={() => setActiveDropdown(item)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => setActiveDropdown(item)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setActiveDropdown(null)
                    }
                  }}
                >
                  <NavLink to={navTarget(item)} className="nav-link py-8" onClick={() => setActiveDropdown(null)}>{item}</NavLink>
                  <MegaMenu title={item} groups={dropdownGroups} isOpen={activeDropdown === item} closeMenu={() => setActiveDropdown(null)} />
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
            <MobileGroup title="Furniture" groups={furnitureGroups} close={() => setMenuOpen(false)} />
            <MobileGroup title="Home Decor" groups={homeDecorGroups} close={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}

function IconButton({ children, label, className = '' }) {
  return <button type="button" className={`p-2 ${className}`} aria-label={label}>{children}</button>
}

function MegaMenu({ title, groups, isOpen, closeMenu }) {
  const viewAllTarget = title === 'Furniture' ? '/collection?department=Furniture' : '/collection?department=Home%20Decor'

  return (
    <div className={`nav-menu-panel hidden border-y hairline bg-porcelain lg:block ${isOpen ? 'is-open' : ''}`}>
      <div className="container-pad py-7">
        <div className="mb-6 flex items-center justify-between border-b hairline pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/50">{title}</p>
          <Link to={viewAllTarget} onClick={closeMenu} className="text-xs font-semibold uppercase tracking-[0.18em] text-walnut">View all</Link>
        </div>
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-charcoal">{group.title}</p>
              <div className="grid gap-2.5">
                {group.items.map((item) => (
                  <Link key={item} to={`/collection?category=${encodeURIComponent(item)}`} onClick={closeMenu} className="dropdown-link text-sm font-normal normal-case tracking-normal text-charcoal/62 transition-colors hover:text-charcoal">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileGroup({ title, groups, close }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-walnut">{title}</p>
      <div className="grid gap-4 text-charcoal/70">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-charcoal">{group.title}</p>
            <div className="grid grid-cols-2 gap-2">
              {group.items.map((item) => (
                <Link key={item} to={`/collection?category=${encodeURIComponent(item)}`} onClick={close}>{item}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
