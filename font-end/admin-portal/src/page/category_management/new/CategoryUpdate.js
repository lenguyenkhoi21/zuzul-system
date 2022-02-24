import React, { useContext, useEffect, useState } from 'react'
import './CategoryNew.css'
import Header from '../../../component/common/Header'
import Footer from '../../../component/common/Footer'
import Content from '../../../component/common/Content'
import { UserContext } from '../../../reducer/User.Reducer'
import { useParams } from 'react-router-dom'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE, PATH } from '../../../utils/Constant'
import CategoryForm from '../../../component/category_management/common/CategoryForm'
import CategoryFormUpdate from '../../../component/category_management/common/CategoryFormUpdate'

const CategoryUpdate = ({ title }) => {
	const userCTX = useContext(UserContext)
	const { cateId } = useParams()
	const headerCTX = useContext(HeaderContext)
	const [data, setData] = useState([])

	useEffect(() => {
		headerCTX.changeTitle(HEADER_ACTION.SET_TITLE, PATH.CATEGORY_MANAGEMENT)
		// eslint-disable-next-line react-hooks/exhaustive-deps
		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/category/${userCTX.state.userID}/${cateId}`,
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
			<div className={'col index-bg-color div-New-container'}>
				<Header />
				<Content>
					<CategoryFormUpdate title={title} data={data} />
				</Content>
				<Footer />
			</div>
		</>
	)
}

export default CategoryUpdate
