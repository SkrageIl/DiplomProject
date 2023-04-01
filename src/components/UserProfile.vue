<template>
  <div class="user-profile">
    <h1>Страница пользователя</h1>
    <h2>Ваши заказы</h2>
    <div class="current-orders">
      <h2>Текущие заказы</h2>
      <ul>
        <li v-for="userOrder in currentOrders" :key="userOrder.id">
          {{ userOrder.address }}
          {{ userOrder.time }}
          {{ userOrder.total }}
          {{ userOrder.id }}
          {{ userOrder.status }}
        </li>
      </ul>
    </div>
    <div class="comleted-orders">
      <h2>Выполненные заказы</h2>
      <ul>
        <li v-for="userOrder in completedOrders" :key="userOrder.id">
          {{ userOrder.address }}
          {{ userOrder.time }}
          {{ userOrder.total }}
          {{ userOrder.id }}
          {{ userOrder.status }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "UserProfile",
  data() {
    return {
      interval: null
    };
  },
  mounted() {
    this.GET_USER_ORDERS_FROM_DB()
    this.startTimer()
  },
  beforeUnmount () {
    this.stopTimer()
  },
  computed: {
    ...mapGetters([
      'USER_ORDERS'
    ]),
    completedOrders(){
      return this.USER_ORDERS.filter(function(order){
        return order.status == "complete"
      })
    },
    currentOrders(){
      return this.USER_ORDERS.filter(function(order){
        return order.status != "complete"
      })
    }
  },
  methods: {
    ...mapActions([
      'GET_USER_ORDERS_FROM_DB',
    ]),
    stopTimer () {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    },
    startTimer () {
        this.stopTimer()
        this.interval = window.setInterval(() => {
          this.GET_USER_ORDERS_FROM_DB()
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped></style>