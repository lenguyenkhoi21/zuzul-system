import React, { useContext, useEffect, useState } from 'react'
import './ShopRequestContent.css'
import ShopRequestItem from './ShopRequestItem'
import {
	API_DOMAIN,
	API_PRODUCT_SERVICE,
	API_USER_SERVICE
} from '../../utils/Constant'
import { UserContext } from '../../reducer/User.Reducer'

const ShopRequestContent = () => {
	const points = [...Array(50)]
	const userCTX = useContext(UserContext)
	const [userInfo, setUserInfo] = useState([])
	const [render, setRender] = useState({})

	useEffect(() => {
		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/admin/shop/requestShop`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`
			}
		})
			.then(response => (response.status === 200 ? response.json() : response))
			.then(data => setUserInfo(data))
	}, [userCTX.state.userID, render])

	const formatDate = date => {
		let timestamp = date * 1000
		let date_not_formatted = new Date(timestamp)

		let formatted_string = date_not_formatted.getFullYear() + '-'

		if (date_not_formatted.getMonth() < 9) {
			formatted_string += '0'
		}
		formatted_string += date_not_formatted.getMonth() + 1
		formatted_string += '-'

		if (date_not_formatted.getDate() < 10) {
			formatted_string += '0'
		}
		formatted_string += date_not_formatted.getDate()

		return formatted_string
	}

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
					{userInfo.map((value, index) => (
						<React.Fragment key={index}>
							<ShopRequestItem
								username={value.userFullName}
								/*address={{
									road: '40 Phan Chu Trinh, P. Thắng Lợi',
									city: 'Kon tum'
								}}*/
								address={value.address}
								date={formatDate(value.sendRequestDate)}
								setRender={setRender}
								userId={value.userId}
							/>
						</React.Fragment>
					))}
				</tbody>
			</table>
		</>
	)
}

export default ShopRequestContent
