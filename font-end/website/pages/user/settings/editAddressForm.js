import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import Authentication from '../../../component/common/Authentication'
import { timeNow } from '../../../utils/Utils'
import { TITLE_ACTION, TitleContext } from '../../../reducer/Title.Reducer'
import { UserContext } from '../../../reducer/User.Reducer'
const EditAddressFormPage = () => {
	console.log(
		`${timeNow()} --- [EditAddressForm] --- /user/settings/editAddressForm.js`
	)

	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Sửa địa chỉ')
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
					<form className={'form-EditAddressForm-size '}>
						<div>
							<div>
								<div className={'div-EditAddressForm-textHeader'}>
									<span>Chỉnh Sửa Địa Chỉ</span>
								</div>

								<div className={'grid gap-6'}>
									<div className={'ml-20 '}>
										<label>Họ Và Tên</label>
										<input className={'ml-14 input-EditAddressForm-name'} />
									</div>
									<div>
										<label className={'ml-14'}>Số Điện Thoại</label>
										<input className={'ml-14 input-EditAddressForm-name'} />
									</div>
									<div className={'div-EditAddressForm-marginPhone'}>
										<label>Tỉnh/Thành Phố</label>
										<input className={'ml-14 input-EditAddressForm-city'} />
									</div>
									<div className={'div-EditAddressForm-marginDistrict'}>
										<label>Quận/Huyện</label>
										<input className={'ml-14 input-EditAddressForm-district'} />
									</div>
									<div className={'div-EditAddressForm-marginWard'}>
										<label>Phường/Xã</label>
										<input className={'ml-14 input-EditAddressForm-district'} />
									</div>
									<div className={'div-EditAddressForm-marginAddress'}>
										<label>Địa Chỉ Cụ Thể</label>
										<input className={'ml-14 input-EditAddressForm-name'} />
									</div>
								</div>

								<div className={'grid gap-5 justify-center mt-6 mr-9'}>
									<div className={'flex item-center'}>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'tag'}
											type={'radio'}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ mặc định</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'tag'}
											type={'radio'}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ lấy hàng</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'tag'}
											type={'radio'}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ trả hàng</label>
									</div>
								</div>

								<div
									className={'flex justify-end div-EditAddressForm-marginBtn'}>
									<Link href={'/user/settings/address'}>
										<a>
											<button className={'btn-EditAddressForm-back'}>
												Trở Lại
											</button>
										</a>
									</Link>
									<button className={'ml-5 btn-EditAddressForm-complete'}>
										Hoàn Thành
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

				<style jsx>{`
					.form-EditAddressForm-size {
						width: 668px;
						height: 719px;

						background: #ffffff;

						box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.15);
					}
					.div-EditAddressForm-textHeader {
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
					.input-EditAddressForm-size {
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-EditAddressForm-name {
						width: 400px;
						height: 42px;

						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-EditAddressForm-city {
						width: 160px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.input-EditAddressForm-district {
						width: 220px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
					}
					.div-EditAddressForm-marginPhone {
						margin-left: 43px;
					}
					.div-EditAddressForm-marginDistrict {
						margin-left: 69px;
					}
					.div-EditAddressForm-marginWard {
						margin-left: 77px;
					}
					.div-EditAddressForm-marginAddress {
						margin-left: 45px;
					}
					.input-EditAddressForm-radioBtn {
						width: 24px;
						height: 24px;
						background: #ffffff;

						border: 1.5px solid #d1d1d1;
					}
					.btn-EditAddressForm-back {
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
					.btn-EditAddressForm-complete {
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
					.div-EditAddressForm-marginBtn {
						margin-top: 51px;
					}
				`}</style>
			</>
		)
	}
}

export default EditAddressFormPage
