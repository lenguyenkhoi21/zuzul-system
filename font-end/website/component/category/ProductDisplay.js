import React from 'react'

const ProductDisplay = ({ product }) => {
	return (
		<>
			{product.map((value, key) => (
				<React.Fragment key={key}>{value.name}</React.Fragment>
			))}
		</>
	)
}

export default ProductDisplay
