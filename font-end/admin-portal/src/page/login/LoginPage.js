import React, { useContext, useEffect } from 'react'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'
import { PATH } from '../../utils/Constant'
import './LoginPage.css'

const LoginPage = () => {
	const userCTX = useContext(UserContext)
	const headerCTX = useContext(HeaderContext)
	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.LOGIN)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const setCookie = () => {
		userCTX.login(USER_ACTION.LOGIN, {
			userID: 'admin',
			accessToken: 'token-01'
		})
	}
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
							<form>
								<div className={'div-LoginPage-ctnInput'}>
									<label className={'label-LoginPage-title'}>
										Tên Đăng Nhập
									</label>
									<br />
									<input
										type={'text'}
										name={'username'}
										className={'input-LoginPage-input'}
									/>
								</div>
								<div className={'div-LoginPage-ctnInput2'}>
									<label className={'label-LoginPage-title'}>Mật khẩu</label>
									<br />
									<input
										type={'password'}
										name={'password'}
										className={'input-LoginPage-input'}
									/>
								</div>
								<button className={'button-LoginPage'} onClick={setCookie}>
									{' '}
									Đăng nhập{' '}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPage
