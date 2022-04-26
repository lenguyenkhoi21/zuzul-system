import React, { useContext, useEffect, useState } from 'react'
import { API_DOMAIN, API_USER_SERVICE } from '../../utils/APIUtils'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'

const Authentication = ({
	titleHeader,
	titleSub,
	nameBtn,
	textRegister,
	textRegisterSub
}) => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const [account, setAccount] = useState({
		username: '',
		password: ''
	})

	const onChange = e =>
		setAccount({ ...account, [e.target.name]: e.target.value })

	const loginAccount = e => {
		e.preventDefault()

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/pub/login`, {
			headers: {
				Accept: 'application/json, text/plain',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(account)
		})
			.then(response => {
				if (response.status === 200) {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Đăng Nhập Thành Công'
					)
					return response.json()
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Đăng Nhập Thất Bại'
					)
					userCTX.removeUser(USER_ACTION.REMOVE_USER)
				}
			})
			.then(data => {
				userCTX.addUser(USER_ACTION.ADD_USER, {
					userID: data.userID,
					accessToken: data.access_token,
					name: data.name,
					isActiveShop: data.activatedShop,
					sendRequest: data.sendRequest,
					modifiedProfile: data.modifiedProfile
				})
				if (data.modifiedProfile === false)
					router.push('/user/settings/account')
				else router.push('/')
			})
			.catch(reason => userCTX.removeUser(USER_ACTION.REMOVE_USER))
	}

	const router = useRouter()

	useEffect(() => {
		if (userCTX.state.userID !== null) {
			router.push('/')
		}
	}, [])

	return (
		<>
			<div
				className={'flex justify-center px-330 div-Authentication-container'}>
				<form
					onSubmit={loginAccount}
					className={
						'grid grid-cols-1 gap-4 place-content-start form-Authentication-size'
					}>
					<div className={'row-span-3 '} />

					<div className={'grid grid-cols-2 grid-flow-col'}>
						<div className={'flex justify-center'}>
							<div className={'flex'}>
								<div className={'flex-initial w-40'}>
									<label className={'label-Authentication-login'}>
										{titleHeader}
									</label>
								</div>
							</div>
						</div>
						<div className={''} />
					</div>

					<div className={'flex gap-4 justify-center p-4'}>
						<label className={'label-Authentication-subtitle'}>
							Bạn chưa có tài khoản?
						</label>
						<Link href={'/register'}>
							<label className={'label-Authentication-subtitle2'}>
								{titleSub}
							</label>
						</Link>
					</div>
					<div className={'grid grid-cols-1'}>
						<div className={'grid grid-cols-2 grid-flow-col'}>
							<div className={'flex justify-center '}>
								<div className={'flex'}>
									<div className={'flex-initial w-32'}>
										<label
											name={'phoneNumber'}
											className={'label-Authentication-phoneNumberAndPass'}>
											Tên Đăng Nhập
										</label>
										<label
											className={'label-Authentication-phoneNumberAndPass2'}>
											*
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className={'flex justify-center'}>
							<input
								type={'text'}
								name={'username'}
								className={'input-Authentication-size'}
								onChange={onChange}
							/>
						</div>
					</div>

					<div className={'grid grid-cols-1 '}>
						<div className={'grid grid-cols-2 grid-flow-col'}>
							<div className={'flex justify-center'}>
								<div className={'flex'}>
									<div className={'flex-initial w-32'}>
										<label
											name={'passWord'}
											className={'label-Authentication-phoneNumberAndPass'}>
											Mật khẩu
										</label>
										<label
											className={'label-Authentication-phoneNumberAndPass2'}>
											*
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className={'flex justify-center'}>
							<input
								type={'password'}
								name={'password'}
								className={'input-Authentication-size'}
								onChange={onChange}
							/>
						</div>
					</div>

					<div className={'grid grid-cols-1 gap-4 content-center h-20'}>
						<div className={'flex justify-center'}>
							<button className={' btn-Authentication-size'}>
								<p className={'p-Authentication-btnLogin'}>{nameBtn}</p>
							</button>
						</div>
					</div>

					<div className={'grid grid-cols-6 content-end h-56'}>
						<div className={'col-start-2 col-end-6 '}>
							<div className={'flex justify-center'}>
								<label className={'text-center label-Authentication-text2'}>
									{textRegister}
									<label className={'label-Authentication-text'}>
										{textRegisterSub}
									</label>
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
			<style jsx>
				{`
					.div-Authentication-container {
						background: #ebebeb;
					}
					.hr-Authentication-size {
						width: 151px;
						height: 0px;
						border: 1px solid #a8a6a7;
						transform: rotate(-180deg);
					}
					.form-Authentication-size {
						width: 568px;
						height: 721px;
						box-shadow: 0px 12px 16px rgba(0, 0, 0, 0.04),
							0px 4px 56px rgba(0, 0, 0, 0.04);
						border-radius: 10px;
						background: #ffffff;
					}
					.label-Authentication-login {
						font-family: Poppins;
						font-style: normal;
						font-weight: 400;
						font-size: 29px;
						line-height: 43px;
						color: rgba(0, 0, 0, 0.85);
					}
					.label-Authentication-subtitle {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 26px;
						color: #444150;
					}
					.label-Authentication-subtitle2 {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 26px;
						color: #6a983c;
					}
					.label-Authentication-phoneNumberAndPass {
						font-family: Poppins;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 24px;
						color: #444150;
					}
					.label-Authentication-phoneNumberAndPass2 {
						font-family: Poppins;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 24px;
						color: #6a983c;
					}
					.input-Authentication-size {
						width: 416px;
						height: 48px;
						background: #fbfbfb;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.btn-Authentication-size {
						width: 200px;
						height: 41px;
						background: #46d362;
						border: 1px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.p-Authentication-btnLogin {
						font-family: Poppins;
						font-style: normal;
						font-weight: bold;
						font-size: 18px;
						line-height: 27px;
						text-align: center;
						color: #ffffff;
					}
					.label-Authentication-text {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 14px;
						line-height: 22px;
						text-align: center;
						color: #6a983c;
					}
					.label-Authentication-text2 {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 14px;
						line-height: 22px;
						text-align: center;
						color: #778699;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(Authentication)
