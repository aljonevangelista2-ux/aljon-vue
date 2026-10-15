<script setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import CartItem from './CartItem.vue'

defineProps({
  cart: { type: Array, required: true },
  totalItems: { type: Number, required: true },
  cartTotal: { type: Number, required: true }
})

const emit = defineEmits(['increase', 'decrease', 'remove', 'checkout'])

const showQR = ref(false)

const confirmPayment = () => {
  showQR.value = false
  emit('checkout')
}
</script>

<template>
  <section class="panel">
    <h2>Shopping Cart</h2>

    <div v-if="cart.length === 0" class="empty-cart">
      <div>🛒</div>
      <p>Your cart is empty.</p>
      <small>Add some products to your cart.</small>
    </div>

    <div v-else>
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @increase="$emit('increase', $event)"
        @decrease="$emit('decrease', $event)"
        @remove="$emit('remove', $event)"
      />

      <div class="cart-summary">
        <div>
          <span>Total Items:</span>
          <strong>{{ totalItems }}</strong>
        </div>
        <div class="total">
          <span>Total:</span>
          <strong>₱{{ cartTotal.toLocaleString('en-PH') }}</strong>
        </div>
        <button class="btn full" @click="showQR = true">Checkout</button>
      </div>

      <div v-if="showQR" class="qr-payment">
        <h2>Payment QR Code</h2>
        <p>Scan this QR code to pay.</p>
        <div class="qr-box">
          <QrcodeVue value="MiniCart Payment" :size="200" level="H" />
        </div>
        <p class="payment-total">Amount: ₱{{ cartTotal.toLocaleString('en-PH') }}</p>
        <button class="btn full" @click="confirmPayment">Confirm Payment</button>
      </div>
    </div>
  </section>
</template>
