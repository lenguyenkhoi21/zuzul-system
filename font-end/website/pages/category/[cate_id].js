import React, { useContext, useEffect, useState } from 'react'
import { timeNow } from '../../utils/Utils'
import Menu from '../../component/category/Menu'
import ProductDisplay from '../../component/category/ProductDisplay'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import { useRouter } from 'next/router'
import SubMenu from '../../component/category/SubMenu'
import ProductFilterCategory from '../../component/index/ProductFilter'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/APIUtils'

//TODO: Build staics page with category
// eslint-disable-next-line no-unused-vars
const CategoryPage = () => {
	console.log(
		`${timeNow()} --- [Category] --- Render at pages/category/index.js`
	)

	const [data, setData] = useState({
		productModels: [
			{
				prdId: '',
				prdShortDes: '',
				prdPriceOrigin: '',
				prdName: ''
			}
		],
		categoryModels: [
			{
				categoryId: '',
				categoryName: ''
			}
		],
		subCategoryModels: [
			{
				subCategoryId: '',
				subCategoryName: ''
			}
		]
	})

	const [product, setProduct] = useState({
		prdId: '',
		prdShortDes: '',
		prdPriceOrigin: '',
		prdName: ''
	})

	const [subCategory, setSubCategory] = useState([])
	// eslint-disable-next-line no-unused-vars
	const [category, setCategory] = useState([
		{
			id: 'category-01',
			name: 'Thời trang nam',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-02',
			name: 'Thời trang nữ',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-03',
			name: 'Điện thoại & Phụ kiện',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-04',
			name: 'Mẹ & Bé',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-05',
			name: 'Thiết bị điện tử',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-06',
			name: 'Nhà cửa & Đời sống',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-08',
			name: 'Máy tính & Laptop',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-09',
			name: 'Sắc đẹp',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-10',
			name: 'Máy ảnh & Máy quay phim',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-11',
			name: 'Sức khỏe',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-12',
			name: 'Đồng Hồ',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		},
		{
			id: 'category-13',
			name: 'Giày dép',
			image: '1.jpg',
			des_short: 'Sản phẩm này là hàng chất lượng cao'
		}
	])
	const titleCTX = useContext(TitleContext)
	const router = useRouter()
	const path = router.asPath
	const pathname = path.split('/category')[2]
	const categoryId = path.split('/category/')[1]

	useEffect(() => {
		titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Danh mục sản phẩm')

		if (categoryId !== '[cate_id]') {
			// TODO: Fetch api to get all catecory
			fetch(
				`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/product/category/${categoryId}`,
				{
					method: 'GET',
					mode: 'cors'
				}
			)
				.then(response => response.json())
				.then(data => setData(data))
		}
	}, [path])

	return (
		<>
			<div className='fluid-container'>
				<div className={'flex mx-auto container-content page-body'}>
					<div className='left-content'>
						<div className='category-main'>
							<h1 className='text-lg font-semibold text-fontColor-bl1 category-titile'>
								Mẹ và bé
							</h1>

							<SubMenu
								setProduct={setProduct}
								subCategoryList={data.subCategoryModels}
							/>
							{/*<hr/>*/}
						</div>
						<div className='category-other'>
							<h1 className='text-lg font-semibold text-fontColor-bl1 category-titile'>
								Danh mục sản phẩm khác{' '}
							</h1>
							<Menu category={category} pathname={pathname} />
							{/*<ProductDisplay product={data.productModels} />*/}
						</div>
					</div>
					<div className='right-content'>
						<div className='list-products'>
							{/*<h1>right content - list product</h1>*/}
							<ProductFilterCategory products={data.categoryModels} />
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.fluid-container {
					background-color: rgb(249, 249, 249);
				}

				.container-content {
					width: 1260px;
					//padding-top: 44px;
					background-color: rgb(255, 255, 255);
				}

				.left-content {
					margin-right: 33px;
					margin-top: 44px;
					background-color: rgb(255, 255, 255);
					padding-left: 44px;
					//background-color: greenyellow;
				}

				.category-main {
					width: 268px;
					margin-right: 33px;
					margin-bottom: 58px;
				}

				.right-content {
					margin-top: 44px;
					//background-color: aqua;
					//margin-left: 33px;
				}

				.list-products {
					margin-top: 0px;
					padding-top: 0px;
				}

				.category-titile {
					padding-bottom: 15px;
				}
			`}</style>
		</>
	)
}

export default CategoryPage
