const loadedImages = new Set()
const pendingImages = new Map()

export function preloadImage(src) {
  if (!src || loadedImages.has(src)) {
    return Promise.resolve(src)
  }

  if (pendingImages.has(src)) {
    return pendingImages.get(src)
  }

  const promise = new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      loadedImages.add(src)
      pendingImages.delete(src)
      resolve(src)
    }
    image.onerror = () => {
      pendingImages.delete(src)
      resolve(src)
    }
    image.src = src
  })

  pendingImages.set(src, promise)
  return promise
}

export function preloadImages(sources) {
  return Promise.all(sources.map((src) => preloadImage(src)))
}

export function isImagePreloaded(src) {
  return loadedImages.has(src)
}
