<template>
  <v-container>
    <div class="welcome-text">
      <h3>Welcome to our website about the WSL</h3>
      <p>You can find all the information on the league by visiting the links below.</p>
    </div>
    <v-btn class="homelink" large block light to="./next-matchday">Next Matchday</v-btn>
    <v-btn class="homelink" large block light to="./results">Results</v-btn>
    <v-btn class="homelink" large block light to="./table">Table</v-btn>
    <v-btn class="homelink" large block light to="./team-list">Teams</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "home"
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

</style>
