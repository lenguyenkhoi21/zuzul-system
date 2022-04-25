import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../reducer/User.Reducer'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../reducer/LeftMenuUser.Reducer'
import Link from 'next/link'
import Image from 'next/image'
import Authentication from '../../component/common/Authentication'
import { API_DOMAIN, API_USER_SERVICE } from '../../utils/APIUtils'
import { SEARCH_ACTION, SearchContext } from '../../reducer/Search.Reducer'

const CartPage = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)
	const searchCTX = useContext(SearchContext)
	const [cart, setCart] = useState([])
	const [total, setTotal] = useState(0)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Giỏ Hàng')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.RESET)
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)

		if (userCTX.state.userID !== null) {
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/${userCTX.state.userID}/cart`,
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						Authorization: `Bearer ${userCTX.state.accessToken}`
					}
				}
			)
				.then(response => {
					if (response.status === 200) return response.json()
				})
				.then(data => {
					console.dir(data)
					setCart(data.cartModelList)
					setTotal(data.totalMoney)
				})
		}
	}, [userCTX.state.userID])

	const changeNumber = (e, productId, purchaserId) => {
		e.preventDefault()

		let payload = {
			purchaserId: purchaserId,
			productId: productId,
			count: e.target.value
		}
		// api change number card
		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/cart`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(
				response => response.json() /*{
				if (response.status === 200) {
					return response.json()
				}
			}*/
			)
			.then(data => {
				setCart(data.cartModelList)
				setTotal(data.totalMoney)
			})
	}

	const deleteProductCart = (e, purchaserId, productId) => {
		e.preventDefault()

		let payload = {
			purchaserId: purchaserId,
			productId: productId
		}

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/cart`, {
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
					return response.json()
				}
			})
			.then(data => {
				console.log(data)
				setCart(data.cartModelList)
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
				<div className={'grid px-330 div-CartPage-container'}>
					<div className={'flex div-CartPage-homeText'}>
						<div>
							<p className={'p-CartPage-subHeader'}>Trang chủ</p>
						</div>
						<div>
							<p className={'mr-2 ml-2 p-CartPage-subHeader'}>/</p>
						</div>
						<div>
							<p className={'p-CartPage-textProduct'}>Giỏ hàng</p>
						</div>
					</div>
					<div className={'div-CartPage-formSize'}>
						<div className={'mt-10 ml-10'}>
							<p className={'span-ListProduct-textTitle'}>Giỏ Hàng</p>
						</div>
						<hr className={'mt-7 mr-10 ml-10 hr-ListProduct-size'} />
						<div className={'grid grid-col-1 div-CartPage-marginTable'}>
							<div>
								<table className={'div-ListProduct-table'}>
									<thead align={'center'}>
										<tr>
											<th width={208}>Sản phẩm</th>
											<th width={341}>Tên Sản Phẩm</th>
											<th width={148}>Giá tiền</th>
											<th width={156}>Số lượng</th>
											<th width={177}>Xóa</th>
										</tr>
									</thead>
									<tbody>
										{cart.map((value, key) => (
											<React.Fragment key={key}>
												<tr>
													<td>
														<div>
															<Image
																width={165}
																height={98}
																src={'/png/userImage.png'}
															/>
														</div>
													</td>
													<td>{value.productName}</td>
													<td>{value.originPrice}</td>
													<td>
														<div>
															<input
																className={'input-CartPage-amount'}
																min={1}
																defaultValue={value.count}
																type={'number'}
																onChange={e =>
																	changeNumber(
																		e,
																		value.productId,
																		value.purchaserId
																	)
																}
															/>
														</div>
													</td>
													<td>
														<div>
															<button
																className={'btn-ListProduct-edit'}
																value={value.productId}
																onClick={e =>
																	deleteProductCart(
																		e,
																		value.purchaserId,
																		value.productId
																	)
																}>
																Xóa
															</button>
														</div>
													</td>
												</tr>
											</React.Fragment>
										))}
										<tr>
											<th colSpan={4}>Tổng tiền:</th>
											<td>{total}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className={'flex justify-center'}>
							<Link href={'/checkout'}>
								<button className={'btn-CartPage-checkout'}>Thanh toán</button>
							</Link>
						</div>
					</div>
				</div>
				<style jsx>{`
					.div-CartPage-container {
						background: #f9f9f9;
					}
					.div-CartPage-homeText {
						width: 100%;

						align-items: center;
						padding: 16px 45px;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						background: #fdfdfd;
					}
					.p-CartPage-subHeader {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 12px;
						line-height: 16px;

						color: #a9a9a9;
					}
					.p-CartPage-textProduct {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 12px;
						line-height: 16px;

						color: #151515;
					}
					.div-ListProduct-table {
						background-color: transparent;
						border-color: gray;
						border-collapse: collapse;
						overflow-x: auto;
						width: 92%;
					}
					.div-CartPage-formSize {
						width: 100%;
						margin-top: 2px;
						background: #ffffff;
					}
					.hr-ListProduct-size {
						height: 0px;
						border-radius: 12px;
					}
					.span-ListProduct-textTitle {
						width: 164px;
						height: 25px;
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.btn-ListProduct-edit {
						width: 55px;
						height: 36px;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 22px;

						color: #ffffff;
						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.div-CartPage-marginTable {
						margin-left: 100px;
						margin-top: 37px;
					}
					th {
						border: 1px solid gray;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 700;
						font-size: 20px;
						line-height: 23px;

						color: #151515;
					}
					td {
						border: 1px solid gray;
						text-align: center;
						font-family: 'Open Sans';
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;

						color: #151515;
					}
					th,
					td {
						padding: 8px;
					}
					.input-CartPage-amount {
						width: 60px;
						cursor: text;
						text-align: center;
						border-width: 1px;
						font-family: inherit;
						line-height: inherit;
						font-size: inherit;
					}
					.btn-CartPage-checkout {
						width: 218px;
						height: 57px;
						margin-top: 30px;
						margin-bottom: 30px;

						font-family: 'Poppins';
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 22px;

						color: #ffffff;
						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;
					}
				`}</style>
			</>
		)
	}
}

export default CartPage
