<template>
  <v-container>
    <div class="welcome-text">
      <h3>Welcome to our website about the WSL</h3>
      <p>You can find all the information on the league by visiting the links below.</p>
    </div>
    <div class="homebuttons">
      <v-btn class="homelink" large block light to="./next-matchday">Next Matches</v-btn>
      <v-btn class="homelink" large block light to="./results">Results</v-btn>
      <v-btn class="homelink" large block light to="./table">Table</v-btn>
      <v-btn class="homelink" large block light to="./team-list">Teams</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "home",
  created() {
    this.$store.dispatch("getData");
  }
};
</script>

<style>
.homelink {
  height: 50px;
  margin-bottom: 20px;
  color: darkslategray;
}
.welcome-text {
  margin: 10px 20px 0 20px;
  padding: 20px;
  font-size: 1.1em;
  text-align: center;
}
.welcome-text h3 {
  font-size: 1.3em;
  margin-bottom: 10px;
}


@media only screen and (orientation: landscape) {
  .homelink {
    width: 65%;
    margin: 0 auto 20px auto;
  }
  .welcome-text {
    margin-top: 0;
  }
}
</style>
