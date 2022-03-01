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
import Link from 'next/link'

const AddressPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Hồ sơ người dùng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_ADDRESS)
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
				<div className={'px-330 div-AddressPage-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-AddressPage-leftMenu'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-AddressPage-formAccount'}>
								<div className={'flex justify-between mt-10 ml-10'}>
									<div>
										<span className={'span-AddressPage-textTitle'}>
											Địa Chỉ Của Tôi
										</span>
									</div>

									<div className={'mr-10 '}>
										<Link href={'/user/settings/addAddressForm'}>
											<a>
												<button
													className={
														'flex justify-center items-center btn-AddressPage-addBtn'
													}>
													<span className={'mr-5 span-AddressPage-plus'}>
														+
													</span>
													Thêm Địa Chỉ Mới
												</button>
											</a>
										</Link>
									</div>
								</div>
								<hr className={'mt-16 mr-10 ml-10 hr-AddressPage-size'} />
								<div className={'grid grid-flow-col mt-6 ml-9 w-11/12'}>
									<div>
										<label>Họ Và Tên</label>
										<label>Số Điện Thoại </label>
										<label>Địa Chỉ </label>
									</div>
									<div>
										<p>Nguyễn Quang Cường</p>
										<p>0931961345</p>
										<p>Phường An Hải Bắc Quận Sơn Trà Đà Nẵng</p>
									</div>
									<div className={'mt-4'}>
										<div className={'flex justify-start'}>
											<button className={'btn-AddressPage-tagContent'}>
												Lấy Hàng
											</button>
											<button className={'ml-4 btn-AddressPage-tagContent'}>
												Trả Hàng
											</button>
										</div>
										<button className={'mt-4 btn-AddressPage-tagContent'}>
											Mặc định
										</button>
									</div>
									<div className={'mt-4 ml-12'}>
										<div className={'flex justify-end'}>
											<Link href={'/user/settings/editAddressForm'}>
												<a>
													<button className={'btn-AddressPage-funcBtn'}>
														Sửa
													</button>
												</a>
											</Link>
											<button className={'ml-4 btn-AddressPage-funcBtn'}>
												Xóa
											</button>
										</div>
										<div className={'flex justify-end'}>
											<button className={'mt-4 btn-AddressPage-funcSetup'}>
												Thiết Lập Mặc Định
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
					.div-AddressPage-container {
						background: #f9f9f9;
					}
					.div-AddressPage-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
						margin-bottom: 25px;
					}
					.div-AddressPage-formAccount {
						width: 100%;
						margin-bottom: 25px;
						border-radius: 12px;
						background: #ffffff;
					}
					.span-AddressPage-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.hr-AddressPage-size {
						height: 0px;
						border-radius: 12px;
					}
					label {
						display: block;
						font-family: Poppins;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;
						color: #151515;
						padding: 15px 30px;
						text-align: right;
					}
					p {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;
						color: #151515;
						padding: 15px;
					}
					.btn-AddressPage-tagContent {
						font-family: Roboto;
						font-style: normal;
						font-weight: bold;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #777777;
						background: #ffffff;
						border: 1px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 20px;

						padding: 6.5px 27px;
					}
					.btn-AddressPage-funcBtn {
						display: inline;
						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Roboto;
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #ffffff;

						padding: 6.5px 10.5px;
					}
					.btn-AddressPage-funcSetup {
						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Roboto;
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #ffffff;

						padding: 6.5px 25px;
					}
					.btn-AddressPage-addBtn {
						font-family: Roboto;
						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;

						font-style: normal;
						font-weight: bold;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						width: 231.56px;
						height: 33px;

						color: #ffffff;
					}
					.span-AddressPage-plus {
						font-family: 'Poppins', sans-serif;
						font-style: normal;
						font-weight: 900;
						font-size: 20px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #ffffff;
					}
				`}</style>
			</>
		)
	}
}

export default AddressPage
