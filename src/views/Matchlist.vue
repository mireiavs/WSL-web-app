<template>
  <v-container fluid grid-list-lg>
    <v-layout column v-if="path.includes('next-matchday')">
      <matchcard      
        v-for="match in upcomingMatches"
        :key="match.name"
        :match="match"
        class="matchcard"
      ></matchcard>
    </v-layout>
    <v-layout column v-if="path.includes('results')">
      <matchcard       
        v-for="match in pastMatches"
        :key="match.name"
        :match="match"
        class="matchcard"
      ></matchcard>
    </v-layout>
  </v-container>
</template>

<script>
import Matchcard from "@/components/Matchcard.vue";

export default {
  components: { Matchcard },
  computed: {
    matches() {
      return this.$store.state.wsldata.matches;
    },
    teams() {
      return this.$store.state.wsldata.teams;
    },
    pastMatches() {
      return this.matches.filter(match => match.match_id < 6);
    },
    upcomingMatches() {
      return this.matches.filter(match => match.match_id > 5);
    },
    path() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.matchcard {
  margin: 0 15px 20px 15px;
}
</style>