<template>
  <v-layout>
    <v-card light class="about-contact">
      <div>
        <p>The Football Association Women's Super League is the highest league of women's football in England. It is run by the Football Association and began in April 2011.</p>
        <p>
          For more information, please visit the
          <a href="http://www.fawsl.com/">official website</a>.
        </p>
      </div>
      
        <div class="icons contact">
          <h3>Contact us </h3>
          <p>Tap the envelope to send us an email:</p>
          <v-flex>
            <a href="mailto:contact@wsl.com">
              <v-icon size="100px" center>mdi-email-outline</v-icon>
            </a>
          </v-flex>
          <p>You can also call us by tapping the phone icon:</p>
          <v-flex>
            <a href="#">
              <v-icon size="100px" center>mdi-phone</v-icon>
            </a>
          </v-flex>
        </div>
      
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "about"
};
</script>

<style>
.about-contact {
  margin: 0 20px 0 20px;
  padding: 20px;
  font-size: 1.1em;
  text-align: center;
  margin-bottom: 25px;
}
.icons {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-top: 20px;
  text-align: center;
}
.about-contact a {
  text-decoration: none;
}
.contact p {
   margin: 20px 0 0 0;
}
@media only screen and (orientation: landscape) {
  .about-contact {
    width: 65%;
    margin: auto
  }
}
</style>
