<template>
<div class="header">
  <div class="coffee-header">
    <button v-if="this.$route.path !== '/'" @click="goBack()" class="back-popup-btn">&#10094;</button>
    <button v-if="this.$route.path == '/'" @click="this.OPEN_MODAL_ADDRESS" class="coffee-header__address">{{this.ADDRESS}}</button>
    <router-link :to="{name:'catalog'}" class="header__glogo">
      <img src="@/assets/logo.png" alt="logo" class="header__logo">
    </router-link>
    <button @click="this.exitLogout" v-if:="isLoggedIn" class="header__exit">
      <span class="material-icons login-icon">
        logout
      </span>
    </button>
    <button v-if:="!isLoggedIn" @click="openModal" class="header__login">
      <span class="material-icons login-icon">
        login
      </span>
    </button>
    <router-link :to="{name:'orders'}" v-if:="isLoggedIn && !$isMobile()" class="profile-icon">
      <span class="face">
        <i class="material-icons face-icon">face</i>
      </span>
    </router-link>
    <router-link :to="{name:'cart'}" v-if:="!$isMobile()">
      <div class="header-cart">
        <i class="material-icons shop-icon">shopping_bag</i>
        <span class="cart-items-quantity">{{CART_TOTAL_QUANTITY}}</span>
      </div>
  </router-link>
  </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "CoffeeHeader",
  components:{
  },
  computed: {
    ...mapGetters([
      'CART_TOTAL_QUANTITY',
      'isLoggedIn',
      'ADDRESS'
    ])
  },
  methods: {
    ...mapActions([
      'logout',
      'OPEN_MODAL_LOGIN',
      'OPEN_MODAL_ADDRESS'
    ]),
    exitLogout(){
      this.logout().then(() => {
        this.$router.push('/')
      })
    },
    openModal(){
      this.OPEN_MODAL_LOGIN()
    },
    goBack(){
      if (this.$route.path.includes('profile')) {
        this.$router.push('/')
      }
      else this.$router.go(-1)
    }
  }
}

</script>

<style lang="scss" scoped>
.back-popup-btn{
  position: fixed;
  top: 0.7em;
  left: 1em;
  font-size: 1.7em;
  color: #ffffff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.header{
  position: fixed;
  left: 0;
  width: 100%;
  height: 4em;
  margin-top: 0;
  background-color: #3a3939;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding-top: 0;
  top: 0;
  z-index: 2;
  &__glogo{
    margin-top: 1em;
  }
  &__logo{
    width: auto;
    height: 2.2em;
  }
  &__logo-title{
    width: 6em;
    height: auto;
  }
  &__login{
    position: fixed;
    right: 2em;
    top: 1.6em;
    border: 0;
    background-color: transparent;
    color: white;
  }
  &__exit{
    position: fixed;
    right: 2em;
    top: 1.6em;
    border: 0;
    background-color: transparent;
    color: white;
  }
}
.coffee-header{
  display: flex;
  width: 100%;
  justify-content: center;
  &__address{
    border: none;
    position: fixed;
    font-weight: 700;
    left: 0;
    margin-left: 15px;
    margin-top: 7em;
    top: 0;
    font-size: 15px;
    background-color: #ffffff75;
    color: #3a3939;
    border-radius: 10px;
    padding: 5px 7px 2px 7px;
    -webkit-box-shadow: 0px 5px 10px -2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px -2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px -2px rgba(34, 60, 80, 0.2);
  }
}
.profile-icon{
  color: white;
  position: fixed;
  right: 20%;
  top: 1.4em;
}
.face-icon{
  font-size: 30px;
}

@media(min-width: 576px){
  .coffee-header{
    &__address{
      font-size: 18px;
    }
  }
  .header{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &__exit{
      right: 10%;
    }
  }
  .header-cart{
    position: fixed;
    right: 15%;
    top: 1.4em;
    color: white;
  }
  .shop-icon{
    font-size: 30px;
  }
  .login-icon{
    font-size: 30px;
  }
  .cart-items-quantity{
    position: absolute;
    left: 1.5em;
    bottom: 1.5em;
    font-weight: 600;
    background-color: #c0154c;
    color: white;
    border-radius: 50%;
    padding: 3px;
    font-size: 15px;
  }
}
@media(min-width: 576px) and (max-width: 800px){
  .coffee-header{
    &__address{
      margin-top: 6.5em;
    }
  }
}
@media(min-width: 1024px){
  .coffee-header{
    &__address{
      width: 20%;
      padding: 10px;
    }
  }
}
</style>