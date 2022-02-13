import React, { useState } from 'react'
import './CategoryItem.css'
import SubCateList from './SubCateList'
import { Link } from 'react-router-dom'

const CategoryItem = () => {
	const [on, setOn] = useState(false)

	const turnOn = event => {
		setOn(!on)
		console.log('1')
	}

	const nestedButton = event => {
		event.stopPropagation()
		console.log('2')
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
									<span style={{ float: 'left' }}> Thời trang nam </span>
									<div
										className={'button-CategoryItem-edit'}
										style={{ float: 'right' }}>
										<Link to={'/category_management/update/123'}>
											<img src={'/category_mng/edit.png'} alt={'edit'} />
										</Link>
									</div>
									<div style={{ clear: 'both' }} />
								</div>
							</div>
							<SubCateList />
						</div>
					</>
				) : (
					<div className={'div-CategoryItem'}>
						<button onClick={turnOn} className={'button-CategoryItem'}>
							<span> Thời trang nam </span>
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default CategoryItem
