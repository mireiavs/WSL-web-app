<template>
  <v-container>
    <v-layout column>
      <div class="teamtitle">
        <h2>{{ team.fullname }}</h2>
      </div>
      <div class="logo">
           <img height="100px" width="100px" :src="require(`../assets/team-logos/${team.id}.png`)">
      </div>
      <v-card light class="teaminfo">
          {{ team.about }}
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    team() {
      var teams = this.$store.state.wsldata.teams;
      return teams.filter(team => team.id === this.$route.params.id)[0];
    },
  }
};
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
}
.teamtitle {
    text-align: center;
}
.teaminfo {
    padding: 20px;
    color: black;
}
</style>