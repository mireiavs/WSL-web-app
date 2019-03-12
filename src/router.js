import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Chat from "./views/Chat.vue";
import Matchlist from "./views/Matchlist.vue";
import Matchinfo from "./views/Matchinfo.vue";
import Table from "./views/Table.vue";
import Teamlist from "./views/Teamlist.vue";
import Teaminfo from "./views/Teaminfo.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/chat",
      name: "Chatrooms",
      component: Chat
    },
    {
      path: "/next-matchday",
      name: "Next Matches",
      component: Matchlist
    },
    {
      path: "/match-list/:id",
      name: "Match information",
      component: Matchinfo
    },
    {
      path: "/table",
      name: "Table",
      component: Table
    },
    {
      path: "/team-list",
      name: "Teams",
      component: Teamlist
    },
    {
      path: "/team-list/:id",
      name: "Team information",
      component: Teaminfo
    },
    {
      path: "/results",
      name: "Results",
      component: Matchlist
    }
  ]
});
