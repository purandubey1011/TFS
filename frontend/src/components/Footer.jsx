import { Camera, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t hairline bg-[#efe7da]">
      <div className="container-pad grid gap-10 py-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <h2 className="serif text-5xl font-semibold">TFS</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-charcoal/65">Premium furnishing, custom measurement and home styling for considered interiors.</p>
          <div className="mt-6 flex gap-3">
            <button className="grid h-11 w-11 place-items-center border hairline" aria-label="Instagram"><Camera size={17} /></button>
            <button className="grid h-11 w-11 place-items-center border hairline" aria-label="WhatsApp"><MessageCircle size={17} /></button>
          </div>
        </div>
        <FooterColumn title="Quick Links" links={['Home', 'Projects', 'About', 'Consultation', 'Bulk Queries']} />
        <FooterColumn title="Categories" links={['Curtains', 'Blinds', 'Wallpapers', 'Sofas', 'Rugs', 'Bedding']} />
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em]">Newsletter</h3>
          <p className="text-sm leading-7 text-charcoal/65">Receive edited collections, project stories and seasonal offers.</p>
          <div className="mt-5 flex border hairline">
            <input className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" placeholder="Email address" />
            <button className="bg-charcoal px-4 text-xs font-semibold uppercase tracking-[0.16em] text-porcelain">Join</button>
          </div>
          <p className="mt-5 text-sm text-charcoal/60">Studio: 21 Design Avenue, Mumbai</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  const linkTarget = (link) => {
    if (link === 'Home') return '/'
    if (link === 'Bulk Queries') return '/bulk-queries'
    return `/${link.toLowerCase()}`
  }

  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em]">{title}</h3>
      <div className="grid gap-3 text-sm text-charcoal/66">
        {links.map((link) => (
          <Link key={link} to={linkTarget(link)}>{link}</Link>
        ))}
      </div>
    </div>
  )
}
