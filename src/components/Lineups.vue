<template>
    <div>
<div class="cardtitle">Line-ups</div>
                  <div class="lineups">
                    <div class="lineup">
                      <h4>{{ homeTeam.fullname }}</h4>
                      <p v-for="(player, index) in lineupHome" :key="index">{{ player }}</p>
                    </div>
                    <div class="lineup">
                      <h4>{{ awayTeam.fullname }}</h4>
                      <p v-for="(player, index) in lineupAway" :key="index">{{ player }}</p>
                    </div>
                  </div>
                  <div class="cardtitle">Substitutions</div>
                  <h4 class="subs-title">{{ homeTeam.fullname }}</h4>

                  <div class="subs">
                    <div class="substituted">
                      <p v-for="(player, key) in substitutedHome" :key="key">
                        {{ player }}
                        <v-icon small>mdi-arrow-right</v-icon>
                      </p>
                    </div>
                    <div class="substitutes">
                      <p v-for="(player, key) in substitutesHome" :key="key">{{ player }}</p>
                    </div>
                  </div>

                  <h4 class="subs-title-away">{{ awayTeam.fullname }}</h4>

                  <div class="subs">
                    <div class="substituted">
                      <p v-for="(player, key) in substitutedAway" :key="key">
                        {{ player }}
                        <v-icon small>mdi-arrow-right</v-icon>
                      </p>
                    </div>
                    <div class="substitutes">
                      <p v-for="(player, key)  in substitutesAway" :key="key">{{ player }}</p>
                    </div>
                  </div>
    </div>
</template>

<script>
    export default {
  data() {
    return {
      lineupHome: [],
      lineupAway: [],
      substitutionsHome: 0,
      substitutionsAway: 0,
      substitutedHome: [],
      substitutesHome: [],
      substitutedAway: [],
      substitutesAway: []
    };
  },
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
      if (team === this.homeTeam) {
        this.lineupHome = lineup;
      } else if (team === this.awayTeam) {
        this.lineupAway = lineup;
      }

      var substitutions = Math.floor(Math.random() * 3 + 1);
      var substituted = [];
      var substitutes = [];
      var allPlayers2 = team.players.slice();
      var lineup2 = lineup.slice();
      var restOfPlayers = allPlayers2.filter(
        player => !lineup2.includes(player)
      );

      for (var i = 0; i < substitutions; i++) {
        var randomPlayerFromLineup =
          lineup2[Math.floor(Math.random() * lineup2.length)];
        var randomPlayerfromRest =
          restOfPlayers[Math.floor(Math.random() * restOfPlayers.length)];
        substituted.push(randomPlayerFromLineup);
        substitutes.push(randomPlayerfromRest);
        lineup2.splice(lineup2.indexOf(randomPlayerFromLineup), 1);
        restOfPlayers.splice(restOfPlayers.indexOf(randomPlayerfromRest), 1);
      }
      if (team === this.homeTeam) {
        this.substitutedHome = substituted;
        this.substitutesHome = substitutes;
      } else if (team === this.awayTeam) {
        this.substitutedAway = substituted;
        this.substitutesAway = substitutes;
      }
      return lineup;
    },

  },
  created() {
    this.getRandomPlayers(this.homeTeam);
    this.getRandomPlayers(this.awayTeam);
  },
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