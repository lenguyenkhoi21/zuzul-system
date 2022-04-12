import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../reducer/User.Reducer'
import { TITLE_ACTION, TitleContext } from '../../../../reducer/Title.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../../../component/common/Authentication'
import UserAccountBackground from '../../../../component/common/UserAccountBackground'
import LeftMenuUser from '../../../../component/user/settings/LeftMenuUser'
import Image from 'next/image'
import Link from 'next/link'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../../../utils/APIUtils'
import { useRouter } from 'next/router'

const EditProduct = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	const router = useRouter()
	const path = router.asPath
	const productId = path.split('/')[4]

	const [product, setProduct] = useState({})
	const [category, setCategory] = useState([])
	const [subCategory, setSubCategory] = useState([])
	const [date, setDate] = useState('')

	const formatDate = date => {
		let timestamp = date * 1000
		let date_not_formatted = new Date(timestamp)

		let formatted_string = date_not_formatted.getFullYear() + '-'

		if (date_not_formatted.getMonth() < 9) {
			formatted_string += '0'
		}
		formatted_string += date_not_formatted.getMonth() + 1
		formatted_string += '-'

		if (date_not_formatted.getDate() < 10) {
			formatted_string += '0'
		}
		formatted_string += date_not_formatted.getDate()

		return formatted_string
	}

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Sửa thông tin sản phẩm')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.RESET)

		if (userCTX.state.userID !== null && productId !== '[[...productId]]') {
			fetch(
				`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/user/${userCTX.state.userID}/product/${productId}`,
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
					setProduct(data)
					setDate(formatDate(data.prdDateManufacture))
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
					setCategory(data)
				})
		}

		if (product !== {}) {
			fetch(
				`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/${product.prdCateId}/sub/all`,
				{
					method: 'GET',
					mode: 'cors'
				}
			)
				.then(response => {
					if (response.status === 200) {
						return response.json()
					}
				})
				.then(data => {
					setSubCategory(data)
				})
		}
	}, [userCTX.state.userID, path])

	const onSelectSub = e => {
		e.preventDefault()

		setProduct({
			...product,
			['prdCateId']: e.target.value
		})

		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/${e.target.value}/sub/all`,
			{
				method: 'GET',
				mode: 'cors'
			}
		)
			.then(response => {
				if (response.status === 200) {
					return response.json()
				}
			})
			.then(data => {
				setSubCategory(data)
			})
	}

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

	const discountStandard = []
	for (var i = 0; i <= 100; i++) {
		discountStandard.push(i)
	}

	const getImagePreview0 = e => {
		var image = URL.createObjectURL(e.target.files[0])
		var imagediv = document.getElementById('display_image')
		var newdiv = document.createElement('img')
		imagediv.innerHTML = ''
		newdiv.src = image
		newdiv.width = 85
		imagediv.appendChild(newdiv)
	}
	const getImagePreview1 = e => {
		var image = URL.createObjectURL(e.target.files[0])
		var imagediv = document.getElementById('display_image1')
		var newdiv = document.createElement('img')
		imagediv.innerHTML = ''
		newdiv.src = image
		newdiv.width = 85
		imagediv.appendChild(newdiv)
	}
	const getImagePreview2 = e => {
		var image = URL.createObjectURL(e.target.files[0])
		var imagediv = document.getElementById('display_image2')
		var newdiv = document.createElement('img')
		imagediv.innerHTML = ''
		newdiv.src = image
		newdiv.width = 85
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
				<div className={'px-330 div-EditProduct-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-EditProduct-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-EditProduct-formAccount'}>
								<div className={'mt-10 ml-10'}>
									<p className={'span-EditProduct-textTitle'}>
										Sửa thông tin sản phẩm
									</p>
								</div>
								<hr className={'mt-7 mr-10 ml-10 hr-EditProduct-size'} />
								<div className={'grid ml-20 grid-col-1'}>
									{/*ten san pham*/}
									<div className={'flex items-center mt-20'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Tên Sản Phẩm
											</label>
										</div>
										<div>
											<input
												className={'input-EditProduct-namePrd'}
												name={'prdName'}
												onChange={onChange}
												defaultValue={product.prdName}
											/>
										</div>
									</div>
									{/*Tên Danh Mục*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Tên Danh Mục
											</label>
										</div>
										<div className={''}>
											<select
												className={'select-EditProduct-color'}
												name={'prdCateId'}
												onChange={onSelectSub}
												defaultValue={category.filter(
													cate => cate.categoryId === product.prdCateId
												)}>
												<option value='0'>Chọn danh mục</option>
												{category.map((value, key) => (
													<React.Fragment key={key}>
														<option value={value.categoryId}>
															{value.categoryName}
														</option>
													</React.Fragment>
												))}
											</select>
										</div>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Tên Danh Mục Con
											</label>
										</div>
										<div className={''}>
											<select
												className={'select-EditProduct-color'}
												name={'prdSubId'}
												onChange={onChange}
												defaultValue={product.prdSubId}>
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
									{/*Tiêu đề*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Thời hạn bảo hành (tháng)
											</label>
										</div>
										<div>
											<input
												className={'input-EditProduct-title'}
												name={'prdMonthWarranty'}
												onChange={onChange}
												defaultValue={product.prdMonthWarranty}
											/>
										</div>
									</div>
									{/*Xuất Xứ*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Xuất Xứ
											</label>
										</div>
										<div>
											<input
												className={'input-EditProduct-origin'}
												name={'prdOrigin'}
												onChange={onChange}
												defaultValue={product.prdOrigin}
											/>
										</div>
									</div>
									{/*Ngày Sản Xuất*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Ngày Sản Xuất
											</label>
										</div>
										<div>
											<input
												type={'date'}
												className={'input-EditProduct-createDate'}
												onChange={onChange}
												defaultValue={date}
												name={'prdDateManufacture'}
											/>
										</div>
									</div>
									{/*Giá Bán*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Giá Bán
											</label>
										</div>
										<div>
											<input
												className={'input-EditProduct-createDate'}
												defaultValue={product.prdPriceOrigin}
												name={'prdPriceOrigin'}
												onChange={onChange}
											/>
										</div>
									</div>
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Giảm Giá
											</label>
										</div>
										<div>
											<select
												onChange={onChange}
												className={'select-EditProduct-color'}
												defaultValue={product.discount}
												name={'discount'}>
												{discountStandard.map((value, key) => (
													<React.Fragment key={key}>
														<option value={value}>{value}</option>
													</React.Fragment>
												))}
											</select>
										</div>
									</div>
									{/*Sale*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Numbers In Storage
											</label>
										</div>
										<div>
											<input
												className={'input-EditProduct-sale'}
												onChange={onChange}
												defaultValue={product.prdNumberInStorage}
												name={'prdNumberInStorage'}
											/>
										</div>
									</div>
									{/*Ảnh*/}
									<div className={'flex mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Ảnh
											</label>
										</div>
										{/*anh bia*/}
										<div className={'ml-16'}>
											<input
												className={'input-EditProduct-addImg'}
												type={'file'}
												id={'imgBackGr'}
												onChange={getImagePreview0}
											/>
											<div>
												<label
													id={'display_image'}
													className={'img-EditProduct-add'}
													htmlFor={'imgBackGr'}>
													<Image
														width={24}
														height={24}
														src={'/png/add_image.png'}
													/>
												</label>
												<label className={'label-EditProduct-imageTitle'}>
													Ảnh bìa
												</label>
											</div>
										</div>
										{/*Hinh anh 1*/}
										<div className={'ml-8'}>
											<input
												className={'input-EditProduct-addImg'}
												type={'file'}
												id={'imgBackGr1'}
												onChange={getImagePreview1}
											/>
											<div>
												<label
													id={'display_image1'}
													className={'img-EditProduct-add'}
													htmlFor={'imgBackGr1'}>
													<Image
														width={24}
														height={24}
														src={'/png/add_image.png'}
													/>
												</label>
												<label className={'label-EditProduct-imageTitle'}>
													Hình ảnh 1
												</label>
											</div>
										</div>
										{/*Hinh anh 2*/}
										<div className={'ml-8'}>
											<input
												className={'input-EditProduct-addImg'}
												type={'file'}
												id={'imgBackGr2'}
												onChange={getImagePreview2}
											/>
											<div>
												<label
													id={'display_image2'}
													className={'img-EditProduct-add'}
													htmlFor={'imgBackGr2'}>
													<Image
														width={24}
														height={24}
														src={'/png/add_image.png'}
													/>
												</label>
												<label className={'label-EditProduct-imageTitle'}>
													Hình ảnh 2
												</label>
											</div>
										</div>
									</div>
									{/*Mô Tả*/}
									<div className={'flex mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Mô Tả
											</label>
										</div>
										<div>
											<textarea
												className={'input-EditProduct-description'}
												name={'prdShortDes'}
												onChange={onChange}
												defaultValue={product.prdShortDes}
											/>
										</div>
									</div>

									<div className={'flex mt-6'}>
										<div>
											<label className={'label-EditProduct-subTitle'}>
												Mô Tả Chi Tiết
											</label>
										</div>
										<div>
											<textarea
												className={'input-EditProduct-description'}
												onChange={onChange}
												name={'prdLongDes'}
												defaultValue={product.prdLongDes}
											/>
										</div>
									</div>

									<div className={'flex gap-9 justify-end mt-6 mr-28 mb-10'}>
										<div>
											<Link href={'/user/settings/listProduct'}>
												<button className={'btn-EditProduct-cancel'}>
													Hủy
												</button>
											</Link>
										</div>
										<div>
											<Link href={'/user/settings/listProduct'}>
												<button className={'btn-EditProduct-save'}>Lưu</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<style jsx>{`
					.div-EditProduct-container {
						background: #f9f9f9;
					}
					.hr-EditProduct-size {
						height: 0px;
						border-radius: 12px;
					}
					.div-EditProduct-leftMenu {
						width: 217px;
						height: fit-content;
						background: #ffffff;
						box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
						border-radius: 12px;
					}
					.div-EditProduct-formAccount {
						width: 100%;
						border-radius: 12px;
						background: #ffffff;
						margin-bottom: 25px;
					}
					.span-EditProduct-textTitle {
						font-family: Poppins;
						font-style: normal;
						font-weight: 600;
						font-size: 32px;
						line-height: 23px;
						color: #151515;
					}
					.label-EditProduct-subTitle {
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
					.input-EditProduct-addImg {
						display: none;
					}
					.img-EditProduct-add {
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
					.input-EditProduct-namePrd {
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
					.input-EditProduct-title {
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
					.input-EditProduct-origin {
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
					.input-EditProduct-createDate {
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
					.input-EditProduct-sale {
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
					.input-EditProduct-description {
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
					.label-EditProduct-imageTitle {
						display: block;
						text-align: center;
						font-family: 'Poppins';
						font-style: normal;
						font-weight: 500;
						font-size: 18px;
						line-height: 23px;

						color: #151515;
					}
					.select-EditProduct-color {
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
					.btn-EditProduct-cancel {
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
					.btn-EditProduct-save {
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

export default EditProduct