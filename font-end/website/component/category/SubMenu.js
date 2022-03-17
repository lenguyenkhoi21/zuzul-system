import React, { useEffect, useState } from 'react'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/APIUtils'
import { data } from 'autoprefixer'

const SubMenu = ({ setProduct, pathname, path }) => {
	const [submenu, setSubmenu] = useState([])

	useEffect(() => {
		// fetch all to subcategroy by cateogryid
		// transform data before set
		// map(x -> {...x, selected: false}
		// [
		// {
		//    suId: me va be
		//    id:
		//    selected: false
		// },..
		// ]

		if (pathname !== '[cate_id]') {
			fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/${pathname}/sub/all`, {
				method: 'GET',
				mode: 'cors'
			})
				.then(response => response.json())
				.then(data => {
					const sub = []
					data.map(element => sub.push({ ...element, select: false }))
					setSubmenu(sub)
				})
		}
	}, [pathname, path])

	const selectOne = (e, subId) => {
		// Todo: hanlde event on click
		// check if status -> true thanh false, false true, set nguoc vao cai []
		//
		// loop qua, thang nao true thi nem vo arr

		// TODO: Call api to get product
		//setProduct([{ name: 'dcad' }, { name: 'fsd' }])

		e.preventDefault()

		if (e.target.checked) {
			submenu.map(ele => {
				if (ele.subCategoryId === subId) {
					let arr = submenu
					arr[arr.indexOf(ele)] = { ...arr[arr.indexOf(ele)], select: true }
					setSubmenu(arr)
				}
			})
		} else {
			submenu.map(ele => {
				if (ele.subCategoryId === subId) {
					let arr = submenu
					arr[arr.indexOf(ele)] = { ...arr[arr.indexOf(ele)], select: false }
					setSubmenu(arr)
				}
			})
		}

		const payload = []
		submenu.map(element => {
			if (element.select === true) payload.push(element.subCategoryId)
		})

		fetch(
			`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/product/category/${pathname}/sub/multiple`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			}
		)
			.then(response => response.json())
			.then(data => setProduct(data))
	}

	return (
		<>
			{submenu.map((value, index) => (
				<React.Fragment key={index}>
					<ol>
						<li>
							<div className='filter-group-list '>
								{/*select = true, render checkbox*/}
								{value.select ? (
									<button
										className={'button-SubMenu-color '}
										onClick={e => selectOne(e, value.subCategoryId)}>
										<label htmlFor={index}>
											<input
												className='checkbox geekmark'
												type='checkbox'
												checked={true}
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
