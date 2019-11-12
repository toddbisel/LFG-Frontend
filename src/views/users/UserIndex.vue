<template>
  <div class="user-index">
    <div><h1>User Index</h1></div>

    <div>
      <div id="name-search">
        <input type="text" placeholder="Search by Name" class="form-control" v-model="nameFilter" list="names" />
      </div>
      <div>
        <button v-on:click="setSortAttribute('first_name')" class="btn btn-primary">
          Sort by Name
          <!-- <span v-if="sortAttribute === 'title' && sortAscending === 1">^</span> -->
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
      <option v-for="user in users">{{ user.first_name }}</option>
    </datalist>

    <div
      v-for="user in orderBy(filterBy(users, nameFilter, 'first_name'), sortAttribute, sortAscending)"
      v-on:click="currentUser = user"
      v-bind:class="{ selected: user === currentUser }"
      v-bind:key="user.id"
    >
      <router-link v-bind:to="`/users/${user.id}`"><img :src="user.image" alt="User Image" Height="200" /></router-link>
      <br />
      Name: {{ user.first_name }}
      <br />
      Distance: {{ user.distance }}
      <br />
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
