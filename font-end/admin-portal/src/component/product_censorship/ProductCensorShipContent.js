import React from 'react'
import './ProductCensorShipContent.css'
import ProductCensorShipItem from './ProductCensorShipItem'

const ProductCensorShipContent = () => {
	const points = [...Array(50)]
	return (
		<>
			<table className={'table-ProductCensorShipContent'}>
				<thead>
					<tr>
						<th className={'th-ProductCensorShipContent-title'} colSpan={6}>
							<span className={'span-ProductCensorShipContent-title'}>
								Tất cả yêu cầu
							</span>
						</th>
						<th className={'th-ProductCensorShipContent-title2'} colSpan={1}>
							<button className={'button-ProductCensorShipContent-Filter'}>
								<div className={'d-inline-flex align-items-center'}>
									<img src={'/shop_request/sort.png'} alt={'Shop Request'} />
									<span className={'span-ProductCensorShipContent-Filter'}>
										{' '}
										Sort{' '}
									</span>
								</div>
							</button>
							<button className={'button-ProductCensorShipContent-Filter'}>
								<div className={'d-inline-flex align-items-center'}>
									<img src={'/shop_request/filter.png'} alt={'Shop Request'} />
									<span className={'span-ProductCensorShipContent-Filter'}>
										{' '}
										Filter{' '}
									</span>
								</div>
							</button>
						</th>
					</tr>
					<tr className={'tr-ProductCensorShipContent-header'}>
						<th className={'th-ProductCensorShipContent-header'}>
							Tên sản phẩm
						</th>
						<th className={'th-ProductCensorShipContent-header2'}>Danh mục</th>
						<th className={'th-ProductCensorShipContent-header2'}>
							Danh mục con
						</th>
						<th className={'th-ProductCensorShipContent-header2'}>
							Người dùng
						</th>
						<th className={'th-ProductCensorShipContent-header2'}>Số lượng</th>
						<th className={'th-ProductCensorShipContent-header2'}>Ngày tạo</th>
						<th className={'th-ProductCensorShipContent-header2'}>Phê duyệt</th>
					</tr>
				</thead>
				<tbody>
					{points.map((value, index) => (
						<React.Fragment key={index}>
							<ProductCensorShipItem
								productName={'Ốp lưng điện thoạia Xiaomi mẫu mới nhất năm 2022'}
								cateName={'Điện thoại & phụ Kiên'}
								subName={'Ốp lưng, bao da, miếng dán điện thoại'}
								shopName={'Shop của Khôi'}
								number={100}
								dateCreate={'23/07/2000'}
							/>
						</React.Fragment>
					))}
				</tbody>
			</table>
		</>
	)
}

export default ProductCensorShipContent
