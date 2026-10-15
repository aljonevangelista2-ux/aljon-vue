<script setup>
import { ref, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import {
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts
} from '../stores/products'

const emptyForm = () => ({ name: '', price: '', emoji: '' })

const form = ref(emptyForm())
const editingId = ref(null)
const error = ref('')
const search = ref('')

const isEditing = computed(() => editingId.value !== null)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? products.value.filter((p) => p.name.toLowerCase().includes(q)) : products.value
})

const resetForm = () => {
  form.value = emptyForm()
  editingId.value = null
  error.value = ''
}

const submit = () => {
  error.value = ''
  try {
    if (isEditing.value) updateProduct(editingId.value, form.value)
    else addProduct(form.value)
    resetForm()
  } catch (e) {
    error.value = e.message
  }
}

const startEdit = (product) => {
  editingId.value = product.id
  form.value = { name: product.name, price: product.price, emoji: product.emoji }
  error.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const remove = (product) => {
  if (!window.confirm(`Delete "${product.name}"?`)) return
  deleteProduct(product.id)
  if (editingId.value === product.id) resetForm()
}

const restoreDefaults = () => {
  if (!window.confirm('Reset all products to the original list? Your changes will be lost.')) return
  resetProducts()
  resetForm()
}
</script>

<template>
  <div class="shop">
    <NavBar />

    <main>
      <div class="manage-layout">
        <section class="panel">
          <h2>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>

          <form class="crud-form" @submit.prevent="submit">
            <label for="p-name">Name</label>
            <input id="p-name" v-model.trim="form.name" type="text" placeholder="e.g. Hoodie" required />

            <label for="p-price">Price (₱)</label>
            <input
              id="p-price"
              v-model="form.price"
              type="number"
              min="1"
              step="0.01"
              placeholder="e.g. 799"
              required
            />

            <label for="p-emoji">Emoji</label>
            <input id="p-emoji" v-model.trim="form.emoji" type="text" maxlength="4" placeholder="e.g. 🧥" />

            <p v-if="error" class="error">{{ error }}</p>

            <div class="form-actions">
              <button type="submit" class="btn">{{ isEditing ? 'Save Changes' : 'Add Product' }}</button>
              <button v-if="isEditing" type="button" class="btn outline" @click="resetForm">Cancel</button>
            </div>
          </form>
        </section>

        <section class="panel">
          <div class="manage-head">
            <h2>Products ({{ products.length }})</h2>
            <input v-model="search" class="search" type="search" placeholder="Search products…" />
          </div>

          <p v-if="filtered.length === 0" class="empty-note">No products found.</p>

          <div v-else class="table-wrap">
            <table class="crud-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in filtered" :key="product.id" :class="{ editing: product.id === editingId }">
                  <td class="emoji-cell">{{ product.emoji }}</td>
                  <td>{{ product.name }}</td>
                  <td>₱{{ product.price.toLocaleString('en-PH') }}</td>
                  <td class="row-actions">
                    <button class="btn small outline" @click="startEdit(product)">Edit</button>
                    <button class="btn small danger" @click="remove(product)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button class="btn ghost reset" @click="restoreDefaults">Reset to default products</button>
        </section>
      </div>
    </main>
  </div>
</template>
