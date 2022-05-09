<template>
  <div>
    <ul>
      <li v-for="(item, index) in messages" :key="`message-${index}`">
        {{ item }}
      </li>
    </ul>

    <input
      class="border-solid border-2 border-indigo-600"
      type="text"
      v-model="message"
      @keyup.enter.prevent="addMessage"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.receiveMessages();
  },

  data: () => ({
    message: "",
  }),

  methods: {
    ...mapActions({
      receiveMessages: "receiveMessages",
      sendMessage: "sendMessage",
    }),

    addMessage(message) {
      this.sendMessage(this.message);
      this.message = "";
    },
  },

  computed: {
    ...mapState({
      messages: "messages",
    }),
  },
};
</script>
