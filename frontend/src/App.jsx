import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { heroBanners } from './data/catalog'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ConsultationPage from './pages/ConsultationPage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BlogsPage from './pages/BlogsPage'
import BulkQueriesPage from './pages/BulkQueriesPage'
import { preloadImages } from './utils/preloadImages'

export default function App() {
  useEffect(() => {
    preloadImages(heroBanners.map((banner) => banner.image))
  }, [])

  return (
    <div className="min-h-screen bg-porcelain text-charcoal">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/product/:handle" element={<ProductDetailPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bulk-queries" element={<BulkQueriesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogsPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
