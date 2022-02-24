import React, { useContext, useEffect, useState } from 'react'
import './SubManager.css'
import Header from '../../../component/common/Header'
import Footer from '../../../component/common/Footer'
import Content from '../../../component/common/Content'
import { useParams } from 'react-router-dom'
import SubFormCreate from '../../../component/category_management/sub/SubFormCreate'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'
import { PATH } from '../../../utils/Constant'

const SubCreate = ({ title }) => {
	const { cateId } = useParams()
	const headerCTX = useContext(HeaderContext)

	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.CATEGORY_MANAGEMENT)
	}, [])

	return (
		<>
			<div className={'col index-bg-color div-SubManager'}>
				<Header />
				<Content>
					<SubFormCreate cateId={cateId} />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default SubCreate
