import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const TITLE_ACTION = {
	CHANGE_TITLE: 'CHANGE_TITLE',
	RENDER_POPUP: 'RENDER_POPUP',
	REMOVE_POPUP: 'REMOVE_POPUP'
}

export const TitleContext = createContext()

const TitleInitState = {
	name: null,
	popup: {
		show: false,
		kind: false,
		content: 'Đăng nhập thành công'
	}
}

const Reducer = (state, action) => {
	switch (action.type) {
		case TITLE_ACTION.CHANGE_TITLE:
			return { ...state, name: action.content }
		case TITLE_ACTION.RENDER_POPUP:
			return {
				...state,
				popup: { show: action.show, kind: action.kind, content: action.content }
			}
		case TITLE_ACTION.REMOVE_POPUP:
			return {
				...state,
				popup: { show: false, kind: false, content: '' }
			}
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
		changeTitle: (type, content) => dispatch({ type, content }),
		renderPopup: (type, show, kind, content) =>
			dispatch({ type, show, kind, content }),
		removePopup: type => dispatch({ type })
	}

	return (
		<TitleContext.Provider value={titleProps}>
			{props.children}
		</TitleContext.Provider>
	)
}

export default TitleReducer
