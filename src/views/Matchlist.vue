<template>
  <v-container fluid grid-list-lg>
    <v-layout column>
      <matchcard v-for="match in matches" :key="match.name" :match="match" class="matchcard"></matchcard>
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
    }
  }
};
</script>

<style scoped>
.matchcard {
  margin: 0 15px 20px 15px;
}
</style>