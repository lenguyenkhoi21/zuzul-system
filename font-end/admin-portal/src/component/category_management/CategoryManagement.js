import React, { useContext, useEffect, useState } from 'react'
import './CategoryManagement.css'
import CategoryItem from './CategoryItem'
import { Link } from 'react-router-dom'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/Constant'
import { UserContext } from '../../reducer/User.Reducer'

const CategoryManagement = () => {
	const userCTX = useContext(UserContext)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/category/all/${userCTX.state.userID}`,
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
			<div className={'div-CategoryManagement'}>
				<p className={'p-div-CategoryManagement-title'}> Tất cả danh mục </p>
				<div className={'container-fluid p-0'}>
					<div className={'row no-gutters'}>
						<div className={'col-md-4'}>
							{data.map((value, index) => {
								if (index % 3 === 0) {
									return (
										<React.Fragment key={index}>
											<CategoryItem
												categoryId={value.categoryId}
												categoryName={value.categoryName}
											/>
										</React.Fragment>
									)
								} else return <React.Fragment key={index} />
							})}
						</div>
						<div className={'col-md-4'}>
							{data.map((value, index) => {
								if (index % 3 === 1) {
									return (
										<React.Fragment key={index}>
											<CategoryItem
												categoryId={value.categoryId}
												categoryName={value.categoryName}
											/>
										</React.Fragment>
									)
								} else return <React.Fragment key={index} />
							})}
						</div>
						<div className={'col-md-4'}>
							{data.map((value, index) => {
								if (index % 3 === 2) {
									return (
										<React.Fragment key={index}>
											<CategoryItem
												categoryId={value.categoryId}
												categoryName={value.categoryName}
											/>
										</React.Fragment>
									)
								} else return <React.Fragment key={index} />
							})}
						</div>
					</div>
				</div>
			</div>
			<div
				className={
					'd-flex align-content-center justify-content-center div-CategoryManagementPage-add'
				}>
				<button className={'button-CategoryManagement'}>
					<Link to={'/category_management/new'}>
						<div
							className={'d-flex align-content-center justify-content-center'}>
							<img
								src={'/category_mng/plus.png'}
								alt={'ok'}
								className={'img-CategoryManagement-space'}
							/>
							<span className={'span-CategoryManagement-add'}>
								{' '}
								Thêm danh mục mới{' '}
							</span>
						</div>
					</Link>
				</button>
			</div>
		</>
	)
}

export default CategoryManagement
