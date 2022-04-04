import React, { useContext, useState } from 'react'
import './CategoryForm.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../reducer/User.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../../utils/Constant'

const CategoryForm = ({ title }) => {
	const userCTX = useContext(UserContext)
	const [category, setCategory] = useState({
		userId: userCTX.state.userID,
		categoryName: '',
		categoryDescription: 'Category'
	})

	const [picture, setPicture] = useState(null)

	const onChange = e => {
		setCategory({ ...category, categoryName: e.target.value })
	}

	const insertCategory = e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('userId', category.userId)
		formData.append('categoryName', category.categoryName)
		formData.append('categoryDescription', category.categoryDescription)
		formData.append('cat_image', picture)
		console.log(picture)
		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/category`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`
			},
			mode: 'cors',
			body: formData
		})
			.then(response => response.json())
			.catch(data => console.log(data))
	}

	// const resetCategory = e => {
	// 	e.preventDefault()
	// 	setCategory({ ...category, categoryName: '' })
	//   setPicture(null)
	// }

	return (
		<>
			<div className={'div-CategoryForm'}>
				<div className={'div-CategoryForm-sp'}>
					<div className={'d-flex'}>
						<span className={'span-CategoryForm-imgsp'}>
							<Link to={'/category_management'}>
								<img src={'/category_mng/back.png'} alt={'back'} />
							</Link>
						</span>
						<p className={'p-CategoryForm-title'}> {title} </p>
					</div>
				</div>
				<div className={'div-CategoryForm-margin'}>
					<form className={'form-CategoryForm-size'}>
						<div className={'row no-gutters div-CategoryForm-label'}>
							<div className={'col-md-4'}>
								<div className={'d-flex justify-content-end'}>
									<label className={'label-CategoryForm-text'}>
										Tên danh mục
									</label>
								</div>
							</div>
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<input
									name={'categoryName'}
									value={category.categoryName}
									onChange={onChange}
									className={'input-CategoryForm-text'}
								/>
							</div>
						</div>
						<div className={'row no-gutters'}>
							<div className={'col-md-4'}>
								<div className={'d-flex justify-content-end'}>
									<label className={'label-CategoryForm-text'}>Ảnh</label>
								</div>
							</div>
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<input
									type={'file'}
									onChange={e => setPicture(e.target.files[0])}
									className={'input-CategoryForm-img'}
								/>
							</div>
						</div>
						<div className={'row no-gutters'}>
							<div className={'col-md-4'} />
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<div className={'d-flex'}>
									<div>
										<span className={'span-CategoryForm-spaceBtn'}>
											<button
												className={'button-CategoryForm-accept'}
												onClick={insertCategory}>
												{' '}
												Chấp nhận{' '}
											</button>
										</span>
										{/*<span>*/}
										{/*	<button*/}
										{/*		className={'button-CategoryForm-cancel'}*/}
										{/*		onClick={resetCategory}>*/}
										{/*		{' '}*/}
										{/*		Hủy{' '}*/}
										{/*	</button>*/}
										{/*</span>*/}
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default CategoryForm
