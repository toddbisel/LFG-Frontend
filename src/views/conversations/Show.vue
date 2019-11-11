<template>
  <div class="conversations-show">
    <h2>New Message</h2>
    <form v-on:submit.prevent="createMessage()">
      <div>
        <input type="text" v-model="newMessageBody" />
        <input type="submit" value="Create Message" />
      </div>
    </form>
    <div>
      <h2>Messages</h2>
      <div v-for="message in conversation.messages">
        <p>{{ message.first_name }} : {{ message.created_at }}</p>
        <p>{{ message.body }}</p>
      </div>
    </div>

    <router-link to="/conversations">return to all messages</router-link>
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";

export default {
  data: function() {
    return {
      newMessageBody: "",
      conversation: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/conversations/" + this.$route.params.id).then(response => {
      this.conversation = response.data;
      console.log(response.data);
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
        this.conversation.messages.push(data); // update the messages in real time
      }
    });
  },
  methods: {
    createMessage: function() {
      var params = {
        body: this.newMessageBody,
        conversation_id: this.conversation.id
      };
      axios.post("/api/messages", params).then(response => {
        this.newMessageBody = "";
        // this.conversation.messages.push(response.data);
      });
    }
  }
};
</script>
