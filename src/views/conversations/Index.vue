<template>
  <div class="conversations-index">
    <div v-if="conversations.length > 0" class="container pb60">
      <hr class="pt60" />
      <div class="center-title text-center mb50">
        <h4>My Messages</h4>

        <div id="name-search" class="form-group searchBar1">
          <input type="text" placeholder="Search Conversations" class="form-control" v-model="nameFilter" />
        </div>
        <div>
          <button v-on:click="setSortAttribute('user.first_name')" class="btn btn-outline-primary mb5">
            Sort by Name
            <span v-if="sortAttribute === 'user.first_name' && sortAscending === 1">
              Ascending
              <i class="fa fa-arrow-up mr-1"></i>
            </span>
            <span v-if="sortAttribute === 'user.first_name' && sortAscending === -1">
              Descending
              <i class="fa fa-arrow-down mr-1"></i>
            </span>
          </button>
          <br />
          <!--    <button v-on:click="setSortAttribute('membercount')" class="btn btn-outline-primary mb5">
            Sort by Player Count
            <span v-if="sortAttribute === 'membercount' && sortAscending === 1">
              Ascending
              <i class="fa fa-arrow-up mr-1"></i>
            </span>
            <span v-if="sortAttribute === 'membercount' && sortAscending === -1">
              Descending
              <i class="fa fa-arrow-down mr-1"></i>
            </span>
          </button> -->
          <br />
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-6 col-lg-3 mb50 text-center"
          v-for="conversation in orderBy(filterBy(conversations, nameFilter), sortAttribute, sortAscending)"
          v-on:click="currentConversation = conversation"
          v-bind:class="{ selected: conversation === currentConversation }"
          v-bind:key="conversation.id"
        >
          <router-link v-bind:to="`/conversations/${conversation.id}`">
            <img :src="conversation.user.image" alt="" class="img-fluid img-thumbnail mb20" width="150" />
            <h4>{{ conversation.user.first_name }}</h4>
            <span class="font600 text-muted">{{ conversation.length }} Messages</span>
          </router-link>
        </div>
        <!--/col-->
      </div>
    </div>

    <!-- <div>
      <h2>Messages</h2>
      <div v-for="conversation in conversations">
        <router-link v-bind:to="'/conversations/' + conversation.id">
          <img :src="conversation.user.image" alt="User Image" Height="100" />
          <br />
          {{ conversation.user.first_name }}
          <br />
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<style>
.searchBar1 {
  padding-right: 200px;
  padding-left: 200px;
  align-self: center;
}
</style>

<script>
import axios from "axios";
import ActionCable from "actioncable";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      nameFilter: "",
      sortAttribute: "first_name",
      sortAscending: 1,
      currentConversation: {},
      conversations: [],
      user: {}
    };
  },
  created: function() {
    axios.get("/api/conversations").then(response => {
      this.conversations = response.data;
      console.log(this.conversations);
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: data => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.messages.push(data); // update the messages in real time
      }
    });
  },
  methods: {
    createMessage: function() {
      var params = {
        body: this.newMessageBody
      };
      axios.post("/api/messages", params).then(response => {
        this.newMessageBody = "";
      });
    },
    setSortAttribute: function(attribute) {
      // if im clicking on a button a second time
      if (this.sortAttribute === attribute) {
        // reverse the sort ascending
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
        this.sortAttribute = attribute;
      }
    }
  }
};
</script>
