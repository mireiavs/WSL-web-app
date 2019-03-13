<template>
  <v-bottom-nav :value="true" color="#0a030f" fixed app class="bottom-nav">
    <v-btn color="##26A93D" flat to="/">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn color="##26A93D" flat to="/team-list">
      <span>Teams</span>
      <v-icon>mdi-soccer</v-icon>
    </v-btn>

    <v-btn color="##26A93D" flat to="/next-matchday">
      <span>Matches</span>
      <v-icon>mdi-soccer-field</v-icon>
    </v-btn>

    <v-btn color="##26A93D" flat to="/chat">
      <span>Chatrooms</span>
      <v-icon>mdi-forum</v-icon>
    </v-btn>

    <v-btn color="##26A93D" flat to="/about">
      <span>About</span>
      <v-icon>mdi-information</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {};
</script>

<style>
</style>