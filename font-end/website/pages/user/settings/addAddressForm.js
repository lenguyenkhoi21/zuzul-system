import React, { useContext, useEffect } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import { timeNow } from '../../../utils/Utils'
import Link from 'next/link'
import Authentication from '../../../component/common/Authentication'
import { UserContext } from '../../../reducer/User.Reducer'
const AddAddressFormPage = () => {
	console.log(
		`${timeNow()} --- [AddAddressForm] --- /user/settings/AddAddressForm.js`
	)

	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Thêm địa chỉ')
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				<div className={'flex justify-center px-330'}>
					<form className={'form-AddAddressForm-size '}>
						<div>
							<div>
								<div className={'div-AddAddressForm-textHeader'}>
									<span>Địa chỉ mới</span>
								</div>

								<div className={'grid gap-6'}>
									<div className={'ml-20 '}>
										<label>Họ Và Tên</label>
										<input className={'ml-14 input-AddAddressForm-name'} />
									</div>
									<div>
										<label className={'ml-14'}>Số Điện Thoại</label>
										<input className={'ml-14 input-AddAddressForm-name'} />
									</div>
									<div className={'div-AddAddressForm-marginPhone'}>
										<label>Tỉnh/Thành Phố</label>
										<input className={'ml-14 input-AddAddressForm-city'} />
									</div>
									<div className={'div-AddAddressForm-marginDistrict'}>
										<label>Quận/Huyện</label>
										<input className={'ml-14 input-AddAddressForm-district'} />
									</div>
									<div className={'div-AddAddressForm-marginWard'}>
										<label>Phường/Xã</label>
										<input className={'ml-14 input-AddAddressForm-district'} />
									</div>
									<div className={'div-AddAddressForm-marginAddress'}>
										<label>Địa Chỉ Cụ Thể</label>
										<input className={'ml-14 input-AddAddressForm-name'} />
									</div>
								</div>

								<div className={'grid gap-5 justify-center mt-6 mr-9'}>
									<div className={'flex item-center'}>
										<input
											className={'input-AddAddressForm-radioBtn'}
											name={'tag'}
											type={'radio'}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ mặc định</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-AddAddressForm-radioBtn'}
											name={'tag'}
											type={'radio'}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ lấy hàng</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-AddAddressForm-radioBtn'}
											name={'tag'}
											type={'radio'}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ trả hàng</label>
									</div>
								</div>

								<div
									className={'flex justify-end div-AddAddressForm-marginBtn'}>
									<Link href={'/user/settings/address'}>
										<a>
											<button className={'btn-AddAddressForm-back'}>
												Trở Lại
											</button>
										</a>
									</Link>
									<button className={'ml-5 btn-AddAddressForm-complete'}>
										Hoàn Thành
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

				<style jsx>{`
					.form-AddAddressForm-size {
						width: 668px;
						height: 719px;

						background: #ffffff;

						box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.15);
					}
					.div-AddAddressForm-textHeader {
						margin-top: 35px;
						margin-left: 47px;
						margin-bottom: 35px;
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;

						color: #151515;
					}
					label {
						font-family: Poppins;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;

						color: #151515;
					}
					.input-AddAddressForm-size {
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-AddAddressForm-name {
						width: 400px;
						height: 42px;

						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-AddAddressForm-city {
						width: 160px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-AddAddressForm-district {
						width: 220px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.div-AddAddressForm-marginPhone {
						margin-left: 43px;
					}
					.div-AddAddressForm-marginDistrict {
						margin-left: 69px;
					}
					.div-AddAddressForm-marginWard {
						margin-left: 77px;
					}
					.div-AddAddressForm-marginAddress {
						margin-left: 45px;
					}
					.input-AddAddressForm-radioBtn {
						width: 24px;
						height: 24px;
						background: #ffffff;

						border: 1.5px solid #d1d1d1;
					}
					.btn-AddAddressForm-back {
						width: 110px;
						height: 32px;

						background: #ffffff;
						border: 1px solid #46d362;
						box-sizing: border-box;
						border-radius: 12px;

						font-family: Roboto;
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 17px;

						align-items: center;
						text-align: center;

						color: #777777;
					}
					.btn-AddAddressForm-complete {
						width: 118px;
						height: 32px;
						margin-right: 28px;

						background: #46d362;
						border: 1px solid #46d362;
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
					}
					.div-AddAddressForm-marginBtn {
						margin-top: 51px;
					}
				`}</style>
			</>
		)
	}
}

export default AddAddressFormPage