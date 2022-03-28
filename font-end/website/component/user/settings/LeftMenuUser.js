import React, { useContext } from 'react'
import { UserContext } from '../../../reducer/User.Reducer'
import { LeftMenuUserContext } from '../../../reducer/LeftMenuUser.Reducer'
import Link from 'next/link'
import Image from 'next/image'
import Authentication from '../../common/Authentication'

const LeftMenuUser = () => {
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	return (
		<>
			<div className={'div-LeftMenuUser-size'}>
				<div>
					<div className={'flex items-center ml-4'}>
						<div>
							<Image
								width={18}
								height={22}
								src={'/png/icon_User_Account.png'}
							/>
						</div>
						<div>
							<p className={'ml-2 p-LeftMenuUser-headerAccount'}> Tài khoản </p>
						</div>
					</div>

					<ul className={'ml-11'}>
						<li>
							{leftMenuUserCTX.state.profile ? (
								<Link href={'/user/settings/account'}>
									<a>
										<span
											className={
												'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
											}>
											Hồ sơ
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/account'}>
									<a>
										<span className={'div-LeftMenuUser-subHeader'}>Hồ sơ</span>
									</a>
								</Link>
							)}
						</li>
						<li>
							{leftMenuUserCTX.state.address ? (
								<Link href={'/user/settings/address'}>
									<a>
										<span
											className={
												'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
											}>
											Địa chỉ
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/address'}>
									<a>
										<span className={'div-LeftMenuUser-subHeader'}>
											Địa chỉ
										</span>
									</a>
								</Link>
							)}
						</li>
						<li>
							{leftMenuUserCTX.state.changePassword ? (
								<Link href={'/user/settings/changepassword'}>
									<a>
										<span
											className={
												'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
											}>
											Thay đổi mật khẩu
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/changepassword'}>
									<a>
										<span className={'div-LeftMenuUser-subHeader'}>
											Thay đổi mật khẩu
										</span>
									</a>
								</Link>
							)}
						</li>
						<li>
							{leftMenuUserCTX.state.history ? (
								<Link href={'/user/settings/history'}>
									<a>
										<span
											className={
												'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
											}>
											Lịch sử mua hàng
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/history'}>
									<a>
										<span className={'div-LeftMenuUser-subHeader'}>
											Lịch sử mua hàng
										</span>
									</a>
								</Link>
							)}
						</li>
					</ul>
					<br />
				</div>

				{userCTX.state.isActiveShop ? (
					<>
						<div>
							<div className={'flex items-center ml-4'}>
								<div>
									<Image
										width={18}
										height={22}
										src={'/png/icon_request_open_shop.png'}
									/>
								</div>
								<div>
									<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
										Quản lý sản phẩm
									</p>
								</div>
							</div>
							<ul className={'ml-11'}>
								<Link href={'/product/listProduct'}>
									<li>
										<button className={'div-LeftMenuUser-subHeader'}>
											Tất cả sản phẩm
										</button>
									</li>
								</Link>
								<Link href={'/product/addNewProduct'}>
									<li>
										<button className={'div-LeftMenuUser-subHeader'}>
											Thêm sản phẩm
										</button>
									</li>
								</Link>
							</ul>
							<br />
						</div>

						<div>
							<div className={'flex items-center ml-4'}>
								<div>
									<Image
										width={18}
										height={22}
										src={'/png/icon_request_open_shop.png'}
									/>
								</div>
								<div>
									<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
										Quản lý đơn hàng{' '}
									</p>
								</div>
							</div>
							<ul className={'ml-11'}>
								<li>
									<Link href={'/user/settings/orderManagement'}>
										<a>
											<span className={' div-LeftMenuUser-subHeader'}>
												Tất cả
											</span>
										</a>
									</Link>
								</li>
							</ul>
							<br />
						</div>
					</>
				) : (
					<>
						<div className={''}>
							<div className={'flex grid-flow-col items-center '}>
								<div className={'ml-4 '}>
									<Image
										width={16}
										height={22}
										src={'/png/icon_request_open_shop.png'}
									/>
								</div>
								<div>
									<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
										Yêu cầu mở gian hàng
									</p>
								</div>
							</div>

							<ul>
								<li>
									<Link href={'/user/settings/sendRequest'}>
										<a>
											<button className={'ml-10 div-LeftMenuUser-subHeader'}>
												Gửi yêu cầu
											</button>
										</a>
									</Link>
								</li>
							</ul>
							<br />
						</div>
					</>
				)}
			</div>
			<style jsx>
				{`
					.button-LeftMenuUser-active {
						color: #46d362;
					}
					.p-LeftMenuUser-headerAccount {
						font-family: Poppins;
						font-style: normal;
						font-weight: 700;
						font-size: 18px;
						line-height: 23px;
						color: #151515;
					}
					.div-LeftMenuUser-size {
						margin-top: 25px;
						background: #ffffff;
						width: 217px;
						border-radius: 12px;
					}
					.div-LeftMenuUser-subHeader {
						font-family: Open Sans;
						font-style: normal;
						font-weight: 400;
						font-size: 18px;
						line-height: 23px;
					}
				`}
			</style>
		</>
	)
	if (userCTX.state.userID !== null) {
		return (
			<>
				<div className={'div-LeftMenuUser-size'}>
					<div>
						<div className={'flex items-center ml-4'}>
							<div>
								<Image
									width={18}
									height={22}
									src={'/png/icon_User_Account.png'}
								/>
							</div>
							<div>
								<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
									{' '}
									Tài khoản{' '}
								</p>
							</div>
						</div>

						<ul className={'ml-11'}>
							<li>
								{leftMenuUserCTX.state.profile ? (
									<Link href={'/user/settings/account'}>
										<a>
											<span
												className={
													'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
												}>
												Hồ sơ
											</span>
										</a>
									</Link>
								) : (
									<Link href={'/user/settings/account'}>
										<a>
											<span className={'div-LeftMenuUser-subHeader'}>
												Hồ sơ
											</span>
										</a>
									</Link>
								)}
							</li>
							<li>
								{leftMenuUserCTX.state.address ? (
									<Link href={'/user/settings/address'}>
										<a>
											<span
												className={
													'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
												}>
												Địa chỉ
											</span>
										</a>
									</Link>
								) : (
									<Link href={'/user/settings/address'}>
										<a>
											<span className={'div-LeftMenuUser-subHeader'}>
												Địa chỉ
											</span>
										</a>
									</Link>
								)}
							</li>
							<li>
								{leftMenuUserCTX.state.changePassword ? (
									<Link href={'/user/settings/changepassword'}>
										<a>
											<span
												className={
													'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
												}>
												Thay đổi mật khẩu
											</span>
										</a>
									</Link>
								) : (
									<Link href={'/user/settings/changepassword'}>
										<a>
											<span className={'div-LeftMenuUser-subHeader'}>
												Thay đổi mật khẩu
											</span>
										</a>
									</Link>
								)}
							</li>
							<li>
								{leftMenuUserCTX.state.history ? (
									<Link href={'/user/settings/history'}>
										<a>
											<span
												className={
													'button-LeftMenuUser-active div-LeftMenuUser-subHeader'
												}>
												Lịch sử mua hàng
											</span>
										</a>
									</Link>
								) : (
									<Link href={'/user/settings/history'}>
										<a>
											<span className={'div-LeftMenuUser-subHeader'}>
												Lịch sử mua hàng
											</span>
										</a>
									</Link>
								)}
							</li>
						</ul>
						<br />
					</div>

					{userCTX.state.isActiveShop ? (
						<>
							<div>
								<div className={'flex items-center ml-4'}>
									<div>
										<Image
											width={18}
											height={22}
											src={'/png/icon_request_open_shop.png'}
										/>
									</div>
									<div>
										<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
											Quản lý sản phẩm
										</p>
									</div>
								</div>
								<ul className={'ml-11'}>
									<li>
										<button className={'div-LeftMenuUser-subHeader'}>
											Tất cả sản phẩm
										</button>
									</li>
									<li>
										<button className={'div-LeftMenuUser-subHeader'}>
											Thêm sản phẩm
										</button>
									</li>
									<li>
										<button className={'div-LeftMenuUser-subHeader'}>
											Chỉnh sửa sản phẩm
										</button>
									</li>
								</ul>
								<br />
							</div>

							<div>
								<div className={'flex items-center ml-4'}>
									<div>
										<Image
											width={18}
											height={22}
											src={'/png/icon_request_open_shop.png'}
										/>
									</div>
									<div>
										<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
											Quản lý đơn hàng{' '}
										</p>
									</div>
								</div>
								<ul className={'ml-11'}>
									<li>
										<Link href={'/user/settings/orderManagement'}>
											<a>
												<span className={' div-LeftMenuUser-subHeader'}>
													Tất cả
												</span>
											</a>
										</Link>
									</li>
								</ul>
								<br />
							</div>
						</>
					) : (
						<>
							<div className={''}>
								<div className={'flex grid-flow-col items-center '}>
									<div className={'ml-4 '}>
										<Image
											width={16}
											height={22}
											src={'/png/icon_request_open_shop.png'}
										/>
									</div>
									<div>
										<p className={'ml-2 p-LeftMenuUser-headerAccount'}>
											Yêu cầu mở gian hàng
										</p>
									</div>
								</div>

								<ul>
									<li>
										<Link href={'/user/settings/sendRequest'}>
											<a>
												<button className={'ml-10 div-LeftMenuUser-subHeader'}>
													Gửi yêu cầu
												</button>
											</a>
										</Link>
									</li>
								</ul>
								<br />
							</div>
						</>
					)}
				</div>
				<style jsx>
					{`
						.button-LeftMenuUser-active {
							color: #46d362;
						}
						.p-LeftMenuUser-headerAccount {
							font-family: Poppins;
							font-style: normal;
							font-weight: 700;
							font-size: 18px;
							line-height: 23px;
							color: #151515;
						}
						.div-LeftMenuUser-size {
							margin-top: 25px;
							background: #ffffff;
							width: 217px;
							border-radius: 12px;
						}
						.div-LeftMenuUser-subHeader {
							font-family: Open Sans;
							font-style: normal;
							font-weight: 400;
							font-size: 18px;
							line-height: 23px;
						}
					`}
				</style>
			</>
		)
	} else {
		return (
			<Authentication>
				titleHeader={'Đăng nhập'}
				titleSub={'Đăng ký'}
				nameBtn={'Đăng nhập'}
			</Authentication>
		)
	}
}

export default LeftMenuUser
