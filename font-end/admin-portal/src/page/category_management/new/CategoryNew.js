import React, { useContext, useEffect } from 'react'
import Header from '../../../component/common/Header'
import Content from '../../../component/common/Content'
import Footer from '../../../component/common/Footer'
import CategoryForm from '../../../component/category_management/common/CategoryForm'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'
import { PATH } from '../../../utils/Constant'

const CategoryNew = ({ title }) => {
	const headerCTX = useContext(HeaderContext)
	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.CATEGORY_MANAGEMENT)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<div className={'col index-bg-color div-New-container'}>
				<Header />
				<Content>
					<CategoryForm title={title} />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default CategoryNew
