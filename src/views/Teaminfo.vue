<template>
  <v-container>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <v-card light class="teaminfo" v-else>
      <div class="teamtitle">
        <h2>{{ team.fullname }}</h2>
      </div>
      <div class="logo">
        <img height="100px" :src="require(`../assets/team-logos/${team.id}.png`)">
      </div>
      <p>{{ team.about }}</p>
      <div class="teaminfo-title">Upcoming matches</div>
      <router-link
        class="upcoming-games"
        v-for="match in upcomingMatches"
        :key="match.match_id"
        :to="{name: 'Match information', params: {id: match.match_id}}"
      >
        <div class="team-logos">
          <div class="team">
            <img :src="require(`../assets/team-logos/${match.home_team}.png`)" height="60px">
            <p>{{ getTeamName(match.home_team) }}</p>
          </div>
          <div class="separator2">-</div>
          <div class="team">
            <img :src="require(`../assets/team-logos/${match.away_team}.png`)" height="60px">
            <p>{{ getTeamName(match.away_team) }}</p>
          </div>
        </div>
        <div class="datetime">
          <p>{{ match.match_date }}</p>
          <p>{{ match.kick_off }}</p>
        </div>
        <div class="divider" v-show="upcomingMatches.indexOf(match) !== upcomingMatches.length-1"></div>
      </router-link>

      <div class="teaminfo-title">Table position</div>
      <div class="team-position">
        <v-layout row>
          <v-flex xs2>
            <v-card light tile flat color="#B4B4B4">
              <v-card-text>Pos</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <v-card light tile flat color="#B4B4B4">
              <v-card-text>Team</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card light tile flat color="#B4B4B4">
              <v-card-text>Pts</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row v-for="item in teamsForTable" :key="item.id">
          <v-flex xs2>
            <v-card light tile flat color="white" :class="{ current: item.id === team.id}">
              <v-card-text>{{ item.table_position }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs8>
            <v-card light tile flat color="white" :class="{ current: item.id === team.id}">
              <v-card-text>{{ item.fullname }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card light tile flat color="white" :class="{ current: item.id === team.id}">
              <v-card-text>{{ item.points }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
      <div class="teaminfo-title">Stadium</div>
      <div>{{ team.stadium.name }} in {{ team.stadium.town }}</div>
      <span class="stadium-info-title">Capacity:</span>
      <span class="stadium-info">&nbsp;{{ team.stadium.capacity }}</span>
      <div>
        <iframe class="map" :src="team.stadium.map" frameborder="0" allowfullscreen></iframe>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  components: { Loader },
  computed: {
    allTeams() {
      return this.$store.state.wsldata.teams.slice();
    },
    team() {
      return this.allTeams.find(team => team.id === this.$route.params.id);
    },
    upcomingMatches() {
      var matches = this.$store.state.wsldata.matches.slice();
      return matches.filter(match => {
        var team =
          match.home_team === this.team.id || match.away_team === this.team.id;
/*         var upcoming = Date.parse(match.match_date) > Date.parse(new Date());
 */        var upcoming = match.match_id > 5;
        return team && upcoming;
      });
    },
    teamsForTable() {
      var orderedTeams = this.$store.state.wsldata.teams
        .slice(0)
        .sort((x, y) => x.table_position - y.table_position);
      var teamIndex = orderedTeams.indexOf(this.team);
      if (teamIndex === 0) {
        return orderedTeams.slice(0, 3);
      } else if (teamIndex === 1) {
        return orderedTeams.slice(0, 4);
      } else {
        return orderedTeams.slice(teamIndex - 2, teamIndex + 3);
      }
    }
  },
  methods: {
    getTeamName(teamId) {
      return this.allTeams.filter(team => teamId === team.id)[0].fullname;
    }
  },
  created() {
    this.$store.dispatch("getData");
  }
};
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin: 25px 0 25px 0;
}
.teamtitle {
  text-align: center;
}
.teaminfo {
  padding: 20px;
  color: black;
}
.teaminfo p {
  margin-top: 20px;
}
.teaminfo-title {
  font-weight: bold;
  font-size: 1.3em;
  margin: 10px 0 20px 0;
  text-align: center;
  margin-top: 20px;
}
.team-logos {
  display: flex;
  flex-direction: row wrap;
  justify-content: space-around;
  width: inherit;
  align-content: center;
}
.separator2,
.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  text-align: center;
}
.separator2 {
  padding-top: 20px;
}
.upcoming-games {
  display: flex;
  flex-direction: column;
}
a.upcoming-games {
  margin-bottom: 0;
  text-decoration: none;
  color: black;
}
.datetime p {
  margin-top: 0;
}
.stadium-info-title,
.current {
  font-weight: bold;
}
.divider {
  border-bottom: solid #e0e0e0 1px;
  margin: 10px 0 10px 0;
}
.map {
  margin-top: 10px;
  width: 100%;
}
@media only screen and (orientation: landscape) {
  .teaminfo {
    width: 65%;
    margin: 0 auto 0 auto;
  }
}
</style>