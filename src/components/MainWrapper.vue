<template> 
    <div class="main-wrapper">
        <CoffeeHeader/>
        <router-view class="router-main-content"/>
        <CoffeeFooter/>
        <CoffeeBottomNav
        v-if:="mobile"/>
    </div>
</template>

<script>
import CoffeeHeader from './CoffeeHeader.vue';
import CoffeeFooter from './CoffeeFooter.vue';
import CoffeeBottomNav from './CoffeeBottomNav.vue';

export default {
    name: 'MainWrapper',
    components:{
        CoffeeHeader,
        CoffeeFooter,
        CoffeeBottomNav
    },
    data() {
        return {
            mobile: true
        };
    },
    created() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    unmounted() {
        window.removeEventListener('resize', this.onResize)
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth <= 767;
        }
    }
}
</script>

<style>

</style>