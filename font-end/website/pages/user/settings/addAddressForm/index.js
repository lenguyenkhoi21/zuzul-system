import React, { useContext, useEffect, useState } from 'react'
import { TITLE_ACTION, TitleContext } from '../../../../reducer/Title.Reducer'
import { timeNow } from '../../../../utils/Utils'
import Link from 'next/link'
import Authentication from '../../../../component/common/Authentication'
import { UserContext } from '../../../../reducer/User.Reducer'
import { API_DOMAIN, API_USER_SERVICE } from '../../../../utils/APIUtils'
import { useRouter } from 'next/router'
const AddAddressFormPage = () => {
	console.log(
		`${timeNow()} --- [AddAddressForm] --- /user/settings/AddAddressForm.js`
	)

	const router = useRouter()

	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)

	const [address, setAddress] = useState({
		userName: '',
		userPhone: '',
		userWard: '',
		userDistinct: '',
		userCity: '',
		detailsAddress: '',
		userId: userCTX.state.userID,
		type: []
	})

	const onChange = e => {
		if (e.target.name === 'type') {
			if (e.target.value === 'YES')
				setAddress({ ...address, [e.target.name]: true })

			if (e.target.value === 'NO')
				setAddress({ ...address, [e.target.name]: false })
		} else {
			setAddress({ ...address, [e.target.name]: e.target.value })
		}
	}

	const addAddress = e => {
		e.preventDefault()

		console.log(address)

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/address`, {
			mode: 'cors',
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(address)
		})
			.then(response => {
				if (response.status === 200) {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Thêm Địa Chỉ Thành Công'
					)
					return response.json()
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Thêm Địa Chỉ Thất Bại'
					)
				}
			})
			.then(data => {
				if (data.status === 'SUCCESS') {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Thêm Địa Chỉ Thành Công'
					)
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Thêm Địa Chỉ Thất Bại'
					)
				}
				router.push('/user/settings/address')
			})
	}

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Thêm địa chỉ')
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				<div className={'flex justify-center px-330'}>
					<form className={'form-AddAddressForm-size '} onSubmit={addAddress}>
						<div>
							<div>
								<div className={'div-AddAddressForm-textHeader'}>
									<span>Địa chỉ mới</span>
								</div>

								<div className={'grid gap-6'}>
									<div className={'ml-20 '}>
										<label>Họ Và Tên</label>
										<input
											className={'ml-14 input-AddAddressForm-name'}
											name={'userName'}
											onChange={onChange}
										/>
									</div>
									<div>
										<label className={'ml-14'}>Số Điện Thoại</label>
										<input
											className={'ml-14 input-AddAddressForm-name'}
											name={'userPhone'}
											onChange={onChange}
										/>
									</div>
									<div className={'div-AddAddressForm-marginPhone'}>
										<label>Tỉnh/Thành Phố</label>
										<input
											className={'ml-14 input-AddAddressForm-city'}
											name={'userCity'}
											onChange={onChange}
										/>
									</div>
									<div className={'div-AddAddressForm-marginDistrict'}>
										<label>Quận/Huyện</label>
										<input
											className={'ml-14 input-AddAddressForm-district'}
											name={'userDistinct'}
											onChange={onChange}
										/>
									</div>
									<div className={'div-AddAddressForm-marginWard'}>
										<label>Phường/Xã</label>
										<input
											className={'ml-14 input-AddAddressForm-district'}
											name={'userWard'}
											onChange={onChange}
										/>
									</div>
									<div className={'div-AddAddressForm-marginAddress'}>
										<label>Địa Chỉ Cụ Thể</label>
										<input
											className={'ml-14 input-AddAddressForm-name'}
											name={'detailsAddress'}
											onChange={onChange}
										/>
									</div>
								</div>

								<div className={'flex justify-center mt-6'}>
									<div className={'flex gap-4'}>
										<div>
											<label className={'ml-24'}>
												Đặt làm địa chỉ mặc định
											</label>
										</div>
										<div className={'flex gap-1 item-center'}>
											<input
												className={'input-AddAddressForm-radioBtn'}
												name={'type'}
												type={'radio'}
												value={'YES'}
												onChange={onChange}
											/>
											<label>Có</label>
										</div>
										<div className={'flex gap-1 item-center'}>
											<div>
												<input
													className={'input-AddAddressForm-radioBtn'}
													name={'type'}
													type={'radio'}
													value={'NO'}
													onChange={onChange}
												/>
											</div>
											<div>
												<label>Không</label>
											</div>
										</div>
									</div>
									{/*									<div className={'flex item-center'}>
										<input
											className={'input-AddAddressForm-radioBtn'}
											name={'type'}
											type={'checkbox'}
											value={'STORAGE'}
											onChange={onChange}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ lấy hàng</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-AddAddressForm-radioBtn'}
											name={'type'}
											type={'checkbox'}
											value={'RECEIVE'}
											onChange={onChange}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ trả hàng</label>
									</div>*/}
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
						text-indent: 10px;
						cursor: pointer;
					}
					.input-AddAddressForm-name {
						width: 400px;
						height: 42px;

						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.input-AddAddressForm-city {
						width: 160px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.input-AddAddressForm-district {
						width: 220px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
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
						cursor: pointer;
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
