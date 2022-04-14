import Link from 'next/link'
import React, { useContext } from 'react'
import { imageLoader, timeNow } from '../../utils/Utils'
import Image from 'next/image'
import { CartContext } from '../../reducer/Cart.Reducer'
import { UserContext } from '../../reducer/User.Reducer'
import { API_DOMAIN, API_USER_SERVICE } from '../../utils/APIUtils'
import { useRouter } from 'next/router'

const ProductShort = ({ product }) => {
	console.log(
		`${timeNow()} --- [ProductShort] --- Render at component/common/ProductShort.js`
	)

	const cartCTX = useContext(CartContext)
	const userCTX = useContext(UserContext)

	const router = useRouter()

	const onClickHandle = e => {
		e.preventDefault()
		/*if (userCTX.state.userID !== null && userCTX.state.userID !== '') {
			const socket = cartCTX.state.socket
			if (socket !== null) {
				socket.emit('synchronization-cart', {
					userID: userCTX.state.userID,
					productID: product.prdId,
					number: 1,
					type: 'INCREMENT'
				})
			}
		}*/
		//TODO set payload
		const payload = {
			productId: product.prdId,
			purchaserId: userCTX.state.userID,
			sellerId: product.prdUserId,
			count: 1
		}

		//TODO fetch POST cart
		fetch(`${API_DOMAIN}/${API_USER_SERVICE}/v1/user/cart`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${userCTX.state.accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				if (data.alert === false) {
					router.push('/checkout')
				}
			})
	}
	return (
		<>
			<div className={'div-ProductShort-container'}>
				<Link
					href={{
						pathname: `/product/${product.prdId}`,
						query: { prdName: product.prdName }
					}}>
					<a>
						<Image
							src={product.currentImage + '|' + product.prdId}
							width={237}
							height={180}
							loader={imageLoader}
							className={'img-ProductShort'}
							alt={'image'}
						/>
						<p className={'font-poppins p-ProductShort-des'}>
							{' '}
							{product.prdName}{' '}
						</p>
						<p className={'font-poppins p-ProductShort-med p-ProductShort-des'}>
							{' '}
							{product.prdShortDes}{' '}
						</p>
						<div className={''}>
							<div>
								<p className={'float-left font-poppins p-ProductShort-price'}>
									{product.prdPriceOrigin}
								</p>
							</div>

							{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
							<Link href={'/cart'}>
								<div className={'flex justify-end items-end'}>
									<button
										onClick={e => onClickHandle(e)}
										name={product.prdId}
										className={
											'float-right bg-navbar font-poppins btn-ProductShort'
										}>
										Mua ngay
									</button>
								</div>
							</Link>
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
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						padding: 0;
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
