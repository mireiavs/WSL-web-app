<template>
  <v-container text-xs-center>
    <v-layout column>
      <v-flex>
        <p>You can contact us by email or phone using the buttons below:</p>
      </v-flex>
      <div class="icons">
        <v-flex>
          <v-icon size="130px" center>mdi-email-outline</v-icon>
        </v-flex>
        <v-flex>
          <v-icon size="130px" center>mdi-phone</v-icon>
        </v-flex>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  font-size: 1.2em;
}
.icons {
  display: flex;
  flex-flow: row wrap;
}
</style>