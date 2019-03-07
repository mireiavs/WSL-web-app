import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wsldata: {},
    dataReady: false
  },
  actions: {
    getData({ commit }) {
      axios
        .get("https://api.myjson.com/bins/93oni")
        .then(wsldata => {
          commit("GETDATA", wsldata.data);
          this.state.dataReady = true;
        })
    }
  },
  mutations: {
    GETDATA(state, wsldata) {
      state.wsldata = wsldata;
    }
  }
});
