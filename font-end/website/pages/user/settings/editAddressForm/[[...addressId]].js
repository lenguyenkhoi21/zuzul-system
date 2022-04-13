import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Authentication from '../../../../component/common/Authentication'
import { timeNow } from '../../../../utils/Utils'
import { TITLE_ACTION, TitleContext } from '../../../../reducer/Title.Reducer'
import { UserContext } from '../../../../reducer/User.Reducer'
import { API_DOMAIN, API_USER_SERVICE } from '../../../../utils/APIUtils'

const EditAddressFormPage = () => {
	console.log(
		`${timeNow()} --- [EditAddressForm] --- /user/settings/editAddressForm.js`
	)

	const router = useRouter()
	const path = router.asPath
	const addressId = path.split('/')[4]

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
		addressId: addressId
	})

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Sửa địa chỉ')
		// eslint-disable-next-line react-hooks/exhaustive-deps

		if (userCTX.state.userID !== null && addressId !== '[[...addressId]]') {
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/${userCTX.state.userID}/address/${addressId}`,
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
					setAddress({
						userName: data.userName,
						userPhone: data.userPhone,
						userWard: data.userWard,
						userDistinct: data.userDistinct,
						userCity: data.userCity,
						detailsAddress: data.detailsAddress,
						userId: userCTX.state.userID,
						type: data.type,
						addressId: addressId
					})
				})
		}
	}, [userCTX.state.userID, path])

	const onChange = e => {
		setAddress({ ...address, [e.target.name]: e.target.value })
	}

	const editAddress = e => {
		e.preventDefault()

		console.log(address)

		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/address`, {
			mode: 'cors',
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(address)
		})
			.then(response => {
				if (response.status === 200) {
					return response.json()
				}
			})
			.then(data => {
				console.log(data)
				router.push('/user/settings/address')
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
				<div className={'flex justify-center px-330 page-body'}>
					<form className={'form-EditAddressForm-size '} onSubmit={editAddress}>
						<div>
							<div>
								<div className={'div-EditAddressForm-textHeader'}>
									<span>Chỉnh Sửa Địa Chỉ</span>
								</div>

								<div className={'grid gap-6'}>
									<div className={'ml-20 '}>
										<label>Họ Và Tên</label>
										<input
											className={'ml-14 input-EditAddressForm-name'}
											name={'userName'}
											onChange={onChange}
											defaultValue={address.userName}
										/>
									</div>
									<div>
										<label className={'ml-14'}>Số Điện Thoại</label>
										<input
											className={'ml-14 input-EditAddressForm-name'}
											name={'userPhone'}
											onChange={onChange}
											defaultValue={address.userPhone}
										/>
									</div>
									<div className={'div-EditAddressForm-marginPhone'}>
										<label>Tỉnh/Thành Phố</label>
										<input
											className={'ml-14 input-EditAddressForm-city'}
											name={'userCity'}
											onChange={onChange}
											defaultValue={address.userCity}
										/>
									</div>
									<div className={'div-EditAddressForm-marginDistrict'}>
										<label>Quận/Huyện</label>
										<input
											className={'ml-14 input-EditAddressForm-district'}
											name={'userDistinct'}
											onChange={onChange}
											defaultValue={address.userDistinct}
										/>
									</div>
									<div className={'div-EditAddressForm-marginWard'}>
										<label>Phường/Xã</label>
										<input
											className={'ml-14 input-EditAddressForm-district'}
											name={'userWard'}
											onChange={onChange}
											defaultValue={address.userWard}
										/>
									</div>
									<div className={'div-EditAddressForm-marginAddress'}>
										<label>Địa Chỉ Cụ Thể</label>
										<input
											className={'ml-14 input-EditAddressForm-name'}
											name={'detailsAddress'}
											onChange={onChange}
											defaultValue={address.detailsAddress}
										/>
									</div>
								</div>

								{/*								<div className={'grid gap-5 justify-center mt-6 mr-9'}>
									<div className={'flex item-center'}>
										<label className={'ml-2.5'}>Đặt làm địa chỉ mặc định</label>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'type'}
											type={'radio'}
											value={'YES'}
											checked={address.type === true}
											onChange={onChange}
										/>
										Có
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'type'}
											type={'radio'}
											value={'NO'}
											checked={address.type === false}
											onChange={onChange}
										/>
										Không
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'type'}
											type={'checkbox'}
											value={'DEFAULT'}
											checked={address.type.indexOf('DEFAULT') !== -1}
											onChange={onChange}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ mặc định</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'type'}
											type={'checkbox'}
											value={'STORAGE'}
											checked={address.type.indexOf('STORAGE') !== -1}
											onChange={onChange}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ lấy hàng</label>
									</div>
									<div className={'flex item-center'}>
										<input
											className={'input-EditAddressForm-radioBtn'}
											name={'type'}
											type={'checkbox'}
											value={'RECEIVE'}
											checked={address.type.indexOf('RECEIVE') !== -1}
											onChange={onChange}
										/>
										<label className={'ml-2.5'}>Đặt làm địa chỉ trả hàng</label>
									</div>
								</div>*/}

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
						text-indent: 10px;
						cursor: pointer;
					}
					.input-EditAddressForm-name {
						width: 400px;
						height: 42px;

						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.input-EditAddressForm-city {
						width: 160px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
					}
					.input-EditAddressForm-district {
						width: 220px;
						height: 42px;
						background: #f9f9f9;

						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						text-indent: 10px;
						cursor: pointer;
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
					.div-EditAddressForm-marginBtn {
						margin-top: 51px;
					}
				`}</style>
			</>
		)
	}
}

export default EditAddressFormPage
