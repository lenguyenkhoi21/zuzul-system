import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const TITLE_ACTION = {
	CHANGE_TITLE: 'CHANGE_TITLE'
}

export const TitleContext = createContext()

const TitleInitState = {
	name: null
}

const Reducer = (state, action) => {
	switch (action.type) {
		case TITLE_ACTION.CHANGE_TITLE:
			return { name: action.content }

		default:
			return state
	}
}

const TitleReducer = props => {
	console.log(`${timeNow()} --- [TitleReducer]`)

	//Title Context
	const [store, dispatch] = useReducer(Reducer, TitleInitState)
	const titleProps = {
		state: store,
		changeTitle: (type, content) => dispatch({ type, content })
	}

	return (
		<TitleContext.Provider value={titleProps}>
			{props.children}
		</TitleContext.Provider>
	)
}

export default TitleReducer
