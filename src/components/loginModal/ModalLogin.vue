<template>
    <LoginForm
      v-if="!isRegistry"
      @closeModalLogin="closeModalLogin"
      @openRegistration="this.isRegistry = true">
    </LoginForm>
    <RegisterForm
      v-if="isRegistry"
      @closeModalLogin="closeModalLogin"
      @openLogin="this.isRegistry = false">
    </RegisterForm>
</template>

<script>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

export default {
  name: "ModalLogin",
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      isRegistry: false
    };
  },
  methods: {
    backToLogin(){
      this.isRegistry = false
    },
    closeModalLogin(){
      this.$emit("closeModalLogin")
    }
  }
};
</script>

<style></style>