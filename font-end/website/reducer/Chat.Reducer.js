import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const CHAT_ACTION = {
	RECEIVED_MESSAGE: 'RECEIVED_MESSAGE',
	LOGOUT: 'LOGOUT',
	FETCH_MESSAGE: 'FETCH-MESSAGE',
	FETCH_ONE_ROOM: 'FETCH_ONE_ROOM',
	SYNCHRONIZE_BOX: 'SYNCHRONIZE_BOX',
	CONNECT: 'CONNECT'
}

export const CHAT_CONSTANT = {
	STATUS_NOT_READY: 'NOT-READY',
	STATUS_READY: 'READY'
}

export const ChatContext = createContext()

/*
 *  message: { // is a hashmap
 *    id: room -> [{
 *        senderID: String,
 *        receivedID : String,
 *        message: String,
 *        dateSend: Date,
 *        dateRead: Date,
 *        status: ['RECEIVED', 'SEEN']
 *    }]
 *  }
 * box : [ // is the status of the message
 *      {
 *          roomID: String,
 *          inComeMessage: Number,
 *      }
 *  ],
 *  status: String // 'open', 'block'
 * ]
 * */

const ChatInitSate = {
	inComeMessage: 0,
	socket: null,
	message: null,
	box: null,
	status: CHAT_CONSTANT.STATUS_NOT_READY
}

const Reducer = (state, action) => {
	const caseFetchOneRoom = (state, roomID, data) => {
		const message = state.message
		message.set(roomID, data)
		return { ...state, message: message }
	}

	const caseReceivedMSG = (state, content) => {
		console.log(`${timeNow()} --- [case 'received-message'] --- `)
		const hashmap = state.message
		if (hashmap.get(content.roomID) !== undefined) {
			const msg = {
				senderID: content.senderID,
				message: content.message,
				dateSend: content.dateSend,
				dateRead: content.dateRead,
				status: content.status
			}
			hashmap.get(content.roomID).push(msg)
		}
		return { ...state, message: hashmap }
	}

	const caseLogout = (state, socket) => {
		if (socket !== null) {
			socket.disconnect()
		}
		return { ...ChatInitSate }
	}

	const caseFetchMessage = (state, box, message, inComeMessage) => {
		return {
			...state,
			inComeMessage: inComeMessage,
			message: message,
			box: box,
			status: CHAT_CONSTANT.STATUS_READY
		}
	}

	switch (action.type) {
		case CHAT_ACTION.FETCH_ONE_ROOM:
			return caseFetchOneRoom(state, action.roomID, action.data)

		case CHAT_ACTION.SYNCHRONIZE_BOX:
			return {
				...state,
				box: action.box,
				inComeMessage: action.inComeMessage
			}

		case CHAT_ACTION.RECEIVED_MESSAGE:
			return caseReceivedMSG(state, action.content)

		case CHAT_ACTION.LOGOUT:
			return caseLogout(state, action.socket)

		case CHAT_ACTION.FETCH_MESSAGE:
			return caseFetchMessage(
				state,
				action.box,
				action.message,
				action.inComeMessage
			)

		case CHAT_ACTION.CONNECT:
			return { ...state, socket: action.socket }

		default:
			return state
	}
}

const ChatReducer = props => {
	console.log(`${timeNow()} --- [ChatReducer]`)

	const [store, dispatch] = useReducer(Reducer, ChatInitSate)
	const chatProps = {
		state: store,
		connect: (type, socket) => dispatch({ type, socket }),
		receivedMSG: (type, content) => dispatch({ type, content }),
		fetchMSG: (type, box, message, inComeMessage) =>
			dispatch({ type, box, message, inComeMessage }),
		logout: (type, socket) => dispatch({ type, socket }),
		synchronizeBOX: (type, box, inComeMessage) =>
			dispatch({ type, box, inComeMessage }),
		fetchOneRoom: (type, roomID, data) => dispatch({ type, roomID, data })
	}

	return (
		<ChatContext.Provider value={chatProps}>
			{props.children}
		</ChatContext.Provider>
	)
}

export default ChatReducer
