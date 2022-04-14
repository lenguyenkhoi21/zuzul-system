import React, { useContext, useEffect } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../../reducer/Title.Reducer'
import { UserContext } from '../../../../reducer/User.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../../component/common/Authentication'
import LeftMenuUser from '../../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../../component/common/UserAccountBackground'

const ChangePasswordPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Thay đổi mật khẩu')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_CHANGE_PASSWORD)
	}, [userCTX.state.userID])

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
				<div className={'px-330 div-ChangePasswordPage-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-ChangePasswordPage-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-ChangePasswordPage-formAccount'}>
								<div className={'mt-10 ml-10'}>
									<p className={'span-ChangePasswordPage-textTitle'}>
										Đổi Mật Khẩu
									</p>
									<br />
									<span className={'span-ChangePasswordPage-textSubtitle'}>
										Quản lý thông tin hồ sơ để bảo mật tài khoản
									</span>
								</div>
								<hr className={'mt-7 mr-10 ml-10 hr-ChangePasswordPage-size'} />
								<div className={'grid grid-col-1'}>
									{/*mat khau hien tai*/}
									<div className={'grid grid-cols-3 grid-flow-col '}>
										<div>
											<label className={'label-ChangePasswordPage-inputHeader'}>
												Mật Khẩu Hiện Tại
											</label>
										</div>
										<div className={'grid col-span-2'}>
											<input className={'input-ChangePasswordPage-size'} />
										</div>
									</div>

									{/*mat khau moi*/}
									<div className={'grid grid-cols-3 grid-flow-col'}>
										<div>
											<label className={'label-ChangePasswordPage-inputHeader'}>
												Mật Khẩu Mới
											</label>
										</div>
										<div className={'grid col-span-2'}>
											<input className={'input-ChangePasswordPage-size'} />
										</div>
									</div>

									{/*xac nhan mat khau*/}
									<div className={'grid grid-cols-3 grid-flow-col'}>
										<div>
											<label className={'label-ChangePasswordPage-inputHeader'}>
												Xác Nhận Mật Khẩu
											</label>
										</div>
										<div className={'grid col-span-2'}>
											<input className={'input-ChangePasswordPage-size'} />
										</div>
									</div>

									<div
										className={'grid grid-cols-3 grid-flow-col items-center'}>
										<div className={'grid col-start-2'}>
											<button
												className={'mb-8 btn-ChangePasswordPage-acceptBtn'}>
												Xác Nhận
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
					.div-ChangePasswordPage-container {
						background: #f9f9f9;
					}
					.hr-ChangePasswordPage-size {
						height: 0px;
						border-radius: 12px;
					}
					.div-ChangePasswordPage-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
					}
					.div-ChangePasswordPage-formAccount {
						width: 100%;
						border-radius: 12px;
						background: #ffffff;
						margin-bottom: 25px;
					}
					.span-ChangePasswordPage-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.span-ChangePasswordPage-textSubtitle {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 12px;
						line-height: 23px;
						color: #151515;
					}
					.input-ChangePasswordPage-size {
						width: 65.25%;
						height: 42px;
						margin-top: 27px;
						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.label-ChangePasswordPage-inputHeader {
						display: block;
						font-family: Poppins;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;
						color: #151515;

						margin-right: 65px;
						margin-top: 36px;
						text-align: right;
					}
					.btn-ChangePasswordPage-acceptBtn {
						width: 120px;
						height: 42px;
						margin-top: 24px;
						font-family: Roboto;
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #ffffff;

						background: #46d362;
						border: 1px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;
					}
				`}</style>
			</>
		)
	}
}

export default ChangePasswordPage
