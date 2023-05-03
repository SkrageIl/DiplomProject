<template> 
    <div class="main-wrapper">
        <LoadingPage v-show="isLoading" class="loading"/>
        <CoffeeHeader/>
        <router-view v-show="!isLoading"/>
        <vue-final-modal
            v-model="isModal"
            @click-outside="closeModal"
            classes="modal-container"
            content-class="modal-content">
                <modal-login
                    ref="modalLogin"
                    @closeModal="closeModal">
                </modal-login>
        </vue-final-modal>
        <CoffeeBottomNav v-show="!isLoading"
        v-if:="this.$isMobile()"/>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import ModalLogin from './loginModal/ModalLogin.vue'
import CoffeeHeader from './CoffeeHeader.vue'
import CoffeeBottomNav from './CoffeeBottomNav.vue'
import LoadingPage from './LoadingPage.vue'

export default {
    name: 'MainWrapper',
    components:{
        CoffeeHeader,
        CoffeeBottomNav,
        ModalLogin,
        LoadingPage
    },
    computed: {
        ...mapState([
            'isModal',
            'isLoading'
        ])
    },
    methods: {
        ...mapActions([
            'CLOSE_MODAL'
        ]),
        closeModal(){
            this.CLOSE_MODAL()
            setTimeout(this.$refs.modalLogin.backToLogin,500)
        }
    }
}
</script>

<style>
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
</style>