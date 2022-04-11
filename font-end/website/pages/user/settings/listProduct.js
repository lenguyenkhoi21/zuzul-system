import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../reducer/User.Reducer'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../component/common/Authentication'
import LeftMenuUser from '../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../component/common/UserAccountBackground'
import Link from 'next/link'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../../utils/APIUtils'

const ListProduct = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	const [product, setProduct] = useState([])

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Tất cả sản phẩm')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.RESET)
		if (userCTX.state.userID !== null) {
			fetch(
				`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/user/product/${userCTX.state.userID}/all`,
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						Authorization: `Bearer ${userCTX.state.accessToken}`
					}
				}
			)
				.then(response => response.json())
				.then(data => setProduct(data))
		}
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
				<div className={'px-330 div-ListProduct-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-ListProduct-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-ListProduct-formAccount'}>
								<div className={'flex justify-between'}>
									<div className={'mt-10 ml-10'}>
										<p className={'span-ListProduct-textTitle'}>
											Tất Cả Sản Phẩm
										</p>
									</div>
									<div>
										<Link href={'/product/addNewProduct'}>
											<button
												className={
													'flex justify-center items-center btn-ListProduct-addPrd'
												}>
												<span className={'mr-5 span-ListProduct-plus'}>+</span>
												Thêm Sản Phẩm Mới
											</button>
										</Link>
									</div>
								</div>

								<hr className={'mt-7 mr-10 ml-10 hr-ListProduct-size'} />
								<div className={'grid grid-col-1'}>
									<div>
										<table className={'mb-6 div-ListProduct-table'}>
											<thead align={'left'}>
												<tr>
													<th width={225}>Tên Sản Phẩm</th>
													<th width={139}>Danh Mục</th>
													<th width={139}>Danh Mục con</th>
													<th width={82}>Giá</th>
													<th width={150}>Kho Hàng</th>
													<th width={100}>Đã Bán</th>
													<th width={174}>Sửa/Xóa Thông Tin</th>
												</tr>
											</thead>
											<tbody>
												{product.map((value, key) => (
													<React.Fragment key={key}>
														<tr>
															<td>{value.productName}</td>
															<td>{value.categoryName}</td>
															<td>{value.subCategoryName}</td>
															<td>{value.originPrice}</td>
															<td>{value.numberInStorage}</td>
															<td>{value.sales}</td>
															<td>
																<div className={'flex gap-2'}>
																	<div>
																		<Link
																			href={`/user/settings/editProductForm/${value.productId}`}>
																			<button
																				className={'btn-ListProduct-edit'}>
																				Sửa
																			</button>
																		</Link>
																	</div>
																	<div>
																		<button className={'btn-ListProduct-edit'}>
																			Xóa
																		</button>
																	</div>
																</div>
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
				</div>
				<style jsx>{`
					.div-ListProduct-container {
						background: #f9f9f9;
					}
					.hr-ListProduct-size {
						height: 0px;
						border-radius: 12px;
					}
					.div-ListProduct-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
					}
					.div-ListProduct-formAccount {
						width: 100%;
						border-radius: 12px;
						background: #ffffff;
						margin-bottom: 25px;
					}
					.span-ListProduct-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.btn-ListProduct-addPrd {
						width: 213px;
						height: 36px;
						margin-top: 26px;
						margin-right: 70px;
						font-family: 'Roboto';
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
					.btn-ListProduct-edit {
						width: 55px;
						height: 30px;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 22px;

						color: #ffffff;
						background: #46d362;
						border: 1px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.div-ListProduct-table {
						margin-left: 32px;
						margin-top: 27px;
						overflow-x: auto;
						width: 92%;
					}
					.span-ListProduct-plus {
						font-family: 'Poppins', sans-serif;
						font-style: normal;
						font-weight: 900;
						font-size: 20px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #ffffff;
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
				`}</style>
			</>
		)
	}
}

export default ListProduct
