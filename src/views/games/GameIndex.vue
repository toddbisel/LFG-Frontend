<template>
  <div class="game-index">
    <div><h2>Game Index</h2></div>

    <div>
      <div id="title-search">
        <input type="text" placeholder="Search by Title" class="form-control" v-model="titleFilter" list="titles" />
      </div>
      <div>
        <button v-on:click="setSortAttribute('title')" class="btn btn-primary">
          Sort by title
          <!-- <span v-if="sortAttribute === 'title' && sortAscending === 1">^</span> -->
          <i v-if="sortAttribute === 'title' && sortAscending === 1">Up</i>
          <i v-if="sortAttribute === 'title' && sortAscending === -1">Down</i>
        </button>
      </div>
    </div>

    <datalist id="titles">
      <option v-for="game in games">{{ game.title }}</option>
    </datalist>

    <div
      v-for="game in orderBy(filterBy(games, titleFilter, 'title'), sortAttribute, sortAscending)"
      v-on:click="currentGame = game"
      v-bind:class="{ selected: game === currentGame }"
      v-bind:key="game.id"
    >
      <router-link v-bind:to="`/games/${game.id}`"><img :src="game.image" alt="Game Image" Height="200" /></router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      titleFilter: "",
      sortAttribute: "title",
      sortAscending: 1,
      currentGame: {},
      games: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/games").then(response => {
      this.games = response.data;
    });
  },
  methods: {
    setSortAttribute: function(attribute) {
      // if im clicking on a button a second time
      if (this.sortAttribute === attribute) {
        // reverse the sort ascending
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
        this.sortAttribute = attribute;
      }
    }
  }
};
</script>
