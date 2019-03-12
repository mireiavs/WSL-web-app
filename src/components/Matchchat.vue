<template>
  <div class="chat">
    <div ref="messages" class="messages">
      <div v-if="checkAuth()">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{ 'message' : true, 'sameauthor': checkEmail(message.email) }"
        >
          <p class="msg-author">{{ message.author }} on {{message.timestamp}}:</p>
          <p>{{ message.message }}</p>
        </div>
      </div>
      <div v-if="!checkAuth() || showButtons" class="messages-no-login">
        <p class="loginmessage">You need to log in to be able to see and post messages</p>
      </div>
    </div>

    <div>
      <div v-show="!checkAuth() || showButtons">
        <div class="buttons">
          <v-btn @click="openLogIn()" color="#908f8f" dark>Login</v-btn>
          <v-btn @click="openSignUp()" color="#908f8f" dark>Sign up</v-btn>
        </div>
      </div>

      <div v-show="showLogIn">
        <v-text-field v-model="email" label="Email" type="email" @keyup.enter="logIn()"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" @keyup.enter="logIn()"></v-text-field>
        <p class="errormessage">{{ loginerror }}</p>
        <div class="submit">
          <v-btn @click="logIn()" color="#908f8f" dark>Submit</v-btn>
        </div>
      </div>

      <div v-show="showSignUp">
        <v-text-field v-model="displayName" label="Full name" type="text" @keyup.enter="signUp()"></v-text-field>
        <v-text-field v-model="email" label="Email" type="email" @keyup.enter="signUp()"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" @keyup.enter="signUp()"></v-text-field>
        <p class="errormessage">{{ loginerror }}</p>
        <div class="submit">
          <v-btn @click="signUp()" color="#908f8f" dark>Submit</v-btn>
        </div>
      </div>

      <div v-show="checkAuth()">
        <div class="send">
          <v-text-field
            type="text"
            v-model="message"
            placeholder="Your message..."
            @keyup.enter="sendMessage()"
          ></v-text-field>

          <v-btn @click="sendMessage()" small outline color="gray">Send</v-btn>
        </div>
        <p class="errormessage" v-if="this.emptyMessage === true">
          You can't send an empty message.
        </p>
        <p class="errormessage" v-if="this.profanityMessage === true">
          Please do not use swear words.
        </p>
        <div v-show="checkAuth()" class="buttons">
          <v-btn @click="logOut()" class="logout" color="#908f8f" dark>Log Out</v-btn>
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
      emptyMessage: false,
      profanityMessage: false,
      loginerror: ""
    };
  },
  computed: {
    match() {
      return this.$store.state.wsldata.matches[this.$route.params.id - 1];
    },
    messageSwear() {
      var swear = this.$store.state.swearwords;
      return swear.filter(swearword => this.message.includes(swearword));
    }
  },
  methods: {
    openLogIn() {
      this.showLogIn = !this.showLogIn;
      this.showSignUp = false;
      this.loginerror = "";
    },
    openSignUp() {
      this.showSignUp = !this.showSignUp;
      this.showLogIn = false;
      this.loginerror = "";
    },
    signUp() {
      if (this.displayName === "") {
        this.loginerror = "Error: Please enter your full name";
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.showLogIn = false;
            this.authStatus = true;
            this.showButtons = false;
            this.showSignUp = false;
            this.loginerror = "";
            firebase
              .auth()
              .currentUser.updateProfile({ displayName: this.displayName });
          })
          .catch(error => {
            this.loginerror = error;
          });
      }
    },
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.showLogIn = false;
          this.authStatus = true;
          this.showButtons = false;
          this.loginerror = "";
        })
        .catch(error => {
          this.loginerror = error;
        });
    },
    logOut() {
      firebase.auth().signOut();
      this.showButtons = true;
      this.emptyMessage = false;
      this.profanityMessage = false;
    },
    sendMessage() {
      if (this.message === "" || /^\s+$/.test(this.message)) {
        this.emptyMessage = true;
        this.profanityMessage = false;
      } else if (this.messageSwear.length !== 0) {
        this.profanityMessage = true;
        this.emptyMessage = false;
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
          realTimestamp: firebase.database.ServerValue.TIMESTAMP,
          email: firebase.auth().currentUser.email
        };
        var databaseName = "Match" + this.match.match_id;
        firebase
          .database()
          .ref(databaseName)
          .push(objectToSend);
        this.message = "";
        this.emptyMessage = false;
        this.profanityMessage = false;
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
    },
    checkEmail(email) {
      if (firebase.auth().currentUser !== null) {
        var check = firebase.auth().currentUser.email === email;
        return check;
      } else {
        return false;
      }
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

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.errormessage {
  font-weight: bold;
}
.sameauthor {
  background-color: rgb(171, 141, 190);
  margin-left: 18%;
}
.messages-no-login {
  height: inherit;
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
}
p.loginmessage {
  font-weight: bold;
  text-align: center;
}
.msg-author {
  font-weight: bold;
}
.send {
  display: flex;
  align-items: center;
}
.submit {
  display: flex;
  justify-content: center;
  margin-top: 0;
}
</style>