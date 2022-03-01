import React, { useEffect, useState } from 'react'

const SubMenu = ({ setProduct, subCategoryList }) => {
	const [submenu, setSubmenu] = useState([])

	// const selectAll = () => {
	// 	const arr = []
	// 	submenu.map(value => arr.push({ ...value, isActive: true }))
	// 	setProduct([{ name: 'abc' }, { name: 'xyz' }])
	// 	setSubmenu(arr)
	// }

	useEffect(() => {
		setSubmenu(subCategoryList)
	})

	const selectOne = (e, subId) => {
		const arr = []

		submenu.forEach(value => {
			if (value.subCategoryId === subId) {
				const isActive = !value.isActive
				arr.push({ ...value, isActive })
			} else {
				arr.push(value)
			}
		})

		// TODO: Call api to get product
		//setProduct([{ name: 'dcad' }, { name: 'fsd' }])
		setSubmenu(arr)
	}

	return (
		<>
			{submenu.map((value, index) => (
				<React.Fragment key={index}>
					<ol>
						<li>
							<div className='filter-group-list '>
								{value.isActive ? (
									<button
										className={'button-SubMenu-color '}
										onClick={e => selectOne(e, value.subCategoryId)}>
										<label htmlFor={index}>
											<input
												className='checkbox geekmark'
												type='checkbox'
												id={index}
											/>
											<span className='geekmark' />
											{value.subCategoryName}
										</label>
									</button>
								) : (
									<button onClick={e => selectOne(e, value.subCategoryId)}>
										<label htmlFor={index}>
											<input
												className='checkbox geekmark'
												type='checkbox'
												id={index}
											/>
											<span className='geekmark'></span>
											{value.subCategoryName}
										</label>
									</button>
								)}
							</div>
						</li>
					</ol>
				</React.Fragment>
			))}
			<style jsx>
				{`
					.button-SubMenu-color {
						color: #151515;
						text-align: inherit;

						display: contents;
					}

					label {
						cursor: pointer;
						padding-left: 5px;
						margin-right: 5px;
						padding-bottom: 12px;
					}

					label:hover {
						color: #46d362;
					}

					label:visited {
						color: #46d362;
					}

					label:checked ~ .geekmark {
						background-color: green;
					}
					.geekmark {
						padding-right: 10px;
					}

					.filter-group-list {
						display: block;
						padding-bottom: 12px;
					}

					li {
						//list-style-type: disc;
						//list-style-position: revert;
						//margin-left: 20px;
					}
				`}
			</style>
		</>
	)
}

export default SubMenu
