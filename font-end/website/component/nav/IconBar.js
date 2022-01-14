import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { timeNow } from '../../utils/Utils'
import { UserContext } from '../../reducer/User.Reducer'
import { ChatContext } from '../../reducer/Chat.Reducer'

const IconBar = () => {
	console.log(
		`${timeNow()} --- [IconBar] --- Render at component/nav/IconBar.js`
	)

	const userCTX = useContext(UserContext)
	const chatCTX = useContext(ChatContext)

	return (
		<>
			<div className={'float-right'}>
				<div className={'flex'}>
					<div className={'mr-3.5 div-IconBar-container'}>
						<Link href={'/'}>
							<a>
								<div className={'flex'}>
									<Image
										src={'/svg/notify.svg'}
										width={25}
										height={25}
										alt={'Notify'}
									/>
									<p className={'ml-0.5 font-poppins'}>Thông báo</p>
								</div>
							</a>
						</Link>
					</div>
					<div className={'mr-3.5 div-IconBar-container'}>
						<Link href={'/'}>
							<a>
								<div className={'flex'}>
									<Image
										src={'/svg/community.svg'}
										width={25}
										height={25}
										alt={'Community'}
									/>
									<p className={'ml-0.5 font-poppins'}>Cộng đồng</p>
								</div>
							</a>
						</Link>
					</div>
					<div className={'flex mr-3.5 div-IconBar-container'}>
						<Link href={'/message'}>
							<a>
								<div className={'flex'}>
									<Image
										src={'/svg/messenger.svg'}
										width={25}
										height={25}
										alt={'Messenger'}
									/>
									<p className={'ml-0.5 font-poppins'}>
										{' '}
										Tin nhắn {chatCTX.state.inComeMessage}
									</p>
								</div>
							</a>
						</Link>
					</div>
					{userCTX.state.userID === null ? (
						<>
							<div className={'flex mr-3.5 div-IconBar-container'}>
								<Link href={'/'}>
									<a>
										<div className={'flex'}>
											<p className={'ml-0.5 font-poppins'}> Đăng ký </p>
										</div>
									</a>
								</Link>
							</div>
							<div className={'flex mr-3.5 div-IconBar-container'}>
								<Link href={'/'}>
									<a>
										<div className={'flex'}>
											<p className={'ml-0.5 font-poppins'}> Đăng nhập </p>
										</div>
									</a>
								</Link>
							</div>
						</>
					) : (
						<div className={'flex mr-3.5 div-IconBar-container'}>
							<Link href={'/'}>
								<a>
									<div className={'flex'}>
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

export default React.memo(IconBar)
