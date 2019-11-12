<template>
  <div class="group-show">
    <div id="Basic Group Info">
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
    </div>
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
