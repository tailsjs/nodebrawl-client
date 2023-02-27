require("./Utils/Debugger")
const net = require('net')
const MessageFactory = require('./Protocol/MessageFactory')
const client = new net.Socket()
const Messages = new MessageFactory()
const ClientHelloMessage = require("./Protocol/Messages/Client/ClientHelloMessage")

const PORT = 9339
const IP = "0.0.0.0"

let packets = []

client.connect(PORT, IP, function() {
	Log(`Connected to ${IP}:${PORT}`)
  packets = Messages.getPackets()

  new ClientHelloMessage(client).send()
});

client.on('data', async function(packet) {
  const message = {
    id: packet.readUInt16BE(0),
    len: packet.readUIntBE(2, 3),
    version: packet.readUInt16BE(5),
    payload: packet.slice(7, this.len)
  }

  if (packets.indexOf(String(message.id)) !== -1) {
    try {
      const packet = new (Messages.handle(message.id))(message.payload, client)

      Log(`Gotcha ${message.id} (${packet.constructor.name}) packet! `)

      await packet.decode()
      await packet.process()
    } catch (e) {
      console.log(e)
    }
  } else {
    Warn(`Gotcha undefined ${message.id} packet!`)
  }
});

client.on('close', function() {
	Fatal("Disconnected!")
});

client.on('error', function(err){
  Warn("A wild error!")
  Fatal(err.stack)
})

process.on("uncaughtException", e => Err(e.stack));

process.on("unhandledRejection", e => Err(e.stack));
