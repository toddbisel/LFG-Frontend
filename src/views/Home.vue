<template>
  <div class="home">
    <div>
      <div v-if="isLoggedIn()">
        Are you searching for...
        <router-link to="/users" tag="button">a player?</router-link>
        or
        <router-link to="/groups" tag="button">a group?</router-link>
      </div>
      <div v-else>
        Every Adventurer needs a party!
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {};
  },
  created: function() {},
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
