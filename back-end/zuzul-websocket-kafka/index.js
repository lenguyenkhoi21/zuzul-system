const { Kafka } = require('kafkajs')
const path = require('path')
const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')

const app = express()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const main = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'Kafka_Example', fromBeginning: true })

    const app = express()
    app.use(express.static(path.join(__dirname, 'public')))
    const httpServer = createServer(app)
    const io = new Server(httpServer)
    
    io.on('connect', socket => {})

    httpServer.listen(3000, () => { console.log(`Server is listening at port: 3000`) })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            io.emit('kafka', message.value.toString())
        }
    })
}

main().then(stuff => {})
