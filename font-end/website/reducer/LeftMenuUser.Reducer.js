import React from 'react'
import { createContext, useReducer } from 'react'
import { timeNow } from '../utils/Utils'

export const LEFT_MENU_USER_ACTION = {
	SET_PROFILE: 'SET_PROFILE',
	SET_ADDRESS: 'SET_ADDRESS',
	SET_CHANGE_PASSWORD: 'SET_CHANGE_PASSWORD',
	SET_HISTORY: 'SET_HISTORY',
	SET_ALL_PRODUCT: 'SET_ALL_PRODUCT',
	SET_NEW_PRODUCT: 'SET_NEW_PRODUCT',
	SET_MODIFY_PRODUCT: 'SET_MODIFY_PRODUCT',
	SET_ALL_ORDER: 'SET_ALL_ORDER',
	SET_WAITING_ACCEPT: 'SET_WAITING_ACCEPT',
	SET_WAITING_TAKING: 'SET_WAITING_TAKING',
	SET_WAITING_IS_SHIPPING: 'SET_WAITING_IS_SHIPPING',
	SET_WAITING_CANCEL: 'SET_WAITING_CANCEL',
	SET_SEND_REQUEST: 'SET_SEND_REQUEST',
	RESET: 'RESET'
}

export const LeftMenuUserContext = createContext()

const LeftMenuUserInitSate = {
	profile: false,
	address: false,
	changePassword: false,
	history: false,
	allProduct: false,
	newProduct: false,
	modifyProduct: false,
	allOrder: false,
	waitingAccept: false,
	waitingTaking: false,
	waitingIsShipping: false,
	waitingCancel: false,
	sendRequest: false
}

const Reducer = (state, action) => {
	switch (action.type) {
		case LEFT_MENU_USER_ACTION.SET_PROFILE:
			return { ...LeftMenuUserInitSate, profile: true }

		case LEFT_MENU_USER_ACTION.SET_ADDRESS:
			return { ...LeftMenuUserInitSate, address: true }

		case LEFT_MENU_USER_ACTION.SET_CHANGE_PASSWORD:
			return { ...LeftMenuUserInitSate, changePassword: true }

		case LEFT_MENU_USER_ACTION.SET_HISTORY:
			return { ...LeftMenuUserInitSate, history: true }

		case LEFT_MENU_USER_ACTION.SET_ALL_PRODUCT:
			return { ...LeftMenuUserInitSate, allProduct: true }

		case LEFT_MENU_USER_ACTION.SET_NEW_PRODUCT:
			return { ...LeftMenuUserInitSate, newProduct: true }

		case LEFT_MENU_USER_ACTION.SET_MODIFY_PRODUCT:
			return { ...LeftMenuUserInitSate, modifyProduct: true }

		case LEFT_MENU_USER_ACTION.SET_ALL_ORDER:
			return { ...LeftMenuUserInitSate, allOrder: true }

		case LEFT_MENU_USER_ACTION.SET_WAITING_ACCEPT:
			return { ...LeftMenuUserInitSate, waitingAccept: true }

		case LEFT_MENU_USER_ACTION.SET_WAITING_TAKING:
			return { ...LeftMenuUserInitSate, waitingTaking: true }

		case LEFT_MENU_USER_ACTION.SET_WAITING_IS_SHIPPING:
			return { ...LeftMenuUserInitSate, waitingIsShipping: true }

		case LEFT_MENU_USER_ACTION.SET_WAITING_CANCEL:
			return { ...LeftMenuUserInitSate, waitingCancel: true }

		case LEFT_MENU_USER_ACTION.SET_SEND_REQUEST:
			return { ...LeftMenuUserInitSate, sendRequest: true }

		case LEFT_MENU_USER_ACTION.RESET:
			return { ...LeftMenuUserInitSate }

		default:
			return state
	}
}

const LeftMenuUserReducer = props => {
	console.log(`${timeNow()} --- [LeftMenuUserReducer]`)
	const [store, dispatch] = useReducer(Reducer, LeftMenuUserInitSate)
	const LeftMenuUseProps = {
		state: store,
		setSubTitle: type => dispatch({ type })
	}

	return (
		<LeftMenuUserContext.Provider value={LeftMenuUseProps}>
			{props.children}
		</LeftMenuUserContext.Provider>
	)
}

export default LeftMenuUserReducer
