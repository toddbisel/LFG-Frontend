<template>
  <div id="app">
    <div id="nav">
      <div v-if="isLoggedIn()">
        Hello {{ getUserInfo().firstName }}
        <router-link to="/">Home</router-link>
        |
        <router-link to="/users">User Index</router-link>
        |
        <router-link to="/groups">Group Index</router-link>
        |
        <router-link to="/games">Game Index</router-link>
        |
        <router-link v-bind:to="`/users/${getUserInfo().userId}/edit`">My Account</router-link>
        |
        <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
      </div>

      <div v-if="!isLoggedIn()">
        Have an account?
        <router-link to="/login">Login</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    getUserInfo: function() {
      return {
        firstName: localStorage.getItem("first_name"),
        userId: localStorage.getItem("user_id")
      };
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
