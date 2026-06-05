import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ConsultationPage from './pages/ConsultationPage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BlogsPage from './pages/BlogsPage'

export default function App() {
  return (
    <div className="min-h-screen bg-porcelain text-charcoal">
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
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogsPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
