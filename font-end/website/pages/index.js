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
			</div>
			<style jsx>{``}</style>
		</>
	)
}

export default HomePage
