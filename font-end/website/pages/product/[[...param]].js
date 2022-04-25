import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { imageLoader, timeNow } from '../../utils/Utils'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import Image from 'next/image'
import Link from 'next/link'
import {
	API_DOMAIN,
	API_PRODUCT_SERVICE,
	API_USER_SERVICE
} from '../../utils/APIUtils'
import { UserContext } from '../../reducer/User.Reducer'
import { SEARCH_ACTION, SearchContext } from '../../reducer/Search.Reducer'
// import style from "styles/Product.module.css"
// import Image from "next/image";

//TODO: Using props to get value from statics
// eslint-disable-next-line no-unused-vars

const ProductPage = () => {
	console.log(`${timeNow()} --- [ProductPage] --- at ./pages/[[...param]].js`)
	const router = useRouter()
	const path = router.asPath
	const arr = path.split('/')
	const titleCTX = useContext(TitleContext)
	const userCTX = useContext(UserContext)
	const searchCTX = useContext(SearchContext)

	const onClickHandle = e => {
		e.preventDefault()
		//TODO set payload
		const payload = {
			productId: productDetail.prdId,
			purchaserId: userCTX.state.userID,
			sellerId: productDetail.prdUserId,
			count: 1
		}

		//TODO fetch POST cart
		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/cart`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				if (data.alert === false) {
					router.push('/checkout')
				}
			})
	}

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

	const onClickAddCart = e => {
		e.preventDefault()
		//TODO set payload
		const payload = {
			productId: productDetail.prdId,
			purchaserId: userCTX.state.userID,
			sellerId: productDetail.prdUserId,
			count: 1
		}

		//TODO fetch POST cart
		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/cart`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				if (data.alert === false) {
					router.push('/')
				}
			})
	}

	//TODO: Change the title to name of product

	const [productDetail, setProduct] = useState({
		prdId: '',
		prdName: '',
		prdUserId: '',
		prdCateId: '',
		prdSubId: '',
		prdCateName: '',
		prdPriceOrigin: '',
		prdOrigin: '',
		prdShortDes: '',
		prdLongDes: '',
		prdSales: '',
		prdImages: [],
		prdReact: '',
		prdDateCreate: '',
		prdNumberInStorage: '',
		discount: ''
	})

	useEffect(() => {
		// if not render id
		searchCTX.setSearchPage(SEARCH_ACTION.RESET)
		if (arr[2] !== '[[...param]]') {
			fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/product/${arr[2]}`, {
				mode: 'cors',
				method: 'GET'
			})
				.then(response => response.json())
				.then(data => {
					setProduct({
						prdId: data.prdId,
						prdName: data.prdName,
						prdUserId: data.prdUserId,
						prdCateId: data.prdCateId,
						prdSubId: data.prdSubId,
						prdCateName: data.prdCateName,
						prdPriceOrigin: data.prdPriceOrigin,
						prdOrigin: data.prdOrigin,
						prdShortDes: data.prdShortDes,
						prdLongDes: data.prdLongDes,
						prdSales: data.prdSales,
						prdImages: data.prdImages,
						prdReact: data.prdReact,
						prdDateCreate: data.prdDateCreate,
						prdNumberInStorage: data.prdNumberInStorage,
						discount: data.discount
					})
					titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, data.prdName)
				})
		} else {
			titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Chi tiết sản phẩm')
		}
	}, [path])

	if (arr.length === 3) {
		return (
			<>
				<div className='md:grid md:grid-cols-1 lg:grid-cols-2 mx-auto container-outsite'>
					<div className='left-content'>
						{productDetail.prdImages.map((value, key) => (
							<React.Fragment key={key}>
								<div className='pic-first'>
									<Image
										className='pics '
										alt='hero'
										src={value + '|' + productDetail.prdId}
										loader={imageLoader}
										width={596}
										height={436}
									/>
								</div>
							</React.Fragment>
						))}
					</div>
					<div className='right-content '>
						<h1 className='text-xl font-semibold text-fontColor-bl1 Product-name'>
							{productDetail.prdName}
						</h1>
						<h4 className='text-lg text-fontColor-bl1 Product-titleShort'>
							{productDetail.prdShortDes}
						</h4>
						<div className='flex Product-infor'>
							<div className=''>
								<h6 className='flex text-fontColor-gr'>
									Xuất xứ
									<p className='ml-20 text-fontColor-bl1 align-content-center'>
										{productDetail.prdOrigin}
									</p>
								</h6>
								<h6 className='flex mt-3 text-fontColor-gr'>
									Ngày sản xuất
									<p className='ml-8 text-fontColor-bl1 align-content-center'>
										{formatDate(productDetail.prdDateCreate)}
									</p>
								</h6>
							</div>
							<div className='ml-14'>
								<h6 className='flex ml-24 text-fontColor-gr'>
									Danh mục
									<p className='ml-6 text-fontColor-bl1 align-content-center'>
										{productDetail.prdCateName}
									</p>
								</h6>
								<h6 className='flex mt-3 ml-24 text-fontColor-gr'>
									Giảm giá
									<p className='ml-8 text-fontColor-bl1 align-content-center'>
										{productDetail.discount}%
									</p>
								</h6>
							</div>
						</div>

						<br />
						<div className='flex shopping'>
							<div className='Product-price grow '>
								<p className='text-xl font-semibold text-fontColor-g1'>
									{((100 - productDetail.discount) / 100) *
										productDetail.prdPriceOrigin}
									<span>đ</span>
									<p className='text-sm text-fontColor-gr line-through Product-subPrice'>
										{productDetail.prdPriceOrigin} <span>đ</span>
									</p>
								</p>
							</div>

							<div className='inline flex-auto mt-1 mr-2 btn-Product'>
								<Link href={'/checkout'}>
									<a>
										<button
											onClick={e => onClickHandle(e)}
											name={productDetail.prdId}
											className={' font-poppins btn-ProductShort btn-buy '}>
											<span className='text-lg'>+</span> Mua ngay
										</button>
									</a>
								</Link>
								{/*<Link href={'/'}>*/}

								<button
									onClick={e => onClickAddCart(e)}
									name={productDetail.prdId}
									className={
										'flex-auto font-poppins btn-ProductShort btn-add-cart'
									}>
									<span className='text-lg'>+</span> Thêm vào giỏ hàng
								</button>

								{/*</Link>*/}
							</div>
						</div>
						<div className='Product-disciption'>
							<h1 className='text-lg font-semibold text-fontColor-bl1 Product-disciption-titile'>
								Mô tả sản phẩm
							</h1>
							<hr />
							<div className=''>
								<h4 className='text-base font-semibold Product-disciption-subTitile'>
									Tiêu đề
								</h4>
								<p>{productDetail.prdLongDes}</p>
							</div>
						</div>
					</div>
				</div>

				<style jsx>
					{`
						.container-outsite {
							padding: 16px 45px;
							width: 1260px;
							// height: 1454px;
							left: 330px;
							top: 229px;

							background-color: rgb(255, 255, 255);
						}
						.left-content {
							width: 569px;
							height: 1374px;
							left: 0px;
							top: 0px;
							display: flex;
							flex-direction: column;
							align-items: center;
							// margin-bottom:63px;
							/* Inside Auto Layout */
							// background-color: green;
						}
						.pics {
							width: 569px;
							height: 436px;
							border-radius: 12px;
						}
						.pic-first {
							margin-bottom: 32px;
						}
						.pic-second {
							margin-bottom: 32px;
						}
						.pic-third {
							// margin-bottom:63px;
						}
						.right-content {
							width: 574px;
							height: 1247px;
							left: 601px;
							top: 0px;

							/* Inside Auto Layout */

							margin: 0px 32px;
							// background-color: #777777;
						}
						.Product-name {
						}
						.Product-price {
							// padding-left:18px;
							// margin-top:29px;
						}

						.btn-ProductShort {
							background: #46d362;
							padding-top: 6.5px;
							padding-bottom: 6.5px;
							padding-left: 6.5px;
							padding-right: 6.5px;
							border: 2px solid #2aa71a;

							box-sizing: border-box;
							border-radius: 12px;
							color: #ffffff;

							hight: 47px;
						}
						.btn-add-cart {
							margin-left: 12px;
						}
						.shopping {
							position: relative;
							border: 2px solid #f5f5f5;
							padding: 10px;
							border-radius: 12px;

							width: 100%;
							margin-top: 40px;
						}
						.Product-disciption {
							margin-top: 177px;
						}
						.Product-disciption-subTitile {
							margin-top: 48px;
						}
						.Product-disciption-subTitile {
							margin-top: 8px;
						}
						.hr {
						}
						.Product-titleShort {
							margin-top: 40px;
						}
						.Product-infor {
							margin-top: 40px;
						}
						.btn-Product {
							margin-left: 85px;
						}
					`}
				</style>
			</>
		)
	} else {
		return <></>
	}

	//TODO: Display the hierarchical tree:
	// Trang chủ -> Category -> Sub-category -> Sản phẩm

	//TODO: Display the information detail of product
	// Fetch API to get the Image in Client-Side
}

export default ProductPage
