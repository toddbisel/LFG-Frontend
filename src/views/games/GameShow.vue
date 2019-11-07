<template>
  <div class="game-show">
    <div>{{ game }}</div>
    <button v-on:click="destroyUser(group)">Delete Group</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      game: {}
    };
  },
  created: function() {
    axios.get("/api/games/" + this.$route.params.id).then(response => {
      this.game = response.data;
      console.log(this.game);
    });
  },
  methods: {}
};
</script>
