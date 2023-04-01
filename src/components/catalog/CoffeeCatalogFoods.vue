<template>
  <div class="catalog-foods">
    <h2>Еда</h2>
    <div class="catalog-products__list">
      <CoffeeCatalogItem
        v-for="food in FOODS"
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
    ])
  },
  methods: {
    ...mapActions([
      'GET_FOODS_FROM_DB'
    ])
  }
}
</script>

<style lang="scss" scoped></style>