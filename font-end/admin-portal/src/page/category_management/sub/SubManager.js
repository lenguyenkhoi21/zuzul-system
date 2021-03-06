import React, { useContext, useEffect, useState } from 'react'
import './SubManager.css'
import Header from '../../../component/common/Header'
import Footer from '../../../component/common/Footer'
import Content from '../../../component/common/Content'
import SubForm from '../../../component/category_management/sub/SubForm'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE, PATH } from '../../../utils/Constant'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../reducer/User.Reducer'

const SubManager = ({ title }) => {
	const userCTX = useContext(UserContext)
	const { subCateId } = useParams()
	const headerCTX = useContext(HeaderContext)
	const [data, setData] = useState([])

	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.CATEGORY_MANAGEMENT)
		// eslint-disable-next-line react-hooks/exhaustive-deps
		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/sub/${userCTX.state.userID}/${subCateId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${userCTX.state.accessToken}`
				},
				mode: 'cors'
			}
		)
			.then(response => response.json())
			.then(data => setData(data))
	}, [])

	return (
		<>
			<div className={'col index-bg-color div-SubManager'}>
				<Header />
				<Content>
					<SubForm
						title={data.subCategoryName}
						subCateId={data.subCategoryId}
					/>
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default SubManager
