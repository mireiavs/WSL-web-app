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
            <v-card color="white" light>
              <v-card-text>
                <div>
                  <div class="cardtitle">Date</div>
                  <div>{{ match.match_date }} at {{ match.kick_off }}</div>
                </div>
                <div v-show="match.match_id > 5">
                  <div class="cardtitle">Location</div>
                  <span>{{ homeTeam.stadium.name }} in {{ homeTeam.stadium.town }}</span>
                  <iframe class="map" :src="homeTeam.stadium.map" frameborder="0" allowfullscreen></iframe>
                </div>
                <div v-show="match.match_id <= 5">
                  <div class="cardtitle">Goal scorers</div>
                  <div class="lineups">
                    <div class="lineup" v-show="match.home_score !== 0">
                      <h4>{{ homeTeam.fullname }}</h4>
                      <p v-for="(player, index) in getGoalScorers(homeTeam)" :key="index">
                        <v-icon light>mdi-soccer</v-icon>
                        {{ player }}
                      </p>
                    </div>
                    <div class="lineup" v-show="match.away_score !== 0">
                      <h4>{{ awayTeam.fullname }}</h4>
                      <p v-for="(player, index) in getGoalScorers(awayTeam)" :key="index">
                        <v-icon light>mdi-soccer</v-icon>
                        {{ player }}
                      </p>
                    </div>
                  </div>
                </div>

                <div v-show="match.match_id <= 5">
                  <div class="cardtitle">Line-ups</div>
                  <div class="lineups">
                    <div class="lineup">
                      <h4>{{ homeTeam.fullname }}</h4>
                      <p
                        v-for="(player, index) in getRandomPlayers(homeTeam)"
                        :key="index"
                      >{{ player }}</p>
                    </div>
                    <div class="lineup">
                      <h4>{{ awayTeam.fullname }}</h4>
                      <p
                        v-for="(player, index) in getRandomPlayers(awayTeam)"
                        :key="index"
                      >{{ player }}</p>
                    </div>
                  </div>
                </div>
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
import firebase from "firebase";
import Matchchat from "@/components/Matchchat.vue";
import Loader from "@/components/Loader.vue"

export default {
  data() {
    return {
      email: "",
      password: "",
      displayName: "",
      message: "",
      showLogIn: false,
      showSignUp: false,
      showSend: false,
      showButtons: false,
      messages: [],
    };
  },
  components: { Matchchat, Loader },
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
      if (this.match.match_id > 5) {
        return "-";
      } else {
        return this.match.home_score + " - " + this.match.away_score;
      }
    }
  },
  methods: {
    getRandomPlayers(team) {
      var lineup = [];
      var allPlayers = team.players.slice();
      for (var i = 0; i < 11; i++) {
        var randomPlayer =
          allPlayers[Math.floor(Math.random() * allPlayers.length)];
        lineup.push(randomPlayer);
        allPlayers.splice(allPlayers.indexOf(randomPlayer), 1);
      }
      return lineup;
    },
    getGoalScorers(team) {
      var goalScorers = [];
      var goals;
      if (team === this.homeTeam) {
        goals = this.match.home_score;
      } else {
        goals = this.match.away_score;
      }
      for (var i = 0; i < goals; i++) {
        var randomPlayer =
          team.players[Math.floor(Math.random() * team.players.length)];
        goalScorers.push(randomPlayer);
      }
      return goalScorers;
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
</style>