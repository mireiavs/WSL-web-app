<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs2>
        <v-card light tile flat color="#B4B4B4">
          <v-card-text>
            <p class="table-header">Pos</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card light tile flat color="#B4B4B4">
          <v-card-text>
            <p class="table-header">Team</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card light tile flat color="#B4B4B4">
          <v-card-text>
            <p class="table-header">Pts</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row v-for="team in teams" :key="team.id">
      <v-flex xs2>
        <v-card light tile flat color="white">
          <v-card-text>{{ team.table_position }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card light tile flat color="white">
          <v-card-text>{{ team.fullname }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card light tile flat color="white">
          <v-card-text>{{ team.points }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    teams() {
      return this.$store.getters.teamsOrderedByPos;
    }
  }
};
</script>

<style scoped>
.table-header {
  font-weight: bold;
  margin-bottom: 0;
}
</style>
