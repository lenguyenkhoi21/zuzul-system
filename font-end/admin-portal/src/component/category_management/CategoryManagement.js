import React, { useEffect } from 'react'
import './CategoryManagement.css'
import CategoryItem from './CategoryItem'
import { Link } from 'react-router-dom'

const CategoryManagement = () => {
	useEffect(() => {
		// Fetch API
	}, [])

	return (
		<>
			<div className={'div-CategoryManagement'}>
				<p className={'p-div-CategoryManagement-title'}> Tất cả danh mục </p>
				<div className={'container-fluid p-0'}>
					<div className={'row no-gutters'}>
						<div className={'col-md-4'}>
							<CategoryItem />
							<CategoryItem />
							<CategoryItem />
							<CategoryItem />
						</div>
						<div className={'col-md-4'}>
							<CategoryItem />
							<CategoryItem />
						</div>
						<div className={'col-md-4'}>
							<CategoryItem />
							<CategoryItem />
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
								Thêm sản phẩm{' '}
							</span>
						</div>
					</Link>
				</button>
			</div>
		</>
	)
}

export default CategoryManagement
