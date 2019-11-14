<template>
  <div class="signup">
    <div class="container">
      <div class="container pb50 pt50-md">
        <div class="row">
          <div class="col-md-6 col-lg-5 mr-auto ml-auto">
            <div class="card card-account">
              <div class="card-body">
                <form v-on:submit.prevent="submit()">
                  <ul v-if="errors.length > 0">
                    <li class="text-danger" v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      v-model="email"
                      placeholder="JohnDoe007@gmail.com"
                    />
                  </div>
                  <div class="form-group">
                    <label for="first_name">First Name</label>
                    <input id="first_name" type="text" class="form-control" v-model="first_name" placeholder="John" />
                  </div>
                  <div class="form-group">
                    <label for="last_name">Last Name</label>
                    <input id="last_name" type="text" class="form-control" v-model="last_name" placeholder="Doe" />
                  </div>
                  <div class="form-group">
                    <label for="age">Bio</label>
                    <input id="bio" type="text" class="form-control" v-model="bio" />
                  </div>
                  <div class="form-group">
                    <label for="age">Age:</label>
                    <input id="age" type="number" class="form-control" v-model="age" />
                  </div>
                  <div class="form-group">
                    <label for="zipcode">Zipcode</label>
                    <input id="number" type="text" v-model="zipcode" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="image">Image</label>
                    <input id="text" type="text" v-model="image" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" v-model="password" class="form-control" placeholder="......" />
                  </div>
                  <div class="form-group">
                    <label for="passwordConfirmation">Confirm Password</label>
                    <input
                      id="passwordConfirmation"
                      type="password"
                      v-model="passwordConfirmation"
                      class="form-control"
                      placeholder="......"
                    />
                  </div>
                  <input type="submit" class="btn btn-block btn-secondary btn-rounded btn-xl" value="Sign Up" />
                  <!-- <button type="button" class="btn btn-block btn-secondary btn-rounded btn-xl" value="Submit">
                  </button> -->
                </form>
                <br />
                <!-- <p class="mb0 text-small">
                  Dont' have an account?
                  <a href="#" class="btn btn-underline">Sign Up</a>
                </p> -->
                <p class=" text-small mb0">
                  Forget your password?
                  <a href="#" class="btn btn-underline">Recover</a>
                </p>
                <hr />
                <div class="text-center mb20">Or Login with</div>
                <a href="#" class="btn btn-social facebook btn-block">
                  <i class="fa fa-facebook"></i>
                  Login with facebook
                </a>
                <a href="#" class="btn btn-social twitter btn-block">
                  <i class="fa fa-twitter"></i>
                  Login with Twitter
                </a>
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
      image: "",
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
        zipcode: this.zipcode,
        image: this.image
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
