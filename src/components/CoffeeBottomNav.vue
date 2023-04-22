<template>
  <div class='v-bottom-nav'>
    <router-link :to="{name:'catalog'}">
        <i class="material-icons selected">coffee</i>
    </router-link>
    <router-link :to="{name:'orders'}">
      <span class="face">
        <i class="material-icons selected">face</i>
      </span>
    </router-link>
    <router-link :to="{name:'cart'}">
      <span>
        <span class="bag">
          <span class="cart-items-quantity" v-if:="CART_TOTAL_QUANTITY!=0">{{CART_TOTAL_QUANTITY}}</span>
          <i class="material-icons selected">shopping_bag</i>
        </span>
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

<style lang="scss" scoped>
.cart-items-quantity{
  position: absolute;
  top: 9px;
  font-weight: 600;
  right: 42px;
  background-color: #c0154c;
  color: white;
  border-radius: 50%;
  padding: 3px;
  font-size: 15px;
}

.selected{
  margin-top: 9px;
}
.router-link-active{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.314);
  -moz-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.314);
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.314);
  transition-duration: .6s;
}
</style>