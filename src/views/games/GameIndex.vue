<template>
  <div class="game-index">
    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4 class="">Game Index</h4>

        <div id="game-search" class="form-group searchBar">
          <input type="text" placeholder="Search Games" class="form-control" v-model="titleFilter" />
        </div>
        <div>
          <button v-on:click="setSortAttribute('title')" class="btn btn-outline-primary mb5">
            Sort by Title
            <span v-if="sortAttribute === 'title' && sortAscending === 1">
              Ascending
              <i class="fa fa-arrow-up mr-1"></i>
            </span>
            <span v-if="sortAttribute === 'title' && sortAscending === -1">
              Descending
              <i class="fa fa-arrow-down mr-1"></i>
            </span>
          </button>
          <br />
          <button v-on:click="setSortAttribute('membercount')" class="btn btn-outline-primary mb5">
            Sort by Player Count
            <span v-if="sortAttribute === 'membercount' && sortAscending === 1">
              Ascending
              <i class="fa fa-arrow-up mr-1"></i>
            </span>
            <span v-if="sortAttribute === 'membercount' && sortAscending === -1">
              Descending
              <i class="fa fa-arrow-down mr-1"></i>
            </span>
          </button>
          <br />
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-6 col-lg-3 mb50 text-center"
          v-for="game in orderBy(filterBy(games, titleFilter), sortAttribute, sortAscending)"
          v-on:click="currentGame = game"
          v-bind:class="{ selected: game === currentGame }"
          v-bind:key="game.id"
        >
          <router-link v-bind:to="`/games/${game.id}`">
            <img :src="game.image" alt="" class="img-fluid  mb20 shadow20 crop" />
            <h4>{{ game.title }}</h4>
            <span class="font600 text-muted">{{ game.membercount }} Players</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.crop {
  height: 150px;
  width: 300px;
  overflow: hidden;
}
.crop img {
  height: auto;
  width: 100%;
}
.searchBar {
  padding-right: 300px;
  padding-left: 300px;
  align-self: center;
}

.center-title h4:after {
  content: "";
  width: 80px;
}
</style>

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
      console.log(this.games);
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
