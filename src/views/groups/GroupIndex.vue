<template>
  <div class="group-index">
    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <div>
          <router-link :to="'/groups/new'">
            <button class="btn btn-lg btn-rounded btn-primary mb5">Create New Group!</button>
          </router-link>
        </div>
        <br />
        <h4 class="">Group Index</h4>

        <div id="name-search" class="form-group searchBar">
          <input type="text" placeholder="Search Groups" class="form-control" v-model="nameFilter" />
        </div>
        <div>
          <button v-on:click="setSortAttribute('name')" class="btn btn-outline-primary mb5">
            Sort by Name
            <span v-if="sortAttribute === 'name' && sortAscending === 1">
              Ascending
              <i class="fa fa-arrow-up mr-1"></i>
            </span>
            <span v-if="sortAttribute === 'name' && sortAscending === -1">
              Descending
              <i class="fa fa-arrow-down mr-1"></i>
            </span>
          </button>
          <br />
          <button v-on:click="setSortAttribute('distance')" class="btn btn-outline-primary mb5">
            Sort by Distance
            <i v-if="sortAttribute === 'distance' && sortAscending === 1">Farthest</i>
            <i v-if="sortAttribute === 'distance' && sortAscending === -1">Closest</i>
          </button>
          <button v-on:click="setSortAttribute('count')" class="btn btn-outline-primary mb5">
            Sort by Members
            <i v-if="sortAttribute === 'count' && sortAscending === 1"><i class="fa fa-arrow-up mr-1"></i></i>
            <i v-if="sortAttribute === 'count' && sortAscending === -1"><i class="fa fa-arrow-down mr-1"></i></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-6 col-lg-3 mb50 text-center"
          v-for="group in orderBy(filterBy(groups, nameFilter), sortAttribute, sortAscending)"
          v-on:click="currentGroup = group"
          v-bind:class="{ selected: group === currentGroup }"
          v-bind:key="group.id"
        >
          <router-link v-bind:to="`/groups/${group.id}`">
            <img :src="group.image" alt="" class="img-fluid mb20 shadow20 crop2" />
            <h4>{{ group.name }}</h4>
            <span class="font600 text-muted">
              {{ group.count }} Members
              <br />
              {{ group.distance.toFixed(2) }} Miles Away
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!--     <div>
      <div id="name-search">
        <input type="text" placeholder="Search by name" class="form-control" v-model="nameFilter" list="names" />
      </div>
  
      <div>
        <button v-on:click="setSortAttribute('name')" class="btn btn-primary">
          Sort by name
       
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
    </div> -->
  </div>
</template>

<style>
.crop2 {
  height: 200px;
  width: 200px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
.crop2 img {
  height: 200px;
  width: 100%;
}
</style>

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
