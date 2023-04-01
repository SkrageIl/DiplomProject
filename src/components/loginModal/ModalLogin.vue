<template>
    <LoginForm
      v-if="!isRegistry"
      @closeModal="closeModal"
      @openRegistration="this.isRegistry = true">
    </LoginForm>
    <RegisterForm
      v-if="isRegistry"
      @closeModal="closeModal"
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
    closeModal(){
      this.isRegistry = false
      this.$emit("closeModal")
    }
  }
};
</script>

<style>
</style>