<template>
  <div>
    <ul>
      <li v-for="(item, index) in messages" :key="`message-${index}`">
        {{ item }}
      </li>
    </ul>

    <input
      v-model="message"
      class="border-solid border-2 border-indigo-600"
      type="text"
      @keyup.enter.prevent="addMessage"
    >
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    message: '',
  }),

  computed: {
    ...mapState({
      messages: 'messages',
    }),
  },

  created () {
    this.receiveMessages()
  },

  methods: {
    ...mapActions({
      receiveMessages: 'receiveMessages',
      sendMessage: 'sendMessage',
    }),

    addMessage (message) {
      this.sendMessage(this.message)
      this.message = ''
    },
  },

}
</script>
