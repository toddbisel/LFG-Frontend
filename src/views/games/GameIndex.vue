<template>
  <div class="game-index">
    Game Index
    <div v-for="game in games">
      {{ game }}
      <router-link v-bind:to="`/games/${game.id}`">Show Game</router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      games: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/games").then(response => {
      this.games = response.data;
    });
  },
  methods: {}
};
</script>
