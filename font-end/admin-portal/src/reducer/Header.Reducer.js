import { createContext, useReducer } from 'react'

export const HEADER_ACTION = {
	SET_TITLE: 'SET_TITLE',
	RENDER_POPUP: 'RENDER_POPUP',
	REMOVE_POPUP: 'REMOVE_POPUP'
}

export const HeaderContext = createContext()

const HeaderInitialState = {
	path: null,
	popup: {
		show: false,
		kind: false,
		content: 'Đăng nhập thành công'
	}
}

const Reducer = (state, action) => {
	switch (action.type) {
		case HEADER_ACTION.SET_TITLE:
			return { ...state, path: action.path }
		case HEADER_ACTION.RENDER_POPUP:
			return {
				...state,
				popup: { show: action.show, kind: action.kind, content: action.content }
			}
		case HEADER_ACTION.REMOVE_POPUP:
			return {
				...state,
				popup: { show: false, kind: false, content: '' }
			}
		default:
			return state
	}
}

const HeaderReducer = props => {
	const [store, dispatch] = useReducer(Reducer, HeaderInitialState)
	const HeaderProps = {
		state: store,
		changeTitle: (type, path) => dispatch({ type, path }),
		renderPopup: (type, show, kind, content) =>
			dispatch({ type, show, kind, content }),
		removePopup: type => dispatch({ type })
	}

	return (
		<HeaderContext.Provider value={HeaderProps}>
			{props.children}
		</HeaderContext.Provider>
	)
}

export default HeaderReducer
