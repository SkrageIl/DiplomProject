<template>
  <div class="register-form">
    <button @click="openLoginForm" class="back-popup-btn">&#10094;</button>
    <button @click="closeModalLogin" class="close-popup-btn">X</button>
    <h4 class="register-form__label">Регистрация</h4>
    <form @submit.prevent="Register" class="content-form">
      <div class="content-form__name">
        <label class="content-form__label" for="name">Имя</label>
        <input id="name" type="text" v-model="name" autofocus placeholder="Ваше имя..." @blur="v$.name.$touch()">
        <span v-if="v$.name.$error">
          <p v-if="v$.name.minLength.$invalid">Слишком короткое имя</p>
          <p v-else-if="v$.name.maxLength.$invalid">Слишком длинное имя</p>
          <p v-else-if="v$.name.alpha.$invalid">Имя должно содержать только буквы</p>
          <p v-else-if="v$.name.required.$invalid">Введите имя</p>
        </span>
      </div>
      <div class="content-form__phone">
        <label class="content-form__label" for="tel" >Телефон</label>
        <input v-model="tel" type="tel" v-mask="'+7(###)###-##-##'" placeholder="+7(999)-999-99-99" @blur="v$.tel.$touch()">
        <span v-if="v$.tel.$error">
          <p>Введите номер телефона</p>
        </span>
      </div>
      <div class="content-form__password">
        <label class="content-form__label" for="password">Пароль</label>
        <input id="password" type="password" v-model="password" placeholder="Пароль..." @blur="v$.password.$touch()">
        <span v-if="v$.password.$error">
          <p>Минимальная длина пароля 6 символов</p>
        </span>
      </div>
      <div class="content-form__passconfirm">
        <label class="content-form__label" for="password-confirm">Подтвердите пароль</label>
        <input id="password-confirm" type="password" v-model="password_confirm" placeholder="Повторите пароль..." @blur="v$.password_confirm.$touch()">
        <span v-if="v$.password_confirm.$error">
          <p> Пароли не совпадают</p>
        </span>
      </div>
      <div class="button-submit">
          <transition name="fade">
            <button type="submit" v-if="!v$.$invalid">Зарегестрироваться</button>
          </transition>
      </div>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'

export default {
  name: "RegisterForm",
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: "",
      tel: "",
      password: "",
      password_confirm: "",
      role: "client",
      token: "clientToken"
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
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirm: {
        required,
        sameAs: sameAs(this.password)
      }
    }
  },
  methods: {
    closeModalLogin(){
      this.$emit("closeModalLogin")
    },
    openLoginForm(){
      this.$emit("openLogin")
    },
    Register() {
      let data = {
        name: this.name,
        tel: this.tel.split("(").join("").split(")").join("").split("-").join(""),
        password: this.password,
        role: this.role,
        token: this.token
      }
      this.$store.dispatch('register', data)
      .then(() => {
        this.closeModalLogin()
        this.$router.push('/')
      })
      .catch(
        err => console.log(err)
      )
    }
  }
}
</script>

<style lang="scss" scoped>


.register-form{
  border-radius: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 250px;
  padding: 20px;
  box-shadow: 0 0 3px #545454;
  &__label{
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 4px;
    margin-bottom: 40px;
  }
  .back-popup-btn{
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: #cccccc;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .close-popup-btn{
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 15px;
    padding: 5px 7px;
    color: #ffffff;
    background-color: #cccccc;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }
}
.content-form{
  margin-top: -20px;
  text-align: left;
  &__label{
    font-size: 15px;
    text-align: left;
  }
  &__name{
    height: 45px;
    width: 100%;
    margin: 25px 0;
  }
  &__password{
    height: 45px;
    width: 100%;
    margin: 25px 0;
  }
  &__phone{
    height: 45px;
    width: 100%;
    margin: 25px 0;
  }
  &__passconfirm{
    height: 45px;
    width: 100%;
    margin: 25px 0;
  }
  p{
    margin-top: 1px;
    color: red;
    font-size: 10px;
  }
  input{
    height: 70%;
    width: 100%;
    padding-left: 10px;
    font-size: 13px;
    border: 1px solid silver;
  }
  :focus{
    border-color: #ee7f00;
    border-bottom-width: 2px;
  }
  .button-submit{
    button{
      margin-top: 15px;
      padding: 5px;
      color: #fff;
      background: #3a3939;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 12px;
      width: 100%;
    }
    .fade-enter-active {
      transition: opacity .7s ease;
    }
    .fade-enter-from{
      opacity: 0;
    }
    button:hover{
      transform: scale(1.05);
      filter: brightness(1.2);
    } 
  }
}
</style>