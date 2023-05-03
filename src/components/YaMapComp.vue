<template>
    <yandex-map
          ref="map"
          :coords="[50.287003, 127.540839]"
          zoom="12"
          class="yamap"
          :controls="[
          'geolocationControl',
          'routeEditor',
          'zoomControl']"
          :behaviors="[
            'multiTouch', 'scrollZoom', 'drag'
          ]"
          :scroll-zoom="true"
          @map-was-initialized="onInitMap"
        >
          <ymap-marker
            v-for="shop in SHOPS"
            :key="shop.id"
            :coords="getCoord(shop.id)"
            :marker-id="shop.id" 
          />
        </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps"
import {mapGetters} from 'vuex'

export default {
  name: "YaMapComp",
  components: {
    yandexMap,
    ymapMarker 
  },
 async mounted() {
  // let coord = []
    const settings = {apiKey: '30bb15aa-73af-4d6c-a8f2-89c1d2ec8967', lang: 'en_US' };
    await loadYmap({ ...settings, debug: true });
    /* eslint-disable */
    var myReverseGeocoder = ymaps.geocode("ул. Горького, 150, Благовещенск, Амурская область")
    myReverseGeocoder.then(function (res) {
					// console.log(res.geoObjects.get(0).properties.get('text'));
          // console.log(res.geoObjects.get(0).geometry.getCoordinates());
          // coord.push(res.geoObjects.get(0).geometry.getCoordinates()[0])
          // coord.push(res.geoObjects.get(0).geometry.getCoordinates()[1])
          // console.log(res.geoObjects.get(0).geometry.getCoordinates()[0])
          // console.log(res.geoObjects.get(0).geometry.getCoordinates()[1])
          // console.log(coord)
				});
  },
  data() {
    return {
      map: null,
      behaviors: [
        'multiTouch', 'scrollZoom'
      ],
      coord: [50.271777, 127.522745],
      a: 0,
      b: 0,
    }
  },
  props: {},
  methods: {
    onInitMap(map) {
      this.map = map;
    },
    getCoord(id){
      let coord = []
      let a = 0
      let b = 0
      let address = this.SHOPS[id].address
      var myReverseGeocoder = ymaps.geocode(address)
      // Посмотреть промисы
        myReverseGeocoder.then(function (res) {
              a = res.geoObjects.get(0).geometry.getCoordinates()[0]
              b = res.geoObjects.get(0).geometry.getCoordinates()[1]
		    		}).then(() => {
              coord.push(a)
              coord.push(b)
            })
            console.log(coord)
            return coord
    }
  },
  computed: {
    ...mapGetters([
      'SHOPS'
    ]),
  },
};
</script>

<style lang="scss" scoped>
.yamap{
  width: 300px;
  height: 400px;
}
</style>