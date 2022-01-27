import React from 'react'
import './SubCateList.css'

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
							<img
								src={'/category_mng/editSub.png'}
								alt={'edit sub'}
								style={{ float: 'right' }}
							/>
						</div>
						<div style={{ clear: 'both' }} />
					</div>
				</React.Fragment>
			))}
			<div
				className={
					'd-flex align-items-center justify-content-center div-SubCateList-add'
				}>
				<button className={'button-SubCateList-add'}>
					<img src={'/category_mng/add.png'} alt={'afasdf'} />
				</button>
			</div>
		</>
	)
}

export default SubCateList
