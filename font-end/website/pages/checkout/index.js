import React, { useContext, useEffect } from 'react'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import { UserContext } from '../../reducer/User.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../component/common/Authentication'
import Image from 'next/image'

const CheckoutPage = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Thanh toán')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.RESET)
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
				<div className={'px-330 div-CheckoutPage-container'}>
					<div className={'flex div-CheckoutPage-homeText'}>
						<div>
							<p className={'p-CheckoutPage-subHeader'}>Trang chủ</p>
						</div>
						<div>
							<p className={'mr-2 ml-2 p-CheckoutPage-subHeader'}>/</p>
						</div>
						<div>
							<p className={'p-CheckoutPage-textProduct'}>Thanh toán</p>
						</div>
					</div>
					<div className={'flex div-CheckoutPage-formSize'}>
						{/*phan1*/}
						<div className={'div-CheckoutPage-margin'}>
							<div className={'div-CheckoutPage-padding'}>
								<span>Thông tin hóa đơn</span>
								<br />
								<p className={'p-CheckoutPage-subHeader'}>
									Vui lòng nhập thông tin thanh toán của bạn
								</p>
							</div>

							{/*ten va sdt*/}
							<div>
								<div className={'flex'}>
									<div className={'div-CheckoutPage-padding'}>
										<label>Tên</label>
										<br />
										<input
											className={'input-CheckoutPage-informationSize'}
											placeholder={'Tên'}
										/>
									</div>
									<div className={'div-CheckoutPage-padding'}>
										<label>Số điện thoại</label>
										<br />
										<input
											className={'input-CheckoutPage-informationSize'}
											placeholder={'Số điện thoại'}
										/>
									</div>
								</div>
							</div>

							{/*dia chi, thanh pho*/}
							<div>
								<div className={'flex'}>
									<div className={'div-CheckoutPage-padding'}>
										<label>Địa chỉ</label>
										<br />
										<input
											className={'input-CheckoutPage-informationSize'}
											placeholder={'Địa chỉ'}
										/>
									</div>
									<div className={'div-CheckoutPage-padding'}>
										<label>Thành phố</label>
										<br />
										<input
											className={'input-CheckoutPage-informationSize'}
											placeholder={'Thành phố'}
										/>
									</div>
								</div>
							</div>

							{/*quoc gia*/}
							<div className={'div-CheckoutPage-padding'}>
								<label>Quốc gia</label>
								<br />
								<input
									className={'input-CheckoutPage-informationSize'}
									placeholder={'Quốc gia'}
								/>
							</div>

							<div className={'mt-12 ml-4'}>
								<span>Thông tin bổ sung</span>
								<br />
								<p className={'p-CheckoutPage-subHeader'}>
									Cần thứ gì khác? Chúng tôi sẽ làm cho nó cho bạn!
								</p>
							</div>

							<div className={'mt-8 ml-4'}>
								<label>Ghi chú đơn hàng</label>
								<br />
								<textarea
									className={'input-CheckoutPage-description'}
									placeholder={
										'Cần một ngày giao hàng cụ thể? Gửi gitf? Hãy cùng nói nào ...'
									}
								/>
							</div>

							<div className={'mt-16 ml-4'}>
								<div>
									<span>Xác nhận</span>
									<br />
									<p className={'p-CheckoutPage-subHeader'}>
										Chúng ta đang đi đến bước cuối cùng. Chỉ cần vài cú nhấp
										chuột và đơn đặt hàng của bạn đã sẵn sàng!
									</p>
								</div>
								<div className={'mt-8 '}>
									<div
										className={
											'flex items-center mb-4 div-CheckoutPage-radioBtn'
										}>
										<input
											className={'mr-2 ml-4 input-CheckoutPage-radio'}
											type={'radio'}
											name={'tag'}
										/>
										<p>
											Tôi đồng ý với việc gửi email Tiếp thị và bản tin. Không
											có thư rác, được chấp nhận!
										</p>
									</div>
									<div
										className={'flex items-center div-CheckoutPage-radioBtn'}>
										<input
											className={'mr-2 ml-4 input-CheckoutPage-radio'}
											type={'radio'}
											name={'tag'}
										/>
										<p>
											Tôi đồng ý với các điều khoản và điều kiện và chính sách
											bảo mật của chúng tôi.
										</p>
									</div>
								</div>
							</div>
							<div className={'ml-4'}>
								<button className={'btn-CheckoutPage-accept'}>Đặt Hàng</button>
							</div>
						</div>

						{/*phan2*/}
						<div className={'div-CheckoutPage-form2 '}>
							<div className={'mt-8 mr-4 mb-4 ml-4'}>
								<span>Sản phẩm</span>
								<br />
								<p className={'mb-2 p-CheckoutPage-subHeader'}>
									Giá có thể thay đổi tùy thuộc vào phương tiện vận chuyển và
									nơi bạn sống.
								</p>

								{/*product*/}
								<div className={'mt-8'}>
									<div className={'flex mb-8'}>
										<div>
											<Image
												width={100}
												height={67}
												src={'/png/userImage.png'}
											/>
											<br />
											<button className={'p-CheckoutPage-delete'}>xóa</button>
										</div>
										<div className={'flex'}>
											{/*p1*/}
											<div>
												<p className={'p-CheckoutPage-productName'}>
													Tên sản phẩm 1
												</p>
												<div className={'flex items-center'}>
													<div>
														<p className={'p-CheckoutPage-subHeader'}>
															Xuất xứ:
														</p>
													</div>
													<div>
														<p className={'p-CheckoutPage-textProduct'}>
															nông trại ?
														</p>
													</div>
												</div>
												<div className={'flex items-center'}>
													<div>
														<p className={'p-CheckoutPage-subHeader'}>
															Hạn sử dụng:
														</p>
													</div>
													<div>
														<p className={'p-CheckoutPage-textProduct'}>
															còn 1 ngày
														</p>
													</div>
												</div>
												<div>
													<p className={'p-CheckoutPage-priceText'}>99.000 đ</p>
													<p className={'p-CheckoutPage-textSale'}>120.000 đ</p>
												</div>
											</div>
											{/*p2*/}
											<div className={'flex items-end'}>
												<div
													className={
														'flex justify-center div-CheckoutPage-amount'
													}>
													<div>
														<button>-</button>
													</div>
													<div className={'mr-5 ml-5'}>
														<p>1</p>
													</div>
													<div>
														<button>+</button>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={'flex mb-8'}>
										<div>
											<Image
												width={100}
												height={67}
												src={'/png/userImage.png'}
											/>
											<br />
											<button className={'p-CheckoutPage-delete'}>xóa</button>
										</div>
										<div className={'flex'}>
											{/*p1*/}
											<div>
												<p className={'p-CheckoutPage-productName'}>
													Tên sản phẩm 2
												</p>
												<div className={'flex items-center'}>
													<div>
														<p className={'p-CheckoutPage-subHeader'}>
															Xuất xứ:
														</p>
													</div>
													<div>
														<p className={'p-CheckoutPage-textProduct'}>
															nông trại ?
														</p>
													</div>
												</div>
												<div className={'flex items-center'}>
													<div>
														<p className={'p-CheckoutPage-subHeader'}>
															Hạn sử dụng:
														</p>
													</div>
													<div>
														<p className={'p-CheckoutPage-textProduct'}>
															còn 1 ngày
														</p>
													</div>
												</div>
												<div>
													<p className={'p-CheckoutPage-priceText'}>99.000 đ</p>
													<p className={'p-CheckoutPage-textSale'}>120.000 đ</p>
												</div>
											</div>
											{/*p2*/}
											<div className={'flex items-end'}>
												<div
													className={
														'flex justify-center div-CheckoutPage-amount'
													}>
													<div>
														<button>-</button>
													</div>
													<div className={'mr-5 ml-5'}>
														<p>1</p>
													</div>
													<div>
														<button>+</button>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className={'grid gap-3'}>
										<div className={'flex justify-between'}>
											<label>Thành Tiền</label>
											<label>188.000 VND</label>
										</div>
										<div className={'flex justify-between'}>
											<label>Phí Vận Chuyển</label>
											<label>0 VND</label>
										</div>
										<div className={''}>
											<input
												className={'input-CheckoutPage-saleCode '}
												placeholder={'Nhập mã giảm giá'}
											/>
										</div>
										<div className={'flex justify-between'}>
											<div>
												<label>Tổng Tiền</label>
											</div>
											<div>
												<p className={'p-CheckoutPage-priceText'}>
													188.000 VND
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
					.div-CheckoutPage-container {
						background: #f9f9f9;
					}
					.div-CheckoutPage-margin {
						margin-top: 16px;
						margin-bottom: 16px;
						margin-left: 29px;
					}
					.div-CheckoutPage-padding {
						padding: 16px;
					}
					.div-CheckoutPage-formSize {
						width: 100%;
						margin-top: 2px;
						background: #ffffff;
					}
					span {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 22px;
						line-height: 33px;

						color: #151515;
					}
					label {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 12px;
						line-height: 18px;

						color: #151515;
					}
					.p-CheckoutPage-subHeader {
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 12px;
						line-height: 16px;

						color: #a9a9a9;
					}
					.input-CheckoutPage-informationSize {
						width: 319px;
						height: 42px;

						text-indent: 10px;
						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-CheckoutPage-description {
						width: 670px;
						height: 112px;

						text-indent: 10px;
						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.div-CheckoutPage-form2 {
						width: 468px;
						margin-top: 31px;
						margin-bottom: 16px;
						height: fit-content;
						background: #ffffff;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.p-CheckoutPage-textSale {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 12px;
						line-height: 18px;

						text-decoration-line: line-through;

						color: #a9a9a9;
					}
					.input-CheckoutPage-saleCode {
						width: 436px;
						height: 42px;
						text-indent: 20px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 14px;
						line-height: 19px;

						color: #a9a9a9;
					}
					.btn-CheckoutPage-accept {
						width: 218px;
						height: 56px;

						margin-top: 32px;

						background: #46d362;
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Poppins;
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 22px;

						color: #ffffff;
					}
					.div-CheckoutPage-radioBtn {
						width: 601px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						font-family: Open Sans;
						font-style: normal;
						font-weight: normal;
						font-size: 14px;
						line-height: 19px;

						color: #151515;
					}
					.input-CheckoutPage-radio {
						border: 1.5px solid #d1d1d1;
						width: 20px;
						height: 20px;
					}
					.p-CheckoutPage-productName {
						font-family: Poppins;
						font-style: normal;
						font-weight: 500;
						font-size: 15px;
						line-height: 22px;

						color: #151515;
					}
					.p-CheckoutPage-textProduct {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 12px;
						line-height: 16px;

						color: #151515;
					}
					.p-CheckoutPage-priceText {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 18px;
						line-height: 27px;

						color: #46d362;
					}
					.p-CheckoutPage-total {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 12px;
						line-height: 18px;

						color: #151515;
					}
					.p-CheckoutPage-delete {
						width: 45px;
						height: 25px;

						background: #46d362;
						border: 2px solid #2aa71a;
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
					.div-CheckoutPage-homeText {
						width: 100%;

						align-items: center;
						padding: 16px 45px;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						background: #fdfdfd;
					}
					.div-CheckoutPage-amount {
						width: 92px;
						height: 32px;
						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: 'Alata';
						font-style: normal;
						font-weight: 400;
						font-size: 15px;
						line-height: 35px;
						text-align: center;

						color: #46d362;
					}
				`}</style>
			</>
		)
	}
}
export default CheckoutPage
