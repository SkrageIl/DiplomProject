<template>
  <div class="catalog-item">
    <div class="catalog-item__top-content" @click="isModal = true">
    <img src="" alt="img" />
    <h3 class="catalog-item__name">{{ product_data.name }}</h3>
  </div>
    <div class="catalog-item__bot-content">
      <p class="catalog-item__price">Цена:{{ product_data.price }}</p>
      <div class="cart-item__quantity" v-if="quantityInfo > 0">
        <button class="subtract-quantity" @click="subtractQuantity">-</button>
        <p>{{ quantityInfo }}</p>
        <button class="add-quantity" @click="addQuantity">+</button>
      </div>
      <button class="add-to-cart-btn btn" @click="addToCart" v-else>Заказать</button>
    </div>
  </div>
  <swipe-modal
  v-model="isModal"
  contents-height="75vh"
  border-top-radius="16px">
  <img src="" alt="img" />
  <h3>{{ product_data.name }}</h3>
  <p class="catalog-item__price">Цена:{{ product_data.price }}</p>
      <div class="cart-item__quantity" v-if="quantityInfo > 0">
        <button class="subtract-quantity" @click="subtractQuantity">-</button>
        <p>{{ quantityInfo }}</p>
        <button class="add-quantity" @click="addQuantity">+</button>
      </div>
      <button class="add-to-cart-btn btn" @click="addToCart" v-else>Заказать</button>
  </swipe-modal>
</template>

<script>
import {ref} from 'vue';
import swipeModal from '@takuma-ru/vue-swipe-modal'
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CoffeeCatalogItem",
  components:{
    swipeModal
  },
  data() {
    return {
      isModal: ref(false)
    };
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters([
      "CART",
      "FIND_CART_ITEM_QUANTITY_BY_ARTICLE"
    ]),
    quantityInfo: function(){
      return this.FIND_CART_ITEM_QUANTITY_BY_ARTICLE(this.product_data.article)
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
      'ADD_QUANTITY',
      'SUBTRACT_QUANTITY'
    ]),
    addToCart() {
      this.ADD_TO_CART(this.product_data)
    },
    subtractQuantity() {
        this.SUBTRACT_QUANTITY(this.product_data.article)
    },
    addQuantity() {
      this.ADD_QUANTITY(this.product_data.article)
    }
  }
}
</script>

<style lang="scss" scoped></style>
