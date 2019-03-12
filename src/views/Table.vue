<template>
  <v-container>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <div v-else>
      <v-layout row fluid>
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
    </div>
  </v-container>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  components: { Loader },
  computed: {
    teams() {
      return this.$store.state.wsldata.teams
        .slice(0)
        .sort((x, y) => x.table_position - y.table_position);
    }
  },
  created() {
    this.$store.dispatch("getData");
  }
};
</script>

<style scoped>
.table-header {
  font-weight: bold;
  margin-bottom: 0;
}
</style>
