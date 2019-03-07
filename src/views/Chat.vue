<template>
  <div>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <div v-else>
      <Matchchatpreview v-for="(match, index) in matches" :key="index" :match="match"></Matchchatpreview>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Matchchatpreview from "@/components/Matchchatpreview.vue"

export default {
  components: { Loader, Matchchatpreview },
  computed: {
    matches() {
      return this.$store.state.wsldata.matches;
    }
  },
  created() {
    this.$store.dispatch("getData");
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
  height: 150px;
  overflow: scroll;
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