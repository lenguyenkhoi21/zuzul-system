import React, { useContext, useEffect, useState } from 'react'
import './ProductCensorShipContent.css'
import ProductCensorShipItem from './ProductCensorShipItem'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/Constant'
import { UserContext } from '../../reducer/User.Reducer'

const ProductCensorShipContent = () => {
	const userCTX = useContext(UserContext)
	const [product, setProduct] = useState([])
	const [render, setRender] = useState({})

	useEffect(() => {
		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/product/registered/${userCTX.state.userID}`,
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					Authorization: `Bearer ${userCTX.state.accessToken}`
				}
			}
		)
			.then(response => (response.status === 200 ? response.json() : response))
			.then(data => setProduct(data))
	}, [userCTX.state.userID, render])

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

	return (
		<>
			<table className={'table-ProductCensorShipContent'}>
				<thead>
					<tr>
						<th className={'th-ProductCensorShipContent-title'} colSpan={6}>
							<span className={'span-ProductCensorShipContent-title'}>
								Tất cả yêu cầu
							</span>
						</th>
						<th className={'th-ProductCensorShipContent-title2'} colSpan={1}>
							<button className={'button-ProductCensorShipContent-Filter'}>
								<div className={'d-inline-flex align-items-center'}>
									<img src={'/shop_request/sort.png'} alt={'Shop Request'} />
									<span className={'span-ProductCensorShipContent-Filter'}>
										{' '}
										Sort{' '}
									</span>
								</div>
							</button>
							<button className={'button-ProductCensorShipContent-Filter'}>
								<div className={'d-inline-flex align-items-center'}>
									<img src={'/shop_request/filter.png'} alt={'Shop Request'} />
									<span className={'span-ProductCensorShipContent-Filter'}>
										{' '}
										Filter{' '}
									</span>
								</div>
							</button>
						</th>
					</tr>
					<tr className={'tr-ProductCensorShipContent-header'}>
						<th className={'th-ProductCensorShipContent-header'}>
							Tên sản phẩm
						</th>
						<th className={'th-ProductCensorShipContent-header2'}>Danh mục</th>
						<th className={'th-ProductCensorShipContent-header2'}>
							Danh mục con
						</th>
						<th className={'th-ProductCensorShipContent-header2'}>
							Người dùng
						</th>
						<th className={'th-ProductCensorShipContent-header2'}>Số lượng</th>
						<th className={'th-ProductCensorShipContent-header2'}>Ngày tạo</th>
						<th className={'th-ProductCensorShipContent-header2'}>Phê duyệt</th>
					</tr>
				</thead>
				<tbody>
					{product.map((value, index) => (
						<React.Fragment key={index}>
							<ProductCensorShipItem
								setRender={setRender}
								productId={value.productId}
								productName={value.productName}
								cateName={value.categoryName}
								subName={value.subCategoryName}
								shopName={value.userShopName}
								number={value.count}
								dateCreate={formatDate(value.prdDateCreate)}
							/>
						</React.Fragment>
					))}
				</tbody>
			</table>
		</>
	)
}

export default ProductCensorShipContent
