<template>
  <div class="conversations">
    <h2>New Message</h2>
    <form v-on:submit.prevent="createMessage()">
      <div>
        <input type="text" v-model="newMessageBody" />
        <input type="submit" value="Create Message" />
      </div>
    </form>
    <div>
      <h2>Messages</h2>
      <div v-for="message in messages">
        <p>{{ message.name }} : {{ message.created_at }}</p>
        <p>{{ message.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      messages: [],
      NewMessageBody: "",
      user: {}
    };
  },
  created: function() {
    axios.get("/api/messages").then(response => {
      this.messages = response.data;
    });
    // var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    // cable.subscriptions.create("MessagesChannel", {
    //   connected: () => {
    //     // Called when the subscription is ready for use on the server
    //     console.log("Connected to MessagesChannel");
    //   },
    //   disconnected: () => {
    //     // Called when the subscription has been terminated by the server
    //   },
    //   received: data => {
    //     // Called when there's incoming data on the websocket for this channel
    //     console.log("Data from MessagesChannel:", data);
    //     this.messages.push(data); // update the messages in real time
    //   }}

    // );
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
