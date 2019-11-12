<template>
  <div class="groups-new">
    <div class="container">
      <form v-on:submit.prevent="submit()">
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
      </form>
    </div>
  </div>
</template>

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
