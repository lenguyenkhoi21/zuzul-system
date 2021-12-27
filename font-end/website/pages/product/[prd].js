import React from 'react'
import { useRouter } from 'next/router'
import { timeNow } from '../../utils/Utils'

//TODO: Using props to get value from statics
// eslint-disable-next-line no-unused-vars
const ProductByIdPage = props => {
	console.log(`${timeNow()} --- [ProductById] --- at pages/[prd].js`)
	const router = useRouter()

	//TODO: Change the title to name of product

	//TODO: Display the hierarchical tree:
	// Trang chủ -> Category -> Sub-category -> Sản phẩm

	//TODO: Display the information detail of product
	// Fetch API to get the Image in Client-Side

	return <div>{router.asPath}</div>
}

export const getStaticPaths = async () => {
	console.log(
		`${timeNow()} --- [getStaticPaths()] --- Build at /product/category/[prd].js`
	)
	return {
		paths: [{ params: { prd: '1' } }],
		fallback: 'blocking'
	}
}

export const getStaticProps = async ({ params }) => {
	console.log(
		`${timeNow()} --- [getStaticProps()] --- Build /product/category/${
			params.prd
		}`
	)
	//TODO: Call API GET the product information
	const arr = [
		{
			id: 'prd-001',
			name: 'Áo khoác',
			price: 15000,
			image: '',
			react: 123,
			cate_id: 'cagegory-01',
			cate_name: 'Thời trang nam',
			sub_id: 'sub-01',
			sub_name: 'Áo mùa đông',
			description: [],
			image_des: ['123', '456', '789']
		}
	]
	return {
		props: {
			arr
		}
	}
}

export default ProductByIdPage
