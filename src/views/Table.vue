<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs2>
        <v-card light tile flat color="#B4B4B4">
          <v-card-text>Pos</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card light tile flat color="#B4B4B4">
          <v-card-text>Team</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card light tile flat color="#B4B4B4">
          <v-card-text>Pts</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
     <v-layout row v-for="team in teams" :key="team.id">
      <v-flex xs2>
        <v-card light tile flat color="white">
          <v-card-text>{{team.table_position}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8>
    <v-card light tile flat color="white">
          <v-card-text>{{team.fullname}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card light tile flat color="white">
          <v-card-text>{{team.points}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    computed: {
        teams() {
            return this.$store.state.wsldata.teams.sort((x,y) =>x.table_position - y.table_position)
        }
    }
};
</script>

<style scoped>
</style>