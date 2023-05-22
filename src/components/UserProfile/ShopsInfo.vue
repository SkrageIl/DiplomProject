<template>
  <div class="shops">
    <div class="ya-map">
      <YaMapComp/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import YaMapComp from '@/components/YaMapComp.vue'
export default {
  name: "ShopsInfo",
  components:{
    YaMapComp
  },
  mounted() {
    this.GET_SHOPS_FROM_DB()
  },
  data() {
    return {};
  },
  props: {},
  computed:{
    ...mapGetters([
      'SHOPS'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_SHOPS_FROM_DB',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@media(min-width: 576px){
  .shops{
    justify-items: center;
    display: grid;
  }
}
@media (max-width: 576px) {
  .shops{
    display: flex;
    justify-content: center;
  }
}
</style>