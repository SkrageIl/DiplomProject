<template>
<div class="header">
  <div class="coffee-header">
    <router-link :to="{name:'catalog'}">
      <img src="@/assets/logocoffee.png" alt="">
    </router-link>
    <button @click="this.logout" v-if:="isLoggedIn" >
      <span class="material-icons">
        logout
      </span>
    </button>
    <button v-if:="!isLoggedIn" @click="openModal">
      <span class="material-icons">
        login
      </span>
    </button>
    <router-link :to="{name:'barista'}">
      <button v-if:="isBarista" >Бариста</button>
    </router-link>
    <router-link :to="{name:'cart'}" v-if:="!$isMobile()">
      <div class="header-cart">
        <i class="material-icons">shopping_bag</i>
        <span class="cart-items-quantity">{{CART_TOTAL_QUANTITY}}</span>
    </div>
  </router-link>
  </div>
  <CatalogNavBar class="nav-bar"/>
</div>
</template>

<script>
import CatalogNavBar from './CatalogNavBar.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "CoffeeHeader",
  components:{
    CatalogNavBar
  },
  computed: {
    ...mapGetters([
      'CART_TOTAL_QUANTITY',
      'isLoggedIn',
      'isBarista'
    ])
  },
  methods: {
    ...mapActions([
      'logout',
      'OPEN_MODAL'
    ]),
    openModal(){
      this.OPEN_MODAL()
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  width: 100%;
  height: 7em;
  margin-top: 0;
  background-color: #3a3939;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding-top: 0;
  top: 0;
  z-index: 2;
}
.coffee-header{
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.nav-bar{
  overflow-x: scroll;
  overflow: hidden;
  padding: 1.25em 0;
}
</style>