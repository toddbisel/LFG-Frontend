<template>
  <div class="login">
    <div class="container">
      <div class="container pb50  pt50-md">
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
                    <input id="email" type="text" class="form-control" v-model="email" />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" class="form-control" v-model="password" />
                  </div>
                  <input type="submit" class="btn btn-block btn-secondary btn-rounded" value="Sign In" />
                  <!--    <button type="button" class="btn btn-block btn-secondary btn-rounded">Sign In</button> -->
                </form>
                <br />
                <p class="mb0 text-small">
                  Dont' have an account?
                  <router-link to="/signup" class="btn btn-underline">Sign Up</router-link>
                </p>
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
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" />
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
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("user_id", response.data.user_id);
          console.log(response.data);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
