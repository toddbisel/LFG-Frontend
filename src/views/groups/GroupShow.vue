<template>
  <div class="group-show">
    <div>{{ group }}</div>
    <router-link v-bind:to="`/groups/${group.id}/edit`">Edit Group</router-link>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      group: {}
    };
  },
  created: function() {
    axios.get("/api/groups/" + this.$route.params.id).then(response => {
      this.group = response.data;
      console.log(this.group);
    });
  },
  methods: {}
};
</script>
