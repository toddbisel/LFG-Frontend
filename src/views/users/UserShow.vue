<template>
  <div class="user-show">
    <div>{{ user }}</div>

    <div v-if="$parent.getUserInfo().userId == user.id">
      <router-link v-bind:to="`/users/${user.id}/edit`">Edit My Account</router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {}
};
</script>
