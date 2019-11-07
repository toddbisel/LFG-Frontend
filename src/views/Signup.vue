<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
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
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      first_name: "",
      last_name: "",
      age: "",
      bio: "",
      zipcode: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        first_name: this.first_name,
        last_name: this.last_name,
        age: this.age,
        bio: this.bio,
        zipcode: this.zipcode
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
