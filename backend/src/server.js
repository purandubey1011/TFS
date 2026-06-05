import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { products } from './data/products.js'

const app = express()
const port = process.env.PORT || 4000
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: frontendOrigin }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'tfs-backend' })
})

app.get('/api/products', (request, response) => {
  const { category, q } = request.query
  const search = String(q || '').toLowerCase()
  const result = products.filter((product) => {
    const matchesCategory = category ? product.productType.toLowerCase() === String(category).toLowerCase() : true
    const matchesSearch = search ? `${product.title} ${product.productType} ${product.tags.join(' ')}`.toLowerCase().includes(search) : true
    return matchesCategory && matchesSearch
  })

  response.json({ products: result })
})

app.get('/api/products/:handle', (request, response) => {
  const product = products.find((item) => item.handle === request.params.handle)
  if (!product) {
    response.status(404).json({ error: 'Product not found' })
    return
  }

  response.json({ product })
})

app.post('/api/cart/quote', (request, response) => {
  const lines = Array.isArray(request.body.lines) ? request.body.lines : []
  const subtotal = lines.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId)
    const amount = Number(product?.priceRange.minVariantPrice.amount || 0)
    return sum + amount * Number(line.quantity || 1)
  }, 0)

  response.json({
    subtotal,
    currencyCode: 'INR',
    installationAvailable: true,
    note: 'Final quote may change after measurement and fabric confirmation.',
  })
})

app.post('/api/consultations', (request, response) => {
  const { name, phone, city, projectType } = request.body
  if (!name || !phone) {
    response.status(400).json({ error: 'Name and phone are required.' })
    return
  }

  response.status(201).json({
    consultation: {
      id: `consult_${Date.now()}`,
      name,
      phone,
      city,
      projectType,
      status: 'received',
    },
  })
})

app.listen(port, () => {
  console.log(`TFS backend running on http://localhost:${port}`)
})
