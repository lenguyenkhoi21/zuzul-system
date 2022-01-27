import { createContext, useReducer } from 'react'

export const USER_ACTION = {
	LOGIN: 'LOGIN',
	ADD_USER_COOKIE: 'ADD_USER_COOKIE',
	LOGOUT: 'LOGOUT'
}

export const UserContext = createContext()

const UserInitialState = {
	userID: null,
	accessToken: null
}

const Reducer = (state, action) => {
	switch (action.type) {
		case USER_ACTION.LOGIN:
			localStorage.setItem('data', JSON.stringify(action.user))
			return { ...action.user }
		case USER_ACTION.ADD_USER_COOKIE:
			return { ...action.user }
		case USER_ACTION.LOGOUT:
			localStorage.removeItem('data')
			return { ...UserInitialState }
		default:
			return state
	}
}

const UserReducer = props => {
	const [store, dispatch] = useReducer(Reducer, UserInitialState)
	const UserProps = {
		state: store,
		addUser: (type, user) => dispatch({ type: type, user: user }),
		login: (type, user) => dispatch({ type: type, user: user }),
		logout: type => dispatch({ type: type })
	}
	return (
		<UserContext.Provider value={UserProps}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserReducer
