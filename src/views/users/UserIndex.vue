<template>
  <div class="user-index">
    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4 class="">Player Index</h4>

        <div id="name-search" class="form-group searchBar">
          <input type="text" placeholder="Search Players" class="form-control" v-model="nameFilter" />
        </div>
        <div>
          <button v-on:click="setSortAttribute('first_name')" class="btn btn-outline-primary mb5">
            Sort by Name
            <span v-if="sortAttribute === 'first_name' && sortAscending === 1">
              Ascending
              <i class="fa fa-arrow-up mr-1"></i>
            </span>
            <span v-if="sortAttribute === 'first_name' && sortAscending === -1">
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
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-6 col-lg-3 mb50 text-center"
          v-for="user in orderBy(filterBy(users, nameFilter), sortAttribute, sortAscending)"
          v-on:click="currentUser = user"
          v-bind:class="{ selected: user === currentUser }"
          v-bind:key="user.id"
          v-if="$parent.getUserInfo().userId != user.id"
        >
          <router-link v-bind:to="`/users/${user.id}`">
            <img :src="user.image" alt="" class="img-fluid rounded-circle mb20 shadow20 crop1" />
            <h4>{{ user.first_name }}</h4>
            <span class="font600 text-muted">{{ user.distance.toFixed(2) }} Miles Away</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.crop1 {
  height: 150px;
  width: 150px;
  /*width: 400px;*/
  overflow: hidden;
}
.crop1 img {
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
      nameFilter: "",
      sortAttribute: "first_name",
      sortAscending: 1,
      currentUser: {},
      users: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      this.users = response.data;
      console.log(this.users);
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
