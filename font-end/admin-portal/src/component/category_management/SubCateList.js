import React from 'react'
import './SubCateList.css'
import { Link } from 'react-router-dom'

const SubCateList = () => {
	const points = [...Array(5)]
	return (
		<>
			{points.map((value, key) => (
				<React.Fragment key={key}>
					<div className={'div-SubCateList'}>
						<span className={'span-SubCateList'} style={{ float: 'left' }}>
							{' '}
							Áo khoác{' '}
						</span>
						<div>
							<span>
								<Link to={'/category_management/sub_update/123'}>
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
					<Link to={'/category_management/sub_new'}>
						<img src={'/category_mng/add.png'} alt={'afasdf'} />
					</Link>
				</div>
			</div>
		</>
	)
}

export default SubCateList