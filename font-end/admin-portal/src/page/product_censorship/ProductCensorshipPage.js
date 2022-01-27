import React, { useContext, useEffect } from 'react'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'
import { PATH } from '../../utils/Constant'
import Header from '../../component/common/Header'
import Content from '../../component/common/Content'
import Footer from '../../component/common/Footer'
import './ProductCensorShipPage.css'
import ProductCensorShipContent from '../../component/product_censorship/ProductCensorShipContent'

const ProductCensorShipPage = () => {
	const headerCTX = useContext(HeaderContext)
	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.PRODUCT_CENSORSHIP)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<div className={'col index-bg-color div-ProductCensorShipPage-container'}>
				<Header />
				<Content>
					<ProductCensorShipContent />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default ProductCensorShipPage
