<template>
  <div class="game-show">
    <div class="container pt90 pb60">
      <div class="feature-col mb30">
        <div class="row align-items-center">
          <div class="col-md-5 ml-auto">
            <img :src="game.image" alt="" class="img-fluid center-img" />
          </div>
          <div class="col-md-5 mr-auto pt30-md">
            <h4 class="h2 mb0">{{ game.title }}</h4>
            <span class="h6 text-muted mb20"></span>
            <p>
              {{ game.description }}
            </p>
            <div>
              <button class="btn btn-primary mb5" align-self="center" v-if="game.follower" v-on:click="unfollowGame()">
                Unfollow Game
              </button>
              <button class="btn btn-primary mb5 " align-self="center" v-else v-on:click="followGame()">
                Follow Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4>Following Groups</h4>
      </div>
      <div class="row">
        <div v-for="group in game.groups" class="col-md-6 col-lg-3 mb50 text-center">
          <router-link v-bind:to="`/groups/${group.id}`">
            <img :src="group.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ group.name }}</h4>
          </router-link>
        </div>
        <!--/col-->
      </div>
    </div>

    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4 class="">Following Users</h4>
      </div>
      <div class="row">
        <div v-for="user in game.users" class="col-md-6 col-lg-3 mb50 text-center">
          <router-link v-bind:to="`/users/${user.id}`">
            <img :src="user.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ user.first_name }}</h4>
          </router-link>
        </div>
        <!--/col-->
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
