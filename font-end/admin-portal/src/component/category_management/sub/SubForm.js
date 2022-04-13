import React, { useContext, useState } from 'react'
import './SubForm.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../reducer/User.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../../utils/Constant'
import { HEADER_ACTION, HeaderContext } from '../../../reducer/Header.Reducer'

const SubForm = ({ title, subCateId }) => {
	const userCTX = useContext(UserContext)
	const headerCTX = useContext(HeaderContext)
	const [subCategory, setSubCategory] = useState({
		subCategoryId: '',
		userId: '',
		subCategoryName: ''
	})

	const changeState = () => {
		setSubCategory({
			subCategoryId: subCateId,
			userId: userCTX.state.userID,
			subCategoryName: title
		})
	}

	const onChangeName = e => {
		setSubCategory({ ...subCategory, subCategoryName: e.target.value })
	}

	const updateSubCategory = e => {
		e.preventDefault()

		changeState()

		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/admin/management/sub`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json, text/plain',
				'Content-Type': 'application/json;charset=UTF-8'
			},
			mode: 'cors',
			body: JSON.stringify({
				subCategoryId: subCategory.subCategoryId,
				userId: subCategory.userId,
				subCategoryName: subCategory.subCategoryName
			})
		}).then(response => {
			if (response.status === 200) {
				headerCTX.renderPopup(
					HEADER_ACTION.RENDER_POPUP,
					true,
					true,
					'Đăng Nhập Thành Công'
				)
			} else {
				headerCTX.renderPopup(
					HEADER_ACTION.RENDER_POPUP,
					true,
					false,
					'Đăng Thất Bại'
				)
			}
		})
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
						<p className={'p-SubForm-title'}> {title} </p>
					</div>
				</div>
				<div className={'div-SubForm-margin'}>
					<form className={'form-SubForm-size'}>
						<div className={'row no-gutters div-SubForm-label'}>
							<div className={'col-md-4'}>
								<div className={'d-flex justify-content-end'}>
									<label className={'label-SubForm-text'}>
										Tên danh mục con
									</label>
								</div>
							</div>
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<input
									name={'categoryname'}
									className={'input-SubForm-text'}
									defaultValue={title}
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
												onClick={updateSubCategory}>
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

export default SubForm
