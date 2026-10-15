<script setup>
import { ref, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import ProductList from '../components/ProductList.vue'
import Cart from '../components/Cart.vue'
import { products } from '../stores/products'

const cart = ref([])
const notice = ref('')

const totalItems = computed(() => cart.value.reduce((sum, i) => sum + i.quantity, 0))
const cartTotal = computed(() => cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

const addToCart = (product) => {
  const existing = cart.value.find((i) => i.id === product.id)
  if (existing) existing.quantity++
  else cart.value.push({ ...product, quantity: 1 })
}

const increase = (item) => {
  item.quantity++
}

const decrease = (item) => {
  if (item.quantity > 1) item.quantity--
  else remove(item.id)
}

const remove = (id) => {
  cart.value = cart.value.filter((i) => i.id !== id)
}

const checkout = () => {
  cart.value = []
  notice.value = 'Payment confirmed. Thank you for shopping with MiniCart! 🎉'
  setTimeout(() => (notice.value = ''), 4000)
}
</script>

<template>
  <div class="shop">
    <NavBar :cart-count="totalItems" />

    <main>
      <p v-if="notice" class="notice">{{ notice }}</p>

      <div class="shop-layout">
        <ProductList :products="products" @add-to-cart="addToCart" />
        <Cart
          :cart="cart"
          :total-items="totalItems"
          :cart-total="cartTotal"
          @increase="increase"
          @decrease="decrease"
          @remove="remove"
          @checkout="checkout"
        />
      </div>
    </main>
  </div>
</template>
