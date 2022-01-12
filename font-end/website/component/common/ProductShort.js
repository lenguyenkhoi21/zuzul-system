import Link from 'next/link'
import React, { useContext } from 'react'
import { imageLoader, timeNow } from '../../utils/Utils'
import Image from 'next/image'
import { CartContext } from '../../reducer/Cart.Reducer'
import { UserContext } from '../../reducer/User.Reducer'

const ProductShort = ({ product }) => {
	console.log(
		`${timeNow()} --- [ProductShort] --- Render at component/common/ProductShort.js`
	)

	const cartCTX = useContext(CartContext)
	const userCTX = useContext(UserContext)

	const onClickHandle = e => {
		e.preventDefault()
		if (userCTX.state.userID !== null && userCTX.state.userID !== '') {
			const socket = cartCTX.state.socket
			if (socket !== null) {
				socket.emit('synchronization-cart', {
					userID: userCTX.state.userID,
					productID: product.id,
					number: 1,
					type: 'INCREMENT'
				})
			}
		}
	}
	return (
		<>
			<div className={'div-ProductShort-container'}>
				<Link href={'/setCookie'}>
					<a>
						<Image
							src={product.image}
							width={237}
							height={180}
							loader={imageLoader}
							className={'img-ProductShort'}
							alt={'image'}
						/>
						<p className={'font-poppins'}> {product.name} </p>
						<p className={'font-poppins p-ProductShort-med p-ProductShort-des'}>
							{' '}
							{product.des_short}{' '}
						</p>
						<div className={''}>
							<p className={'float-left font-poppins p-ProductShort-price'}>
								{' '}
								{product.price}{' '}
							</p>
							{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
							<button
								onClick={e => onClickHandle(e)}
								className={
									'float-right bg-navbar font-poppins btn-ProductShort'
								}>
								{' '}
								Mua ngay{' '}
							</button>
							<div className={'clear-both'} />
						</div>
					</a>
				</Link>
			</div>
			<style jsx>
				{`
					.div-ProductShort-container {
						background: #ffffff;
						border: 1px solid #d1d1d1;
						box-sizing: border-box;
						border-radius: 12px;
						padding: 16px;
						width: 237px;
						margin-right: 32px;
						margin-bottom: 35px;
					}

					.p-ProductShort-price {
						margin-top: 5px;
						margin-bottom: 5px;
					}

					.p-ProductShort-med {
						font-weight: 500;
					}

					.p-ProductShort-des {
						text-overflow: Ellipsis;
					}

					.btn-ProductShort {
						padding-top: 6.5px;
						padding-bottom: 6.5px;
						border: 2px solid #2aa71a;
						padding-right: 12px;
						padding-left: 12px;
						box-sizing: border-box;
						border-radius: 12px;
						color: #ffffff;
					}
				`}
			</style>
		</>
	)
}

export default React.memo(ProductShort)
