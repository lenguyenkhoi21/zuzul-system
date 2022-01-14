import React, { useState } from 'react'

const SubMenu = ({ setProduct }) => {
	const [submenu, setSubmenu] = useState([
		{
			subId: 'sub-01',
			name: 'Điện thoại',
			isActive: true
		},
		{
			subId: 'sub-02',
			name: 'Pin dự phòng',
			isActive: true
		},
		{
			subId: 'sub-03',
			name: 'Ốp lưng, bao da, miếng dán điện thoại',
			isActive: true
		}
	])

	// const selectAll = () => {
	// 	const arr = []
	// 	submenu.map(value => arr.push({ ...value, isActive: true }))
	// 	setProduct([{ name: 'abc' }, { name: 'xyz' }])
	// 	setSubmenu(arr)
	// }

	const selectOne = (e, subId) => {
		const arr = []

		submenu.forEach(value => {
			if (value.subId === subId) {
				const isActive = !value.isActive
				arr.push({ ...value, isActive })
			} else {
				arr.push(value)
			}
		})

		// TODO: Call api to get product
		setProduct([{ name: 'dcad' }, { name: 'fsd' }])
		setSubmenu(arr)
	}

	return (
		<>
			{submenu.map((value, index) => (
				<React.Fragment key={index}>
					<div>
						{value.isActive ? (
							<button
								className={'button-SubMenu-color'}
								onClick={e => selectOne(e, value.subId)}>
								{value.name}
							</button>
						) : (
							<button onClick={e => selectOne(e, value.subId)}>
								{value.name}
							</button>
						)}
					</div>
				</React.Fragment>
			))}
			<style jsx>
				{`
					.button-SubMenu-color {
						color: blueviolet;
					}
				`}
			</style>
		</>
	)
}

export default SubMenu
