import { Star } from 'lucide-react'
import { styledHomeReviews } from '../data/catalog'

export default function StyledHomesTicker() {
  const loopItems = [...styledHomeReviews, ...styledHomeReviews]

  return (
    <div className="styled-ticker overflow-hidden border-y hairline py-6">
      <div className="styled-ticker-track flex w-max gap-5">
        {loopItems.map((review, index) => (
          <article key={`${review.name}-${index}`} className="w-[320px] shrink-0 border hairline bg-[#fbf8f2] p-4 md:w-[390px]">
            <div className="grid grid-cols-[96px_1fr] gap-4">
              <img src={review.image} alt={review.name} className="h-28 w-full object-cover" />
              <div>
                <p className="serif text-2xl font-semibold leading-none">{review.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-charcoal/55">{review.client}, {review.location}</p>
                <div className="mt-3 flex gap-1 text-gold">
                  {Array.from({ length: review.stars }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" strokeWidth={1.5} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-charcoal/66">"{review.quote}"</p>
          </article>
        ))}
      </div>
    </div>
  )
}
