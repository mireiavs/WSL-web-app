<template>
  <v-card color="#FBF7F5" :to="{name: 'Match information', params: {id: match.match_id}}">
    <v-card-text primary-title>
      <div class="matchcard">
        <div class="matchteams">
          <div class="logo-name">
            <img :src="require(`../assets/team-logos/${match.home_team}.png`)" height="60px">
            <p>{{ homeTeamName }}</p>
          </div>
          <div
            class="separator"
            v-show="this.$route.path.includes('results')"
          >{{ match.home_score }} - {{ match.away_score }}</div>
          <div class="separator" v-show="this.$route.path.includes('next-matchday')">-</div>
          <div class="logo-name">
            <img :src="require(`../assets/team-logos/${match.away_team}.png`)" height="60px">
            <p>{{ awayTeamName }}</p>
          </div>
        </div>
        <div class="datetime">
          <p>{{ match.match_date }}</p>
          <p>{{ match.kick_off }}</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["match"],
  computed: {
    homeTeamName() {
      return this.$store.state.wsldata.teams.find(
        team => team.id === this.match.home_team
      ).fullname;
    },
    awayTeamName() {
      return this.$store.state.wsldata.teams.find(
        team => team.id === this.match.away_team
      ).fullname;
    }    
  }
}
</script>

<style>
.matchcard {
  width: inherit;
  color: black;
}
.matchteams {
  display: flex;
  flex-direction: row wrap;
  justify-content: space-around;
  width: inherit;
  align-content: center;
}
.datetime {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
}
.datetime p,
.logo-name p {
  margin-bottom: 0;
}
.separator {
  flex-grow: 1;
  text-align: center;
  padding-top: 10px;
  flex-basis: 100%;
  font-size: 2em;
}
.logo-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
}
.logo-name p {
  margin-top: 10px;
  text-align: center;
}
</style>