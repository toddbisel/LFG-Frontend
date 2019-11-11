<template>
  <div class="group-index">
    <div>
      Create New Group
      <router-link :to="'/groups/new'">Create Now!</router-link>
    </div>
    <br />

    <h2>Group Index</h2>
    <div v-for="group in groups">
      <router-link v-bind:to="`/groups/${group.id}`">
        <img :src="group.image" alt="Group Image" Height="200" />
      </router-link>
      <br />
      Group Name: {{ group.name }}
    </div>
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
