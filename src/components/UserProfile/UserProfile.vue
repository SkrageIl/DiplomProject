<template>
  <div class="user-profile">
    <div class="user-profile__header">
      <span class="user-profile__title">
        Привет, {{this.USER.name}} !
      </span>
      <span class="user-profile__avatar">
        <img src="@/assets/avatar.png" alt="" class="user-profile__avatar-img">
      </span>
    </div>
    <div class="nav-profile">
      <router-link
        :to="{name:'orders'}"
        class="nav-profile__item"
        :class="{selected: navActive == 'orders'}"
        @click="this.navActive = 'orders'">
          Мои заказы
      </router-link>
      <router-link
        :to="{name:'shops'}"
        class="nav-profile__item"
        :class="{selected: navActive == 'shops'}"
        @click="this.navActive = 'shops'">
          Наши кофейни
      </router-link>
      <router-link
        :to="{name:'settings'}"
        class="nav-profile__item"
        :class="{selected: navActive == 'settings'}"
        @click="this.navActive = 'settings'">
          Настройки
      </router-link>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "UserProfile",
  components:{
  },
  data() {
    return {
      navActive: "orders"
    }
  },
  created() {
  },
  mounted() {
  },
  beforeUnmount () {
  },
  computed: {
    ...mapGetters([
      'USER'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.user-profile{
  margin-top: 7em;

  &__header{
    display: flex;
    justify-content: space-around;
    margin-bottom: 2em;
    align-items: center;
  }
  &__avatar-img{
    width: 90px;
    margin-right: 20px;
  }
  &__exit{
    font-size: 1em;
    margin-top: 0.5em;
    border: 0;
    background-color: transparent;
    text-decoration: underline;
  }
  &__title{
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 1.5em;
  }
}
.nav-profile{
  display: flex;
  overflow-x: scroll;
  margin-left: 2em;

  &__item{
    font-family: 'Montserrat', sans-serif;
    padding: 1em;
    margin: 0 0.5em;
    border-radius: 24px;
    text-decoration: none;
    color: #cbcbcbd8;
    font-weight: 600;
    white-space: nowrap;
  }
}
.nav-profile::-webkit-scrollbar { width: 0; }
.nav-profile{ -ms-overflow-style: none; }
.nav-profile{ overflow: -moz-scrollbars-none; }

.selected{
  color: #3a3939;
  border-top: #ff9000;
  border-top-style: solid;
  border-radius: 10px;
}

</style>