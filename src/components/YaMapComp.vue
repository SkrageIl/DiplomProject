<template>
  <div class="btn">
    <button @click="this.CLOSE_MODAL_ADDRESS" class="close-popup-btn" v-if="!this.$route.path.includes('profile')">X</button>
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
import { YandexMap, YandexMarker, loadYmap } from "vue-yandex-maps";
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
    const settings = {
      apiKey: '30bb15aa-73af-4d6c-a8f2-89c1d2ec8967',
      lang: 'ru_RU'
    }
    this.GET_SHOPS_FROM_DB()
    await getGlobalYandexMapVar()
    await loadYmap(settings)
    const shops = this.SHOPS
    /* eslint-disable */
    shops.forEach(shop => {
      let address = 'г. Благовещенск, ' + shop.address
      const myGeocoder = ymaps.geocode(address)
      myGeocoder.then((res) => {
        let coords = res.geoObjects.get(0).geometry.getCoordinates();
        this.addCoords({shop: shop, coords: coords})
      })
    })
    /* eslint-enable */
  },
  data() {
    return {
      mapInstance: null,
      coords: [
        50.287504, 
        127.541124
      ],
      addresses: [
      ]
    }
  },
  props: {},
  methods: {
    ...mapActions([
      'CLOSE_MODAL_ADDRESS',
      'GET_SHOPS_FROM_DB'
    ]),
    onInit(e) {
      this.mapInstance = e
    },
    addCoords(addableShop){
      let tshop = {
        id: addableShop.shop.id,
        address: addableShop.shop.address,
        coords: addableShop.coords,
        time: addableShop.shop.time,
        phone: addableShop.shop.phone
      }
      this.addresses.push(tshop)
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