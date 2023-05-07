<template> 
    <div class="main-wrapper">
        <LoadingPage v-show="isLoading" class="loading"/>
        <CoffeeHeader/>
        <router-view v-show="!isLoading"/>
        <vue-final-modal
            v-model="isModalLogin"
            @click-outside="closeModalLogin"
            classes="modal-container"
            content-class="modal-content">
                <modal-login
                    ref="closeModalLogin"
                    @closeModalLogin="closeModalLogin">
                </modal-login>
        </vue-final-modal>
        <vue-final-modal
            v-model="isModalAddress"
            @click-outside="closeModalAddress"
            classes="modal-container"
            content-class="modal-map"
        >
            <div class="ya-map">
                <YaMapComp/>
            </div>
        </vue-final-modal>
        <CoffeeBottomNav v-show="!isLoading"
        v-if:="this.$isMobile()"/>
    </div>
</template>

<script>
import {mapState,mapActions, mapGetters} from 'vuex'
import ModalLogin from './loginModal/ModalLogin.vue'
import CoffeeHeader from './CoffeeHeader.vue'
import CoffeeBottomNav from './CoffeeBottomNav.vue'
import LoadingPage from './LoadingPage.vue'
import YaMapComp from './YaMapComp.vue'

export default {
    name: 'MainWrapper',
    components:{
        CoffeeHeader,
        CoffeeBottomNav,
        ModalLogin,
        LoadingPage,
        YaMapComp
    },
    computed: {
        ...mapState([
            'isModalLogin',
            'isLoading'
        ]),
        ...mapGetters([
          'isModalAddress'
        ])
    },
    methods: {
        ...mapActions([
            'CLOSE_MODAL_LOGIN',
            'CLOSE_MODAL_ADDRESS'
        ]),
        closeModalLogin(){
            this.CLOSE_MODAL_LOGIN()
            setTimeout(this.$refs.modalLogin.backToLogin,500)
        },
        closeModalAddress(){
            this.CLOSE_MODAL_ADDRESS()
        }
    }
}
</script>

<style>
.ya-map{
    width: 300px;
    height: 400px;
  }
.loading{
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 3;
}
.main-wrapper {
    margin-bottom: 5em;
}
.modal-container {
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    background: #fff;
  }
  @media(min-width: 576px) and (max-width: 1024px){
    .ya-map{
        width: 550px !important;
        height: 500px !important;
    }
  }
  @media(min-width: 1024px){
    .ya-map{
        width: 750px !important;
        height: 600px !important;
    }
  }
</style>