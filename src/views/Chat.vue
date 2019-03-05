<template>
<!--   <div>{{ messages }}</div> -->
</template>

<script>
export default {
  data() {
    return {
      messages: []
    };
  },
  computed: {
    matches() {
      return this.$store.state.wsldata.matches;
    }
  },
  methods: {
    getAllMessages() {
      this.matches.forEach(match => {
        var dbName = "Match" + match.match_id;
        firebase
          .database()
          .ref(dbName)
          .on("value", data => {
            this.messages.push(data.val());
          });
      });
    }
  },
  mounted() {
    this.getAllMessages();
  }
};
</script>

<style scoped>
</style>