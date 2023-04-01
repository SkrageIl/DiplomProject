<template>
  <div class="barista-page">
    <h1>Страница для баристы</h1>
    <div class="current-orders">
      <h2>Текущие заказы</h2>
      <ul>
        <li v-for="baristaOrder in currentOrders" :key="baristaOrder.id">
          {{ baristaOrder.address }}
          {{ baristaOrder.time }}
          {{ baristaOrder.total }}
          {{ baristaOrder.id }}
          {{ baristaOrder.status }}
          <button @click="changeStatusOrder(baristaOrder.id, baristaOrder.status)">CLICK</button>
        </li>
      </ul>
    </div>
    <div class="comleted-orders">
      <h2>Выполненные заказы</h2>
      <ul>
        <li v-for="baristaOrder in completedOrders" :key="baristaOrder.id">
          {{ baristaOrder.address }}
          {{ baristaOrder.time }}
          {{ baristaOrder.total }}
          {{ baristaOrder.id }}
          {{ baristaOrder.status }}
        </li>
      </ul>
    </div>
    <div class="barista-earn">
      <h3>Заработок</h3>
      <p>{{baristaEarning}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  name: "CoffeeBaristaPage",
  mounted() {
    this.GET_BARISTA_ORDERS_FROM_DB()
    this.startTimer()
  },
  beforeUnmount () {
    this.stopTimer()
  },
  data() {
    return {
      interval: null
    }
  },
  computed: {
    ...mapGetters([
      'BARISTA_ORDERS'
    ]),
    completedOrders(){
      return this.BARISTA_ORDERS.filter(function(order){
        return order.status == "complete"
      })
    },
    currentOrders(){
      return this.BARISTA_ORDERS.filter(function(order){
        return order.status != "complete"
      })
    },
    baristaEarning(){
      var earning = 1500;
            this.completedOrders.forEach(function(item) {
                earning += item.total * 0.05;
            });
            return earning;
    }
  },
  methods: {
    ...mapActions([
      'GET_BARISTA_ORDERS_FROM_DB',
      'CHANGE_BARISTA_ORDER_STATUS'
    ]),
    changeStatusOrder(id,status){
      var nextStatus = this.nextStageStatusOrder(status)
      console.log(nextStatus)
      let order = {
        id: id,
        status: nextStatus
      }
      this.CHANGE_BARISTA_ORDER_STATUS(order)
    },
    nextStageStatusOrder(status){
      if (status == "prepare") {
        return "ready"
      }
      if (status == "ready") {
        return "complete"
      }
    },
    stopTimer () {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
    },
    startTimer () {
      this.stopTimer()
      this.interval = window.setInterval(() => {
        this.GET_BARISTA_ORDERS_FROM_DB()
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped></style>