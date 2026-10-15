<script setup>
import { useRouter } from 'vue-router'
import { isLoggedIn, currentUser, logout } from '../stores/auth'

defineProps({ cartCount: { type: Number, default: null } })

const router = useRouter()

const signOut = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="brand">🛍️ MiniCart</router-link>

    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/shop">Shop</router-link>
      <router-link v-if="isLoggedIn" to="/manage">Manage</router-link>

      <template v-if="isLoggedIn">
        <span class="hello">Hi, {{ currentUser.name.split(' ')[0] }}</span>
        <span v-if="cartCount !== null" class="cart-pill">🛒 {{ cartCount }}</span>
        <button class="btn outline" @click="signOut">Logout</button>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register" class="btn">Register</router-link>
      </template>
    </div>
  </nav>
</template>
