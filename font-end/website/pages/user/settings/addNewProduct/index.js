import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../reducer/User.Reducer'
import { TITLE_ACTION, TitleContext } from '../../../../reducer/Title.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../../component/common/Authentication'
import LeftMenuUser from '../../../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../../../component/common/UserAccountBackground'
import Image from 'next/image'
import Link from 'next/link'
import {
	API_DOMAIN,
	API_PRODUCT_SERVICE,
	API_USER_SERVICE
} from '../../../../utils/APIUtils'
import { useRouter } from 'next/router'
import {
	SEARCH_ACTION,
	SearchContext
} from '../../../../reducer/Search.Reducer'

const AddNewProduct = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)
	const searchCTX = useContext(SearchContext)

	const [discountStandard] = useState(Array.from(Array(99).keys(), n => n))
	const [category, setCategory] = useState([])
	const [subCategory, setSubCategory] = useState([])

	const [picture1, setPicture1] = useState(null)
	const [picture2, setPicture2] = useState(null)
	const [picture3, setPicture3] = useState(null)
	const [userInfo, setUserInfo] = useState({
		userId: userCTX.state.userID,
		userFullName: '',
		userPhone: '',
		userBirthday: '',
		userSex: '',
		userEmail: '',
		userName: ''
	})

	const router = useRouter()

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Thêm sản phẩm')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.SET_NEW_PRODUCT)
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)

		const handleLogic = async () => {
			const cateResponse = await fetch(
				`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/category/all`,
				{
					method: 'GET',
					mode: 'cors'
				}
			)
			const cateData = await cateResponse.json()

			const arr = []

			for (let i = 0; i < cateData.length; i++) {
				const subResponse = await fetch(
					`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/${cateData[i].categoryId}/sub/all`,
					{
						method: 'GET',
						mode: 'cors'
					}
				)

				const subData = await subResponse.json()

				const row = {
					categoryId: cateData[i].categoryId,
					categoryName: cateData[i].categoryName,
					sub: subData
				}
				arr.push(row)
			}
			setCategory(arr)
		}

		handleLogic()

		if (userCTX.state.userID !== null) {
			fetch(
				`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/profile/${userCTX.state.userID}`,
				{
					headers: {
						Authorization: `Bearer ${userCTX.state.accessToken}`
					},
					mode: 'cors',
					method: 'GET'
				}
			)
				.then(response => response.json())
				.then(data => {
					if (data.status !== 403) {
						setUserInfo(data)
					}
				})
		}
	}, [userCTX.state.userID])

	const onChange = e => {
		e.preventDefault()
		if (e.target.name === 'prdDateManufacture') {
			setProduct({
				...product,
				[e.target.name]: new Date(e.target.value).getTime() / 1000
			})
		} else {
			setProduct({ ...product, [e.target.name]: e.target.value })
		}
	}

	const onSelectSub = e => {
		const findSub = category.filter(
			category => category.categoryId === e.target.value
		)
		if (findSub.length === 0) {
			setSubCategory([])
			setProduct({ ...product, prdCateId: '', prdSubId: '' })
		} else {
			setSubCategory(findSub[0].sub)
			setProduct({ ...product, prdCateId: e.target.value, prdSubId: '' })
		}
	}

	const [product, setProduct] = useState({
		prdName: '',
		prdUserId: '',
		prdCateId: '',
		prdSubId: '',
		prdPriceOrigin: '',
		prdOrigin: '',
		prdDateCreate: Math.round(new Date().getTime() / 1000),
		prdShortDes: '',
		prdLongDes: '',
		prdNumberInStorage: '',
		discount: 0,
		prdMonthWarranty: ''
	})

	const addProduct = e => {
		e.preventDefault()

		const formData = new FormData()

		formData.append('prdName', product.prdName)
		formData.append('prdUserId', userCTX.state.userID)
		formData.append('prdCateId', product.prdCateId)
		formData.append('prdSubId', product.prdSubId)
		formData.append('prdPriceOrigin', product.prdPriceOrigin)
		formData.append('prdOrigin', product.prdOrigin)
		formData.append('prdDateCreate', product.prdDateCreate)
		formData.append('prdShortDes', product.prdShortDes)
		formData.append('prdLongDes', product.prdLongDes)
		formData.append('prdNumberInStorage', product.prdNumberInStorage)
		formData.append('discount', product.discount)
		formData.append('prdMonthWarranty', product.prdMonthWarranty)
		formData.append('prd_image1', picture1)
		formData.append('prd_image2', picture2)
		formData.append('prd_image3', picture3)

		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/user/product`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`
			},
			body: formData
		})
			.then(response => {
				if (response.status === 200) {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Thêm Sản Phẩm Thành Công'
					)
					return response.json()
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Thêm Sản Phẩm Thất Bại'
					)
				}
			})
			.then(data => {
				if (data.status === 'Success') {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						true,
						'Thêm Sản Phẩm Thành Công'
					)
				} else {
					titleCTX.renderPopup(
						TITLE_ACTION.RENDER_POPUP,
						true,
						false,
						'Thêm Sản Phẩm Thất Bại'
					)
				}
				router.push('/user/settings/listProduct')
			})
	}

	const getImagePreview = e => {
		const image = URL.createObjectURL(e.target.files[0])
		const imagediv = document.getElementById('display_image')
		const newdiv = document.createElement('img')
		imagediv.innerHTML = ''
		newdiv.src = image
		newdiv.width = 85
		setPicture1(e.target.files[0])
		imagediv.appendChild(newdiv)
	}
	const getImagePreview1 = e => {
		const image = URL.createObjectURL(e.target.files[0])
		const imagediv = document.getElementById('display_image1')
		const newdiv = document.createElement('img')
		imagediv.innerHTML = ''
		newdiv.src = image
		newdiv.width = 85
		setPicture2(e.target.files[0])
		imagediv.appendChild(newdiv)
	}
	const getImagePreview2 = e => {
		const image = URL.createObjectURL(e.target.files[0])
		const imagediv = document.getElementById('display_image2')
		const newdiv = document.createElement('img')
		imagediv.innerHTML = ''
		newdiv.src = image
		newdiv.width = 85
		setPicture3(e.target.files[0])
		imagediv.appendChild(newdiv)
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
				<div className={'px-330 page-body div-AddNewProduct-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground
							userId={userInfo.userId}
							avatarImage={userInfo.currentAvatar}
							coverImage={userInfo.currentCover}
							userFullName={userInfo.userFullName}
						/>

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-AddNewProduct-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-AddNewProduct-formAccount'}>
								<form onSubmit={addProduct}>
									<div className={'mt-10 ml-10'}>
										<p className={'span-AddNewProduct-textTitle'}>
											Thêm sản phẩm
										</p>
									</div>
									<hr className={'mt-7 mr-10 ml-10 hr-AddNewProduct-size'} />
									<div className={'grid ml-20 grid-col-1'}>
										<div className={'flex items-center mt-20'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Tên Sản Phẩm
												</label>
											</div>
											<div>
												<input
													className={'input-AddNewProduct-namePrd'}
													name={'prdName'}
													onChange={onChange}
												/>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Tên Danh Mục
												</label>
											</div>
											<div className={''}>
												<select
													className={'select-AddNewProduct-color'}
													name={'prdCateId'}
													onChange={onSelectSub}>
													<option value=''>Chọn danh mục</option>
													{category.map((value, key) => (
														<React.Fragment key={key}>
															<option value={value.categoryId}>
																{value.categoryName}
															</option>
														</React.Fragment>
													))}
												</select>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Tên Danh Mục Con
												</label>
											</div>
											<div className={''}>
												<select
													className={'select-AddNewProduct-color'}
													name={'prdSubId'}
													onChange={onChange}>
													<option value=''>Chọn danh mục con</option>
													{subCategory.map((value, key) => (
														<React.Fragment key={key}>
															<option value={value.subCategoryId}>
																{value.subCategoryName}
															</option>
														</React.Fragment>
													))}
												</select>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Thời hạn bảo hành (tháng)
												</label>
											</div>
											<div>
												<input
													className={'input-AddNewProduct-title'}
													type={'number'}
													name={'prdMonthWarranty'}
													onChange={onChange}
												/>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Xuất Xứ
												</label>
											</div>
											<div>
												<input
													className={'input-AddNewProduct-origin'}
													name={'prdOrigin'}
													onChange={onChange}
												/>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Ngày Sản Xuất
												</label>
											</div>
											<div>
												<input
													type={'date'}
													className={'input-AddNewProduct-createDate'}
													name={'prdDateManufacture'}
													onChange={onChange}
												/>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Giá Bán
												</label>
											</div>
											<div>
												<input
													className={'input-AddNewProduct-createDate'}
													type={'number'}
													onChange={onChange}
													name={'prdPriceOrigin'}
												/>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Giảm Giá
												</label>
											</div>
											<div>
												<select
													onChange={onChange}
													className={'select-AddNewProduct-color'}
													name={'discount'}>
													{discountStandard.map((value, key) => (
														<React.Fragment key={key}>
															<option value={value}>{value}</option>
														</React.Fragment>
													))}
												</select>
											</div>
										</div>
										<div className={'flex items-center mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Số lượng trong kho
												</label>
											</div>
											<div>
												<input
													className={'input-AddNewProduct-sale'}
													type={'number'}
													onChange={onChange}
													name={'prdNumberInStorage'}
												/>
											</div>
										</div>
										<div className={'flex mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Ảnh
												</label>
											</div>
											<div className={'ml-16'}>
												<input
													className={'input-AddNewProduct-addImg'}
													type={'file'}
													id={'imgBackGr'}
													onChange={getImagePreview}
												/>
												<div>
													<label
														id={'display_image'}
														className={'img-AddNewProduct-add'}
														htmlFor={'imgBackGr'}>
														<Image
															width={24}
															height={24}
															src={'/png/add_image.png'}
														/>
													</label>
													<label className={'label-AddNewProduct-imageTitle'}>
														Ảnh bìa
													</label>
												</div>
											</div>
											<div className={'ml-8'}>
												<input
													className={'input-AddNewProduct-addImg'}
													type={'file'}
													id={'imgBackGr1'}
													onChange={getImagePreview1}
												/>
												<div>
													<label
														id={'display_image1'}
														className={'img-AddNewProduct-add'}
														htmlFor={'imgBackGr1'}>
														<Image
															width={24}
															height={24}
															src={'/png/add_image.png'}
														/>
													</label>
													<label className={'label-AddNewProduct-imageTitle'}>
														Hình ảnh 1
													</label>
												</div>
											</div>
											<div className={'ml-8'}>
												<input
													className={'input-AddNewProduct-addImg'}
													type={'file'}
													id={'imgBackGr2'}
													onChange={getImagePreview2}
												/>
												<div>
													<label
														id={'display_image2'}
														className={'img-AddNewProduct-add'}
														htmlFor={'imgBackGr2'}>
														<Image
															width={24}
															height={24}
															src={'/png/add_image.png'}
														/>
													</label>
													<label className={'label-AddNewProduct-imageTitle'}>
														Hình ảnh 2
													</label>
												</div>
											</div>
										</div>
										<div className={'flex mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Mô Tả
												</label>
											</div>
											<div>
												<textarea
													className={'input-AddNewProduct-description'}
													name={'prdShortDes'}
													onChange={onChange}
												/>
											</div>
										</div>
										<div className={'flex mt-6'}>
											<div>
												<label className={'label-AddNewProduct-subTitle'}>
													Mô Tả Chi Tiết
												</label>
											</div>
											<div>
												<textarea
													className={'input-AddNewProduct-description'}
													onChange={onChange}
													name={'prdLongDes'}
												/>
											</div>
										</div>

										<div className={'flex gap-9 justify-end mt-6 mr-28 mb-10'}>
											<div>
												<Link href={'/user/settings/listProduct'}>
													<button className={'btn-AddNewProduct-cancel'}>
														Hủy
													</button>
												</Link>
											</div>
											<div>
												<button className={'btn-AddNewProduct-save'}>
													Lưu
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<style jsx>{`
					.div-AddNewProduct-container {
						background: #f9f9f9;
					}

					.hr-AddNewProduct-size {
						height: 0px;
						border-radius: 12px;
					}

					.div-AddNewProduct-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
					}

					.div-AddNewProduct-formAccount {
						width: 100%;
						border-radius: 12px;
						background: #ffffff;
						margin-bottom: 25px;
					}
					.span-AddNewProduct-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}

					.label-AddNewProduct-subTitle {
						display: block;
						width: 165px;
						height: 24px;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 500;
						font-size: 18px;
						line-height: 23px;
						text-align: right;

						color: #151515;
					}

					.input-AddNewProduct-addImg {
						display: none;
					}

					.img-AddNewProduct-add {
						width: 125px;
						height: 125px;
						display: flex;
						overflow: hidden;
						border: 1px solid black;
						border-radius: 12px;
						cursor: pointer;
						justify-content: center;
						align-items: center;
					}

					.input-AddNewProduct-namePrd {
						width: 416px;
						height: 42px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.input-AddNewProduct-title {
						width: 187px;
						height: 42px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.input-AddNewProduct-title::-webkit-inner-spin-button,
					.input-AddNewProduct-title::-webkit-outer-spin-button {
						-webkit-appearance: none;
						margin: 0;
					}

					.input-AddNewProduct-origin {
						width: 283px;
						height: 42px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.input-AddNewProduct-createDate {
						width: 187px;
						height: 42px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.input-AddNewProduct-createDate::-webkit-inner-spin-button,
					.input-AddNewProduct-createDate::-webkit-outer-spin-button {
						-webkit-appearance: none;
						margin: 0;
					}

					.input-AddNewProduct-sale {
						width: 116px;
						height: 42px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.input-AddNewProduct-sale::-webkit-inner-spin-button,
					.input-AddNewProduct-title::-webkit-outer-spin-button {
						-webkit-appearance: none;
						margin: 0;
					}

					.input-AddNewProduct-description {
						width: 585px;
						height: 400px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.label-AddNewProduct-imageTitle {
						display: block;
						text-align: center;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 500;
						font-size: 18px;
						line-height: 23px;

						color: #151515;
					}

					.select-AddNewProduct-color {
						width: 283px;
						height: 42px;
						margin-left: 60px;
						text-indent: 10px;
						cursor: pointer;
						background: #ffffff;
						border: 1px solid #d9d9d9;
						box-sizing: border-box;
						border-radius: 12px;
					}

					.btn-AddNewProduct-cancel {
						width: 102px;
						height: 50px;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 22px;

						color: #151515;

						background: #f5f5f5;
						border: 1px solid #46760a;
						border-radius: 12px;
					}

					.btn-AddNewProduct-save {
						width: 150px;
						height: 50px;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 700;
						font-size: 15px;
						line-height: 22px;
						text-align: center;

						color: #ffffff;

						background: #46d362;
						border: 1px solid #46760a;
						box-sizing: border-box;
						border-radius: 12px;
					}
				`}</style>
			</>
		)
	}
}

export default AddNewProduct
