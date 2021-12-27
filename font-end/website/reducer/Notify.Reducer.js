import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const NOTIFY_ACTION = {
	CONNECT: 'CONNECT',
	LOGOUT: 'LOGOUT'
}

export const NotifyContext = createContext()

const NotifyInitSate = {
	socket: null,
	box: null
}

const Reducer = (state, action) => {
	const caseLogout = (state, socket) => {
		if (socket !== null) {
			socket.disconnect()
		}
		return { ...NotifyInitSate }
	}

	switch (action.type) {
		case NOTIFY_ACTION.CONNECT:
			return { ...state, socket: action.socket }

		case NOTIFY_ACTION.LOGOUT:
			return caseLogout(state, action.socket)

		default:
			return state
	}
}

const NotifyReducer = props => {
	console.log(`${timeNow()} --- [NotifyReducer]`)
	const [store, dispatch] = useReducer(Reducer, NotifyInitSate)
	const NotifyProps = {
		state: store,
		connect: (type, socket) => dispatch({ type, socket }),
		logout: (type, socket) => dispatch({ type, socket })
	}

	return (
		<NotifyContext.Provider value={NotifyProps}>
			{props.children}
		</NotifyContext.Provider>
	)
}

export default NotifyReducer
