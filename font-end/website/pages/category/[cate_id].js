import React, { useContext, useEffect, useState } from 'react'
import { timeNow } from '../../utils/Utils'
import Menu from '../../component/category/Menu'
import ProductDisplay from '../../component/category/ProductDisplay'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import { useRouter } from 'next/router'
import SubMenu from '../../component/category/SubMenu'

//TODO: Build staics page with category
// eslint-disable-next-line no-unused-vars
const CategoryPage = () => {
	console.log(
		`${timeNow()} --- [Category] --- Render at pages/category/index.js`
	)

	const [product, setProduct] = useState([])
  // eslint-disable-next-line no-unused-vars
	const [category, setCategory] = useState([
		{
			id: 'category-01',
			name: 'Thời trang nam',
			image: '1.jpg'
		},
		{
			id: 'category-02',
			name: 'Thời trang nữ',
			image: '1.jpg'
		},
		{
			id: 'category-03',
			name: 'Điện thoại & Phụ kiện',
			image: '1.jpg'
		},
		{
			id: 'category-04',
			name: 'Mẹ & Bé',
			image: '1.jpg'
		},
		{
			id: 'category-05',
			name: 'Thiết bị điện tử',
			image: '1.jpg'
		},
		{
			id: 'category-06',
			name: 'Nhà cửa & Đời sống',
			image: '1.jpg'
		},
		{
			id: 'category-08',
			name: 'Máy tính & Laptop',
			image: '1.jpg'
		},
		{
			id: 'category-09',
			name: 'Sắc đẹp',
			image: '1.jpg'
		},
		{
			id: 'category-10',
			name: 'Máy ảnh & Máy quay phim',
			image: '1.jpg'
		},
		{
			id: 'category-11',
			name: 'Sức khỏe',
			image: '1.jpg'
		},
		{
			id: 'category-12',
			name: 'Đồng Hồ',
			image: '1.jpg'
		},
		{
			id: 'category-13',
			name: 'Giày dép',
			image: '1.jpg'
		}
	])
	const titleCTX = useContext(TitleContext)
	const router = useRouter()
	const path = router.asPath
	const pathname = path.split('/')[2]
	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Danh mục sản phẩm')
    // TODO: Fetch api to get all catecory
	}, [path])
	return (
		<>
			<div className={'px-330 page-body'}>
				<SubMenu setProduct={setProduct} />
        <hr />
				<Menu category={category} pathname={pathname} />
				<ProductDisplay product={product} />
			</div>
			<style jsx>{``}</style>
		</>
	)
}

export default CategoryPage
