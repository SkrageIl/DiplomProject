<template>
  <div class="order-page">
    <div class="order-features">
    <div class="address-order">
      <h3>Адрес получения</h3>
      <button @click="this.OPEN_MODAL_ADDRESS" class="btn-address">
        <span v-if="this.ADDRESS !== ''">{{this.ADDRESS}}</span>
        <span v-else>Выбрать адрес</span>
      </button>
    </div>
    <div class="time-order">
      <h3>Время получения</h3>
      <vue-timepicker
        input-width="250px"
        input-class="input-timepicker"
        v-model="time"
        :hour-range="this.rangeHours"
        :minute-range="this.rangeMinutes"
        hide-disabled-items
        :minute-interval="5"
        close-on-complete
        hour-label="Часы" minute-label="Минуты"
        placeholder="Выбрать время"
        @open="checkRange()"
        @change="timeWasChanged()">
        <template v-slot:icon>
          <i class="material-icons">
            schedule
          </i>
        </template>
      </vue-timepicker>
      <p v-if="!this.time"></p>
      <p v-else-if="!isValidTime"> Мы не успеем к этому времени :( </p>
    </div>
  </div>
  </div>
</template>

<script>
import VueTimePicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";
import {  mapGetters, mapActions } from 'vuex';

export default {
  name: "OrderPage",
  components: {
    "vue-timepicker": VueTimePicker
  },
  mounted() {
    this.GET_SHOPS_FROM_DB()
  },
  data() {
    return {
        time: '',
        rangeHours: [10,11,12,13,14,15,16,17,18,19,20],
        rangeMinutes: [0,5,10,15,20,25,30,35,40,45,50,55],
        isValidTime: true,
        isOpenMap: false
    }
  },
  watch: {
    time(){
      let curTime = new Date()
      let tempTime = this.time.split(":")
      if ((curTime.getHours() == +tempTime[0]) && (+tempTime[1] < curTime.getMinutes() + 5)) {
        this.isValidTime = false
      } else if (!this.time.includes("HH") && !this.time.includes("mm") && this.time !== "") {
        this.isValidTime = true
        let timePick = {
          time: this.time,
          isValidTime: this.isValidTime 
        }
        this.$emit('timeChange', timePick)
      } else{
        this.isValidTime = false
        let timePick = {
          time: this.time,
          isValidTime: this.isValidTime 
        }
        this.$emit('timeChange', timePick)
      }
    }
  },
  computed: {
    ...mapGetters([
      'SHOPS',
      'ADDRESS'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_SHOPS_FROM_DB',
      'OPEN_MODAL_ADDRESS'
    ]),
    getTimeArr(){
      this.rangeHours = [10,11,12,13,14,15,16,17,18,19,20]
      let hours = new Date().getHours()
      if (this.rangeHours.indexOf(hours)) {
        this.rangeHours.reverse().splice(this.rangeHours.indexOf(hours)+1).reverse()
      }
    },
    checkRange(){
      this.getTimeArr()
      let nowHours = new Date().getHours()
      if( nowHours >= 21 || nowHours <= 9 ){
        this.rangeMinutes = []
      } else {
        this.rangeMinutes = [0,5,10,15,20,25,30,35,40,45,50,55]
      }
    },
    timeWasChanged(){
      let now = new Date()
      let minutes = Math.ceil(now.getMinutes()/5)*5
      let hour = this.time.split(":")[0]
      if( hour == now.getHours() ){
        if (this.rangeMinutes.indexOf(minutes)) {
          this.rangeMinutes.reverse().splice(this.rangeMinutes.indexOf(minutes)).reverse()
        }
      } else {
          this.rangeMinutes = [0,5,10,15,20,25,30,35,40,45,50,55]
        }
    }
  }
}
</script>

<style lang="scss">
.ya-map{
  width: 300px;
  height: 400px;
}
.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
    background: #e36206;
    color: #fff
}
.input-timepicker{
  font-weight: 700;
}
.btn-address{
  width: 250px;
  height: 2.2em;
  padding: 0.3em 0.5em;
  font-size: 1em;
  background-color: transparent;
  border: 1px solid #d2d2d2;
  text-align: left;
  color: #000000;
  font-weight: 600;
}
.order-page{
  display: grid;
  background-color: #d8d8d89e;
  margin-top: 50px;
}
.order-features{
  display: grid;
  width: auto;
  height: 250px;
  margin: 30px 30px;
  padding: 0 30px 30px;
  background-color: white;
  border-radius: 24px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.address-order{
  margin-top: 15px;
}
.select-address{
  padding: 6px;
  border-radius: 1.1px;
  border-style: groove;
  border-color: #afadad91;
  font-size: 1em;
  width: 250px;
  height: 2.25em;
  color: #757575;
}
@media(min-width: 576px){
  .order-features{
    display: grid;
    margin-right: 25%;
    margin-left: 25%;
    height: 100%;
    padding: 0 30px 30px;
  }
  .time-order{
    font-size: 24px;
  }
  .order-page{
    background-color: transparent;
  }
  .address-order{
    font-size: 24px;
  }
  .select-address{
    font-size: 1em;
  }
  .btn-address{
    font-size: 20px;
  }
}
</style>