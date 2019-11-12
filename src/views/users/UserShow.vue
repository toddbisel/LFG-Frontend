<template>
  <div class="user-show">
    <div class="dzsparallaxer auto-init height-is-based-on-content " data-options='{   direction: "reverse"}'>
      <div
        class="divimage dzsparallaxer--target "
        style="width: 101%; height: 130%; background-image: url(/images/bg-6.jpg)"
      ></div>

      <div class="container pt100 pb70">
        <div class="row pb50">
          <div class="col-md-8 ml-auto mr-auto wow bounceIn" data-wow-delay=".2s">
            <h3 class="h1 text-center font300  pt100 text-white">Meet the super heros</h3>
          </div>
        </div>
      </div>
    </div>
    <!--parallax-->

    <div class="container pt90 pb60">
      <div class="feature-col mb30">
        <div class="row align-items-center">
          <div class="col-md-5 ml-auto">
            <img :src="user.image" alt="" class="img-fluid center-img" />
          </div>
          <div class="col-md-5 mr-auto pt30-md">
            <h4 class="h2 mb0">{{ user.first_name }} {{ user.last_name }}</h4>
            <span class="h6 text-muted mb20">Age {{ user.age }}, Zip {{ user.zipcode }}</span>
            <p>
              {{ user.bio }}
            </p>
            <p v-if="$parent.getUserInfo().userId == user.id">
              <button class="btn btn-primary mb5">
                <i class="fa fa-edit mr-1"></i>
                Edit Account
              </button>
            </p>
            <p v-else>
              <button class="btn btn-primary mb5" v-on:click="createConversation()">
                <i class="fa fa-envelope mr-1"></i>
                Create Conversation
              </button>
            </p>
            <ul class="list-inline social-list">
              <li class="list-inline-item">
                <a href="facebook.com/toddbisel"><i class="fa fa-facebook"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fa fa-twitter"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fa fa-linkedin"></i></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><i class="fa fa-instagram"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="user.groups.length > 0" class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4 v-if="$parent.getUserInfo().userId == user.id">My Groups</h4>
        <h4 v-else class="">{{ user.first_name }}'s Groups</h4>
      </div>
      <div class="row">
        <div v-for="group in user.groups" class="col-md-6 col-lg-3 mb50 text-center">
          <router-link v-bind:to="`/groups/${group.id}`">
            <img :src="group.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ group.name }}</h4>
            <span class="font600 text-muted">{{ group.description }}</span>
          </router-link>
        </div>
        <!--/col-->
      </div>
    </div>

    <div v-if="user.games.length > 0" class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4 v-if="$parent.getUserInfo().userId == user.id">My Games</h4>
        <h4 v-else class="">{{ user.first_name }}'s Games</h4>
      </div>
      <div class="row">
        <div v-for="game in user.games" class="col-md-6 col-lg-3 mb50 text-center">
          <router-link v-bind:to="`/games/${game.id}`">
            <img :src="game.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ game.title }}</h4>
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
