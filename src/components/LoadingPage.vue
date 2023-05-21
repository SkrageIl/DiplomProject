<template>
  <div class="loading-logo">
    <Vue3Lottie :animationData="CoffeeJSON" :height="200"/>
    <div class="img-logo">
      <img src="../assets/logo.png" alt="" class="logo">
      <img src="../assets/logoCuppa.png" alt="">
    </div>
  </div>
</template>

<script>
import CoffeeJSON from '../assets/coffee-love.json'
export default {
  name: "LoadingPage",
  created() {},
  data() {
    return {
      CoffeeJSON
    }
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
img{
  width: 200px;
  &.logo{
    width: 100px;
  }
}
.img-logo{
  display: flex;
  justify-content: center;

}
.loading-logo{
  padding-top: 70%;
}
@media(min-width: 576px) and (max-width: 1024px){
  .loading-logo{
    padding-top: 12em;
  }
}
@media(min-width: 1024px){
  .loading-logo{
    padding-top: 20em;
  }
}
</style>