import React, { useContext, useEffect } from 'react'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'
import { PATH } from '../../utils/Constant'
import Header from '../../component/common/Header'
import Content from '../../component/common/Content'
import Footer from '../../component/common/Footer'
import './CategoryManagementPage.css'
import CategoryManagement from '../../component/category_management/CategoryManagement'

const CategoryManagementPage = () => {
	const headerCTX = useContext(HeaderContext)
	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.CATEGORY_MANAGEMENT)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<div
				className={'col index-bg-color div-CategoryManagementPage-container'}>
				<Header />
				<Content>
					<CategoryManagement />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default CategoryManagementPage
