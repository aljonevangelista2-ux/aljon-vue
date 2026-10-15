<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['increase', 'decrease', 'remove'])
</script>

<template>
  <div class="cart-item">
    <div class="cart-product">
      <span class="cart-emoji">{{ item.emoji }}</span>
      <div>
        <h3>{{ item.name }}</h3>
        <p>₱{{ item.price.toLocaleString('en-PH') }}</p>
      </div>
    </div>

    <div class="quantity">
      <button @click="$emit('decrease', item)">−</button>
      <span>{{ item.quantity }}</span>
      <button @click="$emit('increase', item)">+</button>
    </div>

    <strong>₱{{ (item.price * item.quantity).toLocaleString('en-PH') }}</strong>

    <button class="remove" @click="$emit('remove', item.id)">Remove</button>
  </div>
</template>
