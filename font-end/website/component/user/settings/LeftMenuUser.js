import React, { useContext } from 'react'
import { UserContext } from '../../../reducer/User.Reducer'
import { LeftMenuUserContext } from '../../../reducer/LeftMenuUser.Reducer'
import Link from 'next/link'

const LeftMenuUser = () => {
	const userCTX = useContext(UserContext)
	const leftMenuUserCTX = useContext(LeftMenuUserContext)

	return (
		<>
			<div>
				<div>
					<p> Tài khoản </p>
					<ul>
						<li>
							{leftMenuUserCTX.state.profile ? (
								<Link href={'/user/settings/account'}>
									<a>
										<span className={'button-LeftMenuUser-active'}>
											{' '}
											Hồ sơ{' '}
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/account'}>
									<a>
										<span> Hồ sơ </span>
									</a>
								</Link>
							)}
						</li>
						<li>
							{leftMenuUserCTX.state.address ? (
								<Link href={'/user/settings/address'}>
									<a>
										<span className={'button-LeftMenuUser-active'}>
											{' '}
											Địa chỉ{' '}
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/address'}>
									<a>
										<span> Địa chỉ </span>
									</a>
								</Link>
							)}
						</li>
						<li>
							{leftMenuUserCTX.state.changePassword ? (
								<Link href={'/user/settings/changepassword'}>
									<a>
										<span className={'button-LeftMenuUser-active'}>
											{' '}
											Thay đổi mật khẩu{' '}
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/changepassword'}>
									<a>
										<span> Thay đổi mật khẩu </span>
									</a>
								</Link>
							)}
						</li>
						<li>
							{leftMenuUserCTX.state.history ? (
								<Link href={'/user/settings/history'}>
									<a>
										<span className={'button-LeftMenuUser-active'}>
											{' '}
											Lịch sử mua hàng{' '}
										</span>
									</a>
								</Link>
							) : (
								<Link href={'/user/settings/history'}>
									<a>
										<span> Lịch sử mua hàng </span>
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
							<p> Quản lý sản phẩm </p>
							<ul>
								<li>
									<button> Tất cả sản phẩm </button>
								</li>
								<li>
									<button> Thêm sản phẩm </button>
								</li>
								<li>
									<button> Chỉnh sửa sản phẩm </button>
								</li>
							</ul>
							<br />
						</div>

						<div>
							<p> Quản lý đơn hàng </p>
							<ul>
								<li>
									<button> Tất cả </button>
								</li>
								<li>
									<button> Chờ xác nhận </button>
								</li>
								<li>
									<button> Chờ lấy hàng </button>
								</li>
								<li>
									<button> Đang giao </button>
								</li>
								<li>
									<button> Đã giao </button>
								</li>
								<li>
									<button> Hủy đơn </button>
								</li>
							</ul>
							<br />
						</div>
					</>
				) : (
					<>
						<div>
							<p> Yêu cầu trở thành người bán hàng </p>
							<ul>
								<li>
									<button> Gửi yêu cầu </button>
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
						background-color: blueviolet;
					}
				`}
			</style>
		</>
	)
}

export default LeftMenuUser
