import React from 'react'
import './SubForm.css'
import { Link } from 'react-router-dom'

const SubForm = ({ title }) => {
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
								<input name={'categoryname'} className={'input-SubForm-text'} />
							</div>
						</div>
						<div className={'row no-gutters'}>
							<div className={'col-md-4'} />
							<div className={'col-md-2'} />
							<div className={'col-md-6'}>
								<div className={'d-flex'}>
									<div>
										<span className={'span-SubForm-spaceBtn'}>
											<button className={'button-SubForm-accept'}>
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
