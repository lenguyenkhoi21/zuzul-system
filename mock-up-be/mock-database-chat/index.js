const express = require('express')
const { createServer } = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3444
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
* Connect to MongoDB
* */

mongoose.connect('mongodb://localhost:27018/room')
    .then(data => console.log(`Connect database successful!`))
    .catch(err => console.log(`Cannot connect database!`))

/**
* data-mock:
* user-01 - user-02 >-> room-12
* user-01 - user-03 >-> room-13
* user-01 - user-04 >-> room-14
* user-02 - user-03 >-> room-23
* user-02 - user-04 >-> room-24
* user-03 - user-04 >-> room-34
* */


/**
* Model mock data message
* */

const roomModel = new Schema({
    senderID: String,
    receivedID : String,
    message: String,
    date: Date
})

// const room12 = new mongoose.model('room', roomModel, 'room12')
// const room13 = new mongoose.model('room', roomModel, 'room13')
// const room14 = new mongoose.model('room', roomModel, 'room14')
// const room23 = new mongoose.model('room', roomModel, 'room23')
// const room24 = new mongoose.model('room', roomModel, 'room24')
// const room34 = new mongoose.model('room', roomModel, 'room34')

/**
* Model mock data box
 * =====================================================================================================================
*  */

const boxMessageModel = new Schema({
    userID: String,
    box : [
        {
            users: [
                {
                    userID: String,
                }
            ],
            roomID: String,
            inComeMessage: Number
        }
    ],
    status: String // 'open', 'block'
})

const boxMessage = new mongoose.model('box', boxMessageModel, 'box')

/**
 * INIT THE SERVER - CONFIG CORS
 * =====================================================================================================================
 * */

const app = express()
app.use('/', cors({
    origin: ['http://localhost:3222', 'http://localhost:3223'],
    optionsSuccessStatus: 200
}))
app.use(bodyParser.json())
const httpServer = createServer(app)

/**
* Get a message box status of userid, after client event received-message,
* API [GET]: /box-status/:userid - FETCH THIS API TO SYNCHRONIZATION THE BOX CHAT
 * =====================================================================================================================
* */

const getStatusBox =  async (req, res) => {
    const userid = req.params.userid
    const box = await boxMessage.findOne({userID :userid })
    res.send(box)
}

app.get('/box-status/:userid', getStatusBox)

/**
* API [POST]: /message - INSERT MESSAGE TO THE DATABASE
 * =====================================================================================================================
* */

const insertMessage = async (req, res) => {
    /*
    * payload:
    * {
    *   roomID: String
    *   senderID: String
    *   receivedID: String
    *   message: String
    *   date: datetime
    *
    * }
    * */

    // add message to the database
    const payload = req.body
    const Room = new mongoose.model('room', roomModel, payload.roomID)
    const message = await new Room({
        senderID: payload.senderID,
        receivedID : payload.receivedID,
        message: payload.message,
        date: Date.parse(payload.date)
    })
    message.save()

    //const boxSender = await boxMessage.findOne({userID: payload.senderID })
    // Sync the sender
    const boxSender = await boxMessage.findOne({userID: payload.senderID})
    // const arr1 = boxSender.box.filter(room => room.roomID === payload.roomID)
    // const arr2 = boxSender.box.filter(room => room.roomID !== payload.roomID)
    // arr2.unshift(arr1[0])
    //
    // await boxMessage.findOneAndUpdate({ box: arr2 })
    //
    // // Sync the receiver
    // const boxReceiver = await boxMessage.findOne({userID: payload.senderID})
    // const arr3 = boxReceiver.box.filter(room => room.roomID === payload.roomID)
    // const arr4 = boxReceiver.box.filter(room => room.roomID !== payload.roomID)
    // arr3[0].inComeMessage++
    // arr4.unshift(arr3[0])

    // await boxMessage.findOneAndUpdate({ box: arr4 })

    res.send({message: 'OK'})
}

app.post('/message', insertMessage)


/**
* API [GET]: /message/:roomID - GET MESSAGE FROM A ROOM
*=======================================================================================================================
* */

const getMessage = async (req, res) => {
    const roomID = req.params.roomID
    const roomDummy = new mongoose.model('room', roomModel, roomID)
    const room = await roomDummy.find({})
    res.send(room)
}

app.get('/message/:roomID', getMessage)


/**
* THESE ARE FUNCTIONS THAT WE NEED TO RUN ONLY AT THE FIRST TIME
 * =====================================================================================================================
* */

