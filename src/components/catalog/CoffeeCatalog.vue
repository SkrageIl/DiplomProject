<template>
  <div>
    <CatalogNavBar
      class="nav-bar"/>
      <div id="catalog" class="catalog">
        <CoffeeCatalogDrinks/>
        <CoffeeCatalogFoods/>
      </div>
  </div>
</template>

<script>
import CatalogNavBar from './CatalogNavBar.vue'
import CoffeeCatalogDrinks from './CoffeeCatalogDrinks.vue'
import CoffeeCatalogFoods from './CoffeeCatalogFoods.vue'

export default {
  name: "CoffeeCatalog",
  components:{
    CoffeeCatalogDrinks,
    CoffeeCatalogFoods,
    CatalogNavBar
  },
  mounted(){
  },
  computed: {
    },
}
</script>

<style lang="scss" scoped>
.catalog{
  padding: 0 15% 0 15%;
  margin-top: 6em;
  margin-bottom: 10em;
}
.nav-bar{
  overflow-x: scroll;
  overflow: hidden;
  padding: 1.25em 0;
  position: fixed;
  top: 3em;
  width: 100%;
}
@media(max-width: 576px){
  .catalog{
    margin-top: 7em;
    padding: 0 10% 0 10%;
  }
}
</style>