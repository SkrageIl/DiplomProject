<template>
  <div class="btn">
    <button @click="this.CLOSE_MODAL_ADDRESS" class="close-popup-btn">X</button>
  </div>
  <YandexMap
  :coordinates="coords"
  :zoom="12" 
  @created="onInit"
  class="yamap"
  >
    <YandexMarker
      v-for="address in addresses"
      :key="address.id"
      :coordinates="address.coords"
      :marker-id="address.id" 
    >
      <template #component>
        <YaMapShop :map_shop_data="address"/>
      </template>
    </YandexMarker>
  </YandexMap>
</template>

<script>
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import getGlobalYandexMapVar from "@/utils.js";
import {mapGetters, mapActions} from 'vuex'
import YaMapShop from "./YaMapShop.vue";

export default {
  name: "YaMapComp",
  components: {
    YandexMap,
    YandexMarker,
    YaMapShop
  },
  async mounted() {
    await getGlobalYandexMapVar();
  },
  data() {
    return {
      mapInstance: null,
      coords: [
        50.287504, 
        127.541124
      ],
      addresses: [
        {
          id: 0,
          address: "ул. Калинина, 83",
          coords: [50.271777, 127.522745],
          time: "09:00 - 21:00",
          phone: "+7(999)999-99-90"
        },
        {
          id: 1,
          address: "ул. 50 лет Октября, 28",
          coords: [50.265363, 127.534971],
          time: "09:00 - 20:00",
          phone: "+7(999)999-99-99"
        },
        {
          id: 2,
          address: "ул. Театральная, 128",
          coords: [50.273545, 127.553269],
          time: "09:00 - 20:00",
          phone: "+7(999)999-99-99"
        },
        {
          id: 3,
          address: "ул. Воронкова, 12",
          coords: [50.305745, 127.521218],
          time: "09:00 - 20:00",
          phone: "+7(999)999-99-99"
        },
      ]
    }
  },
  props: {},
  methods: {
    ...mapActions([
      'CLOSE_MODAL_ADDRESS'
    ]),
    onInit(e) {
      this.mapInstance = e
    }
  },
  computed: {
    ...mapGetters([
      'SHOPS'
    ]),
  }
};
</script>

<style lang="scss" scoped>
.btn{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.close-popup-btn{
  position: fixed;
  font-size: 15px;
  padding: 7px 9px;
  color: #ffffff;
  background-color: #cccccc;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  z-index: 1;
  margin-right: -13px;
}
.yamap{
  width: 300px;
  height: 400px;
}
.shop-item{
  margin-top: 10px;
}
@media(min-width: 576px) and (max-width: 1024px){
  .yamap{
    width: 550px;
    height: 500px;
  }
}
@media(min-width: 1024px){
  .yamap{
      width: 750px !important;
      height: 600px !important;
  }
}
</style>