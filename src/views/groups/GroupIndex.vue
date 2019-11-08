<template>
  <div class="group-index">
    Group Index
    <div v-for="group in groups">
      {{ group }}
      <router-link v-bind:to="`/groups/${group.id}`">Show Group</router-link>
    </div>
    <dir>
      Create New Group
      <router-link :to="'/groups/new'">Create Now!</router-link>
    </dir>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      groups: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/groups").then(response => {
      this.groups = response.data;
    });
  },
  methods: {}
};
</script>
