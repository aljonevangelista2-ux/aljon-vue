<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../stores/auth'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    await login({ email: email.value, password: password.value })
    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
      ? route.query.redirect
      : '/shop'
    router.push(redirect)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <router-link to="/" class="back">← Back to Home</router-link>

      <div class="logo">🛍️</div>
      <h1>Welcome Back!</h1>
      <p class="subtitle">Login to continue shopping with MiniCart.</p>

      <form @submit.prevent="submit">
        <label for="email">Email Address</label>
        <input
          id="email"
          v-model.trim="email"
          type="email"
          placeholder="Enter your email"
          autocomplete="username"
          required
        />

        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          required
        />

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn full" :disabled="loading">
          {{ loading ? 'Logging in…' : 'Login to Account' }}
        </button>
      </form>

      <p class="footer-text">
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>
