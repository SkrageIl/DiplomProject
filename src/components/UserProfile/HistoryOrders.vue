<template>
  <div class="current-orders">
    <span><p class="current-orders__title">Ваши заказы</p></span>
    <div class="current-orders__orders">
        <OrderItem 
        v-for="orderItem in allOrdersSortedById" 
        :key="orderItem.id"
        :orderItem_data="orderItem"/>
    </div>
  </div>
    <div class="empty-orders" v-if="!this.USER_ORDERS">
      <p>У вас нет заказов</p>
      <button class="empty-orders__btn">В корзину</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderItem from './OrderItem.vue'
import moment from 'moment'

export default {
  name: "HistoryOrders",
  components:{
    OrderItem
  },
  created() {},
  data() {
    return {
      interval: null
    }
  },
  mounted() {
    this.GET_USER_ORDERS_FROM_DB()
    this.startTimer()
  },
  beforeUnmount () {
    this.stopTimer()
  },
  props: {},
  computed: {
    ...mapGetters([
      'USER_ORDERS'
    ]),
    completedOrders(){
      return this.USER_ORDERS.filter(function(order){
        return order.status == "Завершен"
      })
    },
    currentOrders(){
      return this.USER_ORDERS.filter(function(order){
        return order.status != "Завершен"
      })
    },
    allOrdersSortedById(){
      // let sortedCurrentOrders = () => this.currentOrders.sort((a,b) => this.formatTime(a.time) < this.formatTime(b.time) ? 1 : -1)
      // let sortedCompletedOrders = () => this.completedOrders.sort((a,b) => this.formatStringToDate(a.time) < this.formatStringToDate(b.time) ? 1 : -1)
      var sortedCurrentOrders = this.currentOrders
      sortedCurrentOrders.sort((a,b) => this.formatStringToDate(a.time) > this.formatStringToDate(b.time) ? 1 : -1)
      var sortedCompletedOrders = this.completedOrders
      sortedCompletedOrders.sort((a,b) => this.formatStringToDate(a.time) < this.formatStringToDate(b.time) ? 1 : -1)
      return sortedCurrentOrders.concat(sortedCompletedOrders)
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
    },
    formatTime(time){
      return moment(time, 'DD-MM-YYYY HH:mm').format('HH:mm')
    },
    formatStringToDate(date) {
      return moment(date, 'DD-MM-YYYY HH:mm')
    },
  }
}
</script>

<style lang="scss" scoped>
.current-orders{
  &__orders{
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 2em 2em;
    padding: 5px;
    height: 29em;
    overflow-y: scroll;
    justify-items: center;
  }
  &__orders::-webkit-scrollbar { width: 0; }
  &__orders{ -ms-overflow-style: none; }
  &__orders{ overflow: -moz-scrollbars-none; }

  &__title{
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 1.5em;
    margin: 5px;
  }
}
</style>