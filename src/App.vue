<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light navbar-transparent navbar-sticky">
      <router-link class="navbar-brand" to="/"><img src="/images/logo.png" alt="" /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav  ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/groups">Groups</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/games">Games</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <router-link class="nav-link" v-bind:to="`/users/${getUserInfo().userId}`">My Account</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <router-link class="nav-link" to="/conversations">Messages</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn()">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn()">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn()">
            <router-link target="_blank" to="/signup" class=" btn btn-primary btn-lg">
              Signup
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

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
    <router-view />

    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <h4>Versa</h4>
            <p>
              If you use this site regularly and would like to help keep the site on the Internet, please consider
              donating a small sum to help pay for the hosting and bandwidth bill.
            </p>
            <a href="#" class="btn btn-underline">Hire Us</a>
          </div>
          <!--/.column-->
          <div class="col-md-6 col-lg-3">
            <h4>Quick Links</h4>
            <ul class="list-unstyled">
              <li><a href="#" class="btn btn-underline">Changelog</a></li>
              <li><a href="#" class="btn btn-underline">Updates</a></li>
              <li><a href="#" class="btn btn-underline">News</a></li>
              <li><a href="#" class="btn btn-underline">Contact us</a></li>
              <li><a href="#" class="btn btn-underline">Bootstrap4 Beta</a></li>
            </ul>
          </div>
          <!--/.column-->
          <div class="col-md-6 col-lg-3">
            <h4>About us</h4>
            <ul class="list-unstyled">
              <li><a href="#" class="btn btn-underline">Features</a></li>
              <li><a href="#" class="btn btn-underline">Documentation</a></li>
              <li><a href="#" class="btn btn-underline">Blog</a></li>
              <li><a href="#" class="btn btn-underline">Terms & conditions</a></li>
              <li><a href="#" class="btn btn-underline">Privacy & policy</a></li>
            </ul>
          </div>
          <!--/.column-->
          <div class="col-md-6 col-lg-3">
            <h4>Newsletter</h4>
            <div class="mb30">
              <form>
                <div class="form-group">
                  <label for="subscribe">Subscribe today and get Latest Updates</label>
                  <input type="email" class="form-control" placeholder="Mail id" id="subscribe" />
                  <button type="submit" class="btn-newsletter"><i class="fa fa-paper-plane-o"></i></button>
                </div>
              </form>
            </div>
            <ul class="social list-inline mb30">
              <li class="list-inline-item">
                <a class="facebook" href="#"><i class="fa fa-facebook-f"></i></a>
              </li>
              <li class="list-inline-item">
                <a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
              </li>
              <li class="list-inline-item">
                <a class="gplus" href="#"><i class="fa fa-google-plus"></i></a>
              </li>
            </ul>
            <span class="font400">&copy; Copyright 2020. Versa2.0</span>
          </div>
          <!--/.column-->
        </div>
        <!--/.row-->
      </div>
      <!--/.container-->
    </footer>
    <!--/.footer-->
  </div>
</template>

<style>
.navbar-collapse {
  padding-right: 0px;
}
</style>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    getUserInfo: function() {
      return {
        firstName: localStorage.getItem("first_name"),
        userId: localStorage.getItem("user_id")
      };
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
