<template>
  <div class="cart-item">
    <img alt="">
    <p>{{ cart_item_data.name }}</p>
    <p>{{ cart_item_data.price * cart_item_data.quantity }}</p>
  <div class="cart-item__quantity">
    <button class="subtract-quantity" @click="subtractQuantity">-</button>
    <p>{{ cart_item_data.quantity }}</p>
    <button class="add-quantity" @click="addQuantity">+</button>
    <button class="delete-from-cart" @click="deleteFromCart">
      Удалить
    </button>
  </div>
</div>
</template>

<script>

export default {
  name: "CartItem",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    },
    subtractQuantity(){
      this.$emit('subtractQuantity', this.cart_item_data.article)
    },
    addQuantity(){
      this.$emit('addQuantity', this.cart_item_data.article)
    }
  }
}
</script>

<style lang="scss" scoped></style>