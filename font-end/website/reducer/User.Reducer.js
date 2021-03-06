import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const USER_ACTION = {
	ADD_USER: 'ADD_USER',
	REMOVE_USER: 'REMOVE_USER',
	ADD_USER_COOKIE: 'ADD_USER_COOKIE'
}

export const UserContext = createContext()

const UserInitState = {
	userID: null,
	name: null,
	access_token: null,
	isActiveShop: false,
	sendRequest: false,
	modifiedProfile: false,
	role: null
}

const Reducer = (state, action) => {
	switch (action.type) {
		case USER_ACTION.REMOVE_USER:
			localStorage.removeItem('data')
			return { ...UserInitState }

		case USER_ACTION.ADD_USER:
			console.log(`${timeNow()} --- [add-user]`)
			localStorage.setItem('data', JSON.stringify(action.user))
			return { ...action.user }

		case USER_ACTION.ADD_USER_COOKIE:
			return { ...action.user }

		default:
			return state
	}
}

const UserReducer = props => {
	console.log(`${timeNow()} --- [UserReducer]`)
	const [store, dispatch] = useReducer(Reducer, UserInitState)
	const userProps = {
		state: store,
		addUser: (type, user) => dispatch({ type, user }),
		removeUser: type => dispatch({ type })
	}

	return (
		<UserContext.Provider value={userProps}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserReducer
