const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')
const path = require('path')
const axios = require('axios')
const PORT = 3333

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3223', 'http://localhost:3222'],
        methods: ['GET', 'POST'],
        credentials: true
    }
})

/*
* data-mock:
* user-01 - user-02 >-> room-12
* user-01 - user-03 >-> room-13
* user-01 - user-04 >-> room-14
* user-02 - user-03 >-> room-23
* user-02 - user-04 >-> room-24
* user-03 - user-04 >-> room-34
* */

const middlewareChat = (socket, next) => {
    const userid = socket.request.headers.userid
    if (userid === undefined || userid === null) {
        throw new Error('No user id')
    }
    console.log(`${timeNow()} --- Welcome to Socket.IO server chat: ${userid}`)
    socket[`userID`] = userid
    socket.join(userid)
    next()
}

/**
* CHAT NAMESPACE
* ===
* */

const chatNamespace = io.of('/chat')

chatNamespace.use(middlewareChat)

chatNamespace.on('connect', socket => {

    socket.on('send-message', msg => {
        console.log(`${timeNow()} --- EVENT: send-message --- ACTION: ON --- received message`)
        //Update message to database
        axios.post('http://localhost:3445/message', {
            roomID: msg.roomID,
            senderID: msg.senderID,
            message: msg.message,
            dateSend: new Date(msg.date)
        })
            .then(response => {
                console.log(`${timeNow()} --- EVENT: send-message --- ACTION: ON --- Update to database success`)
                if (response.data.status === 'OK') {
                    // Get all users from ROOM
                    axios.get(`http://localhost:3445/users/${msg.roomID}`)
                        .then(users => {
                            users.data.forEach(user => {
                                console.log(`${timeNow()} --- EVENT: receive-message --- ACTION: EMIT --- Update to database success`)
                                io.of('chat').to(user).emit('synchronization')
                                io.of('chat').to(user).emit('receive-message', response.data.message)
                            })
                        })
                } else {
                    socket.emit('error', { message: 'Error' })
                }
            })
            .catch(reason => {
                socket.emit('error', { message: 'Error' })
            })
    })

    socket.on('read-message', msg => {
        axios.put('http://localhost:3445/message', {
            readerID: msg.readerID,
            roomID : msg.roomID
        })
            .then(response => {
                if (response.data.status === 'OK') {
                    axios.get(`http://localhost:3445/users/${msg.roomID}`)
                        .then(users => {
                            users.data.forEach(user => {
                                io.of('chat').to(user).emit('synchronization')
                                io.of('chat').to(user).emit('fetch-message-of-a-room', { roomID : msg.roomID })
                            })
                        })
                } else {
                    socket.emit('error', { message: 'Error' })
                }
            })
            .catch(error => {
                socket.emit('error', { message: 'Error' })
            })
    })

    socket.on('disconnect', () => {
        console.log(`${timeNow()} --- Bye - Namespace Chat : ${socket[`userID`]}`)
    })
})

// io.on('connect', socket => {
//     socket.on('send-message', msg => {
//
//     })
//
//         socket.on('disconnect', () => {
//         console.log(`Bye: ${socket[`userID`]}`)
//     })
// })

/**
*  NOTIFY NAMESPACE
* =====
*
*
*
* */


const middlewareNotify = (socket, next) => {
    const userid = socket.request.headers.userid
    if (userid === undefined || userid === null) {
        throw new Error('No user id')
    }
    console.log(`${timeNow()} --- Welcome to Socket.IO server notify: ${userid}`)
    socket[`userID`] = userid
    socket.join(userid)
    next()
}


const notifyNamespace = io.of('/notify')

notifyNamespace.use(middlewareNotify)

notifyNamespace.on('connect', socket => {

    socket.on('disconnect', () => {
        console.log(`${timeNow()} --- Bye - Namespace - Notify: ${socket[`userID`]}`)
    })
})


/**
 *  CART NAMESPACE
 * =====
 *
 *
 *
 * */


const middlewareCart = (socket, next) => {
    const userid = socket.request.headers.userid
    if (userid === undefined || userid === null) {
        throw new Error('No user id')
    }
    console.log(`${timeNow()} --- Welcome to Socket.IO server Cart: ${userid}`)
    socket[`userID`] = userid
    socket.join(userid)
    next()
}

const cartNamespace = io.of('/cart')

cartNamespace.use(middlewareCart)

cartNamespace.on('connect', socket => {
    socket.on('synchronization-cart', data => {
        axios.put('http://localhost:3445/cart', data)
            .then(response => {
                if (response.data.status === 'OK') {
                    io.of('cart').to(data.userID).emit('synchronization-cart')
                }
            })
            .catch(response => {

            })
    })

    socket.on('disconnect', () => {
        console.log(`${timeNow()} --- Bye - Namespace - Cart: ${socket[`userID`]}`)
    })
})


httpServer.listen(PORT, () => {
    console.log(`${timeNow()} --- Server is running at port ${PORT}`)
})

const timeNow = () => {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}
