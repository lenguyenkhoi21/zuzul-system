import React from 'react'
import './ShopRequestItem.css'

const ShopRequestItem = ({ username, address, date }) => {
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
							<div> {address.road} </div>
							<div> {address.city} </div>
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
								<button className={'button-ShopRequestItem-accept'}>
									{' '}
									Chấp nhận{' '}
								</button>
							</span>
							<span>
								<button className={'button-ShopRequestItem-cancel'}>
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
