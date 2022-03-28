import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../reducer/User.Reducer'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import {
	LEFT_MENU_USER_ACTION,
	LeftMenuUserContext
} from '../../reducer/LeftMenuUser.Reducer'
import Authentication from '../../component/common/Authentication'
import LeftMenuUser from '../../component/user/settings/LeftMenuUser'
import UserAccountBackground from '../../component/common/UserAccountBackground'
import Image from 'next/image'
import Link from 'next/link'

const AddNewProduct = () => {
	const userCTX = useContext(UserContext)
	const titleCTX = useContext(TitleContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Thêm sản phẩm')
		leftMenuUserCTX.setSubTitle(LEFT_MENU_USER_ACTION.RESET)
	}, [])

	const getImagePreview = e => {
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
				<div className={'px-330 div-AddNewProduct-container'}>
					<div className={'grid grid-cols-1'}>
						<UserAccountBackground />

						<div className={'flex grid-flow-col mt-6'}>
							<div className={'div-AddNewProduct-leftMenu min-h-fit'}>
								<LeftMenuUser />
							</div>
							<div className={'ml-5 div-AddNewProduct-formAccount'}>
								<div className={'mt-10 ml-10'}>
									<p className={'span-AddNewProduct-textTitle'}>
										Thêm sản phẩm
									</p>
								</div>
								<hr className={'mt-7 mr-10 ml-10 hr-AddNewProduct-size'} />
								<div className={'grid ml-20 grid-col-1'}>
									{/*ten san pham*/}
									<div className={'flex items-center mt-20'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Tên Sản Phẩm
											</label>
										</div>
										<div>
											<input className={'input-AddNewProduct-namePrd'} />
										</div>
									</div>
									{/*Tên Danh Mục*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Tên Danh Mục
											</label>
										</div>
										<div className={''}>
											<select className={'select-AddNewProduct-color'}>
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
									</div>
									{/*Tiêu đề*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Tiêu đề
											</label>
										</div>
										<div>
											<input className={'input-AddNewProduct-title'} />
										</div>
									</div>
									{/*Xuất Xứ*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Xuất Xứ
											</label>
										</div>
										<div>
											<input className={'input-AddNewProduct-origin'} />
										</div>
									</div>
									{/*Ngày Sản Xuất*/}
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
											/>
										</div>
									</div>
									{/*Giá Bán*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Giá Bán
											</label>
										</div>
										<div>
											<input className={'input-AddNewProduct-createDate'} />
										</div>
									</div>
									{/*Sale*/}
									<div className={'flex items-center mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Sale
											</label>
										</div>
										<div>
											<input className={'input-AddNewProduct-sale'} />
										</div>
									</div>
									{/*Ảnh*/}
									<div className={'flex mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Ảnh
											</label>
										</div>
										{/*anh bia*/}
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
										{/*Hinh anh 1*/}
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
										{/*Hinh anh 2*/}
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
									{/*Mô Tả*/}
									<div className={'flex mt-6'}>
										<div>
											<label className={'label-AddNewProduct-subTitle'}>
												Mô Tả
											</label>
										</div>
										<div>
											<textarea className={'input-AddNewProduct-description'} />
										</div>
									</div>

									<div className={'flex gap-9 justify-end mt-6 mr-28 mb-10'}>
										<div>
											<Link href={'/product/listProduct'}>
												<button className={'btn-AddNewProduct-cancel'}>
													Hủy
												</button>
											</Link>
										</div>
										<div>
											<Link href={'/product/listProduct'}>
												<button className={'btn-AddNewProduct-save'}>
													Lưu
												</button>
											</Link>
										</div>
									</div>
								</div>
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
						border: 2px solid #2aa71a;
						box-sizing: border-box;
						border-radius: 12px;
					}
				`}</style>
			</>
		)
	}
}

export default AddNewProduct
