<template>
  <div class="shop-item">
    <div class="shop-item__left-content">
      <img src="@/assets/coffeeshops/coffeeshop1.jpg" alt="" class="shop-item__img">
    </div>
    <div class="shop-item__right-content">
      <div class="shop-item__address shop-item__right-content-grid">
        <span class="shop-item__icon">
          <img src="@/assets/coffeeshops/geotag.png" alt="" class="shop-item__icon">
        </span>
        <span class="shop-item__title shop-item__right-content-grid">
          {{shopItem_data.address}}
        </span>
      </div>
      <div class="shop-item__time shop-item__right-content-grid">
        <span class="shop-item__icon">
          <img src="@/assets/coffeeshops/time.png" alt="" class="shop-item__icon">
        </span>
        <span class="shop-item__title">
          {{shopItem_data.time}}
        </span>
      </div>
      <div class="shop-item__phone shop-item__right-content-grid">
        <span class="shop-item__icon">
          <img src="@/assets/coffeeshops/phone.png" alt="" class="shop-item__icon">
        </span>
        <span class="shop-item__title">
          {{shopItem_data.phone}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopItem",
  created() {},
  data() {
    return {};
  },
  props: {
    shopItem_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.shop-item{
  height: 12em;
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 1em;
  padding: 10px;
  border-radius: 15px;
  align-items: center;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  &__right-content{
    display: grid;
  }
  &__right-content-grid{
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 5px;
    margin-left: 15px;
    align-items: center;
  }
  &__img{
    width: 100px;
    border-radius: 22px;
    -webkit-box-shadow: 0px 9px 5px -5px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 9px 5px -5px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 9px 5px -5px rgba(0, 0, 0, 0.6);
  }
  &__icon{
    width: 25px;
  }
  &__title{
    margin-left: 15px;
    text-align: start;
  }
}
@media(min-width: 576px){
  .shop-item{
    width: 30em;
    height: 20em;
    padding: 0 20px;
    margin: 2em;
    &__img{
      width: 150px;
    }
    &__right-content{
      font-size: 25px;
      margin-left: 20px;
    }
  }
}
</style>