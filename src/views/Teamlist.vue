<template>
  <v-container fluid grid-list-lg>
    <v-layout column>
      <v-card class="teamcard" light v-for="team in teams" :key="team.id" :to="{name: 'Team information', params: {id: team.id}}">
          <div class="logo-container">
              <img :src="require(`../assets/team-logos/${team.id}.png`)" height="60px">
          </div>
          <v-card-title class="teamcard-title">{{team.fullname}}</v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        computed: {
            teams() {
                return this.$store.getters.teamsOrderedAlphab
            }
        }
    }
</script>

<style scoped>
.teamcard {
    margin: 0 15px 10px 15px;
    display: flex;
    padding: 15px 0 15px 5px;
    font-size: 1.2em;
}
.logo-container { 
    width: 80px;
    display: flex;
    justify-content: center;
}

.teamcard-title {
    padding: 0 0 0 8px;
}
</style>