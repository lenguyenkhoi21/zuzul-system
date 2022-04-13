import React, { useContext, useEffect, useState } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../../reducer/Title.Reducer'
import { UserContext } from '../../../../reducer/User.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../../component/common/Authentication'
import LeftMenuUser from '../../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../../component/common/UserAccountBackground'
import { API_DOMAIN, API_USER_SERVICE } from '../../../../utils/APIUtils'

const AccountPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	const [userInfo, setUserInfo] = useState({
		userId: userCTX.state.userID,
		userFullName: '',
		userPhone: '',
		userBirthday: '',
		userSex: '',
		userEmail: '',
		userName: ''
	})

	const onChange = e => {
		if (e.target.name === 'userBirthday') {
			setUserInfo({
				...userInfo,
				[e.target.name]: new Date(e.target.value).getTime() / 1000
			})
		} else if (e.target.name === 'userSex') {
			setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
			setGender(e.target.value)
		} else {
			setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
		}
	}

	const formatDate = date => {
		let timestamp = date * 1000
		let date_not_formatted = new Date(timestamp)

		let formatted_string = date_not_formatted.getFullYear() + '-'

		if (date_not_formatted.getMonth() < 9) {
			formatted_string += '0'
		}
		formatted_string += date_not_formatted.getMonth() + 1
		formatted_string += '-'

		if (date_not_formatted.getDate() < 10) {
			formatted_string += '0'
		}
		formatted_string += date_not_formatted.getDate()

		return formatted_string
	}

	const [date, setDate] = useState('')
	const [gender, setGender] = useState('')

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Hồ sơ người dùng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_PROFILE)

		if (userCTX.state.userID !== null) {
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/profile/${userCTX.state.userID}`,
				{
					headers: {
						Authorization: `Bearer ${userCTX.state.accessToken}`
					},
					mode: 'cors',
					method: 'GET'
				}
			)
				.then(response => response.json())
				.then(data => {
					if (data.status !== 403) {
						setDate(formatDate(data.userBirthday))
						setGender(data.userSex)
						setUserInfo(data)
					}
				})
		}
	}, [userCTX.state.userID])

	const updateUser = e => {
		e.preventDefault()

		const payload = {
			userId: userCTX.state.userID,
			userFullName: userInfo.userFullName,
			userPhone: userInfo.userPhone,
			userBirthday: userInfo.userBirthday,
			userSex: userInfo.userSex,
			userEmail: userInfo.userEmail,
			userName: userInfo.userFullName
		}

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/profile`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => {
				if (response.status === 200) {
					response.json()
				}
			})
			.then(data => console.log(data))
	}

	if (userCTX.state.userID === null) {
		return (
			<>
				<Authentication
					titleHeader={'Đăng nhập'}
					titleSub={'Đăng ký'}
					nameBtn={'Đăng nhập'}
				/>
			</>
		)
	}
	if (userCTX.state.userID !== null) {
		return (
			<>
				<div className={'px-330 page-body div-AccountPage-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground
							userId={userInfo.userId}
							avatarImage={userInfo.currentAvatar}
							coverImage={userInfo.currentCover}
							userFullName={userInfo.userFullName}
						/>

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-AccountPage-leftMenu'}>
								<LeftMenuUser />
							</div>
							<form onSubmit={updateUser}>
								<div className={'ml-5 col-spans-9 div-AccountPage-formAccount'}>
									<div className={'grid'}>
										<p className={'mt-10 ml-10 span-AccountPage-textTitle'}>
											Hồ Sơ Của Tôi
										</p>
									</div>

									<br />
									<span className={'ml-10 span-AccountPage-textSubtitle'}>
										Quản lý thông tin hồ sơ để bảo mật tài khoản
									</span>
									<hr className={'mt-7 mr-10 ml-10 hr-AccountPage-size'} />
									<div className={'grid grid-cols-1 gap-6 '}>
										<div
											className={
												'grid grid-cols-5 grid-flow-col items-center mt-7 ml-7'
											}>
											<label
												className={
													'flex justify-end mr-14 span-AccountPage-textTitleInput '
												}>
												Tên Đăng Nhập
											</label>
											<input
												className={'ml-4 input-AccountPage-size '}
												readOnly={true}
												defaultValue={userCTX.state.name}
												name={'userName'}
											/>
										</div>
										<div
											className={
												'grid grid-cols-5 grid-flow-col items-center ml-7'
											}>
											<label
												className={
													'flex justify-end mr-14 span-AccountPage-textTitleInput'
												}>
												Tên
											</label>
											<input
												className={'ml-4 input-AccountPage-size'}
												defaultValue={userInfo.userFullName}
												onChange={onChange}
												name={'userFullName'}
											/>
										</div>
										<div
											className={
												'grid grid-cols-5 grid-flow-col items-center ml-7'
											}>
											<label
												className={
													'flex justify-end mr-14 span-AccountPage-textTitleInput'
												}>
												Email
											</label>
											<input
												className={'ml-4 input-AccountPage-size'}
												defaultValue={userInfo.userEmail}
												onChange={onChange}
												name={'userEmail'}
											/>
										</div>
										<div
											className={
												'grid grid-cols-5 grid-flow-col items-center ml-7'
											}>
											<label
												className={
													'flex justify-end mr-14 span-AccountPage-textTitleInput'
												}>
												Số Điện Thoại
											</label>
											<input
												className={'ml-4 input-AccountPage-size'}
												defaultValue={userInfo.userPhone}
												onChange={onChange}
												name={'userPhone'}
											/>
										</div>
										<div
											className={
												'grid grid-cols-5 grid-flow-col items-center ml-7'
											}>
											<label
												className={
													'flex justify-end mr-14 span-AccountPage-textTitleInput'
												}>
												Ngày Sinh
											</label>
											<input
												type={'date'}
												className={'ml-4 input-AccountPage-size '}
												defaultValue={date}
												name={'userBirthday'}
												onChange={onChange}
											/>
										</div>
										<div
											className={
												'grid grid-cols-5 grid-flow-col items-center ml-7'
											}>
											<label
												className={
													'flex justify-end mr-14 span-AccountPage-textTitleInput'
												}>
												Giới Tính
											</label>
											<div className={'grid grid-flow-col gap-8 ml-4'}>
												<div className={'flex gap-2.5 items-center'}>
													<input
														className={'input-AccountPage-gender'}
														type={'radio'}
														value={'MALE'}
														checked={gender === 'MALE'}
														name={'userSex'}
														onChange={onChange}
													/>
													<label className={'span-AccountPage-textTitleInput '}>
														Nam
													</label>
												</div>
												<div className={'flex gap-2.5 items-center'}>
													<input
														className={'input-AccountPage-gender'}
														type={'radio'}
														value={'FEMALE'}
														checked={gender === 'FEMALE'}
														name={'userSex'}
														onChange={onChange}
													/>
													<label className={'span-AccountPage-textTitleInput'}>
														Nữ
													</label>
												</div>
												<div className={'flex gap-2.5 items-center'}>
													<input
														name={'userSex'}
														value={'OTHER'}
														className={'input-AccountPage-gender'}
														type={'radio'}
														checked={gender === 'OTHER'}
														onChange={onChange}
													/>
													<label className={'span-AccountPage-textTitleInput'}>
														Khác
													</label>
												</div>
											</div>
										</div>
										<div
											className={'grid grid-cols-5 grid-flow-col items-center'}>
											<div className={'col-start-2 col-end-3 ml-10 '}>
												<button className={'button-AccountPage-save'}>
													Lưu
												</button>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<style jsx>{`
					.div-AccountPage-leftMenu {
						width: 217px;
						margin-bottom: 25px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
					}
					.div-AccountPage-formAccount {
						width: 98%;
						margin-bottom: 25px;
						border-radius: 12px;
						background: #ffffff;
					}
					.div-AccountPage-container {
						background: #f9f9f9;
					}

					.span-AccountPage-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.span-AccountPage-textSubtitle {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 12px;
						line-height: 23px;
						color: #151515;
					}
					.span-AccountPage-textTitleInput {
						font-family: Poppins;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;
						color: #151515;
					}
					.hr-AccountPage-size {
						height: 0px;
						border-radius: 12px;
					}
					.input-AccountPage-size {
						width: 434.86px;
						height: 42px;
						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.button-AccountPage-save {
						width: 120px;
						height: 35px;
						margin-bottom: 20px;
						background: #46d362;
						border: 1px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Roboto;
						font-style: normal;
						font-weight: bold;
						font-size: 15px;
						line-height: 17px;
						align-items: center;
						text-align: center;
						color: #ffffff;
					}
					.input-AccountPage-gender {
						width: 26.09px;
						height: 24px;
					}
				`}</style>
			</>
		)
	}
}

export default AccountPage
