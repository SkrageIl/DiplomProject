<template>
  <div class="map-shop-balloon__btn">
    <button @click="setAddress">Выбрать</button>
  </div>
  <div class="map-shop-balloon">
    <div class="map-shop-balloon__name">
      <img src="../assets/logo.png" alt="">
      <p>Кофейня Cuppa Coffee</p>
    </div>
    <div class="map-shop-balloon__address-block">
      <i class="material-icons">location_one</i>
      <div class="map-shop-balloon__address">
        <p>Адрес</p>
        <span>{{ this.map_shop_data.address }}</span>
      </div>
    </div>
    <hr>
    <div class="map-shop-balloon__tel-block">
      <i class="material-icons">call</i>
      <div class="map-shop-balloon__tel">
        <p>Контакты</p>
        <span>{{ this.map_shop_data.phone }}</span>
      </div>
    </div>
    <hr>
    <div class="map-shop-balloon__time-block">
      <i class="material-icons">schedule</i>
      <div class="map-shop-balloon__time">
        <p>Режим работы:</p>
        <span>{{ this.map_shop_data.time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: "YaMapShop",
  mounted() {},
  data() {
    return {};
  },
  props: {
    map_shop_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    ...mapActions([
      'SET_ADDRESS',
      'CLOSE_MODAL_ADDRESS'
    ]),
    setAddress(){
      this.SET_ADDRESS(this.map_shop_data.address)
      this.CLOSE_MODAL_ADDRESS()
    }
  },
};
</script>

<style lang="scss" scoped>
img{
  width: 40px;
}
hr{
  height: 1px;
  border: 0;
  background-color: rgba(169, 169, 169, 0.507);
}
i{
  width: 30px;
  margin-top: 10px;
}
.map-shop-balloon{
  &__name{
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
    p{
      margin: 0 10px;
      margin-bottom: 5px;
    }
  }
  &__address-block{
    display: grid;
    grid-template-columns: auto 1fr;
    margin: 10px 0;
  }
  &__tel-block{
    display: grid;
    grid-template-columns: auto 1fr;
    margin: 10px 0;
  }
  &__time-block{
    display: grid;
    grid-template-columns: auto 1fr;
    margin: 10px 0;
  }
  &__address{
    p{
      margin: 0;
      font-weight: 600;
    }
      margin: 10px 0;
  }
  &__tel{
    p{
      margin: 0;
      font-weight: 600;
    }
      margin: 10px 0;
  }
  &__time{
    margin: 10px 0;
    p{
      margin: 0;
      font-weight: 600;
    }
  }
  &__btn{
    margin: 10px 0;
    position: absolute;
    bottom: 0px;
    right: 15px;
    button{
      width: 100%;
      border: none;
      padding: 5px;
      background-color: #ff9000;
      border-radius: 5px;
      color: #f5f5f5;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
@media(min-width: 576px){
  .map-shop-balloon{
    &__btn{
      bottom: -5px;
      right: -15px;
    }
  }

}
</style>