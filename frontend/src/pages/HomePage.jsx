import { Ruler, Scissors, SwatchBook, Truck, Wrench, Images } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import CategoryCard from '../components/CategoryCard'
import CTAButton from '../components/CTAButton'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import StyledHomesTicker from '../components/StyledHomesTicker'
import { blogPosts, categories, imageSet, products, spaces } from '../data/catalog'

const steps = ['Consultation', 'Fabric Selection', 'Measurement', 'Stitching & Finishing', 'Delivery & Installation']
const reasons = [
  ['Free Measurement Support', Ruler],
  ['Custom Stitching', Scissors],
  ['Premium Fabric Library', SwatchBook],
  ['Expert Installation', Wrench],
  ['Real Project Photos', Images],
  ['After-Sales Support', Truck],
]

const offerBanners = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
  'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=2200&q=85',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85',
  'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=2200&q=85',
]

export default function HomePage() {
  const styledLoop = [...spaces, ...spaces]

  return (
    <>
      <Hero />
      <AnimatedSection className="container-pad py-20">
        <SectionTitle eyebrow="Curated departments" title="Top Categories" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.slice(0, 6).map((category) => <CategoryCard key={category.name} category={category} compact />)}
        </div>
      </AnimatedSection>

      <BannerPhoto src={offerBanners[0]} />

      <AnimatedSection className="py-16">
        <div className="container-pad">
          <SectionTitle eyebrow="Room stories" title="See it styled" />
        </div>
        <div className="see-styled-ticker mt-10 overflow-hidden px-4 pb-4">
          <div className="see-styled-track flex w-max gap-5">
            {styledLoop.map((space, index) => (
              <article key={`${space.name}-${index}`} className="group relative h-[440px] w-[78vw] shrink-0 overflow-hidden md:w-[420px]">
                <video
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  src={space.video}
                  poster={space.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <h3 className="serif absolute bottom-6 left-6 text-4xl text-porcelain">{space.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <BannerPhoto src={offerBanners[1]} />

      <AnimatedSection className="container-pad py-20">
        <SectionTitle eyebrow="Signature collection" title="Best Sellers" />
        <div className="mt-10">
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </AnimatedSection>

      <BannerPhoto src={offerBanners[2]} />

      <AnimatedSection className="container-pad grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <img src={imageSet.consultation} alt="Custom furnishing consultation" className="aspect-[4/5] w-full object-cover" />
        <div className="lg:px-10">
          <SectionTitle eyebrow="Custom furnishing experience" title="From Measurement to Installation" />
          <div className="mt-9 border-l hairline">
            {steps.map((step, index) => (
              <div key={step} className="relative pb-7 pl-8">
                <span className="absolute -left-[15px] top-0 grid h-7 w-7 place-items-center rounded-full border hairline bg-porcelain text-xs">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="serif text-2xl">{step}</h3>
              </div>
            ))}
          </div>
          <CTAButton to="/consultation" className="mt-4">Book Measurement</CTAButton>
        </div>
      </AnimatedSection>

      <AnimatedSection className="container-pad py-20">
        <SectionTitle eyebrow="Our promise" title="Crafted for Comfort. Finished with Detail." />
        <div className="mt-10 grid gap-px overflow-hidden border hairline bg-charcoal/10 md:grid-cols-3">
          {reasons.map(([label, Icon]) => (
            <div key={label} className="bg-porcelain p-7">
              <Icon strokeWidth={1.4} className="mb-6 text-walnut" />
              <h3 className="serif text-2xl">{label}</h3>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <BannerPhoto src={offerBanners[3]} />

      <AnimatedSection className="container-pad py-20">
        <SectionTitle eyebrow="Real spaces" title="Styled Homes & Real Spaces" />
        <div className="mt-10"><StyledHomesTicker /></div>
      </AnimatedSection>

      <AnimatedSection className="container-pad py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionTitle eyebrow="Inspired Living" title="Follow Our Design Stories" />
          <CTAButton to="/blogs" variant="light">See More</CTAButton>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group flex h-full flex-col border hairline bg-[#fbf8f2]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex min-h-[230px] flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="serif mt-5 min-h-[70px] text-3xl font-semibold leading-none">{post.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-charcoal/64">{post.excerpt}</p>
                <CTAButton to={`/blogs/${post.slug}`} variant="light" className="blog-read-link mt-auto w-fit border-0 px-0 py-0 text-[11px] hover:border-0">Read Story</CTAButton>
              </div>
            </article>
          ))}
        </div>
      </AnimatedSection>
    </>
  )
}

function BannerPhoto({ src }) {
  return (
    <section className="container-pad py-6">
      <div className="h-[240px] overflow-hidden md:h-[360px]">
        <img src={src} alt="" className="h-full w-full object-cover" />
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-walnut">{eyebrow}</p>
      <h2 className="serif mt-3 text-5xl font-semibold leading-none md:text-6xl">{title}</h2>
    </div>
  )
}
