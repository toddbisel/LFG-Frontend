<template>
  <div class="conversations-index">
    <h2>Your Messages</h2>

    <div>
      <h2>Messages</h2>
      <div v-for="conversation in conversations">
        <router-link v-bind:to="'/conversations/' + conversation.id">
          <img :src="conversation.user.image" alt="User Image" Height="100" />
          <br />
          {{ conversation.user.first_name }}
          <br />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";

export default {
  data: function() {
    return {
      conversations: [],
      user: {}
    };
  },
  created: function() {
    axios.get("/api/conversations").then(response => {
      this.conversations = response.data;
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
    }
  }
};
</script>
