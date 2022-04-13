import React, { useContext, useEffect, useState } from 'react'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'
import { API_DOMAIN, API_USER_SERVICE, PATH } from '../../utils/Constant'
import './LoginPage.css'

const LoginPage = () => {
	const userCTX = useContext(UserContext)
	const headerCTX = useContext(HeaderContext)

	const [account, setAccount] = useState({
		username: null,
		password: null
	})

	const onChange = e => {
		e.preventDefault()
		setAccount({ ...account, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v2/admin/login`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(account)
		})
			.then(response => {
				if (response.status === 200) {
					headerCTX.renderPopup(
						HEADER_ACTION.RENDER_POPUP,
						true,
						true,
						'Đăng Nhập Thành Công'
					)
					return response.json()
				} else {
					headerCTX.renderPopup(
						HEADER_ACTION.RENDER_POPUP,
						true,
						false,
						'Đăng Thất Bại'
					)
					userCTX.logout(USER_ACTION.LOGOUT)
				}
			})
			.then(data => {
				userCTX.addUser(USER_ACTION.LOGIN, {
					userID: data.userID,
					accessToken: data.access_token
				})
			})
			.catch(reason => {
				headerCTX.renderPopup(
					HEADER_ACTION.RENDER_POPUP,
					true,
					false,
					'Đăng Thất Bại'
				)
				userCTX.logout(USER_ACTION.LOGOUT)
			})
	}

	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.LOGIN)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div
				className={
					'd-flex align-items-center justify-content-center div-LoginPage-bg'
				}>
				<div className={'div-LoginPage-Login'}>
					<div className={'div-LoginPage-LgC'}>
						<p className={'p-LoginPage-title'}> Đăng nhập </p>
						<div className={'div-LoginPage-form'}>
							<form onSubmit={handleSubmit}>
								<div className={'div-LoginPage-ctnInput'}>
									<label className={'label-LoginPage-title'}>
										Tên Đăng Nhập
									</label>
									<br />
									<input
										type={'text'}
										name={'username'}
										onChange={onChange}
										className={'input-LoginPage-input'}
									/>
								</div>
								<div className={'div-LoginPage-ctnInput2'}>
									<label className={'label-LoginPage-title'}>Mật khẩu</label>
									<br />
									<input
										type={'password'}
										name={'password'}
										onChange={onChange}
										className={'input-LoginPage-input'}
									/>
								</div>
								<button className={'button-LoginPage'}> Đăng nhập </button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPage
