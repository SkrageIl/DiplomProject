<template>
  <div class="catalog">
    <CoffeeCatalogDrinks/>
    <hr>
    <CoffeeCatalogFoods/>
  </div>
</template>

<script>

import CoffeeCatalogDrinks from './CoffeeCatalogDrinks.vue';
import CoffeeCatalogFoods from './CoffeeCatalogFoods.vue';

export default {
  name: "CoffeeCatalog",
  components:{
    CoffeeCatalogDrinks,
    CoffeeCatalogFoods
  }
}
</script>

<style lang="scss" scoped></style>