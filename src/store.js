import Vue from "vue";
import Vuex from "vuex";
import wsldata from "@/assets/wsldata.json"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wsldata
  }
});