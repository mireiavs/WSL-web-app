<template>
  <v-card light class="match-chat" :to="{name: 'Match information', params: {id: match.match_id}}">
    <h4>{{ match.home_team }} vs. {{ match.away_team }}</h4>
    <p
      v-if="messages === null"
      class="no-messages"
      ref="messages"
    >There are no messages on this match chatroom yet.</p>
    <div v-else class="chat-messages" ref="messages">
      <div v-for="(message, index) in latestMessages" :key="index" class="message">
        <p>{{ message.author }} on {{ message.timestamp}}:</p>
        <p>{{ message.message }}</p>
      </div>
    </div>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["match"],
  data() {
    return {
      messages: {}
    };
  },
  computed: {
    latestMessages() {
    var indexes = Object.keys(this.messages);
    var messagesToShow = [];
      if (indexes.length > 3) {
        for (var i = indexes.length - 1; i > indexes.length - 4; i--) {
          messagesToShow.push(this.messages[indexes[i]]);
        }
        return messagesToShow;
      } else {
          return this.messages
      }
    }
  },
  methods: {
    getMatchMessages() {
      var databaseName = "Match" + this.match.match_id;
      firebase
        .database()
        .ref(databaseName)
        .on("value", data => {
          this.messages = data.val();
        });
    },
    chatScroll() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    }
  },
  mounted() {
    this.getMatchMessages();
  },
  updated() {
    this.chatScroll();
  }
};
</script>

<style scoped>
.match-chat {
  margin: 10px;
  padding: 20px;
  font-size: 1.1em;
}
.chat-messages {
  border: 1px solid #9e9d9d;
  /*   height: 150px;
  overflow: scroll; */
}
.message {
  border: 1px solid #e0e0e0;
  margin: 5px;
  border-radius: 10px;
  width: 80%;
  padding: 5px;
  background-color: #d1cececb;
  font-size: 0.9em;
}
h4 {
  text-align: center;
  margin-bottom: 15px;
}
.no-messages {
  margin-bottom: 0;
  text-align: center;
}
.message p {
  margin-bottom: 0;
}
</style>