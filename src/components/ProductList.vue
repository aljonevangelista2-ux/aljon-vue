<script setup>
import ProductCard from './ProductCard.vue'

defineProps({ products: { type: Array, required: true } })
defineEmits(['add-to-cart'])
</script>

<template>
  <section class="panel">
    <h2>Products</h2>
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>
  </section>
</template>
