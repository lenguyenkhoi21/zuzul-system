import React, { useState } from 'react'
import './CategoryItem.css'
import SubCateList from './SubCateList'
import { Link } from 'react-router-dom'

const CategoryItem = ({ categoryId, categoryName }) => {
	const [on, setOn] = useState(false)

	/*
	 * [
	 * {
	 *     subCategoryId:
	 *     subCategoryName:
	 * }
	 * ]
	 * */

	const turnOn = event => {
		setOn(!on)
	}

	const nestedButton = event => {
		event.stopPropagation()
	}

	return (
		<>
			<div>
				{on ? (
					<>
						<div className={'div-CategoryItem'}>
							<div
								onClick={turnOn}
								className={'button-CategoryItem button-CategoryItem-Active'}>
								<div>
									<span style={{ float: 'left' }}> {categoryName} </span>
									<div
										className={'button-CategoryItem-edit'}
										style={{ float: 'right' }}>
										<Link to={`/category_management/update/${categoryId}`}>
											<img src={'/category_mng/edit.png'} alt={'edit'} />
										</Link>
									</div>
									<div style={{ clear: 'both' }} />
								</div>
							</div>
							<SubCateList categoryId={categoryId} />
						</div>
					</>
				) : (
					<div className={'div-CategoryItem'}>
						<button onClick={turnOn} className={'button-CategoryItem'}>
							<span> {categoryName} </span>
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default CategoryItem
