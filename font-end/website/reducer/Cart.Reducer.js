import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const CART_ACTION = {
	FETCH_CART: 'FETCH_CART',
	CONNECT: 'CONNECT'
}

export const CartContext = createContext()

const CartInitState = {
	socket: null,
	totalProduct: null,
	cart: null
}

const Reducer = (state, action) => {
	switch (action.type) {
		case CART_ACTION.FETCH_CART:
			return { ...state, totalProduct: action.total, cart: action.cart }
		case CART_ACTION.CONNECT:
			return { ...state, socket: action.socket }
		default:
			return state
	}
}

const CartReducer = props => {
	console.log(`${timeNow()} --- [CartReducer]`)

	const [store, dispatch] = useReducer(Reducer, CartInitState)
	const CartProps = {
		state: store,
		connect: (type, socket) => dispatch({ type, socket }),
		fetchCart: (type, cart, total) => dispatch({ type, cart, total })
	}

	return (
		<CartContext.Provider value={CartProps}>
			{props.children}
		</CartContext.Provider>
	)
}

export default CartReducer
