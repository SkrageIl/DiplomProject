<template>
  <div class="coffee-header">
    <router-link :to="{name:'catalog'}">
      <h1>CoffeeApp</h1>
    </router-link>
    <button @click="this.logout" v-if:="isLoggedIn" >Выйти</button>
      <button v-if:="!isLoggedIn" @click="openModal">Войти</button>
      <vue-final-modal
        v-model="isModal"
        @click-outside="closeModal"
        classes="modal-container"
        content-class="modal-content">
          <modal-login
            @closeModal="closeModal">
          </modal-login>
      </vue-final-modal>
    <router-link :to="{name:'barista'}">
      <button v-if:="isBarista" >Бариста</button>
    </router-link>
    <router-link :to="{name:'cart'}" v-if:="!mobile">
      <div class="header-cart">
        <i class="material-icons">shopping_bag</i>
        <span class="cart-items-quantity">{{CART_TOTAL_QUANTITY}}</span>
    </div>
  </router-link>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState } from 'vuex'
import ModalLogin from './loginModal/ModalLogin.vue';

export default {
  name: "CoffeeHeader",
  components: {
    ModalLogin
  },
  data() {
    return {
      mobile: true
    }
  },
  created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapGetters([
      'CART_TOTAL_QUANTITY',
      'isLoggedIn',
      'isBarista'
    ]),
    ...mapState([
      'isModal'
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
      'OPEN_MODAL',
      'CLOSE_MODAL'
    ]),

    onResize() {
      this.mobile = window.innerWidth <= 767;
    },
    openModal(){
      this.OPEN_MODAL()
    },
    closeModal(){
      this.CLOSE_MODAL()
    }
  }
}
</script>

<style>
.modal-container {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
}
.modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  background: #fff;
}
</style>