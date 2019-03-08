<template>
  <div>
    <loader v-if="!this.$store.state.dataReady"></loader>
    <div v-else>
      <p class="chat-welcome"> We are only showing you the latest messages from each chatroom. Click on a specific chatroom to go to the match page and be able to see the full conversation and join in.</p>
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
.chat-welcome {
  margin: 15px
}
</style>