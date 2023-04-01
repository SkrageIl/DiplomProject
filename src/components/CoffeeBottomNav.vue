<template>
  <div class='v-bottom-nav'>
    <router-link :to="{name:'catalog'}">
      <i class="material-icons">coffee</i>
    </router-link>
    <router-link :to="{name:'profile'}">
      <i class="material-icons">face</i>
    </router-link>
    <router-link :to="{name:'cart'}">
      <span>
        <i class="material-icons">shopping_bag</i>
        <span class="cart-items-quantity" v-if:="CART_TOTAL_QUANTITY!=0">{{CART_TOTAL_QUANTITY}}</span>
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "BottomNav",
  computed: {
    ...mapGetters([
      'CART',
      'CART_TOTAL_QUANTITY'
    ])
  }
}
</script>

<style lang="scss" scoped></style>