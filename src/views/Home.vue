<template>
  <div class="home">
    <div>
      <div v-if="isLoggedIn()">
        <div class="container pt90 pb40">
          <h3 align="center">Let The Journey Begin</h3>
          <div class="row ">
            <div class="col-lg-4 mb50">
              <div class="card-image">
                <router-link to="/users">
                  <img src="images/adventurerfrontpage.png" alt="" class="img-fluid" />
                </router-link>
                <h5 align="center">I seek Adventurers</h5>
              </div>
            </div>

            <div class="col-lg-4 mb50">
              <div class="card-image">
                <router-link to="/groups">
                  <img src="images/partyfrontpsge.png" alt="" class="img-fluid" />
                </router-link>
                <h5 align="center">I seek a Party</h5>
              </div>
            </div>
            <div class="col-lg-4 mb50">
              <div class="card-image">
                <router-link to="/games">
                  <img src="images/gamesfrontpage.png" alt="" class="img-fluid" />
                </router-link>
                <h5 align="center">I seek a Game</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {};
  },
  created: function() {},
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
