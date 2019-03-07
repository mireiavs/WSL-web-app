import '@babel/polyfill'
import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase"

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyDoGEx_iH87Az6LgZWZw-GMBBqSW82JEcM",
  authDomain: "wsl-chat.firebaseapp.com",
  databaseURL: "https://wsl-chat.firebaseio.com",
  projectId: "wsl-chat",
  storageBucket: "wsl-chat.appspot.com",
  messagingSenderId: "662266547994"
}


firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

