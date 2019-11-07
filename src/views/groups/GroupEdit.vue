<template>
  <div class="group-edit">
    <h1>Group Information</h1>
    <form v-on:submit.prevent="submit()">
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        Group Name:
        <input type="text" v-model="group.name" />
      </div>
      <div>
        Description:
        <input type="text" v-model="group.description" />
      </div>
      <div>
        Zipcode:
        <input type="number" v-model="group.zipcode" />
      </div>
      <div>
        Image:
        <input type="text" v-model="group.image" />
      </div>
      <div>
        <input type="submit" value="Update Group Info" />
      </div>
    </form>
    <div>
      <button v-on:click="destroyUser(group)">Delete Group</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
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
    submit: function() {
      var params = {
        name: this.group.name,
        description: this.group.description,
        zipcode: this.group.zipcode,
        image: this.group.image
      };

      axios
        .patch("/api/groups/" + this.group.id, params)
        .then(response => {
          this.$router.push("/groups/" + this.group.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function(group) {
      axios.delete("/api/group/" + this.group.id).then(response => {
        console.log(response.data);
        this.$root.flash = response.data.message;
        this.$router.push("/");
      });
    }
  }
};
</script>
