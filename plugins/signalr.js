import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default ({ app, store }, inject) => {
  const hub = new HubConnectionBuilder()
    .withUrl('https://localhost:7167/chat-hub', {})
    .configureLogging(LogLevel.Information)
    .build()

  inject('hub', hub)

  hub.on('Connected', (message) => {
    console.info('Connected to SignalR Hub.', message)
  })

  hub.on('Disconnected', (message) => {
    console.warn('Disconnected from SignalR Hub.', message)
  })

  hub.start().catch(function (err) {
    return console.error(err)
  })

  // with reconnect capability (async/await, not IE11 compatible)
  async function start () {
    try {
      console.log('Attempting reconnect')
      await hub.start()
    } catch (err) {
      console.log(err)
      setTimeout(() => start(), 5000)
    }
  }

  hub.onclose(async () => {
    await start()
  })

  // sample sending of message
  /*
  hub
    .invoke('SendMessageToOthers', {
      action: action,
      data: Object.assign(
        { user: get(store, 'getters.loggedUser.name') },
        message
      )
    })
    .catch(err => console.error(err.toString()))
  */
}
