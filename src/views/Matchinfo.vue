<template>
  <div>
    <div class="logos">
      <div class="team">
         <img :src="require(`../assets/team-logos/${homeTeam.id}.png`)" height="60px">
        <p>{{homeTeam.fullname}}</p>
      </div>
      <div class="separator">-</div>
      <div class="team">
        <img :src="require(`../assets/team-logos/${awayTeam.id}.png`)" height="60px">
        <p>{{awayTeam.fullname}}</p>
      </div>
    </div>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
    <v-card color="white" light>
      <v-card-text>
        <div>
          <div class="cardtitle">Date</div>
          <span>{{match.match_date}} at {{match.kick_off}}</span>
        </div>
        <div>
          <div class="cardtitle">Location</div>
          <span>{{homeTeam.stadium.name}} in {{homeTeam.stadium.town}}</span>
        </div>
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
      var homeTeamName = this.$store.state.wsldata.matches[this.$route.params.id - 1].home_team;
      return this.allTeams.filter(team => team.id === homeTeamName)[0];
    },
    awayTeam() {
      var awayTeamName = this.$store.state.wsldata.matches[
        this.$route.params.id - 1
      ].away_team;
      return this.allTeams.filter(team => team.id === awayTeamName)[0];
    },
    homeTeamLogo() {
      return "@/assets/team-logos/" + this.homeTeam + ".png";
    },
    awayTeamLogo() {
      return "@/assets/team-logos/" + this.awayTeam + ".png";
    }
  }
};
</script>

<style scoped>
.logos {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.team {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}
.separator {
  flex-grow: 1;
  text-align: center;
  padding-bottom: 50px;
}
.team img {
  height: 100px;
  width: 100px;
  margin-bottom: 10px;
}
.gameinfo {
  margin-left: 20px;
}
.cardtitle {
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 10px;
}
</style>