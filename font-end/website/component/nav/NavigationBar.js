import React, { useContext } from 'react'
import IconBar from './IconBar'
import Image from 'next/image'
import Link from 'next/link'
import { timeNow } from '../../utils/Utils'
import { CartContext } from '../../reducer/Cart.Reducer'

const NavigationBar = () => {
	console.log(
		`${timeNow()} --- [NavigationBar] --- Render at component/nav/NavigationBar.js`
	)

	const cartCTX = useContext(CartContext)

	return (
		<>
			<div
				className={
					'box-border sticky top-0 z-50 py-4 w-full bg-navbar bg-opacity-100 shadow px-330 div-NavigationBar-container'
				}>
				<div className={'mb-2'}>
					<IconBar />
					<div className={'clear-both'} />
				</div>
				<div className={'div-NavigationBar-hrContainer'}>
					<hr />
				</div>
				<div className={'flex items-center'}>
					<div className={'mr-6 h-auto'}>
						<Link href={'/'}>
							<a>
								<Image
									src={'/logo-horizontal.png'}
									width={118}
									height={46}
									alt={'logo'}
								/>
							</a>
						</Link>
					</div>
					<div className={'mr-6'}>
						<div
							className={
								'flex flex-wrap content-center div-NavigationBar-searchBar'
							}>
							<select id={'type'} className={'mr-2 border-r-2 font-poppins'}>
								<option value={'product'} className={'font-poppins'}>
									Sản phẩm
								</option>
								<option value={'user font-poppins'}>Người dùng</option>
							</select>
							<input
								type={'search'}
								className={'mr-2 focus:outline-none input-NavigationBar'}
								placeholder={'Find your product that you want !'}
							/>
							<Image
								src={'/svg/search.svg'}
								width={25}
								height={25}
								alt={'Shopping Cart'}
							/>
						</div>
					</div>
					<div className={'h-auto'}>
						<Link href={'/checkout'}>
							<a>
								<div>
									<Image
										src={'/svg/shopping-cart.svg'}
										width={25}
										height={25}
										alt={'Shopping Cart'}
									/>
									<span> {cartCTX.state.totalProduct} </span>
								</div>
							</a>
						</Link>
					</div>
				</div>
			</div>
			<style jsx>
				{`
					.div-NavigationBar-container {
						padding-top: 14px;
						padding-bottom: 57px;
					}

					.div-NavigationBar-hrContainer {
						margin-top: 13px;
						margin-bottom: 35px;
					}

					.div-NavigationBar-searchBar {
						max-width: 800px;
						height: 42px;
						width: 800px;
						border-radius: 12px;
						border-color: rgba(209, 209, 209, 1);
						border-width: 1px;
						border-style: solid;
						background-color: rgba(249, 249, 249, 1);
						padding: 5px;
					}

					.input-NavigationBar {
						width: 620px;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(NavigationBar)
