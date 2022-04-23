import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const SEARCH_ACTION = {
	SET_SEARCH_PAGE: 'SET_SEARCH_PAGE',
	SET_TEXT: 'SET_TEXT',
	RESET_TEXT: 'RESET_TEXT',
	RESET: 'RESET'
}

export const SearchContext = createContext()

const SearchInitState = {
	text: null,
	isSearchPage: false
}

const Reducer = (state, action) => {
	switch (action.type) {
		case SEARCH_ACTION.SET_TEXT:
			return { ...state, text: action.text }
		case SEARCH_ACTION.SET_SEARCH_PAGE:
			return { ...state, isSearchPage: action.isSearchPage }
		case SEARCH_ACTION.RESET:
			return { ...SearchInitState }
		case SEARCH_ACTION.RESET_TEXT:
			return { ...state, text: null }
		default:
			return state
	}
}

const SearchReducer = props => {
	console.log(`${timeNow()} --- [SearchReducer]`)

	const [store, dispatch] = useReducer(Reducer, SearchInitState)
	const SearchProps = {
		state: store,
		setSearchText: (type, text) => dispatch({ type, text }),
		setSearchPage: (type, isSearchPage) => dispatch({ type, isSearchPage }),
		reset: type => dispatch({ type })
	}

	return (
		<SearchContext.Provider value={SearchProps}>
			{props.children}
		</SearchContext.Provider>
	)
}

export default SearchReducer
