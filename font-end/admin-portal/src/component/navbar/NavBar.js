import React, { useContext, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import Item from './Item'
import { PATH } from '../../utils/Constant'
import { HeaderContext } from '../../reducer/Header.Reducer'
import Logout from './Logout'

const NavBar = () => {
	const [optionNav] = useState([
		{
			image: '/navbar/edit.png',
			imageA: '/navbar/editA.png',
			content: 'Yêu cầu mở shop',
			link: PATH.SHOP_REQUEST
		},
		{
			image: '/navbar/cate.png',
			imageA: '/navbar/cateA.png',
			content: 'Quản lý danh mục',
			link: PATH.CATEGORY_MANAGEMENT
		},
		{
			image: '/navbar/prd.png',
			imageA: '/navbar/prdA.png',
			content: 'Phê duyệt sản phẩm',
			link: PATH.PRODUCT_CENSORSHIP
		}
	])
	const headerCTX = useContext(HeaderContext)
	return (
		<>
			<div className={'col my-sidebar div-NavBar-container'}>
				<div className={'div-NavBar-header d-inline-flex align-items-center'}>
					<Link to={'/'}>
						<div className={'d-inline-flex align-items-center'}>
							<img
								src={'/adminlogo.png'}
								alt={'Logo Admin'}
								className={'img-NavBar-space'}
							/>
							{headerCTX.state.path === PATH.INDEX ? (
								<span className={'span-NavBar-text span-NavBar-active'}>
									{' '}
									Admin Portal{' '}
								</span>
							) : (
								<span className={'span-NavBar-text'}> Admin Portal </span>
							)}
						</div>
					</Link>
				</div>
				<div>
					{optionNav.map((option, key) => (
						<React.Fragment key={key}>
							<Item
								link={option.link}
								image={option.image}
								content={option.content}
								imageA={option.imageA}
							/>
						</React.Fragment>
					))}
				</div>
				<div className={''}>
					<Logout />
				</div>
			</div>
		</>
	)
}

export default NavBar
