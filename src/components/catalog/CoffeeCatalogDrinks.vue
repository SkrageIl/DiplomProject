<template>
  <div class="">
    <div id="coffee" class="catalog-drinks coffee-catalog">
      <h3 class="catalog-title">Кофе</h3>
      <CoffeeCatalogItem
        v-for="drink in coffeeCatalog"
        :key="drink.article"
        :product_data="drink"
      />
      </div>
      <div id="tea" class="catalog-drinks tea-catalog">
        <h3 class="catalog-title">Чай</h3>
        <CoffeeCatalogItem
          v-for="drink in teaCatalog"
          :key="drink.article"
          :product_data="drink"
        />
      </div>
    </div>
</template>

<script>

import CoffeeCatalogItem from './CoffeeCatalogItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "CoffeeCatalogDrinks",
  components:{
    CoffeeCatalogItem
  },
  mounted() {
    this.GET_DRINKS_FROM_DB()
  },
  computed: {
    ...mapGetters([
      'DRINKS'
    ]),
    teaCatalog(){
      return this.DRINKS.filter(function(drink){
        return drink.type == "Чай"
      })
    },
    coffeeCatalog(){
      return this.DRINKS.filter(function(drink){
        return drink.type == "Кофе"
      })
    }
  },
  methods: {
    ...mapActions([
      'GET_DRINKS_FROM_DB'
    ])
  }
}
</script>

<style lang="scss" scoped>
.catalog-title{
  grid-column: span 3;
  margin: 15% 0 1%;
  text-align: start;
  padding-left: 5%;
  font-size: 2em;
}
.catalog-drinks{
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  grid-gap: 35px;
  justify-content: center;
}
@media(max-width: 576px){
  .catalog-drinks{
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