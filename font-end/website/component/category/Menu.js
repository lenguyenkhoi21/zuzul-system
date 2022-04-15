import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { API_DOMAIN, API_PRODUCT_SERVICE } from '../../utils/APIUtils'

const   Menu = ({ pathname, setCategoryName }) => {
	const [category, setCategory] = useState([])

	useEffect(() => {
		// fetch all category

		fetch(`${API_DOMAIN}/${API_PRODUCT_SERVICE}/v1/pub/category/all`, {
			method: 'GET',
			mode: 'cors'
		})
			.then(response => response.json())
			.then(data => {
				setCategory(data)
				data.forEach(ele =>
					pathname === ele.categoryId ? setCategoryName(ele.categoryName) : ele
				)
			})
	}, [pathname])

	return (
		<>
			{category.map((element, index) => (
				<React.Fragment key={index}>
					{pathname === element.categoryId ? (
						// link to category/id
						<Link
							href={{
								pathname: `/category/${element.categoryId}`
							}}>
							<a>
								<p className={'p-Menu-active p-Menu-text'}> {element.categoryName} </p>
							</a>
						</Link>
					) : (
						// link to category/id
						<Link
							href={{
								pathname: `/category/${element.categoryId}`
							}}>
							<a>
								<p className={'p-Menu-text'}> {element.categoryName} </p>
							</a>
						</Link>
					)}
				</React.Fragment>
			))}

			<style jsx>
				{`
          .p-Menu-active{
            color: #46d362;
          }
					.p-Menu-text {
						font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
					}
					p {
						padding-bottom: 12px;
						cursor: pointer;
						display: block;
					}
					p:hover {
						color: #46d362;
					}
				`}
			</style>
		</>
	)
}

export default Menu
