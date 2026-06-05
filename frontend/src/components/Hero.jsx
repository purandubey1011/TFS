import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { heroBanners } from '../data/catalog'
import CTAButton from './CTAButton'

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = heroBanners[activeSlide]

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroBanners.length)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [activeSlide])

  return (
    <section className="relative min-h-[82vh] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.image}
          src={slide.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.09 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.8, ease: 'easeOut' }, scale: { duration: 3.2, ease: 'easeOut' } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/22 to-transparent" />
      <motion.div
        key={activeSlide}
        className="container-pad relative z-10 flex min-h-[82vh] items-center"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="max-w-3xl pt-14 text-porcelain">
          <motion.div variants={fadeUp} className="mb-8 h-px w-36 bg-porcelain/70" />
          <motion.h1 variants={fadeUp} className="serif text-6xl font-semibold leading-[0.94] md:text-8xl">
            {slide.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-8 text-porcelain/82">
            {slide.subtitle}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton to="/collection" variant="dark" className="hero-primary-cta border-porcelain bg-porcelain text-charcoal hover:bg-mist">Explore Collection</CTAButton>
            <CTAButton to="/consultation" variant="light" className="border-porcelain/60 text-porcelain hover:bg-porcelain hover:text-charcoal">Book Free Consultation</CTAButton>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {heroBanners.map((banner, index) => (
          <button
            key={banner.image}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full border border-porcelain/80 transition-all duration-300 ${activeSlide === index ? 'w-9 bg-porcelain' : 'w-2.5 bg-porcelain/25'}`}
            aria-label={`Go to hero banner ${index + 1} of ${heroBanners.length}`}
            aria-current={activeSlide === index ? 'true' : undefined}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-10 right-8 hidden h-40 w-px bg-porcelain/45 md:block" />
      <div className="pointer-events-none absolute bottom-10 right-8 hidden h-px w-40 bg-porcelain/45 md:block" />
    </section>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
