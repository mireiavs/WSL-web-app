<template>
  <div>
    <div class="logos" >
      <router-link class="team" :to="{name: 'Team information', params: {id: homeTeam.id}}">
        <img :src="require(`../assets/team-logos/${homeTeam.id}.png`)">
        <p>{{ homeTeam.fullname }}</p>
      </router-link>
      <div class="separator2">{{ separator }}</div>
      <router-link class="team" :to="{name: 'Team information', params: {id: awayTeam.id}}">
        <img :src="require(`../assets/team-logos/${awayTeam.id}.png`)">
        <p>{{ awayTeam.fullname }}</p>
      </router-link>
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
              <div>
                <div class="cardtitle">Location</div>
                <span>{{ homeTeam.stadium.name }} in {{ homeTeam.stadium.town }}</span>
                <iframe class="map" :src="homeTeam.stadium.map" frameborder="0" allowfullscreen></iframe>
              </div>
<!--               <div>
                <div class="cardtitle">Line-ups</div>
                <div>

                </div>
              </div> -->
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    match() {
      return this.$store.state.wsldata.matches[this.$route.params.id - 1];
    },
    allTeams() {
      return this.$store.state.wsldata.teams;
    },
    homeTeam() {
      var homeTeamName = this.$store.state.wsldata.matches[
        this.$route.params.id - 1
      ].home_team;
      return this.allTeams.find(team => team.id === homeTeamName);
    },
    awayTeam() {
      var awayTeamName = this.$store.state.wsldata.matches[
        this.$route.params.id - 1
      ].away_team;
      return this.allTeams.find(team => team.id === awayTeamName);
    },
    separator() {
      if(this.match.match_id > 5) {
        return "-"
      } else {
        return this.match.home_score + " - " + this.match.away_score
      }
    }
  }
/*   methods: {
    getRandomPlayers(team) {
      team.players

    }
  } */
};
</script>

<style scoped>
.logos {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: inherit;
}
.team {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  color: white;
  text-decoration: none;
  flex-basis: 100%
}
.team img {
  height: 90px;
  margin-bottom: 10px;
}
.team p {
  text-align:center;
  width: 80%;
}
.separator2 {
  min-width: 55px;
  text-align: center;
  padding-bottom: 50px;
  font-size: 2em
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
</style>