<template>
  <div class="user-edit">
    <div v-if="$parent.getUserInfo().userId == user.id">
      <div class="container">
        <div class="container pb50 pt50-md">
          <div class="row">
            <div class="col-md-6 col-lg-5 mr-auto ml-auto">
              <div class="card card-account">
                <div class="card-body">
                  <form v-on:submit.prevent="submit()">
                    <h4 align="center">Edit Your Account</h4>
                    <ul v-if="errors.length > 0">
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                    <div class="form-group">
                      <label for="first_name">First name:</label>
                      <input
                        id="first_name"
                        type="text"
                        class="form-control"
                        v-model="first_name"
                        :placeholder="`${user.first_name}`"
                      />
                    </div>
                    <div class="form-group">
                      <label for="last_name">Last name:</label>
                      <input
                        id="last_name"
                        type="text"
                        class="form-control"
                        v-model="last_name"
                        :placeholder="`${user.last_name}`"
                      />
                    </div>
                    <div class="form-group">
                      <label for="bio">Bio:</label>
                      <input id="age" type="number" class="form-control" v-model="bio" :placeholder="`${user.bio}`" />
                    </div>
                    <div class="form-group">
                      <label for="age">Age:</label>
                      <input id="age" type="number" class="form-control" v-model="age" :placeholder="`${user.age}`" />
                    </div>
                    <div class="form-group">
                      <label for="zipcode">Zipcode:</label>
                      <input
                        id="zipcode"
                        type="number"
                        class="form-control"
                        v-model="zipcode"
                        :placeholder="`${user.zipcode}`"
                      />
                    </div>
                    <div class="form-group">
                      <label for="image">Image:</label>
                      <input
                        id="image"
                        type="text"
                        class="form-control"
                        v-model="image"
                        :placeholder="`${user.image}`"
                      />
                    </div>

                    <input type="submit" class="btn btn-block btn-primary btn-rounded btn-xl" value="Update Account" />
                    <input
                      v-on:click="destroyUser(user)"
                      class="btn btn-block btn-danger btn-rounded btn-xl"
                      value="Delete Account"
                    />
                    <!-- <button type="button" class="btn btn-block btn-secondary btn-rounded btn-xl" value="Submit">
                  </button> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <h3>Account Info:</h3>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
        </div>
        <br />
        <h3>User Info</h3>
        <div class="form-group">
          <label>First name:</label>
          <input type="text" class="form-control" v-model="first_name" />
        </div>
        <div class="form-group">
          <label>Last name:</label>
          <input type="text" class="form-control" v-model="last_name" />
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input type="number" class="form-control" v-model="age" />
        </div>
        <div class="form-group">
          <label>Zipcode:</label>
          <input type="text" class="form-control" v-model="zipcode" />
        </div>

        <input type="submit" class="btn btn-primary" value="Submit" />
      </form> -->
      </div>
    </div>
    <div v-else align="center"><h1>Not your account</h1></div>
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
        first_name: this.first_name,
        last_name: this.last_name,
        age: this.age,
        bio: this.bio,
        zipcode: this.zipcode,
        image: this.image
      };

      axios
        .patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id);
          console.log(this.user);
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
