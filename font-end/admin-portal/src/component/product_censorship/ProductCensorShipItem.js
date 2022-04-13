import React, { useContext, useEffect, useState } from 'react'
import './ProductCensorShipItem.css'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/Constant'
import { UserContext } from '../../reducer/User.Reducer'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'

const ProductCensorShipItem = ({
	productId,
	productName,
	cateName,
	subName,
	shopName,
	number,
	dateCreate,
	setRender
}) => {
	const userCTX = useContext(UserContext)
	const headerCTX = useContext(HeaderContext)
	const accept = (e, type) => {
		e.preventDefault()
		const productId = e.target.name

		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/product/${type}/${productId}`,
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					Authorization: `Bearer ${userCTX.state.accessToken}`
				}
			}
		)
			.then(response => {
				if (response.status === 200) {
					headerCTX.renderPopup(
						HEADER_ACTION.RENDER_POPUP,
						true,
						true,
						'Đăng Nhập Thành Công'
					)
					return response.json()
				} else {
					headerCTX.renderPopup(
						HEADER_ACTION.RENDER_POPUP,
						true,
						false,
						'Đăng Thất Bại'
					)
				}
			})
			.then(data => {
				if (data.status === 'SUCCESS') {
					setRender({})
				}
			})
	}

	return (
		<>
			<tr className={'tr-ProductCensorShipItem-header'}>
				<td className={'td-ProductCensorShipItem-content'}>
					<span> {productName} </span>
				</td>
				<td className={'td-ProductCensorShipItem-content2'}>
					<span> {cateName} </span>
				</td>
				<td className={'td-ProductCensorShipItem-content2'}>
					<span> {subName} </span>
				</td>
				<td className={'td-ProductCensorShipItem-content2'}>
					<span> {shopName} </span>
				</td>
				<td className={'td-ProductCensorShipItem-content2'}>
					<span> {number} </span>
				</td>
				<td className={'td-ProductCensorShipItem-content2'}>
					<span> {dateCreate} </span>
				</td>
				<td className={'td-ProductCensorShipItem-content2'}>
					<div className={'d-flex align-items-center justify-content-center'}>
						<span className={'span-ProductCensorShipItem-space'} />
						<div>
							<span className={'span-ProductCensorShipItem-spaceBtn'}>
								<button
									className={'button-ProductCensorShipItem-accept'}
									name={productId}
									onClick={event => accept(event, 'accept')}>
									{' '}
									Chấp nhận{' '}
								</button>
							</span>
							<span>
								<button
									className={'button-ProductCensorShipItem-cancel'}
									name={productId}
									onClick={event => accept(event, 'cancle')}>
									{' '}
									Hủy{' '}
								</button>
							</span>
						</div>
					</div>
				</td>
			</tr>
		</>
	)
}

export default ProductCensorShipItem
