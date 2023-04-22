<template>
  <div class="profile-settings">
    <div class="profile-settings__name">
      <label for="name" class="profile-settings__input-label">Имя</label>
      <input class="profile-settings__input" id="name" type="text" v-model="name" autofocus :placeholder="USER.name" @blur="v$.name.$touch()">
      <span v-if="v$.name.$error">
        <p v-if="v$.name.minLength.$invalid">Слишком короткое имя</p>
        <p v-else-if="v$.name.maxLength.$invalid">Слишком длинное имя</p>
        <p v-else-if="v$.name.alpha.$invalid">Имя должно содержать только буквы</p>
        <p v-else-if="v$.name.required.$invalid">Введите имя</p>
      </span>
      <button class="profile-settings__btn" :disabled="v$.name.$error">Изменить имя</button>
    </div>
    <div class="profile-settings__tel">
      <label for="tel" class="profile-settings__input-label">Телефон</label>
      <input class="profile-settings__input" id="tel" type="tel" v-model="tel" v-mask="'+7(###)###-##-##'" :placeholder="this.USER.tel" @blur="v$.tel.$touch()">
      <span v-if="v$.tel.$error">
        <p>Введите корректный номер телефона</p>
      </span>
      <button class="profile-settings__btn" :disabled="v$.tel.$error">Изменить имя</button>
    </div>
    <div class="profile-settings__password">
      <button id="changepass" class="profile-settings__password-btn">Сменить пароль</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
  name: "ProfileSettings",
  setup () {
    return { v$: useVuelidate() }
  },
  mounted() {
  },
  data() {
    return {
      name: "",
      tel: "",
    }
  },
  validations(){
    return {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(10),
        alpha: val => /^[а-яё]*$/i.test(val),
      },
      tel: {
        required,
        minLength: minLength(16)
      }
    }
  },
  props: {},
  computed: {
    ...mapGetters([
      "USER"
    ]),
    telValid(){
      let tel = this.tel.split("(").join("").split(")").join("").split("-").join("")
      return tel
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.profile-settings{
  display: grid;

  &__name{
    display: grid;
    padding: 0 3em;
    justify-items: flex-start;
  }
  &__input{
    max-width: 10em;
    font-size: 20px;
    border-radius: 5px;
    padding: 5px;
  }
  &__input-label{
    font-size: 20px;
    padding: 10px;
    padding-left: 2px;
    text-align: left;
  }
  &__btn{
    max-width: 11em;
    padding: 0;
    background-color: transparent;
    border: none;
    text-decoration: underline;
    padding-left: 2px;
    padding-top: 5px;
    text-align: left;
  }
  &__tel{
    display: grid;
    margin: 2em 3em;
  }
  &__tel-input{

  }
  &__tel-input-label{
    
  }
  &__password{
    display: grid;
    margin: 2em 3em;
  }
  &__password-btn{
    padding: 10px;
    width: fit-content;
    background-color: #3a3939;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
  }
}
@media(min-width: 576px){
  .profile-settings{
    justify-content: center;
  }
}
</style>