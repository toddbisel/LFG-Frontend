<template>
  <div class="conversations-show">
    <div class="container pt90 pb60">
      <div class="leave-comment">
        <h4 class="mb30 font600 h5">New Message</h4>
        <form class="comment-form" v-on:submit.prevent="createMessage()">
          <div class="form-group">
            <textarea v-model="newMessageBody" placeholder="write message" rows="5" class="form-control"></textarea>
          </div>
          <div class=" text-right">
            <input type="submit" value="Send" class="btn btn-dark btn-xl" />
          </div>
        </form>
      </div>
      <div class="comments">
        <h4 class="font600 h5 mb40">Messages</h4>
        <div class="media" v-for="message in conversation.messages">
          <div class="float-left mr-3">
            <img class=" rounded-circle" :src="message.image" width="70" alt="..." />
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{ message.first_name }}</h4>
            <span>sent {{ relativeDate(message.created_at) }}</span>
            <p>
              {{ message.body }}
            </p>
            <div class="space-40"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActionCable from "actioncable";
import moment from "moment";

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
        this.conversation.messages.unshift(data); // update the messages in real time
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
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>
