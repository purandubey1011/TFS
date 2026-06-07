import { useCallback, useEffect, useState } from 'react'
import { heroBanners } from '../data/catalog'
import { isImagePreloaded, preloadImage } from '../utils/preloadImages'

const getLoadedHeroSlides = () =>
  new Set(heroBanners.map((banner, index) => (isImagePreloaded(banner.image) ? index : null)).filter((index) => index !== null))

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState(getLoadedHeroSlides)

  const markSlideLoaded = useCallback((index) => {
    setLoadedSlides((current) => {
      if (current.has(index)) return current
      return new Set(current).add(index)
    })
  }, [])

  useEffect(() => {
    heroBanners.forEach((banner, index) => {
      preloadImage(banner.image).then(() => markSlideLoaded(index))
    })
  }, [markSlideLoaded])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => {
        const nextSlide = (current + 1) % heroBanners.length
        return loadedSlides.has(nextSlide) ? nextSlide : current
      })
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [loadedSlides])

  const goToSlide = (index) => {
    if (index === activeSlide || !loadedSlides.has(index)) return
    setActiveSlide(index)
  }

  return (
    <section
      className="relative min-h-[82vh] overflow-hidden bg-porcelain bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBanners[activeSlide].image})` }}
    >
      <div
        className="absolute inset-0 flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {heroBanners.map((banner, index) => (
          <img
            key={banner.image}
            src={banner.image}
            alt=""
            className="h-full w-full min-w-full shrink-0 object-cover"
            loading="eager"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => markSlideLoaded(index)}
          />
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {heroBanners.map((banner, index) => (
          <button
            key={banner.image}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full border border-porcelain/80 transition-all duration-300 ${activeSlide === index ? 'w-9 bg-porcelain' : 'w-2.5 bg-porcelain/25'}`}
            aria-label={`Go to hero banner ${index + 1} of ${heroBanners.length}`}
            aria-current={activeSlide === index ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  )
}
