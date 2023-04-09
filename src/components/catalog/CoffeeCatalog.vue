<template>
    <div id="catalog" class="catalog">
      <CoffeeCatalogDrinks/>
      <CoffeeCatalogFoods/>
    </div>
</template>

<script>
import CoffeeCatalogDrinks from './CoffeeCatalogDrinks.vue'
import CoffeeCatalogFoods from './CoffeeCatalogFoods.vue'

export default {
  name: "CoffeeCatalog",
  components:{
    CoffeeCatalogDrinks,
    CoffeeCatalogFoods
  }
}
</script>

<style lang="scss" scoped>
.catalog{
  padding: 0 15% 0 15%;
  margin-top: 150px;
}
@media(max-width: 576px){
  .catalog{
    margin-top: 150px;
    padding: 0 10% 0 10%;
  }
}
</style>