/**
 * WARNING: RUN ONLY FIRST TIME
 * API - [GET]: /initStatusBox - INIT STATE OF THE BOX
 * =====================================================================================================================
 * */

const initStatusBox = async (req, res) => {
    // 'room13', 'room12', 'room14'
    const boxUserId1 = {
        userID: 'user-01',
        box: [
            {
                users: [
                    {
                        userID: 'user-03',
                    }
                ],
                roomID: 'room13',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-02',
                    }
                ],
                roomID: 'room12',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-04',
                    }
                ],
                roomID: 'room14',
                inComeMessage: 0
            }
        ],
        status: 'OPEN'
    }
    const box1 = await new boxMessage(boxUserId1)
    box1.save()

    // 'room12', 'room24', 'room23'
    const boxUserId2 = {
        userID: 'user-02',
        box: [
            {
                users: [
                    {
                        userID: 'user-01',
                    }
                ],
                roomID: 'room12',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-04',
                    }
                ],
                roomID: 'room24',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-03',
                    }
                ],
                roomID: 'room23',
                inComeMessage: 0
            }
        ],
        status: 'OPEN'
    }
    const box2 = await new boxMessage(boxUserId2)
    box2.save()

    // 'room13', 'room23', 'room34'
    const boxUserId3 = {
        userID: 'user-03',
        box: [
            {
                users: [
                    {
                        userID: 'user-01',
                    }
                ],
                roomID: 'room13',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-02',
                    }
                ],
                roomID: 'room23',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-04',
                    }
                ],
                roomID: 'room34',
                inComeMessage: 0
            }
        ],
        status: 'OPEN'
    }
    const box3 = await new boxMessage(boxUserId3)
    box3.save()

    // 'room24', 'room34', 'room14'
    const boxUserId4 = {
        userID: 'user-04',
        box: [
            {
                users: [
                    {
                        userID: 'user-02',
                    }
                ],
                roomID: 'room24',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-03',
                    }
                ],
                roomID: 'room34',
                inComeMessage: 0
            },
            {
                users: [
                    {
                        userID: 'user-01',
                    }
                ],
                roomID: 'room14',
                inComeMessage: 0
            }
        ],
        status: 'OPEN'
    }
    const box4 = await new boxMessage(boxUserId4)
    box4.save()

    res.send({message: 'OK'})
}

app.get('/initStatusBox', initStatusBox)


/**
 * WARNING: RUN-ONCE
 * API - [GET]: /dummy-message-room12 - DUMMY MESSAGE FOR A ROOM12
 * =====================================================================================================================
 * */

const dummyMessageRoom12 = async (req, res) => {
    const RoomDummy = new mongoose.model('room', roomModel, 'room12')
    const message1 = await new RoomDummy({
        senderID: 'user-01',
        receivedID : 'user-02',
        message: 'Hello, I\'m  user-01',
        date: new Date()
    })
    message1.save()
    const message2 = await new RoomDummy({
        senderID: 'user-02',
        receivedID : 'user-01',
        message: 'Hello, I\'m  user-02',
        date: new Date()
    })
    message2.save()
    res.send({message: 'OK'})
}

app.get('/dummy-message-room12', dummyMessageRoom12)

/**
* USE TO REFERENCE
 * API - [GET]: /dummytest - DON'T CALL THIS FUNCTION DON'T DELETE IT, TOO
 * =====================================================================================================================
* */

const test = async (req, res) => {
    const dummy12 = await new room12({
        senderID: 'user-01',
        receivedID : 'user-02',
        message: 'Hello, I\'m user-01',
        date: new Date()
    })
    dummy12.save()

    const dummy13 =await new room13({
        senderID: 'user-01',
        receivedID : 'user-03',
        message: 'Hello, I\'m user-01',
        date: new Date()
    })
    dummy13.save()

    const dummy14 = await new room14({
        senderID: 'user-01',
        receivedID : 'user-04',
        message: 'Hello, I\'m user-01',
        date: new Date()
    })
    dummy14.save()

    const dummy23 = await new room23({
        senderID: 'user-02',
        receivedID : 'user-03',
        message: 'Hello, I\'m user-02',
        date: new Date()
    })
    dummy23.save()

    const dummy24 = await new room24({
        senderID: 'user-02',
        receivedID : 'user-04',
        message: 'Hello, I\'m user-02',
        date: new Date()
    })
    dummy24.save()

    const dummy34 = await new room34({
        senderID: 'user-03',
        receivedID : 'user-04',
        message: 'Hello, I\'m user-03',
        date: new Date()
    })
    dummy34.save()

    res.send({message: 'OK'})
}

app.get('/dummytest', test)


httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
