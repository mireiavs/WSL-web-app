<template>
  <v-card light class="contact">
    
    <div class="icons">
      <p>Tap the envelope to send us an email:</p>
      <v-flex>
        <a href="mailto:contact@wsl.com"><v-icon size="130px" center>mdi-email-outline</v-icon></a>
      </v-flex>
      <p>You can also call us by tapping the phone icon:</p>
      <v-flex>
        <a href="#"><v-icon size="130px" center>mdi-phone</v-icon></a>
      </v-flex>
    </div>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
.icons {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-top: 20px;
}
 .contact {
  margin: 50px 20px 0 20px;
  padding: 20px;
  font-size: 1.1em;
}
.contact a {
  text-decoration: none;
}
.contact p{
  text-align: center;
  font-size: 1.1em
}
</style>