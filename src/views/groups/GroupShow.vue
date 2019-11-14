<template>
  <div class="group-show">
    <div class="container pt90 pb60">
      <div class="feature-col mb30">
        <div class="row align-items-center">
          <div class="col-md-5 ml-auto">
            <img :src="group.image" alt="" class="img-fluid center-img" />
          </div>
          <div class="col-md-5 mr-auto pt30-md">
            <h4 class="h2 mb0">{{ group.name }}</h4>
            <span class="h6 text-muted mb20">
              Distance from me: {{ group.distance.toFixed(2) }} Miles
              <br />
              {{ group.count }} Members
            </span>

            <p>
              {{ group.description }}
            </p>
            <router-link v-if="group.member" v-bind:to="`/groups/${group.id}/edit`">
              <button class="btn btn-primary mb5">Edit Group</button>
            </router-link>
            <div>
              <button class="btn btn-primary mb5" v-if="group.member" v-on:click="leaveGroup()">Leave Group</button>
              <button class="btn btn-primary mb5" v-else v-on:click="joinGroup()">Join Group</button>
            </div>
            <!--  <p v-if="$parent.getUserInfo().userId == user.id">
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
            </p> -->
          </div>
        </div>
      </div>
    </div>

    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4>Users in Group</h4>
      </div>
      <div class="row">
        <div v-for="user in group.users" class="col-md-6 col-lg-3 mb50 text-center">
          <router-link v-bind:to="`/users/${user.id}`">
            <img :src="user.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ user.first_name }}</h4>
          </router-link>
        </div>
        <!--/col-->
      </div>
    </div>

    <div class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4>Games Played</h4>
      </div>
      <div class="row">
        <div v-for="game in group.games" class="col-md-6 col-lg-3 mb50 text-center">
          <router-link v-bind:to="`/games/${game.id}`">
            <img :src="game.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ game.title }}</h4>
          </router-link>
        </div>
        <!--/col-->
      </div>
    </div>

    <!-- <div id="Basic Group Info">
      <div><h1>Group Information</h1></div>
      <div><img :src="group.image" alt="Group Image" Height="200" /></div>
      <div>Group Name: {{ group.name }}</div>
      <div>Descriptions: {{ group.description }}</div>
      <div>Distance from me: {{ group.distance }} miles</div>
    </div>

    <div id="Group User Info">
      <div><h2>Group Members</h2></div>
      <div v-for="member in group.users">
        <router-link v-bind:to="`/users/${member.id}`">
          <img :src="member.image" alt="Member Image" Height="100" />
          <br />
          {{ member.first_name }}
        </router-link>
      </div>
    </div>

    <div id="Group Game Info">
      <div><h2>Group Games</h2></div>
      <div v-for="game in group.games">
        <router-link v-bind:to="`/games/${game.id}`">
          <img :src="game.image" alt="Game Image" Height="100" />
          <br />
          {{ game.title }}
        </router-link>
      </div>
    </div>

    <router-link v-if="group.member" v-bind:to="`/groups/${group.id}/edit`"><button>Edit Group</button></router-link>
    <div>
      <button v-if="group.member" v-on:click="leaveGroup()">Leave Group</button>
      <button v-else v-on:click="joinGroup()">Join Group</button>
    </div> -->
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
  methods: {
    joinGroup: function() {
      var params = {
        group_id: this.group.id
      };

      axios.post("api/user_groups/", params).then(response => {
        this.group.member = true;
        this.group.users.push(response.data);
      });
    },
    leaveGroup: function() {
      axios.delete("api/user_groups/" + this.group.id).then(response => {
        this.group.member = false;
        var index = this.group.users.indexOf(response.data);
        this.group.users.splice(index, 1);
      });
    }
  }
};
</script>
