import React, { useContext, useEffect } from 'react'
import { UserContext } from '../reducer/User.Reducer'
import { io } from 'socket.io-client'
import { fetchAPI, timeNow } from '../utils/Utils'
import { API_MOCK_DATABASE_CHAT, SOCKET_IO_MOCK } from '../utils/APIUtils'
import { CHAT_ACTION, ChatContext } from '../reducer/Chat.Reducer'
import { NOTIFY_ACTION, NotifyContext } from '../reducer/Notify.Reducer'
import { CART_ACTION, CartContext } from '../reducer/Cart.Reducer'

const ConnectSocket = props => {
	console.log(
		`${timeNow()} --- [ConnectSocket] --- Render at /component/ConnectSocket.js`
	)

	const userCTX = useContext(UserContext)
	const chatCTX = useContext(ChatContext)
	const notifyCTX = useContext(NotifyContext)
	const cartCTX = useContext(CartContext)

	// Connect to Socket.IO Namespace Chat
	useEffect(() => {
		console.log(
			`${timeNow()} --- [useEffect()-ConnectSocket-Chat] --- Render at /component/ConnectSocket`
		)
		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			chatCTX.state.socket === null
		) {
			const socket = io.connect(`${SOCKET_IO_MOCK}/chat`, {
				withCredentials: true,
				extraHeaders: {
					userid: userCTX.state.userID
				}
			})

			socket.on('connect', () => {
				console.log(
					`${timeNow()} --- [useEffect()-connect-to-io-CHAT] --- socket.id of ${
						socket.id
					} in ConnectSocket`
				)
				chatCTX.connect(CHAT_ACTION.CONNECT, socket)
			})

			socket.on('receive-message', content => {
				console.log(
					`${timeNow()} --- [Socket.io-receive-message] --- message`
				)
				console.log(content)
				chatCTX.receivedMSG(CHAT_ACTION.RECEIVED_MESSAGE, content)
			})

			socket.on('synchronization', () => {
				console.log(
					`${timeNow()} --- [Socket.io-receive-synchronization] --- message`
				)

				fetchAPI(
					`${API_MOCK_DATABASE_CHAT}/box-status/${userCTX.state.userID}`
				).then(response => {
					let inComeMessage = 0
					response.box.forEach(
						box => (inComeMessage += box.inComeMessage)
					)
					chatCTX.synchronizeBOX(
						CHAT_ACTION.SYNCHRONIZE_BOX,
						response.box,
						inComeMessage
					)
				})
			})

			socket.on('fetch-message-of-a-room', room => {
				console.log(
					`${timeNow()} --- [Socket.io-receive-fetch-message-of-a-room] --- message`
				)

				fetchAPI(
					`${API_MOCK_DATABASE_CHAT}/message/${room.roomID}`
				).then(data => {
					chatCTX.fetchOneRoom(
						CHAT_ACTION.FETCH_ONE_ROOM,
						room.roomID,
						data
					)
				})
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	// Connect to Socket.IO Namespace Notify
	useEffect(() => {
		console.log(
			`${timeNow()} --- [useEffect()-ConnectSocket-Notify] --- Render at /component/ConnectSocket`
		)

		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			notifyCTX.state.socket === null
		) {
			const socket = io.connect(`${SOCKET_IO_MOCK}/notify`, {
				withCredentials: true,
				extraHeaders: {
					userid: userCTX.state.userID
				}
			})

			socket.on('connect', () => {
				console.log(
					`${timeNow()} --- [useEffect()-connect-to-io-NOTIFY] --- socket.id of ${
						socket.id
					} in ConnectSocket`
				)
				notifyCTX.connect(NOTIFY_ACTION.CONNECT, socket)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	// Connect to Socket.IO Namespace Cart
	useEffect(() => {
		console.log(
			`${timeNow()} --- [useEffect()-ConnectSocket-Cart] --- Render at /component/ConnectSocket`
		)

		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			cartCTX.state.socket === null
		) {
			const socket = io.connect(`${SOCKET_IO_MOCK}/cart`, {
				withCredentials: true,
				extraHeaders: {
					userid: userCTX.state.userID
				}
			})

			socket.on('connect', () => {
				console.log(
					`${timeNow()} --- [useEffect()-connect-to-io-CART] --- socket.id of ${
						socket.id
					} in ConnectSocket`
				)
				cartCTX.connect(NOTIFY_ACTION.CONNECT, socket)
			})

			socket.on('synchronization-cart', () => {
				fetchAPI(
					`${API_MOCK_DATABASE_CHAT}/cart/${userCTX.state.userID}`
				).then(data => {
					let total = 0
					data.cart.forEach(product => {
						total += product.count
					})
					cartCTX.fetchCart(CART_ACTION.FETCH_CART, data.cart, total)
				})
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	//Fetch Message
	useEffect(() => {
		console.log(`${timeNow()} --- [useEffect()-Fetch-Message] --- `)
		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			chatCTX.state.message === null &&
			chatCTX.state.box === null
		) {
			const fetchRoomAndMessageData = async () => {
				const RoomList = await fetchAPI(
					`${API_MOCK_DATABASE_CHAT}/box-status/${userCTX.state.userID}`
				)

				if (RoomList !== undefined && RoomList.box !== undefined) {
					const box = RoomList.box
					// eslint-disable-next-line no-undef
					const message = new Map()
					let inComeMessage = 0
					for (let i = 0; i < RoomList.box.length; i++) {
						const MessageList = await fetchAPI(
							`${API_MOCK_DATABASE_CHAT}/message/${RoomList.box[i].roomID}`
						)
						message.set(RoomList.box[i].roomID, MessageList)
						inComeMessage =
							inComeMessage + RoomList.box[i].inComeMessage
					}

					chatCTX.fetchMSG(
						CHAT_ACTION.FETCH_MESSAGE,
						box,
						message,
						inComeMessage
					)
				}
			}

			fetchRoomAndMessageData()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	//Fetch Cart
	useEffect(() => {
		console.log(`${timeNow()} --- [useEffect()-Fetch-Cart] --- `)

		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			chatCTX.state.message === null &&
			cartCTX.state.cart === null
		) {
			fetchAPI(
				`${API_MOCK_DATABASE_CHAT}/cart/${userCTX.state.userID}`
			).then(data => {
				if (data !== undefined) {
					let total = 0
					data.cart.forEach(product => {
						total += product.count
					})
					cartCTX.fetchCart(CART_ACTION.FETCH_CART, data.cart, total)
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCTX.state.userID])

	return <>{props.children}</>
}

export default React.memo(ConnectSocket)
