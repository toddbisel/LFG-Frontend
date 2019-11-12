<template>
  <div class="user-show">
    <div>
      <button v-if="$parent.getUserInfo().userId != user.id" v-on:click="createConversation()">
        Create Conversation
      </button>
      <div><h2>User Info</h2></div>

      <div v-if="$parent.getUserInfo().userId == user.id">
        <router-link v-bind:to="`/users/${user.id}/edit`">
          <button><h2>Edit My Account</h2></button>
        </router-link>
      </div>

      <div><img :src="user.image" alt="User Image" Height="500" /></div>
      <div>Name: {{ user.first_name }} {{ user.last_name }}</div>
      <div>Age: {{ user.age }}</div>
      <div>Bio: {{ user.bio }}</div>
      <div>Zipcode: {{ user.zipcode }}</div>
    </div>

    <div>
      <div>
        <div v-if="$parent.getUserInfo().userId == user.id"><h2>My Groups</h2></div>
        <div v-else>
          <h2>{{ user.first_name }}'s Groups</h2>
        </div>

        <div v-for="group in user.groups">
          <router-link v-bind:to="`/groups/${group.id}`">
            <img :src="group.image" alt="Group Image" Height="150" />
          </router-link>
          <div>Name: {{ group.name }}</div>
          <div>Description: {{ group.description }}</div>
          <!-- <div>Zipcode: {{ group.zipcode }}</div> -->
          <br />
        </div>
      </div>
    </div>

    <div>
      <div>
        <div v-if="$parent.getUserInfo().userId == user.id">
          <h2>My Games</h2>
        </div>
        <div v-else>{{ user.first_name }}'s Games</div>

        <div v-for="game in user.games">
          <router-link v-bind:to="`/games/${game.id}`">
            <img :src="game.image" alt="Game Image" Height="150" />
          </router-link>
          <div>Name: {{ game.title }}</div>
          <br />
        </div>
      </div>
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
  methods: {
    createConversation: function() {
      var params = {
        recipient_id: this.user.id
      };

      axios
        .post("/api/conversations", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/conversations/" + response.data.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    }
  }
};
</script>
