import { TITLE_ACTION, TitleContext } from '../reducer/Title.Reducer'
import { useContext, useEffect, useState } from 'react'
import { timeNow } from '../utils/Utils'
import CategoryScroll from '../component/index/CategoryScroll'
import ProductFilter from '../component/index/ProductFilter'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../utils/APIUtils'

const HomePage = () => {
	console.log(`${timeNow()} --- [Home] --- Render at pages/index.js`)
	const titleCTX = useContext(TitleContext)

	const [categoryList, setCategory] = useState([])
	const [productList, setProduct] = useState([])
	//Change title of page
	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Trang chủ')
		// eslint-disable-next-line react-hooks/exhaustive-deps
		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/category/all`, {
			method: 'GET',
			mode: 'cors'
		})
			.then(response => response.json())
			.then(data => setCategory(data))

		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/product/all`, {
			method: 'GET',
			mode: 'cors'
		})
			.then(response => response.json())
			.then(data => setProduct(data))
	}, [])

	return (
		<>
			<div className={`px-330 page-body`}>
				<CategoryScroll categoryList={categoryList} />
				<ProductFilter
					type={'Sản phẩm được cồng dồng đánh giá cao'}
					products={productList}
				/>
				{/*<ProductFilter type={'Sản phẩm đang hạ giá'} products={saleProduct} />*/}
				{/*<ProductFilter type={'Sản phẩm mới'} products={newProduct} />*/}
			</div>
			<style jsx>{``}</style>
		</>
	)
}
//
// export const getStaticProps = async () => {
// 	//TODO: Call API to get the category
// 	const category = [
// 		{
// 			id: 'category-01',
// 			name: 'Thời trang nam',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-02',
// 			name: 'Thời trang nữ',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-03',
// 			name: 'Điện thoại & Phụ kiện',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-04',
// 			name: 'Mẹ & Bé',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-05',
// 			name: 'Thiết bị điện tử',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-06',
// 			name: 'Nhà cửa & Đời sống',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-08',
// 			name: 'Máy tính & Laptop',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-09',
// 			name: 'Sắc đẹp',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-10',
// 			name: 'Máy ảnh & Máy quay phim',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-11',
// 			name: 'Sức khỏe',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-12',
// 			name: 'Đồng Hồ',
// 			image: '1.jpg'
// 		},
// 		{
// 			id: 'category-13',
// 			name: 'Giày dép',
// 			image: '1.jpg'
// 		}
// 	]
//
// 	//TODO: Call API to get the newest product
// 	const saleProduct = [
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '3.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		}
// 	]
//
// 	//TODO: Call API to get the product that have high react
// 	const bestProduct = [
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		}
// 	]
//
// 	//TODO: Call API to get the newest product
// 	const newProduct = [
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-001',
// 			name: 'Áo khoác',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 123,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		},
// 		{
// 			id: 'prd-002',
// 			name: 'Quần Jeans',
// 			price: 15000,
// 			image: '1.jpg',
// 			react: 345,
// 			des_short: 'Sản phẩm này là hàng chất lượng cao',
// 			cate_id: 'cagegory-01',
// 			sub_id: 'sub-01'
// 		}
// 	]
//
// 	return {
// 		props: {
// 			bestProduct,
// 			newProduct,
// 			saleProduct,
// 			category
// 		}
// 	}
// }

export default HomePage
