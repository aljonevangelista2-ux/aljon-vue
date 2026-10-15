<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register, login } from '../stores/auth'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''

  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  try {
    await register({ name: name.value, email: email.value, password: password.value })
    await login({ email: email.value, password: password.value })
    router.push('/shop')
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

      <div class="logo">✨</div>
      <h1>Create Account</h1>
      <p class="subtitle">Join MiniCart and enjoy convenient shopping.</p>

      <form @submit.prevent="submit">
        <label for="name">Full Name</label>
        <input id="name" v-model.trim="name" type="text" placeholder="Enter your full name" autocomplete="name" required />

        <label for="email">Email Address</label>
        <input id="email" v-model.trim="email" type="email" placeholder="Enter your email" autocomplete="username" required />

        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="At least 8 characters"
          minlength="8"
          autocomplete="new-password"
          required
        />

        <label for="confirm">Confirm Password</label>
        <input
          id="confirm"
          v-model="confirm"
          type="password"
          placeholder="Re-enter your password"
          autocomplete="new-password"
          required
        />

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn full" :disabled="loading">
          {{ loading ? 'Creating account…' : 'Create Account' }}
        </button>
      </form>

      <p class="footer-text">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>
