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
import Link from 'next/link'
import { API_DOMAIN, API_USER_SERVICE } from '../../../../utils/APIUtils'
import { useRouter } from 'next/router'
import {
	SEARCH_ACTION,
	SearchContext
} from '../../../../reducer/Search.Reducer'

const AddressPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)
	const searchCTX = useContext(SearchContext)
	/*const router = useRouter()*/

	const [address, setAddress] = useState([])
	const [render, setRender] = useState({})
	const [userInfo, setUserInfo] = useState({
		userId: userCTX.state.userID,
		userFullName: '',
		userPhone: '',
		userBirthday: '',
		userSex: '',
		userEmail: '',
		userName: ''
	})

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Địa chỉ người dùng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_ADDRESS)
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)

		if (userCTX.state.userID !== null) {
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/address/${userCTX.state.userID}`,
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						Authorization: `Bearer ${userCTX.state.accessToken}`
					}
				}
			)
				.then(response => {
					if (response.status === 200) {
						return response.json()
					}
				})
				.then(data => {
					setAddress(data)
				})
		}
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
						setUserInfo(data)
					}
				})
		}
	}, [userCTX.state.userID, render])

	const setDefault = e => {
		e.preventDefault()

		const payload = {
			userId: userCTX.state.userID,
			addressId: e.target.value
		}

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/address/setDefault`, {
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
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Thiết Lập Thành Công'
					)
					return response.json()
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Thiết Lâp Thất Bại'
					)
				}
			})
			.then(data => {
				if (data.status === 'SUCCESS') {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Thiết Lập Thành Công'
					)
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Thiết Lâp Thất Bại'
					)
				}
				setRender({})
			})
	}

	const deleteAddress = e => {
		e.preventDefault()

		let payload = {
			addressId: e.target.value,
			userId: userCTX.state.userID
		}

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/address`, {
			method: 'DELETE',
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
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Xóa Địa Chỉ Thành Công'
					)
					return response.json()
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Xóa Địa Chỉ Thất Bại'
					)
				}
			})
			.then(data => {
				if (data.status === 'SUCCESS') {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Xóa Địa Chỉ Thành Công'
					)
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Xóa Địa Chỉ Thất Bại'
					)
				}
				setRender({})
			})
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
	} else {
		return (
			<>
				<div className={'px-330 div-AddressPage-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground
							userId={userInfo.userId}
							avatarImage={userInfo.currentAvatar}
							coverImage={userInfo.currentCover}
							userFullName={userInfo.userFullName}
						/>

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
								{address.map((value, index) => {
									return (
										<React.Fragment key={index}>
											<div className={'flex mt-6 ml-9 '}>
												<div>
													<label>Họ Và Tên</label>
													<label>Số Điện Thoại </label>
													<label>Địa Chỉ </label>
												</div>
												<div>
													<p>{value.userName}</p>
													<p>{value.userPhone}</p>
													<p>
														{value.detailsAddress +
															',' +
															value.userWard +
															',' +
															value.userDistinct +
															',' +
															value.userCity}
													</p>
												</div>

												<div className={'mt-4'}>
													<div className={''}>
														<button
															hidden={value.type === false}
															className={'btn-AddressPage-tagContent'}>
															Địa Chỉ Mặc Định
														</button>
													</div>
												</div>
												<div className={'mt-4 ml-12 div-test'}>
													<div className={'flex justify-end'}>
														<Link
															href={`/user/settings/editAddressForm/${value.addressId}`}>
															<a>
																<button className={'btn-AddressPage-funcBtn'}>
																	Sửa
																</button>
															</a>
														</Link>
														<button
															className={'ml-4 btn-AddressPage-funcBtn'}
															value={value.addressId}
															onClick={deleteAddress}>
															Xóa
														</button>
													</div>
													<div className={'flex justify-end'}>
														<button
															hidden={value.type === true}
															className={'mt-4 btn-AddressPage-funcSetup'}
															value={value.addressId}
															onClick={setDefault}>
															Thiết Lập Mặc Định
														</button>
													</div>
												</div>
											</div>
										</React.Fragment>
									)
								})}
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
					.div-test {
						width: 184px;
						margin-left: 150px;
					}
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
						width: 176px;
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
						width: 350px;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;
						color: #151515;
						padding: 15px;
					}
					.btn-AddressPage-tagContent {
						position: absolute;
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
						border: 1px solid #46760a;
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
						border: 1px solid #46760a;
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
						border: 1px solid #46760a;
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
