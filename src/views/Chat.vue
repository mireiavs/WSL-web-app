<template>
  <div class="chat-container">
    <loader v-if="!this.$store.state.dataReady"></loader>
    <div v-else>
      <div v-if="checkAuth() && !this.showButtons">
        <p class="chat-welcome">We are only showing you the latest messages from each chatroom. Click on a specific chatroom to go to the match page, see the full conversation and join in.</p>
        <Matchchatpreview v-for="(match, index) in matches" :key="index" :match="match"></Matchchatpreview>
        <div v-show="checkAuth()" class="buttons">
          <v-btn @click="logOut()" class="logout" light>Log Out</v-btn>
        </div>
      </div>

      <div v-else>
        <p
          class="chat-welcome no-login"
        >You need to be logged in to see the chatrooms. Please log in or sign up below:</p>

        <div>
          <div v-show="!checkAuth() || showButtons">
            <div class="buttons">
              <v-btn @click="openLogIn()" light>Login</v-btn>
              <v-btn @click="openSignUp()" light>Sign up</v-btn>
            </div>
          </div>

          <div v-show="showLogIn" class="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              @keyup.enter="logIn()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              @keyup.enter="logIn()"
            ></v-text-field>
            <p class="errormessage">{{ loginerror }}</p>
            <div class="buttons">
              <v-btn @click="logIn()" light>Submit</v-btn>
            </div>
          </div>

          <div v-show="showSignUp" class="login">
            <v-text-field
              v-model="displayName"
              label="Full name"
              type="text"
              @keyup.enter="signUp()"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              @keyup.enter="signUp()"
              id="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              @keyup.enter="signUp()"
            ></v-text-field>
            <p class="errormessage">{{ loginerror }}</p>
            <div class="buttons">
              <v-btn @click="signUp()" light>Submit</v-btn>
            </div>
          </div>

          <div v-show="checkAuth()">
            <v-text-field
              type="text"
              v-model="message"
              placeholder="Your message..."
              @keyup.enter="sendMessage()"
            ></v-text-field>
            <p
              class="errormessage"
              v-if="this.emptyMessage === true"
            >You can't send an empty message.</p>
            <v-btn @click="sendMessage()">Send</v-btn>

            <div v-show="checkAuth()" class="buttons">
              <v-btn @click="logOut()" class="logout" dark>Log Out</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Matchchatpreview from "@/components/Matchchatpreview.vue";
import firebase from "firebase";

export default {
  components: { Loader, Matchchatpreview },
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
      loginerror: ""
    };
  },
  computed: {
    matches() {
      return this.$store.state.wsldata.matches;
    }
  },
  methods: {
    checkAuth() {
      if (firebase.auth().currentUser === null) {
        return false;
      } else {
        return true;
      }
    },
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
    }
  },
  created() {
    this.$store.dispatch("getData");
  },
  updated() {
    this.checkAuth();
  }
};
</script>

<style scoped>
.chat-welcome {
  margin: 20px;
}
.no-login {
  text-align: center;
}
.buttons {
  display: flex;
  justify-content: center;
}
.errormessage {
  font-weight: bold;
}
.login {
  margin: 0 20px 0 20px;
}
@media only screen and (orientation: landscape) {
  .chat-container {
    width: 75%;
    margin: auto;
  }
}
</style>
