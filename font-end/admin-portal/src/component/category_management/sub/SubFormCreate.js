import React, { useContext, useState } from 'react'
import { UserContext } from '../../../reducer/User.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../../utils/Constant'
import { Link } from 'react-router-dom'

const SubFormCreate = ({ cateId }) => {
	const userCTX = useContext(UserContext)

	const [subCategory, setSubCategory] = useState({
		userId: '',
		subCategoryName: '',
		subCategoryDescription: '',
		categoryId: ''
	})

	const [status, setStatus] = useState([])

	const onChangeName = e => {
		setSubCategory({ ...subCategory, subCategoryName: e.target.value })
	}

	const insertSubCategory = e => {
		e.preventDefault()

		const data = {
			userId: userCTX.state.userID,
			subCategoryName: subCategory.subCategoryName,
			subCategoryDescription: 'Good',
			categoryId: cateId
		}

		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/sub`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json, text/plain',
				'Content-Type': 'application/json;charset=UTF-8'
			},
			mode: 'cors',
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => setStatus(data))
	}

	return (
		<>
			<div className={'div-SubForm'}>
				<div className={'div-SubForm-sp'}>
					<div className={'d-flex'}>
						<span className={'span-SubForm-imgsp'}>
							<Link to={'/category_management'}>
								<img src={'/category_mng/back.png'} alt={'back'} />
							</Link>
						</span>
					</div>
				</div>
				<div className={'div-SubForm-margin'}>
					<form className={'form-SubForm-size'}>
						<div className={'row no-gutters div-SubForm-label'}>
							<div className={'col-md-4'}>
								<div className={'d-flex justify-content-end'}>
									<label className={'label-SubForm-text'}>
										Tên danh mục con mới
									</label>
								</div>
							</div>
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<input
									name={'subCategoryName'}
									className={'input-SubForm-text'}
									onChange={onChangeName}
								/>
							</div>
						</div>
						<div className={'row no-gutters'}>
							<div className={'col-md-4'} />
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<div className={'d-flex'}>
									<div>
										<span className={'span-SubForm-spaceBtn'}>
											<button
												className={'button-SubForm-accept'}
												onClick={insertSubCategory}>
												{' '}
												Chấp nhận{' '}
											</button>
										</span>
										<span>
											<button className={'button-SubForm-cancel'}> Hủy </button>
										</span>
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

export default SubFormCreate
