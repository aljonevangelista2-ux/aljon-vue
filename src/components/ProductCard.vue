<script setup>
defineProps({ product: { type: Object, required: true } })
defineEmits(['add-to-cart'])
</script>

<template>
  <div class="product-card">
    <div class="product-image">{{ product.emoji }}</div>
    <h3>{{ product.name }}</h3>
    <p class="price">₱{{ product.price.toLocaleString('en-PH') }}</p>
    <button class="btn full" @click="$emit('add-to-cart', product)">Add to Cart</button>
  </div>
</template>
