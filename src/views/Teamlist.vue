<template>
  <div>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <v-container fluid grid-list-lg v-else>
      <v-layout column>
        <v-card
          class="teamcard"
          light
          v-for="team in teams"
          :key="team.id"
          :to="{name: 'Team information', params: {id: team.id}}"
        >
          <div class="logo-container">
            <img :src="require(`../assets/team-logos/${team.id}.png`)" height="60px">
          </div>
          <v-card-title class="teamcard-title">{{team.fullname}}</v-card-title>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  components: { Loader },
  computed: {
    teams() {
      return this.$store.state.wsldata.teams
        .slice(0)
        .sort((x, y) => x.fullname - y.fullname);
    }
  },
  created() {
    this.$store.dispatch("getData");
  }
};
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

@media only screen and (orientation: landscape) {
  .teamcard {
    width: 65%;
    margin: 0 auto 10px auto;
  }
}
</style>