<template>
  <v-container fluid grid-list-lg>
    <v-layout column>
      <v-card class="teamcard" light v-for="team in teams" :key="team.id" :to="{name: 'Team information', params: {id: team.id}}">
          <img :src="require(`../assets/team-logos/${team.id}.png`)" height="60px"><v-card-title>{{team.fullname}}</v-card-title>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        computed: {
            teams() {
                return this.$store.state.wsldata.teams.sort((x,y) => x.id - y.id)
            }
        }
    }
</script>

<style scoped>
.teamcard {
    margin-bottom: 15px;
    display: flex;
    padding: 20px;
    font-size: 1.2em;
}
.img {
    margin-right: 30px;
}
</style>