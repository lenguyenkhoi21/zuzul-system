import React from 'react'
import './ProductCensorShipItem.css'

const ProductCensorShipItem = ({
	productName,
	cateName,
	subName,
	shopName,
	number,
	dateCreate
}) => {
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
								<button className={'button-ProductCensorShipItem-accept'}>
									{' '}
									Chấp nhận{' '}
								</button>
							</span>
							<span>
								<button className={'button-ProductCensorShipItem-cancel'}>
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
