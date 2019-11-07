<template>
  <div class="user-index">
    User Index
    <div v-for="user in users">
      {{ user }}
      <router-link v-bind:to="`/users/${user.id}`">Show User</router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      users: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users").then(response => {
      this.users = response.data;
    });
  },
  methods: {}
};
</script>
