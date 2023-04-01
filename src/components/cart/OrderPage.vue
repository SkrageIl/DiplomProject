<template>
  <div class="order-page">
    <h2>Оформление заказа</h2>
    <div class="address-order">
      <h3>Адрес получения</h3>
      <select v-model="address">
        <option disabled value="">Выберите адрес</option>
        <option
          v-for="shop in SHOPS" 
          :key="shop.id">{{shop.address}}
        </option>
      </select>
    </div>
    <div class="time-order">
      <h3>Время получения</h3>
      <vue-timepicker
        input-width="170px"
        v-model="time"
        :hour-range="this.arr"
        hide-disabled-items
        hide-clear-button
        :minute-interval="5"
        close-on-complete
        hour-label="Часы" minute-label="Минуты"
        placeholder="Выберите время">
        <template v-slot:icon>
          <i class="material-icons">
            schedule
          </i>
        </template>
      </vue-timepicker>
      <p v-if="!isValidTime"> Мы не успеем приготовить к этому времени :( </p>
    </div>
  </div>
</template>

<script>
import VueTimePicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "OrderPage",
  components: {
    "vue-timepicker": VueTimePicker,
  },
  mounted() {
    this.GET_SHOPS_FROM_DB()
    this.getTimeArr()
  },
  data() {
    return {
        time: '',
        address: '',
        arr: [10,11,12,13,14,15,16,17,18,19,20,21],
        isValidTime: true
    }
  },
  watch: {
    address(){
      this.$emit('addressChange', this.address)
    },
    time(){
      let curTime = new Date()
      let tempTime = this.time.split(":")

      if ((curTime.getHours() == +tempTime[0]) && (+tempTime[1] < curTime.getMinutes() + 5)) {
        this.isValidTime = false
      } else {
        this.isValidTime = true
        this.$emit('timeChange', this.time)
      }
    }
  },
  computed: {
    ...mapGetters([
      'SHOPS'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_SHOPS_FROM_DB'
    ]),
    getTimeArr(){
      let hours = new Date().getHours()
      if (this.arr.indexOf(hours)) {
        this.arr.reverse().splice(this.arr.indexOf(hours)+1).reverse()
      }
    }
  }
}
</script>

<style lang="scss">
.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
    background: #e36206;
    color: #fff
}</style>