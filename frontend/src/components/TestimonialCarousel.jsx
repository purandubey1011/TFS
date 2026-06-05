import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const reviews = [
  { name: 'Anika Mehra', location: 'Bandra', type: 'Curtains and blinds', quote: 'The measurement team understood the light in every room. The final finish feels calm, precise and very premium.' },
  { name: 'Rohan Shah', location: 'Juhu', type: 'Living room styling', quote: 'Our sofa, rug and drapes came together like a designed space, not separate purchases.' },
  { name: 'Mira Kapoor', location: 'Powai', type: 'Wallpaper project', quote: 'Beautiful material library, clean installation and no visual clutter in the process.' },
]

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const review = reviews[index]

  return (
    <div className="border-y hairline py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-walnut">{review.type}</p>
          <blockquote className="serif mt-4 max-w-4xl text-4xl leading-tight md:text-5xl">"{review.quote}"</blockquote>
          <p className="mt-5 text-sm text-charcoal/64">{review.name}, {review.location}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="grid h-11 w-11 place-items-center border hairline" onClick={() => setIndex((index + reviews.length - 1) % reviews.length)} aria-label="Previous review"><ArrowLeft size={16} /></button>
          <button type="button" className="grid h-11 w-11 place-items-center border hairline" onClick={() => setIndex((index + 1) % reviews.length)} aria-label="Next review"><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  )
}
