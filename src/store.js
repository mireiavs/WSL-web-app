import Vue from "vue";
import Vuex from "vuex";
import wsldata from "@/assets/wsldata.json"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wsldata
  },
  getters: {
    teamsOrderedByPos: state => {
      return state.wsldata.teams.slice(0).sort((x,y) => x.table_position - y.table_position)
    },
    teamsOrderedAlphab: state => {
      return state.wsldata.teams.slice(0).sort((x,y) => x.fullname - y.fullname)
    }
  }
});
