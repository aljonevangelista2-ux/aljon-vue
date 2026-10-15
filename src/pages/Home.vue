<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { isLoggedIn } from '../stores/auth'
import { products } from '../stores/products'

const router = useRouter()
const featured = computed(() => products.value.slice(0, 4))
</script>

<template>
  <div class="home">
    <NavBar />

    <section class="hero">
      <div class="hero-content">
        <span class="tag">YOUR EVERYDAY ONLINE STORE</span>
        <h1>Shop Smart.<br />Live Better.</h1>
        <p>
          Discover your favorite products, enjoy a simple shopping experience,
          and manage everything in one convenient cart.
        </p>

        <div class="hero-buttons">
          <button class="btn" @click="router.push('/shop')">Start Shopping →</button>
          <button v-if="!isLoggedIn" class="btn outline" @click="router.push('/register')">
            Create Account
          </button>
        </div>

        <div class="features">
          <span>✓ Easy Shopping</span>
          <span>✓ Simple Cart</span>
          <span>✓ Great Products</span>
        </div>
      </div>

      <div class="hero-art">
        <div class="circle">
          <span class="big-bag">🛍️</span>
          <span class="floating f1">👟</span>
          <span class="floating f2">👕</span>
          <span class="floating f3">🎧</span>
        </div>
      </div>
    </section>

    <section class="featured">
      <div class="section-heading">
        <div>
          <span class="tag">OUR COLLECTION</span>
          <h2>Featured Products</h2>
        </div>
        <button class="btn ghost" @click="router.push('/shop')">View All →</button>
      </div>

      <div class="product-grid four">
        <div v-for="product in featured" :key="product.id" class="product-card">
          <div class="product-image">{{ product.emoji }}</div>
          <h3>{{ product.name }}</h3>
          <p class="price">₱{{ product.price.toLocaleString('en-PH') }}</p>
          <button class="btn full" @click="router.push('/shop')">View Product</button>
        </div>
      </div>
    </section>

    <footer>
      <h3>🛍️ MiniCart</h3>
      <p>Your simple and convenient shopping companion.</p>
      <p>MiniCart © 2026</p>
    </footer>
  </div>
</template>
