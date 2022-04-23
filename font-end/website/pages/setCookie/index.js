import React, { useContext, useEffect, useState } from 'react'
import { timeNow } from '../../utils/Utils'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'
import { CHAT_ACTION, ChatContext } from '../../reducer/Chat.Reducer'
import { NOTIFY_ACTION, NotifyContext } from '../../reducer/Notify.Reducer'
import { CART_ACTION, CartContext } from '../../reducer/Cart.Reducer'
import { SEARCH_ACTION, SearchContext } from '../../reducer/Search.Reducer'

const SetCookiePage = () => {
	console.log(`${timeNow()} --- [SetCookie]--- at pages/setCookie/index.js`)
	const userCTX = useContext(UserContext)
	const chatCTX = useContext(ChatContext)
	const notifyCTX = useContext(NotifyContext)
	const cartCTX = useContext(CartContext)
	const searchCTX = useContext(SearchContext)

	useEffect(() => {
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)
	}, [])

	const [cookie, setCookie] = useState({
		userID: null,
		name: null,
		access_token: null,
		isActiveShop: false,
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
		const name = e.target.name
		if (name === 'isActiveShop') {
			const isActiveShop = cookie.isActiveShop
			setCookie({ ...cookie, [name]: !isActiveShop })
		} else {
			setCookie({ ...cookie, [name]: value })
		}
	}

	const setCookieDefault = () => {
		const data = {
			userID: 'user-01',
			name: 'Khoi Le Nguyen',
			access_token: 'token-01',
			isActiveShop: true,
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
					Name:{' '}
					<input
						name={'name'}
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
					{cookie.isActiveShop === false ? (
						<>
							{' '}
							là người bán hàng
							<input
								type={'checkbox'}
								onChange={onChange}
								name={'isActiveShop'}
							/>{' '}
							<br />{' '}
						</>
					) : (
						<>
							là người bán hàng{' '}
							<input
								type={'checkbox'}
								onChange={onChange}
								name={'isActiveShop'}
								className={'button-SetCookiePage-shop'}
							/>
							<br />{' '}
						</>
					)}
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

					.button-SetCookiePage-shop {
						background-color: crimson;
					}
				`}
			</style>
		</>
	)
}

export default SetCookiePage
