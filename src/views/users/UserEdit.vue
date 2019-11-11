<template>
  <div class="user-edit">
    <div v-if="$parent.getUserInfo().userId == user.id">
      <form v-on:submit.prevent="submit()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div>
          First Name:
          <input type="text" v-model="user.first_name" />
        </div>
        <div>
          Last Name:
          <input type="text" v-model="user.last_name" />
        </div>
        <div>
          Age:
          <input type="number" v-model="user.age" />
        </div>
        <div>
          Bio:
          <input type="text" v-model="user.bio" />
        </div>
        <div>
          Zipcode:
          <input type="number" v-model="user.zipcode" />
        </div>
        <div>
          Image:
          <input type="text" v-model="user.image" />
        </div>
        <div>
          <input type="submit" value="Update User Info" />
        </div>
      </form>
      <div>
        <button v-on:click="destroyUser(user)">Delete Account</button>
      </div>
    </div>
    <div v-else>idiot</div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
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
    submit: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        age: this.user.age,
        bio: this.user.bio,
        zipcode: this.user.zipcode,
        image: this.user.image
      };

      axios
        .patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function(user) {
      axios.delete("/api/users/" + this.user.id).then(response => {
        console.log(response.data);
        this.$root.flash = response.data.message;
        this.$router.push("/");
      });
    }
  }
};
</script>
