<template>
  <div class="group-edit">
    <div class="container1 pb50 pt50-md">
      <div class="row">
        <div class="col-md-6 col-lg-5 mr-auto ml-auto">
          <div class="card card-account">
            <div class="card-body">
              <form v-on:submit.prevent="submit()">
                <h4 align="center">Update your Groupt</h4>
                <ul v-if="errors.length > 0">
                  <li class="text-danger" v-for="error in errors">{{ error }}</li>
                </ul>
                <div class="form-group">
                  <label for="name">Group name:</label>
                  <input id="name" type="text" class="form-control" v-model="name" :placeholder="`${group.name}`" />
                </div>
                <div class="form-group">
                  <label for="last_name">Description:</label>
                  <input
                    id="description"
                    type="text"
                    class="form-control"
                    v-model="description"
                    :placeholder="`${group.description}`"
                  />
                </div>
                <div class="form-group">
                  <label for="zipcode">Zipcode:</label>
                  <input
                    id="zipcode"
                    type="number"
                    class="form-control"
                    v-model="zipcode"
                    :placeholder="`${group.zipcode}`"
                  />
                </div>
                <div class="form-group">
                  <label for="image">Image:</label>
                  <input id="image" type="text" class="form-control" v-model="image" :placeholder="`${group.image}`" />
                </div>
                <div class="container pb601">
                  <hr class="pt60" />
                  <div class="center-title text-center mb60"><h4>Pick your Games</h4></div>
                  <div class="row">
                    <div v-for="game in games" class="col-md-5 col-lg-4 mb60 text-center">
                      <div>{{ game.title }}</div>
                      <img :src="game.image" alt="" class="img-fluid img-thumbnail mb20" width="400" />
                      <input type="checkbox" :id="game.id" :value="game.id" v-model="checkedGames" />
                    </div>
                  </div>
                  <input type="submit" class="btn btn-block btn-primary btn-rounded btn-xl" value="Update Group" />
                  <input
                    v-on:click="destroyUser(group)"
                    class="btn btn-block btn-danger btn-rounded btn-xl"
                    value="Delete Group"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button v-on:click="destroyUser(group)">Delete Group</button>
    </div>
  </div>
</template>

<style>
.pt90 {
  padding-top: 90px;
}

.pb50 {
  padding-bottom: 50px;
}
@media (min-width: 1200px) .container {
  max-width: 1140px;
}
@media (min-width: 992px) .container {
  max-width: 960px;
}
@media (min-width: 768px) .container {
  max-width: 720px;
}
@media (min-width: 576px) .container {
  max-width: 540px;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

*,
::after,
::before {
  box-sizing: border-box;
}

user agent stylesheet div {
  display: block;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
      group: {},
      checkedGames: [],
      games: []
    };
  },
  created: function() {
    axios.get("/api/groups/" + this.$route.params.id).then(response => {
      this.group = response.data;
      console.log(this.group);
      this.checkedGames = this.group.games.map(game => game.id);
    });
    axios.get("/api/games/").then(response => {
      this.games = response.data;
      console.log(this.games);
    });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        description: this.description,
        zipcode: this.zipcode,
        image: this.image,
        game_ids: this.checkedGames
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
