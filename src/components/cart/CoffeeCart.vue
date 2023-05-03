<template>
  <div class="cart">
    <div class="cart__empty" v-if="CART.length == 0">
      <img class="cart__empty-img" src="@/assets/emptyCart.png" alt="">
      <p class="cart__empty-label">Ваша корзина пуста</p>
      <button class="cart__empty-btn" @click="this.$router.push('/')">В каталог</button>
    </div>
    <h2 v-else class="cart__label">Ваш заказ</h2>
    <div class="cart-items">
      <CartItem
        v-for="(item, index) in CART"
        :key="item.article"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @addQuantity="addQuantity"
        @subtractQuantity="subtractQuantity"
      />
    </div>
    <OrderPage 
      v-if="CART.length != 0"
      @addressChange="addressChange"
      @timeChange="timeChange"
    />
    <div class="bottom-cart" v-if="CART.length != 0">
      <div class="cart__total">
        <span class="cart__label-total">Итого:</span>
        <span class="cart__number-total">{{ CART_TOTAL }} &#8381;</span>
        <button class="cart__btn-order" :disabled="!isValidAddress || !isValidTime" @click="confirmOrder()">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../cart/CartItem.vue'
import OrderPage from './OrderPage.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "CoffeeCart",
  components:{
    CartItem,
    OrderPage,
  },
  created() {
    // this.$store.dispatch('OPEN_LOADING')
    // setTimeout(() => this.$store.dispatch('CLOSE_LOADING'), 1500)
  },
  mounted() {
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
    timeChange(timePick){
      this.isValidTime = timePick.isValidTime
      this.time = timePick.time
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    subtractQuantity(cart_item) {
      this.SUBTRACT_QUANTITY(cart_item)
    },
    addQuantity(cart_item) {
      this.ADD_QUANTITY(cart_item)
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

<style lang="scss" scoped>
.cart{
  margin-top: 8em;
  &__empty-img{
    width: 100%;
    max-width: 20em;
  }
  &__empty-label{
    font-family: 'Montserrat', sans-serif;
    font-size: 2em;
    font-weight: 600;
  }
  &__empty-btn{
    font-family: 'Montserrat', sans-serif;
    border: 0;
    background-color: #ff9000;
    border-radius: 22px;
    width: 10em;
    height: 3em;
    font-size: 1.25em;
    color: #ffffff;
  }
  &__label{
    margin: 5%;
  }
  &__total{
      display: grid;
      margin-top: 20%;
      grid-template-columns: 1fr 1fr;
  }
  &__number-total{
    padding-right: 15px;
    font-size: 20px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    text-align: end;
  }
  &__label-total{
    padding-left: 15px;
    font-size: 20px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    text-align: start;
  }
  &__btn-order{
    grid-column: span 2;
    border: 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    font-weight: 200;
    border-radius: 24px;
    font-size: 15px;
    padding: 15px;
    background-color: #3a3939;
    margin-left: 10%;
    margin-right: 12%;
    margin-top: 5%;
  }
  &__btn-order:disabled{
    background-color: #3a393966;
  }
}
.cart-items{
  padding: 5%;
}
@media(min-width: 576px){
  .cart-items{
    padding: 0 5px;
  }
  .cart{
    &__total{
      margin-top: 13%;
    }
    &__label-total{
      padding-right: 13%;
      font-size: 24px;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      text-align: end;
    }
    &__number-total{
      padding-left: 5%;
      font-size: 23px;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      text-align: start;
    }
    &__btn-order{
      align-self: center;
      grid-column: span 2;
      margin-left: 37%;
      margin-right: 42%;
      margin-top: 2%;
    }
    &__btn-order:disabled{
      background-color: #3a393966;
    }
  }
}
</style>