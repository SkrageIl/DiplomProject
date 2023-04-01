<template>
  <div class="cart">
    <h2>Ваш заказ</h2>
    <p v-if="CART.length == 0">Ваша корзина пуста</p>
    <CartItem
      v-for="(item, index) in CART"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @addQuantity="addQuantity"
      @subtractQuantity="subtractQuantity"
    />
    <OrderPage 
      v-if="CART.length != 0"
      @addressChange="addressChange"
      @timeChange="timeChange"
    />
    <div class="cart__total" v-if="CART.length != 0">
      <p>Итого:</p>
      <p>{{ CART_TOTAL }}</p>
      <button class="btn-order" :disabled="!isValidAddress || !isValidTime" @click="confirmOrder()">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import CartItem from '../cart/CartItem.vue'
import OrderPage from './OrderPage.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "CoffeeCart",
  components:{
    CartItem,
    OrderPage,
  },
  data(){ 
    return{
      address: "",
      time: "",
      isValidAddress: false,
      isValidTime: false
    }
  },
  watch: {
    address(){
      if (this.address !== "") {
        this.isValidAddress = true
      }
    },
    time(){
      if (!this.time.includes("HH") && !this.time.includes("mm") && this.time !== "") {
        this.isValidTime = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'CART',
      'CART_TOTAL',
      'isLoggedIn'
    ]),
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'ADD_QUANTITY',
      'SUBTRACT_QUANTITY',
      'SET_ORDER'
    ]),
    addressChange(address){
      this.address = address
    },
    timeChange(time){
      this.time = time
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    subtractQuantity(article) {
      this.SUBTRACT_QUANTITY(article)
    },
    addQuantity(article) {
      this.ADD_QUANTITY(article)
    },
    confirmOrder(){
      if (this.isLoggedIn) {
        this.SET_ORDER({address: this.address, time: this.time})
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
      } else this.$store.dispatch('OPEN_MODAL')
    }
  }
}
</script>

<style lang="scss" scoped></style>