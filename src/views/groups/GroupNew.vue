<template>
  <div class="groups-new">
    <div class="container1">
      <div class="container1 pb50 pt50-md">
        <div class="row">
          <div class="col-md-6 col-lg-5 mr-auto ml-auto">
            <div class="card card-account">
              <div class="card-body">
                <form v-on:submit.prevent="submit()">
                  <h4 align="center">Create A Group</h4>
                  <ul v-if="errors.length > 0">
                    <li class="text-danger" v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="form-group">
                    <label for="name">Group name:</label>
                    <input id="name" type="text" class="form-control" v-model="name" />
                  </div>
                  <div class="form-group">
                    <label for="last_name">Description:</label>
                    <input id="description" type="text" class="form-control" v-model="description" />
                  </div>
                  <div class="form-group">
                    <label for="zipcode">Zipcode:</label>
                    <input id="zipcode" type="number" class="form-control" v-model="zipcode" />
                  </div>
                  <div class="form-group">
                    <label for="image">Image:</label>
                    <input id="image" type="text" class="form-control" v-model="image" />
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

                    <input type="submit" class="btn btn-block btn-primary btn-rounded btn-xl" value="Create Group" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  <form v-on:submit.prevent="submit()">
        <h1>New Group!</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="name" />
        </div>

        <div class="form-group">
          <label>Description:</label>
          <input type="text" class="form-control" v-model="description" />
        </div>

        <div class="form-group">
          <label>Zipcode:</label>
          <input type="number" class="form-control" v-model="zipcode" />
        </div>

        <div class="form-group">
          <label>Image:</label>
          <input type="text" class="form-control" v-model="image" />
        </div>
        <div id="group-games" v-for="game in games">
          <input type="checkbox" :id="game.id" :value="game.id" v-model="checkedGames" />
          <label :for="game.id">{{ game.title }}</label>
        </div>
        {{ checkedGames }}

        <input type="submit" class="btn btn-primary" value="Submit" />
      </form> -->
  </div>
</template>
<style>
.container1 {
  width: 100%;
  padding-top: 50px;
  padding-right: 5px;
  padding-left: 5px;
  margin-right: auto;
  margin-left: auto;
}
.pb601 {
  padding-top: 0px !important;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      description: "",
      zipcode: "",
      image: "",
      errors: [],
      checkedGames: [],
      games: []
    };
  },
  created: function() {
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
        image: this.image,
        zipcode: this.zipcode,
        game_ids: this.checkedGames
      };
      axios
        .post("/api/groups", params)
        .then(response => {
          this.$router.push("/groups");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
