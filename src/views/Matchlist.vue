<template>
  <v-container fluid grid-list-lg>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <v-layout column v-if="path.includes('next-matchday') && this.$store.state.dataReady">
      <matchcard      
        v-for="match in upcomingMatches"
        :key="match.name"
        :match="match"
        class="matchcard"
      ></matchcard>
    </v-layout>
    <v-layout column v-if="path.includes('results') && this.$store.state.dataReady">
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
import Loader from "@/components/Loader.vue";

export default {
  components: { Matchcard, Loader },
  computed: {
    matches() {
      return this.$store.state.wsldata.matches;
    }, 
    teams() {
      return this.$store.state.wsldata.teams;
    },
    pastMatches() {
      return this.matches.filter(match => Date.parse(match.match_date) < Date.parse(new Date())
);
    },
    upcomingMatches() {
      return this.matches.filter(match => Date.parse(match.match_date) > Date.parse(new Date()));
    },
    path() {
      return this.$route.path;
    }
  },
  created() {
    this.$store.dispatch("getData")
  }
};
</script>

<style scoped>
.matchcard {
  margin: 0 15px 20px 15px;
}
@media only screen and (orientation: landscape) {
  .matchcard {
    width: 65%;
    margin: 0 auto 20px auto;
  }
}
</style>