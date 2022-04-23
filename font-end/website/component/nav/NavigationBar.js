import React, { useContext, useState } from 'react'
import IconBar from './IconBar'
import Image from 'next/image'
import Link from 'next/link'
import { timeNow } from '../../utils/Utils'
import { SEARCH_ACTION, SearchContext } from '../../reducer/Search.Reducer'
import { useRouter } from 'next/router'
/*import { CartContext } from '../../reducer/Cart.Reducer'*/

const NavigationBar = () => {
	console.log(
		`${timeNow()} --- [NavigationBar] --- Render at component/nav/NavigationBar.js`
	)

	const searchCTX = useContext(SearchContext)

	const [text, setText] = useState('')

	const router = useRouter()

	const onChangeText = e => {
		setText(e.target.value)
	}

	const onSubmit = e => {
		e.preventDefault()
		if (!searchCTX.state.isSearchPage) {
			router.push('/search')
		}
		if (text !== '') {
			searchCTX.setSearchText(SEARCH_ACTION.SET_TEXT, text)
		} else {
			searchCTX.reset(SEARCH_ACTION.RESET_TEXT)
		}
	}

	/*const cartCTX = useContext(CartContext)*/

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
								onChange={onChangeText}
								value={text}
								className={'mr-2 focus:outline-none input-NavigationBar'}
								placeholder={'Find your product that you want !'}
							/>
							<button onClick={onSubmit}>
								<Image
									src={'/svg/search.svg'}
									width={25}
									height={25}
									alt={'Search'}
								/>
							</button>
						</div>
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

export default NavigationBar
