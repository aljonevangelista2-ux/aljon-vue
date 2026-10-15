import { ref, watch } from 'vue'
import { defaultProducts } from '../data/products'

// CRUD store for products, persisted in localStorage.
const KEY = 'minicartProducts'

const load = () => {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (Array.isArray(parsed)) return parsed
  } catch {
    /* fall through to defaults */
  }
  return defaultProducts.map((p) => ({ ...p }))
}

export const products = ref(load())

watch(
  products,
  (value) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value))
    } catch {
      /* storage unavailable */
    }
  },
  { deep: true }
)

const clean = ({ name, price, emoji }) => {
  const cleanName = String(name ?? '').trim()
  const cleanPrice = Number(price)

  if (!cleanName) throw new Error('Product name is required.')
  if (!Number.isFinite(cleanPrice) || cleanPrice <= 0) {
    throw new Error('Price must be greater than 0.')
  }

  return { name: cleanName, price: cleanPrice, emoji: String(emoji ?? '').trim() || '📦' }
}

// Create
export function addProduct(data) {
  const id = products.value.reduce((max, p) => Math.max(max, p.id), 0) + 1
  const product = { id, ...clean(data) }
  products.value.push(product)
  return product
}

// Read
export const getProduct = (id) => products.value.find((p) => p.id === id)

// Update
export function updateProduct(id, data) {
  const product = getProduct(id)
  if (!product) throw new Error('Product not found.')
  Object.assign(product, clean(data))
  return product
}

// Delete
export function deleteProduct(id) {
  products.value = products.value.filter((p) => p.id !== id)
}

export function resetProducts() {
  products.value = defaultProducts.map((p) => ({ ...p }))
}
