<template>
  <div class="chat">
    <div ref="messages" class="messages">
      <div v-for="(message, index) in messages" class="message" :key="index">
        <p>{{ message.author }} on {{message.timestamp}}:</p>
        <p>{{ message.message }}</p>
      </div>
    </div>

    <div>
      <div v-show="!checkAuth() || showButtons">
        <p class="loginmessage">You need to log in to be able to post messages</p>
        <div class="buttons">
          <v-btn @click="openLogIn()">Login</v-btn>
          <v-btn @click="openSignUp()">Sign up</v-btn>
        </div>
      </div>

      <div v-show="showLogIn">
        <v-text-field v-model="email" label="Email" type="email" @keyup.enter="logIn()"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" @keyup.enter="logIn()"></v-text-field>
        <div class="buttons">
          <v-btn @click="logIn()">Submit</v-btn>
        </div>
      </div>

      <div v-show="showSignUp">
        <v-text-field v-model="displayName" label="Full name" type="text"></v-text-field>
        <v-text-field v-model="email" label="Email" type="email"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password"></v-text-field>
        <div class="buttons">
          <v-btn @click="signUp()">Submit</v-btn>
        </div>
      </div>

      <div v-show="checkAuth()">
        <v-text-field
          type="text"
          v-model="message"
          placeholder="Your message..."
          @keyup.enter="sendMessage()"
        ></v-text-field>
        <p class="emptymessage" v-if="this.emptyMessage === true">You can't send an empty message.</p>
        <v-btn @click="sendMessage()">Send</v-btn>

        <div v-show="checkAuth()" class="buttons">
          <v-btn @click="logOut()" class="logout" dark>Log Out</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      displayName: "",
      message: "",
      showLogIn: false,
      showSignUp: false,
      showButtons: false,
      messages: [],
      emptyMessage: false
    };
  },
  computed: {
    match() {
      return this.$store.state.wsldata.matches[this.$route.params.id - 1];
    }
  },
  methods: {
    openLogIn() {
      this.showLogIn = !this.showLogIn;
      this.showSignUp = false;
    },
    openSignUp() {
      this.showSignUp = !this.showSignUp;
      this.showLogIn = false;
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.showLogIn = false;
          this.authStatus = true;
          this.showButtons = false;
          this.showSignUp = false;
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: this.displayName });
        });
    },
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.showLogIn = false;
          this.authStatus = true;
          this.showButtons = false;
        });
    },
    logOut() {
      firebase.auth().signOut();
      this.showButtons = true;
    },
    sendMessage() {
      if (this.message === "") {
        this.emptyMessage = true;
      } else {
        var date = new Date();
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);

        var objectToSend = {
          message: this.message,
          author: firebase.auth().currentUser.displayName,
          timestamp: `${day}/${month}/${year} at ${hours}:${minutes}`,
          realTimestamp: firebase.database.ServerValue.TIMESTAMP
        };
        var databaseName = "Match" + this.match.match_id;
        firebase
          .database()
          .ref(databaseName)
          .push(objectToSend);
        this.message = "";
        this.emptyMessage = false
      }
    },
    getMessages() {
      var databaseName = "Match" + this.match.match_id;
      firebase
        .database()
        .ref(databaseName)
        .on("value", data => {
          this.messages = data.val();
        });
    },
    checkAuth() {
      if (firebase.auth().currentUser === null) {
        return false;
      } else {
        return true;
      }
    },
    chatScroll() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    }
  },
  mounted() {
    this.getMessages();
  },
  updated() {
    this.checkAuth();
    this.chatScroll();
  }
};
</script>

<style scoped>
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
.emptymessage {
    font-weight: bold;
}
</style>