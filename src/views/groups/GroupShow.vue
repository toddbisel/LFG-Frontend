<template>
  <div class="group-show">
    <div><img :src="group.image" alt="Group Image" Height="200" /></div>
    <div>Group Name: {{ group.name }}</div>
    <div>Descriptions: {{ group.description }}</div>
    <div>Distance from me: {{ group.distance }} miles</div>
    <div>{{ group }}</div>

    <router-link v-bind:to="`/groups/${group.id}/edit`">Edit Group</router-link>
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
