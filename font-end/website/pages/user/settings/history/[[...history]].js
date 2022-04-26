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
import { useRouter } from 'next/router'
import { API_DOMAIN, API_USER_SERVICE } from '../../../../utils/APIUtils'
import Link from 'next/link'
import {
	SEARCH_ACTION,
	SearchContext
} from '../../../../reducer/Search.Reducer'

const HistoryPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)
	const searchCTX = useContext(SearchContext)
	const router = useRouter()

	const [render, setRender] = useState({})

	const [history, setHistory] = useState([])
	const [details, setDetails] = useState({
		orderDetailsList: [],
		historyId: '',
		userName: '',
		paymentType: '',
		address: '',
		phone: ''
	})
	const [userInfo, setUserInfo] = useState({
		userId: userCTX.state.userID,
		userFullName: '',
		userPhone: '',
		userBirthday: '',
		userSex: '',
		userEmail: '',
		userName: ''
	})

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

	const cancelOrder = (e, id, historyId, productName) => {
		e.preventDefault()

		const payload = {
			id: id,
			historyId: historyId,
			userId: userCTX.state.userID,
			productName: productName
		}

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/history/cancelOrder`, {
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
						'Hủy Thành Công'
					)
					return response.json()
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Hủy Thất Bại'
					)
				}
				router.push('/user/settings/history')
			})
			.then(data => {
				if (data.status === 'SUCCESS') {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Hủy Thành Công'
					)
					//					userCTX.state.isActiveShop = true
					userCTX.state.sendRequest = true
				}
				if (data.status === 'FAIL') {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Hủy Thất Bại'
					)
				}
				setRender({})
				router.push('/user/settings/history')
			})
	}

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Lịch sử mua hàng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_HISTORY)
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)

		if (userCTX.state.userID !== null) {
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/${userCTX.state.userID}/history/all`,
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
					setHistory(data)
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

	useEffect(() => {
		if (
			router.asPath.split('/')[4] !== '[[...history]]' &&
			router.asPath.split('/')[4] !== undefined &&
			userCTX.state.userID !== null
		) {
			console.log(router.asPath)
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/${
					userCTX.state.userID
				}/history/${router.asPath.split('/')[4]}`,
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
					setDetails(data)
				})
		}
	}, [router.asPath, render])

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
		//const arr = router.asPath.split('/')
		if (router.asPath.split('/').length === 4) {
			return (
				<>
					<div className={'px-330 div-HistoryPage-container'}>
						<div className={'grid grid-cols-1'}>
							<UserAccountBackground
								userId={userInfo.userId}
								avatarImage={userInfo.currentAvatar}
								coverImage={userInfo.currentCover}
								userFullName={userInfo.userFullName}
							/>

							<div className={'flex grid-flow-col mt-6'}>
								<div className={'div-HistoryPage-leftMenu min-h-fit'}>
									<LeftMenuUser />
								</div>
								<div className={'ml-5 div-HistoryPage-formAccount'}>
									<div className={'mt-10 ml-10'}>
										<p className={'span-HistoryPage-textTitle'}>
											Đơn Hàng Của Tôi
										</p>
									</div>
									<hr className={'mt-16 mr-10 ml-10 hr-HistoryPage-size'} />
									<div>
										<table className={'div-HistoryPage-table'}>
											<thead align={'left'}>
												<tr>
													<th width={133}>Mã Đơn Hàng</th>
													<th width={109}>Ngày Mua</th>
													<th width={246}>Sản Phẩm</th>
													<th width={97}>Tổng Tiền</th>
												</tr>
											</thead>
											<tbody>
												{history.map((value, key) => (
													<React.Fragment key={key}>
														<Link
															href={`/user/settings/history/${value.historyId}`}>
															<tr>
																<td className={'div-HistoryPage-idPrd'}>
																	{value.historyId}
																</td>
																<td>{formatDate(value.dateCreated)}</td>
																<td>{value.productName}</td>
																<td>{value.totalPrice} đồng</td>
															</tr>
														</Link>
													</React.Fragment>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<style jsx>{`
						.div-HistoryPage-idPrd {
							overflow: hidden;
							text-overflow: ellipsis;
							line-height: 25px;
							-webkit-line-clamp: 3;
							height: 30px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
						}
						.div-HistoryPage-container {
							background: #f9f9f9;
						}

						.hr-HistoryPage-size {
							height: 0px;
							border-radius: 12px;
						}

						.div-HistoryPage-leftMenu {
							width: 217px;
							height: fit-content;
							background: #ffffff;
							box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
							border-radius: 12px;
						}

						.div-HistoryPage-formAccount {
							width: 100%;
							border-radius: 12px;
							background: #ffffff;
							margin-bottom: 25px;
						}

						.span-HistoryPage-textTitle {
							font-family: Poppins;
							font-style: normal;
							font-weight: 600;
							font-size: 32px;
							line-height: 23px;
							color: #151515;
						}

						th {
							font-family: Poppins;
							font-style: normal;
							font-weight: 700;
							font-size: 18px;
							line-height: 23px;
							color: #151515;
						}

						td {
							font-family: Open Sans;
							font-style: normal;
							font-weight: 400;
							font-size: 18px;
							line-height: 23px;
							color: #151515;
						}

						th,
						td {
							vertical-align: top;
							padding: 8px;
						}

						.div-HistoryPage-table {
							margin-left: 32px;
							margin-top: 27px;
							margin-bottom: 20px;
							overflow-x: auto;
							width: 92%;
						}
					`}</style>
				</>
			)
		} else if (router.asPath.split('/').length === 5) {
			let total = []
			return (
				<>
					<div>
						<div className={'px-330 div-HistoryPage-container'}>
							<div className={'grid grid-cols-1'}>
								<UserAccountBackground />

								<div className={'flex grid-flow-col mt-6'}>
									<div className={'div-HistoryPage-leftMenu'}>
										<LeftMenuUser />
									</div>
									<div
										className={'ml-5 col-spans-9 div-HistoryPage-formAccount'}>
										<p className={'mt-10 ml-10 span-HistoryPage-textTitle'}>
											Chi tiết đơn hàng
										</p>
										<br />
										<hr className={'mt-7 mr-10 ml-10 hr-HistoryPage-size'} />

										<div
											className={
												'grid grid-cols-2 grid-flow-col mt-9 div-test'
											}>
											<div>
												<label className={'label-HistoryPage-subHeader'}>
													Địa Chỉ Người Nhận
												</label>
												<div>
													<p>{details.userName}</p>
													<p>Địa chỉ: {details.address}</p>
													<p>Điện thoại: {details.phone}</p>
												</div>
											</div>
											<div>
												<label className={'label-HistoryPage-subHeader'}>
													Hình Thức Thanh Toán
												</label>
												<div>
													<p>{details.paymentType}</p>
												</div>
											</div>
										</div>

										<div>
											<table className={'div-HistoryPage-table'}>
												<thead align={'left'}>
													<tr>
														<th width={425}>Sản Phẩm</th>
														<th width={109}>Giá</th>
														<th width={109}>Số Lượng</th>
														<th width={109}>Trạng Thái</th>
														<th width={109}>Thành tiền</th>
													</tr>
												</thead>
												<tbody>
													{details.orderDetailsList.map((value, key) => (
														<React.Fragment key={key}>
															<tr>
																<td>{value.productName}</td>
																<td>{value.originPrice}</td>
																<td>{value.count}</td>
																<td>{value.status} </td>
																<td>
																	{value.count *
																		(value.originPrice -
																			(value.originPrice * value.discount) /
																				100)}
																</td>
																{value.status === 'WAIT_FOR_ACCEPTING' ? (
																	<td>
																		<button
																			onClick={e =>
																				cancelOrder(
																					e,
																					value.id,
																					details.historyId,
																					value.productName
																				)
																			}
																			className={
																				'mt-7 ml-10 btn-HistoryPage-userCancel'
																			}>
																			Huỷ
																		</button>
																	</td>
																) : (
																	<></>
																)}
															</tr>
														</React.Fragment>
													))}
												</tbody>
											</table>
										</div>

										<div className={'flex justify-between'}>
											<div></div>
											<div className={'flex gap-4 mt-12 mr-16 mb-6'}>
												<span className={'label-HistoryPage-subHeader'}>
													Thành tiền
												</span>
												<p>
													{details.orderDetailsList.map((value, index) => {
														total.push(
															value.count *
																(value.originPrice -
																	(value.originPrice * value.discount) / 100)
														)

														console.log(total)

														if (details.orderDetailsList.length - index === 1) {
															return total.reduce(function (acc, val) {
																return acc + val
															}, 0)
														}
													})}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<style jsx>{`
						.btn-HistoryPage-userCancel {
							width: 120px;
							height: 42px;
							font-family: 'Roboto';
							font-style: normal;
							font-weight: 700;
							font-size: 15px;
							line-height: 17px;
							align-items: center;
							text-align: center;

							background: #46d362;
							border: 2px solid #2aa71a;
							box-sizing: border-box;
							border-radius: 12px;

							color: #ffffff;
						}
						.div-HistoryPage-container {
							background: #f9f9f9;
						}
						.div-HistoryPage-leftMenu {
							width: 217px;
							height: fit-content;
							background: #ffffff;
							box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
							border-radius: 12px;
						}
						.div-HistoryPage-formAccount {
							width: 100%;
							border-radius: 12px;
							background: #ffffff;
							margin-bottom: 25px;
						}
						.span-HistoryPage-textTitle {
							font-family: Poppins;
							font-style: normal;
							font-weight: 600;
							font-size: 32px;
							line-height: 23px;
							color: #151515;
						}
						.hr-HistoryPage-size {
							height: 0px;
							border-radius: 12px;
						}
						.div-HistoryPage-table {
							margin-left: 32px;
							margin-top: 27px;
							overflow-x: auto;
							width: 92%;
						}
						th {
							font-family: Poppins;
							font-style: normal;
							font-weight: 400;
							font-size: 18px;
							line-height: 23px;
							color: #151515;
						}

						td {
							font-family: Open Sans;
							font-style: normal;
							font-weight: 400;
							font-size: 18px;
							line-height: 23px;
							color: #151515;
						}

						th,
						td {
							vertical-align: top;
							padding: 8px;
						}
						.label-HistoryPage-subHeader {
							font-family: Poppins;
							font-style: normal;
							font-weight: 700;
							font-size: 18px;
							line-height: 23px;

							color: #151515;
						}
						th {
							font-family: Poppins;
							font-style: normal;
							font-weight: 700;
							font-size: 18px;
							line-height: 23px;

							color: #151515;
						}
						p {
							font-family: Open Sans;
							font-style: normal;
							font-weight: 400;
							font-size: 16px;
							line-height: 23px;

							color: #151515;
						}
						span {
							width: 166px;
							text-align: end;
						}
						.div-test {
							width: 92%;
							margin-left: 42px;
						}
					`}</style>
				</>
			)
		} else {
			return <></>
		}
	}
}

export default HistoryPage
