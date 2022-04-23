import { useContext, useEffect, useState } from 'react'
import { SEARCH_ACTION, SearchContext } from '../../reducer/Search.Reducer'
import { timeNow } from '../../utils/Utils'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/APIUtils'
import CategoryScroll from '../../component/index/CategoryScroll'
import ProductFilter from '../../component/index/ProductFilter'

const SearchPage = () => {
	console.log(`${timeNow()} --- [Search] --- Render at pages/index.js`)
	const titleCTX = useContext(TitleContext)
	const searchCTX = useContext(SearchContext)
	const [categoryList, setCategory] = useState([])
	const [productList, setProduct] = useState([])
	//Change title of page
	useEffect(() => {
		searchCTX.setSearchPage(SEARCH_ACTION.SET_SEARCH_PAGE, true)
		if (searchCTX.state.text !== null) {
			titleCTX.changeTitle(
				TITLE_ACTION.CHANGE_TITLE,
				`Kết quả tìm kiếm | ${searchCTX.state.text} `
			)

			fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/search/NAME`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					Accept: 'application/json, text/plain',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: searchCTX.state.text })
			})
				.then(response => response.json())
				.then(data => setProduct(data))
		} else {
			titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Tìm kiếm')
			setProduct([])
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/category/all`, {
			method: 'GET',
			mode: 'cors'
		})
			.then(response => response.json())
			.then(data => setCategory(data))
	}, [searchCTX.state.text])

	return (
		<>
			<div className={`px-330 page-body`}>
				<CategoryScroll categoryList={categoryList} />
				<ProductFilter type={'Kết quả tìm kiếm'} products={productList} />
			</div>
			<style jsx>{``}</style>
		</>
	)
}

export default SearchPage
