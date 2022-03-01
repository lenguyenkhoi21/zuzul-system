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
					<div className={'flex div-CheckoutPage-formSize'}>
						{/*phan1*/}
						<div className={''}>
							<div>
								<span>Thông tin hóa đơn</span>
								<br />
								<p className={'p-CheckoutPage-subHeader'}>
									Vui lòng nhập thông tin thanh toán của bạn
								</p>
							</div>

							{/*ten va sdt*/}
							<div>
								<div className={'flex'}>
									<div>
										<label>Tên</label>
										<br />
										<input className={'input-CheckoutPage-informationSize'} />
									</div>
									<div>
										<label>Số điện thoại</label>
										<br />
										<input className={'input-CheckoutPage-informationSize'} />
									</div>
								</div>
							</div>

							{/*dia chi, thanh pho*/}
							<div>
								<div className={'flex'}>
									<div>
										<label>Địa chỉ</label>
										<br />
										<input className={'input-CheckoutPage-informationSize'} />
									</div>
									<div>
										<label>Thành phố</label>
										<br />
										<input className={'input-CheckoutPage-informationSize'} />
									</div>
								</div>
							</div>

							{/*quoc gia*/}
							<div>
								<label>Quốc gia</label>
								<br />
								<input className={'input-CheckoutPage-informationSize'} />
							</div>

							<div>
								<span>Thông tin bổ sung</span>
								<br />
								<p className={'p-CheckoutPage-subHeader'}>
									Cần thứ gì khác? Chúng tôi sẽ làm cho nó cho bạn!
								</p>
							</div>

							<div>
								<div>
									<label>Ghi chú đơn hàng</label>
									<br />
									<input className={'input-CheckoutPage-description'} />
								</div>
							</div>

							<div>
								<div>
									<label>Xác nhận</label>
									<br />
									<p className={'p-CheckoutPage-subHeader'}>
										Chúng ta đang đi đến bước cuối cùng. Chỉ cần vài cú nhấp
										chuột và đơn đặt hàng của bạn đã sẵn sàng!
									</p>
								</div>
								<div>
									<div className={'flex items-center'}>
										<input type={'radio'} name={'tag'} />
										<p>
											Tôi đồng ý với việc gửi email Tiếp thị và bản tin. Không
											có thư rác, được chấp nhận!
										</p>
									</div>
									<div className={'flex items-center'}>
										<input type={'radio'} name={'tag'} />
										<p>
											Tôi đồng ý với các điều khoản và điều kiện và chính sách
											bảo mật của chúng tôi.
										</p>
									</div>
								</div>
							</div>
							<div>
								<button>Đặt Hàng</button>
							</div>
						</div>

						{/*phan2*/}
						<div className={'div-CheckoutPage-form2'}>
							<label>Sản phẩm</label>
							<br />
							<p className={'p-CheckoutPage-subHeader'}>
								Giá có thể thay đổi tùy thuộc vào phương tiện vận chuyển và nơi
								bạn sống.
							</p>

							{/*product*/}
							<div>
								<div className={'flex'}>
									<div>
										<Image
											width={100}
											height={67}
											src={'/png/userImage.png'}></Image>
										<br />
										<button>xóa</button>
									</div>
									<div className={'flex'}>
										{/*p1*/}
										<div>
											<p>Tên sản phẩm 1</p>
											<div>
												<p>Xuất xứ:</p>
												<p>nông trại ?</p>
											</div>
											<div>
												<p>Hạn sử dụng:</p>
												<p>còn 1 ngày</p>
											</div>
											<div>
												<p>99.000 đ</p>
												<p className={'p-CheckoutPage-textSale'}>120.000 đ</p>
											</div>
										</div>
										{/*p2*/}
										<div>
											<div className={'flex'}>
												<div>
													<button>-</button>
												</div>
												<div>
													<p>1</p>
												</div>
												<div>
													<button>+</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className={'flex'}>
									<div>
										<Image
											width={100}
											height={67}
											src={'/png/userImage.png'}></Image>
										<br />
										<button>xóa</button>
									</div>
									<div className={'flex'}>
										{/*p1*/}
										<div>
											<p>Tên sản phẩm 2</p>
											<div>
												<p>Xuất xứ:</p>
												<p>nông trại ?</p>
											</div>
											<div>
												<p>Hạn sử dụng:</p>
												<p>còn 1 ngày</p>
											</div>
											<div>
												<p>99.000 đ</p>
												<p className={'p-CheckoutPage-textSale'}>120.000 đ</p>
											</div>
										</div>
										{/*p2*/}
										<div>
											<div className={'flex'}>
												<div>
													<button>-</button>
												</div>
												<div>
													<p>1</p>
												</div>
												<div>
													<button>+</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div>
									<div className={'flex'}>
										<p>Thành Tiền</p>
										<p>188.000 VND</p>
									</div>
									<div className={'flex'}>
										<p>Phí Vận Chuyển</p>
										<p>0 VND</p>
									</div>
									<div className={''}>
										<input
											className={'input-CheckoutPage-saleCode '}
											placeholder={'Nhập mã giảm giá'}
										/>
									</div>
									<div className={'flex'}>
										<p>Tổng Tiền</p>
										<p>188.000 VND</p>
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
					.div-CheckoutPage-formSize {
						width: 100%;
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

						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-CheckoutPage-description {
						width: 670px;
						height: 112px;

						background: #f9f9f9;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.div-CheckoutPage-form2 {
						background: #ffffff;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.p-CheckoutPage-textSale {
						text-decoration-line: line-through;
					}
					.input-CheckoutPage-saleCode {
						width: 436px;
						height: 42px;

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
				`}</style>
			</>
		)
	}
}
export default CheckoutPage
