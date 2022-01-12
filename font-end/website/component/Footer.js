import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { timeNow } from '../utils/Utils'

const Footer = () => {
	console.log(`${timeNow()} --- [Footer] --- Render at './component/Footer.js'`)
	return (
		<>
			<footer className={'bg-navbar px-330 footer-Footer'}>
				<div className={'grid grid-cols-3 items-center'}>
					<div>
						<Link href={'/'}>
							<a className={'float-left p-Footer-sr'}>
								<p className={'p-Footer-text p-Footer-text-small'}>Danh mục</p>
							</a>
						</Link>

						<Link href={'/'}>
							<a className={'float-left p-Footer-sr'}>
								<p className={'p-Footer-text p-Footer-text-small'}>
									{' '}
									Điều khoản sử dụng
								</p>
							</a>
						</Link>

						<Link href={'/'}>
							<a className={'float-left'}>
								<p className={'p-Footer-text p-Footer-text-small'}>
									{' '}
									Hướng dẫn sử dụng
								</p>
							</a>
						</Link>
						<div className={'clear-both'} />
					</div>

					<div className={'flex justify-center'}>
						<div>
							<Link href={'/'}>
								<a>
									<Image
										src={'/logo.png'}
										width={116}
										height={150}
										alt={'Logo'}
									/>
								</a>
							</Link>
						</div>
					</div>

					<div>
						<Link href={'/'}>
							<a className={'float-right'}>
								<p className={'p-Footer-text p-Footer-text-small'}>
									Chính sách bảo mật
								</p>
							</a>
						</Link>

						<Link href={'/'}>
							<a className={'float-right p-Footer-sr'}>
								<p className={'p-Footer-text p-Footer-text-small'}>
									{' '}
									Về chúng tôi
								</p>
							</a>
						</Link>

						<Link href={'/'}>
							<a className={'float-right p-Footer-sr'}>
								<p className={'p-Footer-text p-Footer-text-small'}> Hỗ trợ</p>
							</a>
						</Link>
						<div className={'clear-both'} />
					</div>
				</div>

				<hr className={'hr-Footer'} />

				<div className={'flex justify-center'}>
					<Link href={'/'}>
						<a className={'a-Footer-icon '}>
							<Image
								src={'/png/gplus.png'}
								height={40}
								width={40}
								alt={'social icon'}
							/>
						</a>
					</Link>

					<Link href={'/'}>
						<a className={'a-Footer-icon '}>
							<Image
								src={'/png/ins.png'}
								height={40}
								width={40}
								alt={'social icon'}
							/>
						</a>
					</Link>

					<Link href={'/'}>
						<a className={'a-Footer-icon '}>
							<Image
								src={'/png/tiw.png'}
								height={40}
								width={40}
								alt={'social icon'}
							/>
						</a>
					</Link>

					<Link href={'/'}>
						<a>
							<Image
								src={'/png/fb.png'}
								height={40}
								width={40}
								alt={'social icon'}
							/>
						</a>
					</Link>
				</div>

				<p className={'text-center p-Footer-text-small'}>
					{' '}
					© 2021-2022 Copyright By Zuzul{' '}
				</p>
			</footer>
			<style jsx>
				{`
					.footer-Footer {
						height: 410px;
						padding-top: 105px;
					}

					.div-Footer-container {
						width: 100%;
						text-align: center;
					}

					.p-Footer-text {
						color: #ffffff;
						font-weight: 700;
						font-family: Roboto;
					}

					.p-Footer-text-small {
						color: #ffffff;
						font-family: 'Roboto Thin';
						font-weight: normal;
						font-size: 14px;
					}

					.p-Footer-sl {
						margin-left: 50px;
					}

					.p-Footer-sr {
						margin-right: 50px;
					}

					.p-Footer-text-logo {
						color: #ffffff;
						font-weight: bold;
						font-family: Roboto;
						font-size: 36px;
						margin-left: 85px;
						margin-right: 85px;
					}

					.hr-Footer {
						color: #ffffff;
						margin-bottom: 55px;
					}

					.a-Footer-icon {
						margin-right: 25px;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(Footer)
