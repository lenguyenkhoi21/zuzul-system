import React from 'react'
import './ShopRequestContent.css'
import ShopRequestItem from './ShopRequestItem'

const ShopRequestContent = () => {
	const points = [...Array(50)]
	return (
		<>
			<table className={'table-ShopRequestContent'}>
				<thead>
					<tr>
						<th className={'th-ShopRequestContent-title'} colSpan={3}>
							<span className={'span-ShopRequestContent-title'}>
								Tất cả yêu cầu
							</span>
						</th>
						<th className={'th-ShopRequestContent-title2'} colSpan={1}>
							<button className={'button-ShopRequestContent-Filter'}>
								<div className={'d-inline-flex align-items-center'}>
									<img src={'/shop_request/sort.png'} alt={'Shop Request'} />
									<span className={'span-ShopRequestContent-Filter'}>
										{' '}
										Sort{' '}
									</span>
								</div>
							</button>
							<button className={'button-ShopRequestContent-Filter'}>
								<div className={'d-inline-flex align-items-center'}>
									<img src={'/shop_request/filter.png'} alt={'Shop Request'} />
									<span className={'span-ShopRequestContent-Filter'}>
										{' '}
										Filter{' '}
									</span>
								</div>
							</button>
						</th>
					</tr>
					<tr className={'tr-ShopRequestContent-header'}>
						<th className={'th-ShopRequestContent-header'}>Người dùng</th>
						<th className={'th-ShopRequestContent-header2'}>Địa chỉ</th>
						<th className={'th-ShopRequestContent-header2'}>
							Ngày gửi yêu cầu
						</th>
						<th className={'th-ShopRequestContent-header2'}>
							Chấp nhận/ Từ chối
						</th>
					</tr>
				</thead>
				<tbody>
					{points.map((value, index) => (
						<React.Fragment key={index}>
							<ShopRequestItem
								username={'Lê Nguyên Khôi'}
								address={{
									road: '40 Phan Chu Trinh, P. Thắng Lợi',
									city: 'Kon tum'
								}}
								date={'23/07/2000'}
							/>
						</React.Fragment>
					))}
				</tbody>
			</table>
		</>
	)
}

export default ShopRequestContent
