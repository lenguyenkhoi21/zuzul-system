import { createContext, useReducer } from 'react'

export const HEADER_ACTION = {
	SET_TITLE: 'SET_TITLE'
}

export const HeaderContext = createContext()

const HeaderInitialState = {
	path: null
}

const Reducer = (state, action) => {
	switch (action.type) {
		case HEADER_ACTION.SET_TITLE:
			return { path: action.path }
		default:
			return state
	}
}

const HeaderReducer = props => {
	const [store, dispatch] = useReducer(Reducer, HeaderInitialState)
	const HeaderProps = {
		state: store,
		changeTitle: (type, path) => dispatch({ type, path })
	}

	return (
		<HeaderContext.Provider value={HeaderProps}>
			{props.children}
		</HeaderContext.Provider>
	)
}

export default HeaderReducer
