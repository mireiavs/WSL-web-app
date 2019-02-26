<template>
  <v-app dark>
    <headercomp></headercomp>
    <v-content class="content">
      <v-btn flat @click="$router.go(-1)" class="backbutton">
        <v-icon large>mdi-chevron-left</v-icon> 
      </v-btn>
      <h3 class="title">{{title}}</h3>
      <router-view></router-view>
    </v-content>
    <navcomp></navcomp>
  </v-app>
</template>

<script>
import Navcomp from "./components/Navcomp.vue";
import Headercomp from "./components/Headercomp.vue";

export default {
  components: {
    Navcomp,
    Headercomp
  },
  computed: {
    title() {
      return this.$route.name;
    }
  }
};
</script>


<style scoped>
.title {
  text-align: center;
  margin: 20px 0 20px 0;
  color: white;
  position: relative;
}
.content {
  background-image: url("./assets/bckg.jpg");
  background-color: #260b38;
  background-size: 100%;
  background-position: bottom;
  background-attachment: fixed;
}
.pagetitle {
}
.backbutton {
  position: absolute;
  left: 10px;
  top: 7px;
  }
</style>
