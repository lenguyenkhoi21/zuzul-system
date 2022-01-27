import React, { useContext, useEffect } from 'react'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'
import { PATH } from '../../utils/Constant'
import Header from '../../component/common/Header'
import './ShopRequestPage.css'
import Footer from '../../component/common/Footer'
import Content from '../../component/common/Content'
import ShopRequestContent from '../../component/shop_request/ShopRequestContent'

const ShopRequestPage = () => {
	const headerCTX = useContext(HeaderContext)

	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.SHOP_REQUEST)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className={'col index-bg-color div-ShopRequestPage-container'}>
				<Header />
				<Content>
					<ShopRequestContent />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default ShopRequestPage
