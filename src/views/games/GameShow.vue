<template>
  <div class="game-show">
    <div>
      <img :src="game.image" alt="Game Image" Height="200" />
    </div>
    <div>Title: {{ game.title }}</div>
    <div>Description {{ game.description }}</div>

    <div>
      <button v-if="game.follower" v-on:click="unfollowGame()">Unfollow Game</button>
      <button v-else v-on:click="followGame()">Follow Game</button>
    </div>

    <div id="Game User Info">
      <div><h2>Game Followers</h2></div>
      <div v-for="follower in game.users">
        <router-link v-bind:to="`/users/${follower.id}`">
          <img :src="follower.image" alt="Follower Image" Height="100" />
          <br />
          {{ follower.first_name }}
        </router-link>
      </div>
    </div>

    <div id="Game Group Info">
      <div><h2>Group Followers</h2></div>
      <div v-for="groupFollower in game.groups">
        <router-link v-bind:to="`/groups/${groupFollower.id}`">
          <img :src="groupFollower.image" alt="Group Follower Image" Height="100" />
          <br />
          {{ groupFollower.name }}
        </router-link>
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
      game: {},
      user: {}
    };
  },
  created: function() {
    axios.get("/api/games/" + this.$route.params.id).then(
      response => {
        this.game = response.data;
        console.log(this.game);
      },
      axios.get("/api/users/" + this.$parent.getUserInfo().userId).then(response => {
        this.user = response.data;
        console.log(this.user);
      })
    );
  },
  methods: {
    followGame: function() {
      var params = {
        game_id: this.game.id
      };

      axios.post("api/user_games/", params).then(response => {
        this.game.follower = true;
        this.game.users.push(response.data);
      });
    },
    unfollowGame: function() {
      axios.delete("api/user_games/" + this.game.id).then(response => {
        this.game.follower = false;
        var index = this.game.users.indexOf(response.data);
        this.game.users.splice(index, 1);
      });
    }
    // followGroupGame: function(id) {
    //   var params = {
    //     group_id: this.id,
    //     game_id: this.game.id
    //   };

    //   axios.post("api/group_games/", params).then(response => {
    //     this.game.test = true;
    //     console.log(this.game.test);
    //     this.game.groups.push(response.data);
    //   });
    // },
    // unfollowGroupGame: function(id) {
    //   var params = {
    //     group_id: this.id,
    //     game_id: this.game.id
    //   };
    //   axios.delete("api/group_games/", params).then(response => {
    //     this.game.test = false;
    //     var index = this.game.groups.indexOf(response.data);
    //     this.game.groups.splice(index, 1);
    //   });
    // }
  }
};
</script>
