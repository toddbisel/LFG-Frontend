<template>
  <div class="game-show">
    <div>
      <img :src="game.image" alt="Game Image" Height="200" />
    </div>
    <div>Title: {{ game.title }}</div>
    <div>Description {{ game.description }}</div>
    <div>
      <h3>Players:</h3>
      <div>{{ game.users }}</div>
    </div>
    <div>
      <h3>Groups:</h3>
      <div>{{ game.groups }}</div>
    </div>
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
