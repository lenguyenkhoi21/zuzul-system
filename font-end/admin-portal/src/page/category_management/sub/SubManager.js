import React, { useContext, useEffect } from 'react'
import './SubManager.css'
import Header from '../../../component/common/Header'
import Footer from '../../../component/common/Footer'
import Content from '../../../component/common/Content'
import SubForm from '../../../component/category_management/sub/SubForm'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'
import { PATH } from '../../../utils/Constant'

const SubManager = ({ title }) => {
	const headerCTX = useContext(HeaderContext)
	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.CATEGORY_MANAGEMENT)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<div className={'col index-bg-color div-SubManager'}>
				<Header />
				<Content>
					<SubForm title={title} />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default SubManager
