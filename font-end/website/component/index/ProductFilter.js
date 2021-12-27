import React from 'react'
import ProductShort from '../common/ProductShort'
import { timeNow } from '../../utils/Utils'

const ProductFilter = ({ type, products }) => {
	console.log(
		`${timeNow()} --- [ProductFilter] --- Render at component/common/ProductFilter.js`
	)
	return (
		<>
			<div className={'div-productFilter'}>
				<p className={'font-poppins p-productFilter-title'}> {type} </p>
				<div className={'flex flex-wrap'}>
					{products.map((value, key) => (
						<React.Fragment key={key}>
							<ProductShort product={value} />
						</React.Fragment>
					))}
				</div>
			</div>
			<style jsx>
				{`
					.div-productFilter {
						background-color: rgba(255, 255, 255, 1);
						padding-left: 44px;
						padding-top: 64px;
						padding-bottom: 74px;
					}
					.p-productFilter-title {
						font-size: 18px;
						margin-bottom: 11px;
						margin-top: 14px;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(ProductFilter)
