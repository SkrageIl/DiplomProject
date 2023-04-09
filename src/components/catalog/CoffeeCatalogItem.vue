<template>
  <div class="catalog-item">
    <div class="catalog-item__top-content" :class="classes" @click="openModal()">
    <img class="item__image" src="@/assets/Coffee.png" alt="img" />
    </div>
    <h3 class="item__name">{{ product_data.name }}</h3>
    <div class="catalog-item__bot-content">
    <div class="bot-content__sizes" v-if="product_data.article.indexOf('F')">
      <button class="item__size" :class="{selected: size == 0.2}" @click="selectSize(0.2)">0.2л</button>
      <button class="item__size" :class="{selected: size == 0.3}" @click="selectSize(0.3)">0.3л</button>
      <button class="item__size" :class="{selected: size == 0.4}" @click="selectSize(0.4)">0.4л</button>
    </div>
    <div class="footer">
      <div class="item__price">
        <span class="item__price__value">{{ product_data.price }}</span>
        <span class="item__price__currency">&#8381;</span>
      </div>
      <div class="item__quantity" v-if="quantityInfo > 0">
        <button class="item__subtract" @click="subtractQuantity">-</button>
        <span class="quantity-number">{{ quantityInfo }}</span>
        <button class="item__add" @click="addQuantity">+</button>
      </div>
      <button class="item__btn btn" @click="addToCart" :disabled="!this.size && !product_data.article.indexOf('C')" v-else>+</button>
    </div>
    </div>
  </div>
  <vue-final-modal
    v-model="isItemModal"
    @click-outside="closeModal"
    :drag="true"
    classes="modal-container"
    content-class="modal-content modal-item">
      <div class="catalog-item__top-content modal-top-content">
        <img class="item__image modal-item__img swipe_item_img" src="@/assets/Coffee.png" alt="img"/>
        <div class="top-content__sizes" v-if="!product_data.article.indexOf('C')">
          <button class="item__size" :class="{selected: size == 0.2}" @click="selectSize(0.2)">0.2л</button>
          <button class="item__size" :class="{selected: size == 0.3}" @click="selectSize(0.3)">0.3л</button>
          <button class="item__size" :class="{selected: size == 0.4}" @click="selectSize(0.4)">0.4л</button>
        </div>
      </div>
      <div class="catalog-item__bot-content modal-bot-content">
        <h3 class="item__name modal-item__name">{{ product_data.name }}</h3>
        <p class="item__title modal-item__title">{{ product_data.title }}</p>
      <div class="footer modal-footer">
        <div class="item__price">
          <span class="item__price__value">{{ product_data.price }}</span>
          <span class="item__price__currency">&#8381;</span>
        </div>
        <div class="item__quantity" v-if="quantityInfo > 0">
          <button class="item__subtract" @click="subtractQuantity">-</button>
          <span class="quantity-number">{{ quantityInfo }}</span>
          <button class="item__add" @click="addQuantity">+</button>
        </div>
        <button class="item__btn btn" @click="addToCart" :disabled="!this.size && !product_data.article.indexOf('C')" v-else>+</button>
      </div>
      </div>
  </vue-final-modal>
  <swipe-modal
    v-model="isMobileItemModal"
    border-top-radius="16px"
    >
    <div class="swipe-modal" :class="classes">
      <div class="catalog-item__top-content modal-top-content">
        <img class="item__image modal-item__img" src="@/assets/Coffee.png" alt="img"/>
        <div class="top-content__sizes" v-if="!product_data.article.indexOf('C')">
          <button class="item__size swipe-modal__size" :class="{selected: size == 0.2}" @click="selectSize(0.2)">0.2л</button>
          <button class="item__size swipe-modal__size" :class="{selected: size == 0.3}" @click="selectSize(0.3)">0.3л</button>
          <button class="item__size swipe-modal__size" :class="{selected: size == 0.4}" @click="selectSize(0.4)">0.4л</button>
        </div>
      </div>
      <div class="catalog-item__bot-content modal-bot-content swipe-modal-bot-content">
        <h3 class="item__name modal-item__name swipe-modal__name">{{ product_data.name }}</h3>
        <p class="item__title modal-item__title">{{ product_data.title }}</p>
      <div class="footer modal-footer swipe-modal-footer">
        <div class="item__price swipe-modal__price">
          <span class="item__price__value">{{ product_data.price }}</span>
          <span class="item__price__currency">&#8381;</span>
        </div>
        <div class="item__quantity swipe-modal__quantity" v-if="quantityInfo > 0">
          <button class="item__subtract swipe-modal__sub" @click="subtractQuantity">-</button>
          <span class="quantity-number swipe-modal__number">{{ quantityInfo }}</span>
          <button class="item__add swipe-modal__add" @click="addQuantity">+</button>
        </div>
        <button class="item__btn btn swipe-modal__btn" swipe-modal__btn @click="addToCart" :disabled="!this.size && !product_data.article.indexOf('C')" v-else>+</button>
      </div>
      </div>
    </div>
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
      isMobileItemModal: ref(false),
      isItemModal: ref(false),
      size: 0,
      classes: {
        tea: this.product_data.type == 'Чай',
        coffee: this.product_data.type == 'Кофе',
        sweet: this.product_data.type == 'Сладкое',
        meal: this.product_data.type == 'Сытное'
      }
    }
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
      'SUBTRACT_QUANTITY',
      'DELETE_FROM_CART'
    ]),
    addToCart() {
      let product = this.product_data
      product.size = this.size
      console.log(product + "        " + product.size)
      this.ADD_TO_CART(product)
    },
    subtractQuantity() {
        this.SUBTRACT_QUANTITY(this.product_data.article)
    },
    addQuantity() {
      this.ADD_QUANTITY(this.product_data.article)
    },
    openModal(){
      if(this.$isMobile()){
        this.isMobileItemModal = true
      } else {
        this.isItemModal = true
      }
    },
    closeModal(){
            this.isItemModal = false
    },
    selectSize(selectedSize){
      if (this.size == selectedSize) {
        this.size = 0
        let quantity = this.product_data.quantity
        for (let index = 0; index < quantity; index++) {
          console.log(index)
          this.SUBTRACT_QUANTITY(this.product_data.article)          
        }
        this.DELETE_FROM_CART(this.product_data)
      } else {
        this.size = selectedSize
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-modal{
  border-radius: 25px;
}
.btn:disabled{
  background-color: #3a393966 !important;
}
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
.catalog-item{
  border-radius: 16px;
  &__top-content{
    width: 100%;
    border-radius: 18px;
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
  }
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}
.bot-content__sizes{
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  grid-gap: 5px;
  margin: 0 10%;
  justify-content: center;
}
.top-content__sizes{
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
  grid-gap: 5px;
  margin: 0 10%;
  justify-content: center;
}
.item{
  width: 75%;
  justify-self: center;
  &__image{
    width: 50%;
    margin: 10%
  }
  &__name{
    margin: 6%;
    margin-top: 10%;
    width: 60%;
    text-align: start;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 100%;
  }
  &__size{
    padding: 5px;
    margin: 0 5%;
    border: 0;
    border-radius: 25px;
    background-color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 800;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  }
  &__price{
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 20px;
    margin: 7%;
  }
  &__btn{
    width: 30px;
    height: 30px;
    border: 0;
    color: white;
    border-radius: 40px;
    background-color: #3a3939;
  }
  &__quantity{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
  }
  &__subtract{
    border: 0;
    width: 30px;
    height: 30px;
    margin: 0 10px 0 0;
    color: white;
    border-radius: 40px;
    background-color: rgb(103, 101, 100);
    font-size: 17px;
    font-weight: 800;
    text-align: center;
  }
  &__subtract:active{
    background-color: rgb(0, 0, 0);
  }
  &__add{
    border: 0;
    width: 30px;
    height: 30px;
    margin: 0 0 0 10px;
    color: white;
    border-radius: 40px;
    background-color: rgb(103, 101, 100);
    font-size: 17px;
    font-weight: 800;
    text-align: center;
  }
  &__add:active{
    background-color: rgb(0, 0, 0);
  }
}
.quantity-number{
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
}
.footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 7%;
}
.selected{
  background-color: rgb(0, 0, 0) !important;
  color: rgb(255, 255, 255);
}
.modal-item{
  border-radius: 25px;
  border: 0;
  &__name{
    margin: 0;
    padding: 0;
    padding-bottom: 0.5rem;
  }
  &__title{
    margin: 0;
    text-align: left;
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.05rem;
  }
  &__img{
    margin-bottom: 1.75rem;
  }
}
.modal-top-content{
  padding-bottom: 1.15rem;
}
.modal-bot-content{
  padding: 1rem 1.10rem;
  background-color: white;
  border-radius: 25px;
  -webkit-box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 5px 8px 2px rgba(0, 0, 0, 0.12);
}
.modal-footer{
  margin: 0;
  margin-top: 1rem;
}
.swipe-modal-bot-content{
  border: 0;
  border-radius: 0;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
}
.swipe_item_img{
  width: 40%;
}
.swipe-modal-footer{
  padding-bottom: 1rem;
}

@media(max-width: 576px){
  .item{
    &__name{
      width: 60%;
      text-align: start;
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 90%;
    }
    &__size{
      padding: 15% 15%;
      border: 0;
      border-radius: 25px;
      background-color: white;
      font-family: 'Montserrat', sans-serif;
      font-size: 9px;
      font-weight: 900;
    }
    &__price{
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      font-size: 17px;
    }
    &__btn{
      width: 25px;
      height: 25px;
    }
    &__quantity{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 25px;
    }
    &__subtract{
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
    &__add{
      border: 0;
      width: 25px;
      height: 25px;
      margin: 0 0 0 5px;
      color: white;
      border-radius: 40px;
      background-color: rgb(103, 101, 100);
      font-size: 12px;
      font-weight: 800;
      text-align: center;
    }
  }
  .swipe-modal{
    &__name{
      font-size: 24px;
    }
    &__price{
      font-size: 22px;
    }
    &__size{
      font-size: 13px;
      padding: 10% 10%;
    }
    &__quantity{
      height: 40px;
    }
    &__number{
      font-size: 19px;
    }
    &__btn{
      font-size: 19px;
      width: 40px;
      height: 40px;
    }
    &__sub{
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    &__add{
      width: 40px;
      height: 40px;
      margin-left: 10px;
    }
  }
}
  @media(min-width: 576px) and (max-width: 700px){
    .item{
      &__size{
        font-size: 8px;
      }
      &__btn{
        width: 25px;
        height: 25px;
      }
      
    }
  }
  @media(min-width: 576px) and (max-width: 860px){
    .item{
      &__quantity{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20px;
      }
      &__subtract{
        border: 0;
        width: 20px;
        height: 20px;
        margin: 0 5px 0 0;
        color: white;
        border-radius: 40px;
        background-color: rgb(103, 101, 100);
        font-size: 14px;
        font-weight: 800;
        text-align: center;
      }
      &__add{
        border: 0;
        width: 20px;
        height: 20px;
        margin: 0 0 0 5px;
        color: white;
        border-radius: 40px;
        background-color: rgb(103, 101, 100);
        font-size: 14px;
        font-weight: 800;
        text-align: center;
      }
      &__price{
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
        font-size: 20px;
      }
    }
  }
</style>
