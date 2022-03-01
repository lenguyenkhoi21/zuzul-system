import React, { useContext, useEffect } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import { UserContext } from '../../../reducer/User.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../component/common/Authentication'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../component/common/UserAccountBackground'

const AccountPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Hồ sơ người dùng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_PROFILE)
	}, [])

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
	} else {
		return (
			<>
				<div className={'px-330 div-AccountPage-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-AccountPage-leftMenu'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 col-spans-9 div-AccountPage-formAccount'}>
								<p className={'mt-10 ml-10 span-AccountPage-textTitle'}>
									Hồ Sơ Của Tôi
								</p>
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
										<input className={'ml-4 input-AccountPage-size '} />
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
										<input className={'ml-4 input-AccountPage-size'} />
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
										<input className={'ml-4 input-AccountPage-size'} />
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
										<input className={'ml-4 input-AccountPage-size'} />
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
													name={'gender'}
													className={'input-AccountPage-gender'}
													type={'radio'}
													checked
												/>
												<label className={'span-AccountPage-textTitleInput '}>
													Nam
												</label>
											</div>
											<div className={'flex gap-2.5 items-center'}>
												<input
													name={'gender'}
													className={'input-AccountPage-gender'}
													type={'radio'}
												/>
												<label className={'span-AccountPage-textTitleInput'}>
													Nữ
												</label>
											</div>
											<div className={'flex gap-2.5 items-center'}>
												<input
													name={'gender'}
													className={'input-AccountPage-gender'}
													type={'radio'}
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
											<button className={'button-AccountPage-save'}>Lưu</button>
										</div>
									</div>
								</div>
							</div>
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
						width: 100%;
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
					}
					.button-AccountPage-save {
						width: 119.59px;
						height: 32px;
						background: #6a983c;
						border: 2px solid #46760a;
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
