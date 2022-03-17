import React, { useContext, useEffect, useState } from 'react'
import { timeNow } from '../../utils/Utils'
import Menu from '../../component/category/Menu'
import { TITLE_ACTION, TitleContext } from '../../reducer/Title.Reducer'
import { useRouter } from 'next/router'
import SubMenu from '../../component/category/SubMenu'
import ProductFilterCategory from '../../component/index/ProductFilter'

//TODO: Build staics page with category
// eslint-disable-next-line no-unused-vars
const CategoryPage = () => {
	console.log(
		`${timeNow()} --- [Category] --- Render at pages/category/index.js`
	)

	const [product, setProduct] = useState([])
	const [categoryName, setCategoryName] = useState('')
	const titleCTX = useContext(TitleContext)
	const router = useRouter()
	const path = router.asPath
	const categoryId = path.split('/category/')[1]

	useEffect(() => {
		if (categoryName.length === 0) {
			titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, 'Danh mục')
		} else {
			titleCTX.changeTitle(TITLE_ACTION.CHANGE_TITLE, categoryName)
		}
	}, [path, categoryName])

	return (
		<>
			<div className='fluid-container'>
				<div className={'flex mx-auto container-content page-body'}>
					<div className='left-content'>
						<div className='category-main'>
							<h1 className='text-lg font-semibold text-fontColor-bl1 category-titile'>
								Danh mục con
							</h1>

							<SubMenu
								setProduct={setProduct}
								pathname={categoryId}
								path={path}
							/>
							{/*<hr/>*/}
						</div>
						<div className='category-other'>
							<h1 className='text-lg font-semibold text-fontColor-bl1 category-titile'>
								Danh mục sản phẩm khác{' '}
							</h1>
							<Menu pathname={categoryId} setCategoryName={setCategoryName} />
							{/*<ProductDisplay product={data.productModels} />*/}
						</div>
					</div>
					<div className='right-content'>
						<div className='list-products'>
							{/*<h1>right content - list product</h1>*/}
							<ProductFilterCategory products={product} />
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
