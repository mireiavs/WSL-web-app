<template>
  <div>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <div v-else>
      <div class="logos">
        <router-link class="team" :to="{name: 'Team information', params: {id: homeTeam.id}}">
          <img :src="require(`../assets/team-logos/${homeTeam.id}.png`)">
        </router-link>
        <div class="separator2">{{ separator }}</div>
        <router-link class="team" :to="{name: 'Team information', params: {id: awayTeam.id}}">
          <img :src="require(`../assets/team-logos/${awayTeam.id}.png`)">
        </router-link>
      </div>
      <div class="team-names">
        <p>{{ homeTeam.fullname }}</p>
        <div class="separator2"></div>
        <p>{{ awayTeam.fullname }}</p>
      </div>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="white" light class="match-info">
              <v-card-text>
                <div>
                  <div class="cardtitle">Date</div>
                  <div>{{ match.match_date }} at {{ match.kick_off }}</div>
                </div>
                <div v-if="match.match_id > 5">
                  <!-- <div v-if="Date.parse(match.match_date) > Date.parse(new Date())"> -->
                  <div class="cardtitle">Location</div>
                  <span>{{ homeTeam.stadium.name }} in {{ homeTeam.stadium.town }}</span>
                  <iframe class="map" :src="homeTeam.stadium.map" frameborder="0" allowfullscreen></iframe>
                </div>


                <lineups v-if="match.match_id < 5"></lineups>
                <!-- <lineups v-if="Date.parse(match.match_date) < Date.parse(new Date())"></lineups> -->

                <div class="cardtitle">Match chatroom</div>
                <matchchat></matchchat>

              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Matchchat from "@/components/Matchchat.vue";
import Loader from "@/components/Loader.vue";
import Lineups from "@/components/Lineups.vue";

export default {
  components: { Matchchat, Loader, Lineups },
  computed: {
    match() {
      return this.$store.state.wsldata.matches[this.$route.params.id - 1];
    },
    homeTeam() {
      var homeTeamName = this.$store.state.wsldata.matches[
        this.$route.params.id - 1
      ].home_team;
      return this.$store.state.wsldata.teams.find(
        team => team.id === homeTeamName
      );
    },
    awayTeam() {
      var awayTeamName = this.$store.state.wsldata.matches[
        this.$route.params.id - 1
      ].away_team;
      return this.$store.state.wsldata.teams.find(
        team => team.id === awayTeamName
      );
    },
    separator() {
/*       if (Date.parse(this.match.match_date) > Date.parse(new Date())) { */
      if (this.match.match_id > 5) {
        return "-";
      } else {
        return this.match.home_score + " - " + this.match.away_score;
      }
    }
  },
  created() {
    this.$store.dispatch("getData");
  }
};
</script>

<style scoped>
.logos {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: inherit;
  margin: 0 15px 0 15px;
}
.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
  flex-basis: 100%;
}
.team img {
  height: 90px;
  margin-bottom: 10px;
}
.separator2 {
  min-width: 55px;
  text-align: center;
  font-size: 2em;
}
.gameinfo {
  margin-left: 20px;
}
.cardtitle {
  font-weight: bold;
  font-size: 1.5em;
  margin-top: 10px;
}
.map {
  width: 90%;
  height: 150px;
  border: 0;
}
.lineups {
  display: flex;
}
.lineup {
  flex-grow: 1;
  flex-basis: 100%;
}
.lineup p {
  margin-bottom: 0;
}
.team-names {
  display: flex;
  margin: 0 15px 0 15px;
}
.team-names p {
  text-align: center;
  width: 80%;
}
.team-names separator2 {
  flex-grow: 1;
}
.messages {
  border: 1px solid #9e9d9d;
  height: 300px;
  overflow: scroll;
}
.message {
  border: 1px solid #e0e0e0;
  margin: 5px;
  border-radius: 10px;
  width: 80%;
  padding: 5px;
  background-color: #d1cececb;
}
.message p {
  margin-bottom: 0;
}
p.loginmessage {
  font-weight: bold;
  margin: 10px 0 10px 0;
}
.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons {
  display: flex;
  justify-content: center;
}
.subs {
  display: flex;
}
.subs p {
  margin-bottom: 0;
}
.substituted {
  flex-grow: 1;
  text-align: right;
}
.substitutes {
  flex-grow: 1;
}
.subs-title {
  text-align: center;
}
.subs-title-away {
  margin-top: 20px;
  text-align: center;
}
@media only screen and (orientation: landscape) {
  .match-info {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>