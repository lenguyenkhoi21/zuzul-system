import React, { useEffect, useState } from 'react'

const ProductDisplay = ({ product }) => {
	const [prd, setPrd] = useState([])

	useEffect(() => {
		setPrd(product)
	})

	return (
		<>
			{prd.map((value, key) => (
				<React.Fragment key={key}>{value.prdName}</React.Fragment>
			))}
		</>
	)
}

export default ProductDisplay
