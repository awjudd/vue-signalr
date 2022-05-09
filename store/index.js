export const state = () => ({
  messages: []
})

export const mutations = {
  addMessage (state, message) {
    state.messages.push(message)
  }
}

export const actions = {
  receiveMessages (context, value) {
    this.$hub.on('ReceiveMessage', (user, message) => {
      context.commit('addMessage', `${user}: ${message}`)
    })
  },

  async sendMessage (_, message) {
    await this.$hub.send('SendMessage', 'vue-client', message)
  }
}
