import React from 'react'
import './CategoryForm.css'
import { Link } from 'react-router-dom'

const CategoryForm = ({ title }) => {
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
									name={'categoryname'}
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
									name={'categoryname'}
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
											<button className={'button-CategoryForm-accept'}>
												{' '}
												Chấp nhận{' '}
											</button>
										</span>
										<span>
											<button className={'button-CategoryForm-cancel'}>
												{' '}
												Hủy{' '}
											</button>
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

export default CategoryForm
