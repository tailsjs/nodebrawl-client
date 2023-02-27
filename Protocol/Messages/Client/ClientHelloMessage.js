const PiranhaMessage = require('../../PiranhaMessage')

class ClientHelloMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.client = client
    this.id = 10100
    this.version = 0
  }

  async encode () {
    this.writeInt(24)
    for(let i = 0; i < 24; i++){
      this.writeByte(i)
    }
  }
}

module.exports = ClientHelloMessage
