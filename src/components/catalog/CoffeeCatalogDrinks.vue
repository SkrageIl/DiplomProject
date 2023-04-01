<template>
  <div class="catalog-products">
    <h2>Напитки</h2>
    <div class="catalog-products__list">
      <CoffeeCatalogItem
        v-for="drink in DRINKS"
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
    ])
  },
  methods: {
    ...mapActions([
      'GET_DRINKS_FROM_DB'
    ])
  }
}
</script>

<style lang="scss" scoped></style>