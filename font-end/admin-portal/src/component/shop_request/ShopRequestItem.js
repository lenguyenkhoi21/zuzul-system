import React, { useContext } from 'react'
import './ShopRequestItem.css'
import { API_DOMAIN, API_USER_SERVICE } from '../../utils/Constant'
import { UserContext } from '../../reducer/User.Reducer'
import { HEADER_ACTION, HeaderContext } from '../../reducer/Header.Reducer'

const ShopRequestItem = ({ username, address, date, setRender, userId }) => {
	const userCTX = useContext(UserContext)
	const headerCTX = useContext(HeaderContext)

	const accept = (e, type) => {
		e.preventDefault()
		const productId = e.target.name

		fetch(
			`${API_DOMAIN}/${API_USER_SERVICE}/v1/admin/shop/${type}/${e.target.name}`,
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					Authorization: `Bearer ${userCTX.state.accessToken}`
				}
			}
		)
			.then(response => {
				if (response.status === 200) {
					headerCTX.renderPopup(
						HEADER_ACTION.RENDER_POPUP,
						true,
						true,
						'Đăng Nhập Thành Công'
					)
					return response.json()
				} else {
					headerCTX.renderPopup(
						HEADER_ACTION.RENDER_POPUP,
						true,
						false,
						'Đăng Thất Bại'
					)
				}
			})
			.then(data => {
				if (data.status === 'SUCCESS') {
					setRender({})
				}
			})
	}

	return (
		<>
			<tr className={'tr-ShopRequestItem-header'}>
				<td className={'td-ShopRequestItem-content'}>
					<div className={'d-inline-flex align-items-center'}>
						<img
							src={'/aboutme.png'}
							alt={'khoiln'}
							className={'img-ShopRequestItem-avatar'}
						/>
						<span className={'span-ShopRequestItem-text'}>
							{' '}
							{username} gửi yêu cầu mở gian hàng{' '}
						</span>
					</div>
				</td>
				<td className={'td-ShopRequestItem-content2'}>
					<div className={'d-flex align-items-center justify-content-center'}>
						<span className={'span-ShopRequestItem-space'} />
						<div>
							<div> {address} </div>
							{/*<div> {address.city} </div>*/}
						</div>
					</div>
				</td>
				<td className={'td-ShopRequestItem-content2'}>
					<div className={'d-flex align-items-center justify-content-center'}>
						<span className={'span-ShopRequestItem-space'} />
						<span>{date}</span>
					</div>
				</td>
				<td className={'td-ShopRequestItem-content2'}>
					<div className={'d-flex align-items-center justify-content-center'}>
						<span className={'span-ShopRequestItem-space'} />
						<div>
							<span className={'span-ShopRequestItem-spaceBtn'}>
								<button
									className={'button-ShopRequestItem-accept'}
									name={userId}
									onClick={event => accept(event, 'accept')}>
									{' '}
									Chấp nhận{' '}
								</button>
							</span>
							<span>
								<button
									className={'button-ShopRequestItem-cancel'}
									name={userId}
									onClick={event => accept(event, 'reject')}>
									{' '}
									Hủy{' '}
								</button>
							</span>
						</div>
					</div>
				</td>
			</tr>
		</>
	)
}

export default ShopRequestItem
