<template> 
    <div class="main-wrapper">
        <CoffeeHeader/>
        <router-view/>
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
        <CoffeeBottomNav
        v-if:="this.$isMobile()"/>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import ModalLogin from './loginModal/ModalLogin.vue'
import CoffeeHeader from './CoffeeHeader.vue'
import CoffeeBottomNav from './CoffeeBottomNav.vue'

export default {
    name: 'MainWrapper',
    components:{
        CoffeeHeader,
        CoffeeBottomNav,
        ModalLogin
    },
    computed: {
        ...mapState([
            'isModal'
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