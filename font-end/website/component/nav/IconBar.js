import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { timeNow } from '../../utils/Utils'
import { USER_ACTION, UserContext } from '../../reducer/User.Reducer'
/*import { ChatContext } from '../../reducer/Chat.Reducer'*/
import { CART_ACTION, CartContext } from '../../reducer/Cart.Reducer'
import { CHAT_ACTION } from '../../reducer/Chat.Reducer'
import { NOTIFY_ACTION } from '../../reducer/Notify.Reducer'

const IconBar = () => {
	console.log(
		`${timeNow()} --- [IconBar] --- Render at component/nav/IconBar.js`
	)
	// const cartCTX = useContext(CartContext)
	const userCTX = useContext(UserContext)
	/*const chatCTX = useContext(ChatContext)*/

	const deleteCookie = () => {
		if (
			userCTX.state.userID !== null &&
			userCTX.state.userID !== '' &&
			userCTX.state.role !== null &&
			userCTX.state.role !== '' &&
			userCTX.state.access_token !== null &&
			userCTX.state.access_token !== ''
		) {
			userCTX.removeUser(USER_ACTION.REMOVE_USER)
		}
	}

	return (
		<>
			<div className={'float-right'}>
				<div className={'flex'}>
					<div className={'mr-3.5 div-IconBar-container'}>
						<Link href={'/checkout'}>
							<a>
								<div className={'flex'}>
									<p className={'ml-0.5 font-poppins'}>Giỏ hàng</p>
								</div>
							</a>
						</Link>
					</div>
					{userCTX.state.userID === null ? (
						<>
							<div className={'flex mr-3.5 div-IconBar-container'}>
								<Link href={'/register'}>
									<a>
										<div className={'flex'}>
											<p className={'ml-0.5 font-poppins'}> Đăng ký </p>
										</div>
									</a>
								</Link>
							</div>
							<div className={'flex mr-3.5 div-IconBar-container'}>
								<Link href={'/login'}>
									<a>
										<div className={'flex'}>
											<p className={'ml-0.5 font-poppins'}> Đăng nhập </p>
										</div>
									</a>
								</Link>
							</div>
						</>
					) : (
						<>
							<div className={'flex mr-3.5 div-IconBar-container'}>
								<Link href={'/user/settings'}>
									<a>
										<div className={'flex gap-2'}>
											<Image
												src={'/svg/user.svg'}
												width={25}
												height={25}
												alt={'Shopping Cart'}
											/>
											<p className={'ml-0.5 font-poppins'}>
												{userCTX.state.name === null
													? userCTX.state.userID
													: userCTX.state.name}
											</p>
										</div>
									</a>
								</Link>
							</div>
							<div className={'flex mr-3.5 div-IconBar-container'}>
								<p className={'ml-0.5 font-poppins'} onClick={deleteCookie}>
									{' '}
									Đăng Xuất{' '}
								</p>
							</div>
						</>
					)}
				</div>
			</div>
			<style jsx>
				{`
					.div-IconBar-container {
						padding: 7px;
					}

					.div-IconBar-container:hover {
						background-color: #ffffff;
					}
				`}
			</style>
		</>
	)
}

export default IconBar
