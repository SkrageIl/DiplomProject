<template>
  <MainWrapper/>
  <notifications width="250px" position="top center" max="3" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MainWrapper from './components/MainWrapper.vue'

export default {
  name: 'App',
  components: {
    MainWrapper
  },
  created() {
    this.$store.dispatch('OPEN_LOADING')
    if (this.ADDRESS == "") {
      setTimeout(() => this.OPEN_MODAL_ADDRESS(), 3000)
    }
  },
  computed : {
    ...mapGetters([
      'ADDRESS'
    ]),
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    ...mapActions([
      'OPEN_MODAL_ADDRESS'
    ]),
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
h1{
  margin: 0;
}
body{
  margin: 0;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
