import React, { useContext, useEffect } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import { UserContext } from '../../../reducer/User.Reducer'
import Authentication from '../../../component/common/Authentication'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../component/common/UserAccountBackground'

const OrderManagementPage = () => {
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Quản lí đơn hàng')
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
										<select className={'select-OrderManagement-color'}>
											<option value='0'>Chọn danh mục</option>
											<option value='1'>Sách</option>
											<option value='1'>Thời trang nam</option>
											<option value='2'>Thời trang nữ</option>
											<option value='3'>Đồng Hồ</option>
											<option value='4'>Điện thoại & phụ kiện</option>
											<option value='5'>Mẹ & Bé</option>
											<option value='6'>Giày dép</option>
											<option value='7'>Thiết bị điện tử</option>
											<option value='8'>Nhà cửa & Đời sống</option>
											<option value='9'>Máy tính & Laptop</option>
											<option value='10'>Máy ảnh & Máy quay phim</option>
											<option value='11'>Sắc đẹp</option>
											<option value='12'>Sức khỏe</option>
										</select>
									</div>
									<div className={'div-OrderManagement-marginStatus'}>
										<select className={'select-OrderManagement-color '}>
											<option value='0'>Chọn trạng thái</option>
											<option value='1'>Chờ xác nhận</option>
											<option value='2'>Chờ lấy hàng</option>
											<option value='3'>Đang giao</option>
											<option value='4'>Đã giao</option>
										</select>
									</div>
								</div>
								<div>
									<table className={'div-OrderManagement-table'}>
										<thead align={'left'}>
											<tr>
												<th width={125}>Mã Đơn Hàng</th>
												<th width={245}>Tên Sản Phẩm</th>
												<th>Số Lượng</th>
												<th>Danh Mục</th>
												<th>Giá</th>
												<th>Trạng Thái</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>995230900</td>
												<td>Tâm Lý Học - Phác Họa Chân Dung Kẻ Phạm Tội</td>
												<td>2</td>
												<td>Sách</td>
												<td>120.000 đ</td>
												<td>
													<select className={'select-OrderManagement-table'}>
														<option value='0'>Chọn trạng thái</option>
														<option value='1'>Chờ xác nhận</option>
														<option value='2'>Chờ lấy hàng</option>
														<option value='3'>Đang giao</option>
														<option value='3'>Đã giao</option>
													</select>
												</td>
												<td>
													<button className={'btn-OrderManagement-size'}>
														xóa
													</button>
												</td>
											</tr>
											<tr>
												<td>995230900</td>
												<td>Tâm Lý Học - Phác Họa Chân Dung Kẻ Phạm Tội</td>
												<td>2</td>
												<td>Sách</td>
												<td>120.000 đ</td>
												<td>
													<select className={'select-OrderManagement-table'}>
														<option value='0'>Chọn trạng thái</option>
														<option value='1'>Chờ xác nhận</option>
														<option value='2'>Chờ lấy hàng</option>
														<option value='3'>Đang giao</option>
														<option value='3'>Đã giao</option>
													</select>
												</td>
												<td>
													<button className={'btn-OrderManagement-size'}>
														xóa
													</button>
												</td>
											</tr>
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
						border: 2px solid #2aa71a;
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
