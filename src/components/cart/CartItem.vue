<template>
  <div class="cart-item">
    <div class="cart-item__left">
      <span class="cart-item__img-content" :class="classes">
        <img :src="require(`@/assets/catalog/${cart_item_data.image}.png`)" class="cart-item__img">
      </span>
      <div class="cart-item__center">
        <span class="cart-item__name">{{ cart_item_data.name }}</span>
        <span class="cart-item__price">{{ cart_item_data.price * cart_item_data.quantity }} &#8381;</span>
      </div>
  </div>
  <div class="cart-item__quantity">
    <button class="cart-item__add" @click="addQuantity">+</button>
    <span class="cart-item__number">{{ cart_item_data.quantity }}</span>
    <button class="cart-item__sub" @click="subtractQuantity">-</button>
  </div>
</div>
<div class="error-item" v-if="!isValidItem">
  <p>К сожалению, по адресу {{this.ADDRESS}} данный товар недоступен для заказа!</p>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "CartItem",
  data() {
    return {
      classes: {
        tea: this.cart_item_data.type == 'Чай',
        coffee: this.cart_item_data.type == 'Кофе',
        sweet: this.cart_item_data.type == 'Сладкое',
        meal: this.cart_item_data.type == 'Сытное'
      }
    }
  },
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'ADDRESS'
    ]),
    isValidItem(){
      if (this.cart_item_data.coffeeshops.includes(this.ADDRESS)) {
        this.$emit('checkValidItem', true)
        return true
      } else {
        this.$emit('checkValidItem', false)
        return false
      }
    }
  },
  methods: {
    subtractQuantity(){
      this.$emit('subtractQuantity', this.cart_item_data)
    },
    addQuantity(){
      this.$emit('addQuantity', this.cart_item_data)
    }
  }
}
</script>

<style lang="scss" scoped>
.coffee{
  background-color: #FFB21C !important;
}
.tea{
  background-color: #69af60 !important;
}
.sweet{
  background-color: #f6a9f9 !important;
}
.meal{
  background-color: #f57878  !important;
}
.error-item{
  p{
    margin-top: -30px;
    margin-bottom: 40px;
    color: red;
  }
}
.cart-item{
  max-height: 100px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 5%;
  &__left{
   display: grid;
   grid-template-columns: 6em 9em;
   margin-left: 30%;
  }
  &__img{
    width: 70px;
  }
  &__img-content{
    border-radius: 15px;
    padding: 5px;
    min-height: 5em;
    min-width: 5em;
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
  &__name{
   font-weight: 600;
   font-family: 'Montserrat', sans-serif;
  }
  &__center{
   display: grid;
   align-self: center;
   row-gap: 15px;
   margin-left: 15%;
   text-align: start;
  }
  &__price{
   font-size: 20px;
   font-weight: 600;
   font-family: 'Montserrat', sans-serif;
  }
  &__quantity{
   padding: 2% 1%;
   margin-right: 32%;
  }
  &__add{
   margin: 0;
   padding: 0;
   border: 0;
   width: 25px;
   height: 25px;
   margin: 0 5px 0 0;
   color: white;
   border-radius: 40px;
   background-color: rgb(103, 101, 100);
   font-size: 15px;
   font-weight: 800;
   text-align: center;
  }
  &__sub{
   margin: 0;
   padding: 0;
   border: 0;
   width: 25px;
   height: 25px;
   margin: 0 5px 0 0;
   color: white;
   border-radius: 40px;
   background-color: rgb(103, 101, 100);
   font-size: 16px;
   font-weight: 800;
   text-align: center;
  }
  &__sub:active{
    background-color: rgb(0, 0, 0);
  }
  &__add:active{
    background-color: rgb(0, 0, 0);
  }
  &__number{
   padding: 0;
   margin: 0;
   font-size: 20px;
   font-weight: 600;
   font-family: 'Montserrat', sans-serif;
  }
}
@media(min-width: 576px){
  .cart-item{
    &__quantity{
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr 1fr;
    }
    &__add{
      order: 3;
    }
    &__sub{
      order: 1;
    }
    &__number{
      order: 2;
    }
  }
  .error-item{
    p{
      margin: -20px 20% 40px 20%;
    }
  }
}
@media(min-width: 576px) and (max-width: 820px){
  .cart-item{
    &__left{
      margin-left: 27%;
    }
  }
}
@media(max-width: 576px){
 .cart-item{
   max-height: 100px;
   display: flex;
   width: 100%;
   justify-content: space-between;
   margin-bottom: 12%;
   &__left{
    display: grid;
    margin: 0;
    grid-template-columns: 6em 9em;
   }
   &__img-content{
    background-color: #ffb21c;
    border-radius: 15px;
    justify-content: center;
    display: flex;
    width: 90px;
    height: 90px;
   }
   &__name{
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    text-align: start;
   }
   &__center{
    display: grid;
    align-self: center;
    row-gap: 15px;
    margin-left: 15%;
    text-align: start;
   }
   &__price{
    font-size: 20px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
   }
   &__quantity{
    margin: 0;
    display: grid;
    padding: 1%;
   }
   &__add{
    margin: 0;
    padding: 0;
    border: 0;
    width: 25px;
    height: 25px;
    margin: 0 5px 0 0;
    color: white;
    border-radius: 40px;
    background-color: rgb(103, 101, 100);
    font-size: 15px;
    font-weight: 800;
    text-align: center;
   }
   &__sub{
    margin: 0;
    padding: 0;
    border: 0;
    width: 25px;
    height: 25px;
    margin: 0 5px 0 0;
    color: white;
    border-radius: 40px;
    background-color: rgb(103, 101, 100);
    font-size: 16px;
    font-weight: 800;
    text-align: center;
   }
   &__number{
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
   }
 }
}
@media(min-width: 576px) and (max-width: 1024px){
  .cart-item{
    &__add{
      margin-left: 5px;
    }
  }
}
@media(min-width: 1024px){
  .error-item{
    p{
      margin: -4% 30% 40px 30%;
    }
  }
}
</style>