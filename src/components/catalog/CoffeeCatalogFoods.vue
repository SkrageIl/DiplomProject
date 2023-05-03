<template>
  <div class="">
    <div id="sweet" class="catalog-foods sweet-catalog">
      <h3 class="catalog-title">Сладости</h3>
      <CoffeeCatalogItem
        v-for="food in sweetCatalog"
        :key="food.article"
        :product_data="food"
      />
    </div>
    <div id="meal" class="catalog-foods meal-catalog">
      <h3 class="catalog-title">Закуски</h3>
      <CoffeeCatalogItem
        v-for="food in mealCatalog"
        :key="food.article"
        :product_data="food"
      />
    </div>
  </div>
</template>

<script>

import CoffeeCatalogItem from './CoffeeCatalogItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "CoffeeCatalogFoods",
  components:{
    CoffeeCatalogItem
  },
  mounted() {
    this.GET_FOODS_FROM_DB()
  },
  computed: {
    ...mapGetters([
      'FOODS'
    ]),
    mealCatalog(){
      return this.FOODS.filter(function(food){
        return food.type == "Сытное"
      })
    },
    sweetCatalog(){
      return this.FOODS.filter(function(food){
        return food.type == "Сладкое"
      })
    }
  },
  methods: {
    ...mapActions([
      'GET_FOODS_FROM_DB'
    ])
  }
}
</script>

<style lang="scss" scoped>
.catalog-foods{
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  grid-gap: 35px;
  justify-content: center;
}
.catalog-title{
  grid-column: span 3;
  margin: 15% 0 1%;
  text-align: start;
  padding-left: 5%;
  font-size: 2em;
}
@media(max-width: 576px){
  .catalog-foods{
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .catalog-title{
    grid-column: span 2;
    margin: 15% 0 1%;
    text-align: start;
    padding-left: 5%;
    font-size: 1.5em;
  }
}
</style>