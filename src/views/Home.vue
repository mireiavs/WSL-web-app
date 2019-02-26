<template>
  <v-container>
    <p>Welcome text</p>
    <v-btn class="homelink" large block color="#DDDDDD" light to="./match-list">Next Matchday</v-btn>
    <v-btn class="homelink" large block color="#DDDDDD" light to="./contact">Results</v-btn>
    <v-btn class="homelink" large block color="#DDDDDD" light to="./table">Table</v-btn>
    <v-btn class="homelink" large block color="#DDDDDD" light to="./team-list">Teams</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
.homelink {
  height: 80px;
  margin-bottom: 20px;
  color: darkslategray;
}
</style>
