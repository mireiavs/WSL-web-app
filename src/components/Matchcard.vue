<template>
  <v-card
    color="#FBF7F5"
    :to="{name: 'Match information', params: {id: match.match_id}}"
  >
    <v-card-text primary-title>
      <div class="matchcard">
        <div class="matchteams">
          <div>
            <img :src="require(`../assets/team-logos/${match.home_team}.png`)" height="60px">
          </div>
<!--           <div>
            <img :src="homeTeamLogo" height="60px">
          </div> -->
          <div>-</div>
          <div>
             <img :src="require(`../assets/team-logos/${match.away_team}.png`)" height="60px">
          </div>
        </div>
        <div class="date">{{match.match_date}}</div>
        <div class="time">{{match.kick_off}}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["match"],
  computed: {
    homeTeamLogo() {
      return "@/assets/team-logos/" + this.match.home_team + ".png";
    },
    awayTeamLogo() {
      return "@/assets/team-logos/" + this.match.away_team + ".png";
    }
  }
};
</script>

<style>
.matchcard {
  width: inherit;
  color: black;
}
.matchteams {
  display: flex;
  justify-content: space-around;
  width: inherit;
  align-content: center;
}
.date,
.time {
  display: flex;
  justify-content: center;
  width: inherit;
}
</style>