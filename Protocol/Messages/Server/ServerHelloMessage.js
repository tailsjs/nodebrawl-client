const PiranhaMessage = require('../../PiranhaMessage')

class ServerHelloMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.id = 20100
    this.client = client
    this.version = 0
  }

  async decode () {
    this.keyLength = this.readInt()
  }

  async process () {
    //new LoginMessage(this.client).send()
  }
}

module.exports = ServerHelloMessage
