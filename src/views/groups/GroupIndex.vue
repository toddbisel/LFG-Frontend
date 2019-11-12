<template>
  <div class="group-index">
    <div>
      <router-link :to="'/groups/new'">
        <button>Create New Group!</button>
      </router-link>
    </div>
    <br />

    <div>
      <div id="name-search">
        <input type="text" placeholder="Search by name" class="form-control" v-model="nameFilter" list="names" />
      </div>
      <!-- <div id="game-search">
        <input type="text" placeholder="Search by game" class="form-control" v-model="gameFilter" list="games" />
      </div> -->
      <div>
        <button v-on:click="setSortAttribute('name')" class="btn btn-primary">
          Sort by name
          <!-- <span v-if="sortAttribute === 'name' && sortAscending === 1">^</span> -->
          <i v-if="sortAttribute === 'name' && sortAscending === 1">Up</i>
          <i v-if="sortAttribute === 'name' && sortAscending === -1">Down</i>
        </button>
        <button v-on:click="setSortAttribute('distance')" class="btn btn-primary">
          Sort by Distance
          <i v-if="sortAttribute === 'distance' && sortAscending === 1">farthest from me</i>
          <i v-if="sortAttribute === 'distance' && sortAscending === -1">closest to me</i>
        </button>
      </div>
    </div>

    <datalist id="names">
      <option v-for="group in groups">{{ group.name }}</option>
    </datalist>

    <!-- <datalist id="games">
      <option v-for="game in games">{{ game.title }}</option>
    </datalist> -->

    <h2>Group Index</h2>
    <div
      v-for="group in orderBy(filterBy(groups, nameFilter, 'name'), sortAttribute, sortAscending)"
      v-on:click="currentGroup = group"
      v-bind:class="{ selected: group === currentGroup }"
      v-bind:key="group.id"
    >
      <router-link v-bind:to="`/groups/${group.id}`">
        <img :src="group.image" alt="Group Image" Height="200" />
      </router-link>
      <br />
      Group Name: {{ group.name }} Group Distance: {{ group.distance }}
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
      groups: [],
      errors: [],
      nameFilter: "",
      sortAttribute: "name",
      sortAscending: 1,
      currentGroup: {},
      games: [],
      gameFilter: ""
    };
  },
  created: function() {
    axios.get("/api/groups").then(response => {
      this.groups = response.data;
    });
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
