import React, { useContext, useEffect, useState } from 'react'
import './SubCateList.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../reducer/User.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/Constant'

const SubCateList = ({ categoryId }) => {
	const userCTX = useContext(UserContext)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/sub/all/${userCTX.state.userID}/${categoryId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${userCTX.state.accessToken}`
				},
				mode: 'cors'
			}
		)
			.then(response => response.json())
			.then(json => setData(json))
	}, [])

	return (
		<>
			{data.map((value, key) => (
				<React.Fragment key={key}>
					<div className={'div-SubCateList'}>
						<span className={'span-SubCateList'} style={{ float: 'left' }}>
							{value.subCategoryName}
						</span>
						<div>
							<span>
								<Link
									to={`/category_management/sub_update/${value.subCategoryId}`}>
									<img
										src={'/category_mng/editSub.png'}
										alt={'edit sub'}
										style={{ float: 'right' }}
									/>
								</Link>
							</span>
						</div>
						<div style={{ clear: 'both' }} />
					</div>
				</React.Fragment>
			))}
			<div
				className={
					'd-flex align-items-center justify-content-center div-SubCateList-add'
				}>
				<div className={'button-SubCateList-add'}>
					<Link to={`/category_management/sub_new/${categoryId}`}>
						<img src={'/category_mng/add.png'} alt={'afasdf'} />
					</Link>
				</div>
			</div>
		</>
	)
}

export default SubCateList
