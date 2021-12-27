const express = require('express')
const { createServer } = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3445

/**
 * data-mock:
 * user-01 - user-02 >-> room-12
 * user-01 - user-03 >-> room-13
 * user-01 - user-04 >-> room-14
 * user-02 - user-03 >-> room-23
 * user-02 - user-04 >-> room-24
 * user-03 - user-04 >-> room-34
 * */

const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')

// Connection URL
const url = 'mongodb://localhost:27018'
const client = new MongoClient(url)

// Database Name
const dbName = 'room'


async function main() {
    // Use connect method to connect to the server
    await client.connect()
    console.log(`${timeNow()} --- Connected successfully to server`);
    const db = client.db(dbName)

    // the following code examples can be pasted here...

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

    //=========================================================================================
    /**
     * API FOR INIT
     * WARNING: RUN - ONLY ONCE - RUN ONLY FIRST TIME
     * ===
     * */
    //=========================================================================================

    /**
     * WARNING: RUN ONLY FIRST TIME
     * API - [GET]: /initStatusBox - INIT STATE OF THE BOX
     * =====================================================================================================================
     * */

    const initStatusBox = async (req, res) => {
        console.log(`${timeNow()} --- [POST] --- /initStatusBox`)
        try {
            // 'room13', 'room12', 'room14'
            const boxUserId1 = {
                userID: 'user-01',
                box: [
                    {
                        roomID: 'room13',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room12',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room14',
                        inComeMessage: 0,
                        status: 'OPEN'
                    }
                ]
            }
            await db.collection('box').insertOne(boxUserId1)

            // 'room12', 'room24', 'room23'
            const boxUserId2 = {
                userID: 'user-02',
                box: [
                    {
                        roomID: 'room12',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room24',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room23',
                        inComeMessage: 0,
                        status: 'OPEN'
                    }
                ]
            }
            await db.collection('box').insertOne(boxUserId2)

            // 'room13', 'room23', 'room34'
            const boxUserId3 = {
                userID: 'user-03',
                box: [
                    {
                        roomID: 'room13',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room23',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room34',
                        inComeMessage: 0,
                        status: 'OPEN'
                    }
                ]

            }
            await db.collection('box').insertOne(boxUserId3)

            // 'room24', 'room34', 'room14'
            const boxUserId4 = {
                userID: 'user-04',
                box: [
                    {
                        roomID: 'room24',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room34',
                        inComeMessage: 0,
                        status: 'OPEN'
                    },
                    {
                        roomID: 'room14',
                        inComeMessage: 0,
                        status: 'OPEN'
                    }
                ]
            }
            await db.collection('box').insertOne(boxUserId4)


            // insert room
            await db.collection('room-details').insertMany([
                {
                    roomID: 'room12',
                    users: ['user-01', 'user-02']
                },
                {
                    roomID: 'room13',
                    users: ['user-01', 'user-03']
                },
                {
                    roomID: 'room14',
                    users: ['user-01', 'user-04']
                },
                {
                    roomID: 'room23',
                    users: ['user-02', 'user-03']
                },
                {
                    roomID: 'room24',
                    users: ['user-02', 'user-04']
                },
                {
                    roomID: 'room34',
                    users: ['user-03', 'user-04']
                },
            ])
            res.send({message: 'OK'})
        } catch (error) {
            res.send({message: 'ERROR'})
        }
    }

    app.post('/initStatusBox', initStatusBox)

    /**
     * WARNING: RUN ONLY FIRST TIME
     * API - [GET]: /initCart - INIT STATE OF THE BOX
     * =====================================================================================================================
     * */

    const initStatusCart = async (req, res) => {
        console.log(`${timeNow()} --- [POST] --- /initStatusCart`)
        await db.collection('cart').insertMany([
            {
                userID: 'user-01',
                cart: []
            },
            {
                userID: 'user-02',
                cart: []
            },
            {
                userID: 'user-03',
                cart: []
            },
            {
                userID: 'user-04',
                cart: []
            },
        ])
        res.send({message: 'OK'})
    }
    app.post('/initStatusCart', initStatusCart)

    //=========================================================================================
    /**
    * API FOR USING
     * ===
    * */
    //=========================================================================================

    const insertMessage = async (req, res) => {
        try {
            const payload = req.body
            const msg = {
                senderID: payload.senderID,
                message: payload.message,
                dateSend: new Date(payload.date),
                dateRead: null,
                status: 'RECEIVED'
            }
            await db.collection(payload.roomID).insertOne(msg)

            const room = await db.collection('room-details').findOne({ roomID: payload.roomID })
            const users = room.users
            const senderBox = users.filter(user => user === payload.senderID)
            const receiversBox = users.filter(user => user !== payload.senderID)

            const syncBox = async (type, users) => {
                const boxes = []
                for (let i = 0; i < users.length; i++) {
                    const box = await db.collection('box').findOne({ userID: users[i] })
                    boxes.push(box)
                }

                for (let i = 0; i < boxes.length; i++) {
                    const element = boxes[i]
                    const box = element.box
                    const roomExceptID = box.filter(room => room.roomID !== payload.roomID)
                    const room = box.filter(room => room.roomID === payload.roomID)
                    roomExceptID.unshift(room[0])
                    if (type === 'R') {
                        roomExceptID[0].inComeMessage++
                    }
                    await db.collection('box').updateOne({ userID: users[i] }, {
                        $set : {
                            box: roomExceptID
                        }
                    })
                }

            }

            await syncBox('S', senderBox)
            await syncBox('R', receiversBox)
            //
            // const boxSender = await db.collection'box .indOne({ userID: payload.senderID})
            // const arr1 = boxSender.box.filter(room => room.roomID === payload.roomID)
            // const arr2 = boxSender.box.filter(room => room.roomID !== payload.roomID)
            // arr2.unshift(arr1[0])
            // await db.collection'box .pdateOne({userID: payload.senderID},{
            //     $set: {box: arr2}
            // })
            //
            // const boxReceiver = await db.collection'box .indOne({ userID: payload.receivedID})
            // const arr3 = boxReceiver.box.filter(room => room.roomID === payload.roomID)
            // const arr4 = boxReceiver.box.filter(room => room.roomID !== payload.roomID)
            // arr3[0].inComeMessage++
            // arr4.unshift(arr3[0])
            // await db.collection'box .pdateOne({userID: payload.receivedID},{
            //     $set: {box: arr4}
            // })

            res.send({
                message: {...msg, roomID: payload.roomID},
                status: 'OK'
            })
        } catch (error) {
            res.send({status: 'ERROR'})
        }
    }
    app.post('/message', insertMessage)

    /**
     * Get a message box status of userid, after client event received-message,
     * API [GET]: /box-status/:userid - FETCH THIS API TO SYNCHRONIZATION THE BOX CHAT
     * =====================================================================================================================
     * */

    const getStatusBox =  async (req, res) => {
        console.log(`${timeNow()} --- [GET] --- /box-status/:userid - ${req.params.userid}`)
        const box = await db.collection('box').findOne({ userID:  req.params.userid }) || []
        res.send(box)
    }

    app.get('/box-status/:userid', getStatusBox)

    /**
     * API [GET]: /message/:roomID - GET MESSAGE FROM A ROOM
     *=======================================================================================================================
     * */

    const getMessage = async (req, res) => {
        console.log(`${timeNow()} --- [GET] --- /message/:roomID - ${req.params.roomID}`)

        const message = await db.collection(req.params.roomID).find().toArray()

        res.send(message)
    }

    app.get('/message/:roomID', getMessage)

    /**
     * API [PUT]: /message/:roomID - READ MESSAGE FROM A ROOM
     *=======================================================================================================================
     * */
    const readMessage = async (req, res) => {
        /*
        * {
        *   senderID: senderID,
        *   roomID : roomID
        * }
        * */

        try {
            const payload = req.body

            const boxSender = await db.collection('box').findOne({ userID: payload.readerID })
            const boxes = boxSender.box
            boxes.forEach(box => {
                if (box.roomID === payload.roomID) {
                    box.inComeMessage = 0
                }
            })
            await db.collection('box').updateOne({userID: payload.readerID },{
                $set: {box: boxes}
            })

            await db.collection(payload.roomID).updateMany({status: 'RECEIVED'}, {$set: {status: 'SEEN', dateRead: new Date()}})

            res.send({ status: 'OK'})
        } catch (error) {
            res.send({ status: 'ERROR'})
        }
    }

    app.put('/message', readMessage)

    /**
     * API [GET]: /user/:roomID - READ MESSAGE FROM A ROOM
     *=======================================================================================================================
     * */
    const getUserOfRoomID = async (req, res) => {
        const users = await db.collection('room-details').findOne({roomID: req.params.roomID})
        res.send(users.users)
    }

    app.get('/users/:roomID', getUserOfRoomID)

    /**
     * API [GET]: /cart/:userid - GET USER CART
     *=======================================================================================================================
     * */
    const getUserCart = async (req, res) => {
        const cart = await db.collection('cart').findOne({userID: req.params.userid})
        res.send(cart)
    }
    app.get('/cart/:userid', getUserCart)

    /**
     * API [PUT]: /cart/ - UPDATE THE CART
     *=======================================================================================================================
     * */

    const updateUserCart = async (req, res) => {
        const request = req.body
        const cartUser = await db.collection('cart').findOne({ userID: request.userID})
        const cart = cartUser.cart


        const process = (type, number, cart) => {
            if (type === 'INCREMENT') {
                cart.count = cart.count + number
            }
        }

        let isExist = false
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productID === request.productID) {
                process(request.type, request.number, cart[i])
                isExist = true
                break
            }
        }

        if (!isExist) {
            cart.push({
                productID: request.productID,
                count: 1
            })
        }

        await db.collection('cart').updateOne({userID: request.userID }, {
            $set : { cart : cart }
        })

        res.send({status : 'OK'})
    }
    app.put('/cart', updateUserCart)

    httpServer.listen(PORT, () => {
        console.log(`${timeNow()} --- Server is running at port ${PORT}`)
    })
    return 'done.'
}

main()
    .then(console.log)
    .catch(console.error)


const timeNow = () => {
    const now = new Date()
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}
