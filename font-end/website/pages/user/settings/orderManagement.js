import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import { UserContext } from '../../../reducer/User.Reducer'
import Authentication from '../../../component/common/Authentication'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../component/common/UserAccountBackground'
import {
	API_DOMAIN,
	API_PRODUCT_SERVICE,
	API_USER_SERVICE
} from '../../../utils/APIUtils'

const OrderManagementPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)

	const [historyShop, setHistoryShop] = useState([])
	const [categoryList, setCategoryList] = useState([])

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Quản lí đơn hàng')

		if (userCTX.state.userID !== null)
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/${userCTX.state.userID}/historyShop/ALL/ALL`,
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
					setHistoryShop(data)
				})

		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/category/all`, {
			method: 'GET',
			mode: 'cors'
		})
			.then(response => {
				if (response.status === 200) {
					return response.json()
				}
			})
			.then(data => {
				setCategoryList(data)
			})
	}, [userCTX.state.userID])

	/*  const objectsEqual = (object_1, object_2) =>
    typeof object_1 === 'object' && Object.keys(object_1).length > 0
      ? Object.keys(object_1).length === Object.keys(object_2).length
      && Object.keys(object_1).every(attribute => objectsEqual(object_1[attribute], object_2[attribute]))
      : object_1 === object_2

  const arraysEqual = (array_1, array_2) =>
    array_1.length === array_2.length && array_1.every((object, index) => objectsEqual(object, array_2[index]))*/

	const [key, setKey] = useState({
		category: 'ALL',
		status: 'ALL'
	})

	/*const set = useCallback((e) => {
    setKey( {...key, [e.target.name]: e.target.value})
  }, [key])*/

	const filterList = e => {
		//(e.target.name === 'category') ? key.category = e.target.value : key.status = e.target.value

		e.persist()
		e.preventDefault()

		// set(e)

		/*		fetch(
			`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/${userCTX.state.userID}/historyShop/${key.status}/${key.category}`,
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
				setHistoryShop(data)
			})*/
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
				<div className={'px-330 div-OrderManagement-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-OrderManagement-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-OrderManagement-formAccount'}>
								<div className={'mt-10 ml-10'}>
									<p className={'span-OrderManagement-textTitle'}>
										Quản lí đơn hàng
									</p>
								</div>
								<hr className={'mt-7 mr-10 ml-10 hr-OrderManagement-size'} />
								<div className={'flex grid-flow-col justify-end mt-6'}>
									<div className={'div-OrderManagement-marginCategory'}>
										<select
											className={'select-OrderManagement-color'}
											onChange={filterList}
											name={'category'}>
											<option value='ALL'>Chọn danh mục</option>
											{categoryList.map((value, key) => (
												<React.Fragment key={key}>
													<option value={value.categoryId}>
														{value.categoryName}
													</option>
												</React.Fragment>
											))}
										</select>
									</div>
									<div className={'div-OrderManagement-marginStatus'}>
										<select
											className={'select-OrderManagement-color '}
											name={'status'}
											onChange={filterList}>
											<option value='ALL'>Chọn trạng thái</option>
											<option value='WAIT_FOR_ACCEPTING'>Chờ xác nhận</option>
											<option value='WAIT_FOR_GETTING'>Chờ lấy hàng</option>
											<option value='DELIVERING'>Đang giao</option>
											<option value='DELIVERED'>Đã giao</option>
										</select>
									</div>
								</div>
								<div>
									<table className={'div-OrderManagement-table'}>
										<thead align={'left'}>
											<tr>
												<th width={145}>Mã Đơn Hàng</th>
												<th width={200}>Vị trí</th>
												<th width={245}>Tên Sản Phẩm</th>
												<th width={150}>Số Lượng</th>
												<th width={180}>Danh Mục</th>
												<th width={100}>Giá (Đã sale)</th>
												<th width={150}>Trạng Thái</th>
												<th width={100}></th>
											</tr>
										</thead>
										<tbody>
											{historyShop.map((value, key) => (
												<React.Fragment key={key}>
													<tr>
														<td>{value.historyId}</td>
														<td>{value.address}</td>
														<td>{value.productName}</td>
														<td>{value.count}</td>
														<td>{value.categoryName}</td>
														<td>
															{value.count *
																(value.originPrice -
																	(value.originPrice * value.discount) /
																		100)}{' '}
															đ
														</td>
														<td>
															<select
																className={'select-OrderManagement-table'}>
																<option value='ALL'>Chọn trạng thái</option>
																<option value='WAIT_FOR_ACCEPTING'>
																	Chờ xác nhận
																</option>
																<option value='WAIT_FOR_GETTING'>
																	Chờ lấy hàng
																</option>
																<option value='DELIVERING'>Đang giao</option>
																<option value='DELIVERED'>Đã giao</option>
															</select>
														</td>
														<td>
															<button className={'btn-OrderManagement-size'}>
																xóa
															</button>
														</td>
													</tr>
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
					.div-OrderManagement-container {
						background: #f9f9f9;
					}
					.hr-OrderManagement-size {
						height: 0px;
						border-radius: 12px;
					}
					.div-OrderManagement-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
						margin-bottom: 25px;
					}
					.div-OrderManagement-formAccount {
						width: 100%;
						border-radius: 12px;
						background: #ffffff;
						margin-bottom: 25px;
					}
					.span-OrderManagement-textTitle {
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
						padding: 12px 5px;
					}

					.div-OrderManagement-table {
						margin-left: 38px;
						margin-top: 12px;
						overflow-x: auto;
						width: 92%;
					}
					.div-OrderManagement-marginStatus {
						margin-right: 148px;
					}
					.div-OrderManagement-marginCategory {
						margin-right: 10px;
					}
					.select-OrderManagement-color {
						background: #46d362;
						border: 1px solid #000000;
						box-sizing: border-box;
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;

						color: #ffffff;
					}
					.select-OrderManagement-table {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;

						border: 1px solid #000000;
						box-sizing: border-box;

						color: #151515;
						background: #ffffff;
					}
					.btn-OrderManagement-size {
						width: 55px;
						height: 30px;
						background: #46d362;
						border: 1px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;
						font-family: Poppins;
						font-style: normal;
						font-weight: bold;
						font-size: 15px;
						line-height: 22px;

						color: #ffffff;
					}
				`}</style>
			</>
		)
	}
}

export default OrderManagementPage
