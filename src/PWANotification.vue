<template>
  <div v-if="this.shown">
    <div class="pwa-notify">
      <p>Установите наше приложение!</p>
      <button @click="installPWA">Установить!</button>
      <button class="btn-reject" @click="dismissPrompt">Нет, спасибо</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PWANotification",
  data: () => ({
    shown: true,
  }),

  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    dismissPrompt() {
      this.shown = false
    },

    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.pwa-notify{
  background-color: #ffb21c;
  width: 60%;
  height: 100%;
  border-radius: 20px;
  font-size: 1.5rem;
  color: #3a3939;
  font-weight: 600;
  padding: 1em;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  p{
    margin: 0 0 0.5em 0;
  }
  .btn-reject{
    background-color: transparent;
    color: #626262;
  }
  button{
    font-size: 1.5rem;
    padding: 10px;
    margin: 0 10px;
    border-radius: 10px;
    border: none;
    background-color: white;
    color: black;
  }
}
</style>