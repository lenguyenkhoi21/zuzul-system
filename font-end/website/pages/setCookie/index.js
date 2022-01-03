import React, { useContext, useState } from 'react'
import { timeNow } from '../../utils/Utils'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'
import { CHAT_ACTION, ChatContext } from '../../reducer/Chat.Reducer'
import { NOTIFY_ACTION, NotifyContext } from '../../reducer/Notify.Reducer'
import { CART_ACTION, CartContext } from '../../reducer/Cart.Reducer'

const SetCookiePage = () => {
	console.log(`${timeNow()} --- [SetCookie]--- at pages/setCookie/index.js`)
	const userCTX = useContext(UserContext)
	const chatCTX = useContext(ChatContext)
	const notifyCTX = useContext(NotifyContext)
	const cartCTX = useContext(CartContext)

	const [cookie, setCookie] = useState({
		userID: null,
		access_token: null,
		role: null
	})

	const onSubmit = e => {
		e.preventDefault()
		if (
			cookie.userID !== null &&
			cookie.userID !== '' &&
			cookie.role !== null &&
			cookie.role !== '' &&
			cookie.access_token !== null &&
			cookie.access_token !== ''
		) {
			userCTX.addUser(USER_ACTION.ADD_USER, cookie)
		} else {
			console.log(`Error in file setCookie/index.js`)
		}
	}

	const onChange = e => {
		const value = e.target.value
		setCookie({ ...cookie, [e.target.name]: value })
	}

	const setCookieDefault = () => {
		const data = {
			userID: 'user-01',
			access_token: 'token-01',
			role: 'NORMAL'
		}
		userCTX.addUser(USER_ACTION.ADD_USER, data)
	}

	const deleteCookie = () => {
		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			userCTX.state.role !== null &&
			userCTX.state.role !== '' &&
			userCTX.state.access_token !== null &&
			userCTX.state.access_token !== ''
		) {
			userCTX.removeUser(USER_ACTION.REMOVE_USER)
			chatCTX.logout(CHAT_ACTION.LOGOUT, chatCTX.state.socket)
			notifyCTX.logout(NOTIFY_ACTION.LOGOUT, notifyCTX.state.socket)
			cartCTX.logout(CART_ACTION.LOGOUT)
		}
	}

	return (
		<>
			<div>
				<form onSubmit={onSubmit}>
					UserID:{' '}
					<input
						name={'userID'}
						onChange={onChange}
						className={'input-SetCookiePage-border'}
					/>{' '}
					<br />
					Access_Token:{' '}
					<input
						name={'access_token'}
						onChange={onChange}
						className={'input-SetCookiePage-border'}
					/>{' '}
					<br />
					Role: <input name={'role'} onChange={onChange} /> <br />
					<button type={'submit'}> Đặt Cookie </button>
				</form>
				<button onClick={setCookieDefault}>
					{' '}
					Bấm vào đây đặt về mặc định{' '}
				</button>
				<br />
				<button onClick={deleteCookie}> Xóa cookie </button>
			</div>
			<style jsx>
				{`
					.input-SetCookiePage-border {
						border: 1px solid black;
					}
				`}
			</style>
		</>
	)
}

export default SetCookiePage
